
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Users, Calendar, Shield, Heart, Star } from 'lucide-react'

const stats = [
  { icon: Calendar, value: '30+', label: 'Años de experiencia' },
  { icon: Users, value: '5000+', label: 'Eventos realizados' },
  { icon: Star, value: '100%', label: 'Satisfacción garantizada' },
  { icon: Award, value: '50+', label: 'Premios y reconocimientos' }
]

const values = [
  {
    icon: Shield,
    title: 'Seguridad Garantizada',
    description: 'Todos nuestros equipos cumplen con los más altos estándares de seguridad'
  },
  {
    icon: Heart,
    title: 'Pasión por la Diversión',
    description: 'Creamos experiencias memorables que despiertan emociones genuinas'
  },
  {
    icon: Users,
    title: 'Equipo Profesional',
    description: 'Personal altamente capacitado con más de 30 años de experiencia'
  },
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Inflables y atracciones de la más alta calidad y exclusividad'
  }
]

export function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-jalm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-jalm-orange font-semibold text-lg mb-4"
              >
                Acerca de Nosotros
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              >
                <span className="text-jalm-teal">JALM</span> Deporte y Recreación
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-xl text-gray-600 leading-relaxed mb-8"
              >
                Somos profesionales en la organización de fiestas recreo-deportivas para niños, jóvenes, adultos, 
                colegios, universidades, empresas y fiestas temáticas. Con más de 30 años de experiencia, 
                nos especializamos en despertar emociones y crear eventos increíbles.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white rounded-lg shadow-md"
                >
                  <stat.icon className="h-8 w-8 text-jalm-orange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image + Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/trabaja-con-nostros-4.png"
                alt="Equipo de JALM en evento corporativo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">30+ Años de Experiencia</h3>
                <p className="text-lg opacity-90">Creando momentos inolvidables!</p>
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <value.icon className="h-6 w-6 text-jalm-teal mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
