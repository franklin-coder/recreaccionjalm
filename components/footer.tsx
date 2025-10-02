
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-jalm py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10 border border-white/20">
                <Image
                  src="/images/logoJALMdeporte.png"
                  alt="JALM Deporte y Recreación"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">JALM</h3>
                <p className="text-sm text-gray-300">Deporte y Recreación</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Más de 30 años creando eventos increíbles en Medellín. 
              Despertamos emociones y hacemos realidad tus celebraciones.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-jalm-orange transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-jalm-orange transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-jalm-orange transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold text-jalm-orange">Nuestros Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicios/inflables-infantiles" className="text-gray-300 hover:text-white transition-colors">
                  Inflables Infantiles
                </Link>
              </li>
              <li>
                <Link href="/servicios/mega-inflables" className="text-gray-300 hover:text-white transition-colors">
                  Mega Inflables
                </Link>
              </li>
              <li>
                <Link href="/servicios/atracciones-mecanicas" className="text-gray-300 hover:text-white transition-colors">
                  Atracciones Mecánicas
                </Link>
              </li>
              <li>
                <Link href="/paquetes" className="text-gray-300 hover:text-white transition-colors">
                  Paquetes Recreativos
                </Link>
              </li>
              <li>
                <Link href="/eventos-corporativos" className="text-gray-300 hover:text-white transition-colors">
                  Eventos Corporativos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-jalm-teal flex-shrink-0" />
                <span className="text-gray-300">PBX: 60 4 444 86 93</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-jalm-teal flex-shrink-0" />
                <div className="text-gray-300">
                  <p>WhatsApp: 318 548 18 66</p>
                  <p>WhatsApp: 318 548 17 10</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-jalm-teal flex-shrink-0" />
                <span className="text-gray-300">jalmcomercial@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-jalm-teal flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  CRA 48 A 16 SUR 24<br />
                  SECTOR AGUACATALA<br />
                  Medellín, Colombia
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold text-jalm-orange">Horarios de Atención</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-jalm-teal flex-shrink-0" />
                <div>
                  <p className="font-medium">Lunes - Viernes</p>
                  <p>8:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-jalm-teal flex-shrink-0" />
                <div>
                  <p className="font-medium">Sábados</p>
                  <p>8:00 AM - 4:00 PM</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                <p className="text-white text-jalm-orange font-medium text-xs">¡Eventos los 7 días de la semana!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 INVERSIONES JALM. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">
                Cotizar Servicios
              </Link>
              <Link href="/galeria" className="text-gray-400 hover:text-white transition-colors">
                Ver Galería
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
