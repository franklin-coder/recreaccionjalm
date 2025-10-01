
'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MessageCircle, Mail, ArrowRight, Clock, MapPin } from 'lucide-react'

export function ContactCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient">
        <Image
          src="https://i.ytimg.com/vi/y_vxe0ijZNA/maxresdefault.jpg"
          alt="Evento JALM en acción"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <div className="container-jalm relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold mb-6"
              >
                ¿Listo para crear tu
                <span className="block text-yellow-400">evento increíble?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl leading-relaxed mb-8"
              >
                Cotiza sin compromiso y descubre cómo podemos hacer realidad la celebración de tus sueños. 
                Nuestro equipo de expertos está aquí para asesorarte.
              </motion.p>
            </div>

            {/* Contact Options */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Llámanos ahora</p>
                  <p className="text-lg">PBX: 60 4 444 86 93</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-lg">318 548 18 66 • 318 548 17 10</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Atención inmediata</p>
                  <p className="text-lg">Respuesta en menos de 1 hora</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contacto" className="group">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center">
                  Cotizar mi Evento
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a
                href="https://wa.me/573185481866?text=Hola%20JALM,%20me%20interesa%20cotizar%20un%20evento"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Directo
                </button>
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Card */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-jalm-orange to-jalm-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">J</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Información de Contacto</h3>
              <p className="text-gray-600">Te respondemos inmediatamente</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-jalm-orange mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Teléfonos</p>
                  <p className="text-gray-600">PBX: 60 4 444 86 93</p>
                  <p className="text-gray-600">WhatsApp: 318 548 18 66</p>
                  <p className="text-gray-600">WhatsApp: 318 548 17 10</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-jalm-teal mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">jalmcomercial@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-jalm-orange mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Ubicación</p>
                  <p className="text-gray-600">CRA 48 A 16 SUR 24</p>
                  <p className="text-gray-600">SECTOR AGUACATALA</p>
                  <p className="text-gray-600">Medellín, Colombia</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-jalm-orange/10 to-jalm-teal/10 rounded-lg">
              <p className="text-center text-gray-700 font-medium">
                🎉 <span className="text-jalm-orange font-bold">¡Eventos los 7 días de la semana!</span> 🎉
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
