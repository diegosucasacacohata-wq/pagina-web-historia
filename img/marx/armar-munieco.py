# Arma las piezas del muñeco de Marx (cuerpo, cabeza, mandíbula) a partir de la foto y la máscara de Vision.
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageChops, ImageOps
import numpy as np

carpeta = sys.argv[1]
K = 3  # se trabaja a 3x para que los bordes queden suaves
foto = Image.open(carpeta + "/original.png").convert("RGB")
masc = Image.open(carpeta + "/mascara.png").convert("L")
W, H = foto.size
foto = foto.resize((W*K, H*K), Image.LANCZOS)
# Tono sepia suave (papel de foto antigua)
g = foto.convert("L")
foto = Image.merge("RGB", [g.point(lambda v: min(255, int(v*1.04+6))), g.point(lambda v: int(v*0.99+3)), g.point(lambda v: int(v*0.90))])
masc = masc.resize((W*K, H*K), Image.BILINEAR)
def P(pts): return [(x*K, y*K) for x, y in pts]

def poligono(pts):
    m = Image.new("L", foto.size, 0); ImageDraw.Draw(m).polygon(P(pts), fill=255); return m

def rellenar_huecos(m):
    # Rellena los huecos internos (ojos, bigote) con un relleno desde el borde
    inv = ImageOps.invert(m.point(lambda v: 255 if v > 127 else 0))
    borde = inv.copy()
    ImageDraw.floodfill(borde, (0, 0), 128)
    huecos = borde.point(lambda v: 255 if v == 255 else 0)
    return ImageChops.lighter(m, huecos)

def suavizar(m, r):
    return m.filter(ImageFilter.GaussianBlur(r)).point(lambda v: 255 if v > 127 else 0).filter(ImageFilter.GaussianBlur(0.8*K/3))

# ---------- Cuerpo: busto hasta las manos, sin la silla ----------
cuerpo_zona = poligono([(0, 0), (W, 0), (W, 262), (299, 262), (299, 350), (176, 401), (74, 401), (74, 336), (0, 336)])
cuerpo = ImageChops.multiply(masc, cuerpo_zona)

# ---------- Cabeza: pelo + cara + barba (claro), sin saco ni camisa ----------
gris = foto.convert("L").filter(ImageFilter.GaussianBlur(1.2*K))
claro = gris.point(lambda v: 255 if v > 92 else 0)
zona_cabeza = poligono([(140, 90), (300, 90), (300, 196), (268, 206), (258, 222), (236, 236), (200, 238), (178, 228), (171, 214), (150, 200), (140, 190)])
cabeza = ImageChops.multiply(ImageChops.multiply(masc.point(lambda v: 255 if v > 127 else 0), zona_cabeza), claro)
# quedarse con la parte más grande (la cabeza) y rellenar ojos/bigote
cabeza = cabeza.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))
cabeza = rellenar_huecos(cabeza)
cabeza = suavizar(cabeza, 1.5*K)
cabeza = rellenar_huecos(cabeza)

# ---------- Corte de la mandíbula (debajo del bigote) ----------
corte = [(130, 196), (180, 193), (196, 190), (211, 192), (226, 190), (242, 192), (310, 196)]
debajo = poligono(corte + [(310, 300), (130, 300)])
mandibula = ImageChops.multiply(cabeza, debajo)
arriba = ImageChops.subtract(cabeza, debajo)

# ---------- Capas RGBA ----------
def capa(alfa, imagen=foto):
    c = imagen.convert("RGBA"); c.putalpha(alfa); return c

# Fondo de la boca: la cabeza completa con el interior de la boca pintado (se ve solo cuando baja la mandíbula)
boca_img = foto.copy()
d = ImageDraw.Draw(boca_img)
cx, cy = 211*K, 197*K
d.ellipse([cx-15*K, cy-8*K, cx+15*K, cy+9*K], fill=(48, 22, 20))
d.ellipse([cx-9*K, cy+1*K, cx+9*K, cy+8*K], fill=(150, 62, 58))   # lengua
fondo_boca = capa(cabeza, boca_img)

# Borde de papel blanco alrededor de cada pieza (recorte con tijera)
def borde_papel(alfa, grosor):
    g = alfa.filter(ImageFilter.GaussianBlur(grosor)).point(lambda v: 255 if v > 18 else 0)
    return g.filter(ImageFilter.GaussianBlur(0.6*K))

def pieza(alfa, imagen=foto, grosor=4.2*K):
    b = borde_papel(alfa, grosor)
    base = Image.new("RGBA", foto.size, (247, 242, 232, 0)); base.putalpha(b)
    base.alpha_composite(capa(alfa, imagen))
    return base

piezas = {
    "cuerpo": pieza(cuerpo),
    "cabeza-fondo": pieza(cabeza, boca_img),
    "mandibula": capa(mandibula),          # la mandíbula va sin borde extra para que encaje
    "cabeza": capa(arriba),
}
# La mandíbula sí necesita su borde de papel solo en el contorno exterior: se recorta el borde de la cabeza completa
borde_cab = borde_papel(cabeza, 4.2*K)
borde_mand = ImageChops.multiply(borde_cab, debajo)
m = Image.new("RGBA", foto.size, (247, 242, 232, 0)); m.putalpha(borde_mand); m.alpha_composite(piezas["mandibula"])
piezas["mandibula"] = m
borde_arr = ImageChops.subtract(borde_cab, debajo)
a = Image.new("RGBA", foto.size, (247, 242, 232, 0)); a.putalpha(borde_arr); a.alpha_composite(piezas["cabeza"])
piezas["cabeza"] = a

# Recorte común (mismo lienzo para todas las piezas → se apilan sin cálculos)
caja = (58*K, 72*K, 312*K, 412*K)
for nombre, im in piezas.items():
    r = im.crop(caja); r = r.resize((r.width*2//3, r.height*2//3), Image.LANCZOS)
    r.save(carpeta + "/pieza-" + nombre + ".png"); r.save(carpeta + "/marx-" + nombre + ".webp", quality=88, method=6)
print("caja", caja, "pivote cuello (en %):", round((211*K-caja[0])/(caja[2]-caja[0])*100, 1), round((236*K-caja[1])/(caja[3]-caja[1])*100, 1),
      "boca (en %):", round((211*K-caja[0])/(caja[2]-caja[0])*100, 1), round((192*K-caja[1])/(caja[3]-caja[1])*100, 1))
