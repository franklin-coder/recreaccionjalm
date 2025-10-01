
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Building, Users, Target, Award, ArrowRight, CheckCircle, Phone, MessageCircle } from 'lucide-react'

const corporateServices = [
  {
    title: 'Team Building',
    description: 'Fortalece los lazos entre colaboradores con actividades diseñadas para mejorar la comunicación y el trabajo en equipo.',
    icon: Users,
    features: ['Dinámicas de integración', 'Retos colaborativos', 'Reflexiones grupales']
  },
  {
    title: 'Desarrollo de Liderazgo',
    description: 'Actividades especializadas para identificar y potenciar las habilidades de liderazgo en tu equipo.',
    icon: Target,
    features: ['Ejercicios de toma de decisiones', 'Simulaciones empresariales', 'Coaching grupal']
  },
  {
    title: 'Comunicación Efectiva',
    description: 'Mejora la comunicación interna con dinámicas que fomentan la escucha activa y la expresión clara.',
    icon: Building,
    features: ['Técnicas de comunicación', 'Resolución de conflictos', 'Presentaciones efectivas']
  },
  {
    title: 'Bienestar Laboral',
    description: 'Programas integrales enfocados en la salud física y mental de los colaboradores.',
    icon: Award,
    features: ['Actividades anti-estrés', 'Ejercicios de relajación', 'Mindfulness empresarial']
  }
]

const benefits = [
  'Mejora del clima laboral',
  'Aumento de la productividad',
  'Reducción del estrés laboral',
  'Mayor compromiso del equipo',
  'Fortalecimiento de valores corporativos',
  'Desarrollo de habilidades blandas'
]

export default function EventosCorporativosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Empresarial2.jpg"
            alt="Evento corporativo JALM"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="container-jalm relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex items-center space-x-2"
                >
                  <Building className="h-6 w-6 text-yellow-400" />
                  <span className="text-lg font-semibold">Eventos Corporativos</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-5xl lg:text-6xl font-bold leading-tight"
                >
                  Transforma tu
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                    Equipo de Trabajo
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl lg:text-2xl font-light"
                >
                  Programas especializados de team building y desarrollo empresarial 
                  que fortalecen los valores corporativos y mejoran el rendimiento del equipo.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contacto" className="group">
                  <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center">
                    Cotizar Evento Corporativo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <Image
                  src="/images/empresrial_exitoso.jpg"
                  alt="Team building corporativo"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container-jalm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nuestros <span className="text-jalm-orange">Servicios</span> Corporativos
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Programas especializados diseñados para potenciar el talento humano 
              y fortalecer la cultura organizacional de tu empresa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {corporateServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-jalm-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-6 w-6 text-jalm-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-jalm-teal mr-2" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-jalm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Beneficios para tu <span className="text-jalm-teal">Empresa</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Nuestros eventos corporativos generan un impacto positivo 
                  y medible en el desarrollo de tu organización.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
                  >
                    <CheckCircle className="h-5 w-5 text-jalm-orange flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/MULTISPORTS.jpg"
                  alt="Beneficios eventos corporativos"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">30+ Años de Experiencia</h3>
                  <p className="text-lg opacity-90">Transformando equipos empresariales</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-jalm-orange to-jalm-teal text-white">
        <div className="container-jalm text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              ¿Listo para transformar tu equipo?
            </h2>
            <p className="text-xl leading-relaxed opacity-90">
              Contáctanos para diseñar un evento corporativo personalizado 
              que se adapte a los objetivos y valores de tu empresa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto" className="group">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center">
                  Solicitar Cotización
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <div className="flex gap-4 justify-center">
                <a
                  href="tel:6044448693"
                  className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-4 rounded-lg font-semibold transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>60 4 444 86 93</span>
                </a>
                <a
                  href="https://wa.me/573185481866?text=Hola%20JALM,%20me%20interesa%20un%20evento%20corporativo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-4 rounded-lg font-semibold transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
