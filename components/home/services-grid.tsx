
'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Zap, Heart, Award, Gamepad2, Building } from 'lucide-react'

const services = [
  {
    title: 'Inflables Infantiles',
    description: 'Diversión segura para los más pequeños con variedad de motivos y tamaños',
    icon: Heart,
    image: '/images/5.jpg',
    href: '/servicios/inflables-infantiles',
    color: 'from-pink-400 to-purple-500'
  },
  {
    title: 'Mega Inflables',
    description: 'Atracciones exclusivas que marcarán la diferencia en tu evento',
    icon: Award,
    image: '/images/PanoramaUltimateed2.jpg',
    href: '/servicios/mega-inflables',
    color: 'from-orange-400 to-red-500'
  },
  {
    title: 'Inflables Acuáticos',
    description: 'Diversión refrescante para los días calurosos en Medellín',
    icon: Zap,
    image: '/images/IMG_0969ed.jpg',
    href: '/servicios/inflables-acuaticos',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    title: 'Atracciones Mecánicas',
    description: 'Experiencias únicas con atracciones exclusivas en la ciudad',
    icon: Gamepad2,
    image: '/images/BigTwist.jpg',
    href: '/servicios/atracciones-mecanicas',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    title: 'Juegos Extremos',
    description: 'Adrenalina y diversión para adolescentes y adultos aventureros',
    icon: Zap,
    image: '/images/CANOPY.jpg',
    href: '/servicios/juegos-extremos',
    color: 'from-green-400 to-emerald-500'
  },
  {
    title: 'Eventos Corporativos',
    description: 'Soluciones integrales para team building y eventos empresariales',
    icon: Building,
    image: '/images/IMG_3621.JPG',
    href: '/eventos-corporativos',
    color: 'from-indigo-400 to-purple-500'
  }
]

export function ServicesGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-jalm">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nuestros <span className="text-jalm-orange">Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Descubre la amplia gama de servicios que ofrecemos para hacer de tu evento una experiencia única e inolvidable
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (

            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={service.href} className="group block">
                <div className="card-jalm h-full overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-jalm-orange transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center text-jalm-orange font-semibold group-hover:text-jalm-teal transition-colors duration-300">
                      <span>Ver detalles</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/servicios" className="btn-jalm-primary inline-flex items-center">
            Ver Todos los Servicios
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
