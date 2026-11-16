import Foundation
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let entrada = URL(fileURLWithPath: args[1])
let salida = URL(fileURLWithPath: args[2])
guard let fuente = CGImageSourceCreateWithURL(entrada as CFURL, nil),
      let imagen = CGImageSourceCreateImageAtIndex(fuente, 0, nil) else { fatalError("no se pudo leer") }
let pedido = VNGenerateForegroundInstanceMaskRequest()
let manejador = VNImageRequestHandler(cgImage: imagen, options: [:])
try manejador.perform([pedido])
guard let resultado = pedido.results?.first else { fatalError("sin sujeto") }
print("instancias:", resultado.allInstances.count)
let mascara = try resultado.generateScaledMaskForImage(forInstances: resultado.allInstances, from: manejador)
let ciMascara = CIImage(cvPixelBuffer: mascara)
let contexto = CIContext()
guard let cg = contexto.createCGImage(ciMascara, from: ciMascara.extent) else { fatalError("mascara") }
let destino = CGImageDestinationCreateWithURL(salida as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(destino, cg, nil)
CGImageDestinationFinalize(destino)
print("ok", cg.width, cg.height)
