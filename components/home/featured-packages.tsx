
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, Star, ArrowRight } from 'lucide-react'

const featuredPackages = [
  {
    title: 'Desafío Premium JALM',
    description: 'La experiencia más completa con mega inflable, pruebas de destreza y remate musical',
    duration: '4 horas',
    participants: '6+ años',
    bases: '6 bases',
    features: ['Mega Inflable', 'Remate Musical', 'Juegos de Habilidad'],
    image: '/images/20181212_104306.jpg',
    href: '/paquetes/desafio-premium-jalm',
    popular: true
  },
  {
    title: 'Pool Party',
    description: 'Diversión acuática con juegos en tierra y piscina para refrescarse',
    duration: '3 horas',
    participants: '6+ años',
    bases: '6 bases',
    features: ['Juegos con Agua', 'Competencias', 'Trabajo en Equipo'],
    image: '/images/pasarela_acuatica1.jpg',
    href: '/paquetes/pool-party'
  },
  {
    title: 'Gran Casino JALM',
    description: 'Diversión para adolescentes y adultos con juegos de casino y premios',
    duration: '3-4 horas',
    participants: 'Adolescentes y Adultos',
    bases: 'Múltiples',
    features: ['Black Jack', 'Ruleta', 'Billetes Ficticios', 'Premios'],
    image: 'http://www.dealaparty.com/assets/img/photogallery/blackjack2.jpg',
    href: '/paquetes/gran-casino-jalm'
  }
]

export function FeaturedPackages() {
  return (
    <section className="py-20 bg-white">
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
            Paquetes <span className="text-jalm-teal">Destacados</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Experiencias completas diseñadas para crear momentos inolvidables en cada celebración
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-jalm-orange text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    Más Popular
                  </div>
                </div>
              )}
              
              <Link href={pkg.href} className="group block">
                <div className="card-jalm h-full overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Duration badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-jalm-orange" />
                        {pkg.duration}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-jalm-orange transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Package Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-jalm-teal" />
                        {pkg.participants}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 mr-2 text-jalm-orange" />
                        {pkg.bases}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {pkg.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-jalm-teal rounded-full mr-3" />
                          {feature}
                        </div>
                      ))}
                    </div>

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
          className="text-center"
        >
          <Link href="/paquetes" className="btn-jalm-primary inline-flex items-center">
            Ver Todos los Paquetes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
