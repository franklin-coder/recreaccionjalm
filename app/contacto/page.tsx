
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    eventType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          eventType: ''
        })
      }
    } catch (error) {
      console.error('Error sending form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-jalm py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-jalm-orange">Contacta</span> con Nosotros
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Estamos aquí para hacer realidad tu evento ideal. Contáctanos y te asesoraremos 
              en la creación de una experiencia inolvidable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container-jalm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-jalm-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-jalm-orange" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-600 mb-3">PBX: 60 4 444 86 93</p>
              <a
                href="tel:6044448693"
                className="text-jalm-orange font-semibold hover:text-jalm-teal transition-colors"
              >
                Llamar ahora
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-jalm-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-jalm-teal" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-1">318 548 18 66</p>
              <p className="text-gray-600 mb-3">318 548 17 10</p>
              <a
                href="https://wa.me/573185481866?text=Hola%20JALM,%20me%20interesa%20cotizar%20un%20evento"
                target="_blank"
                rel="noopener noreferrer"
                className="text-jalm-teal font-semibold hover:text-jalm-orange transition-colors"
              >
                Escribir ahora
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-jalm-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-jalm-orange" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-3">jalmcomercial@gmail.com</p>
              <a
                href="mailto:jalmcomercial@gmail.com"
                className="text-jalm-orange font-semibold hover:text-jalm-teal transition-colors"
              >
                Enviar email
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-jalm-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-jalm-teal" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Horarios</h3>
              <p className="text-gray-600 text-sm mb-1">Lun - Vie: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-600 text-sm mb-3">Sáb: 8:00 AM - 4:00 PM</p>
              <span className="text-jalm-teal font-semibold text-sm">¡Eventos 7 días!</span>
            </motion.div>
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Cotiza tu <span className="text-jalm-orange">Evento</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Completa el formulario y nos pondremos en contacto contigo para 
                asesorarte en la planificación de tu evento perfecto.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-gray-600 mb-6">
                    Gracias por contactarnos. Te responderemos en menos de 1 hora.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-jalm-primary"
                  >
                    Enviar Otro Mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Tu nombre *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent transition-colors"
                        placeholder="Ingresa tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Tu correo electrónico *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent transition-colors"
                        placeholder="300 123 4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="eventType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de evento
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent transition-colors"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="cumpleanos">Cumpleaños</option>
                        <option value="corporativo">Evento Corporativo</option>
                        <option value="colegio">Evento de Colegio</option>
                        <option value="familiar">Reunión Familiar</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent transition-colors"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Tu mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent transition-colors resize-none"
                      placeholder="Cuéntanos sobre tu evento: fecha, número de personas, tipo de celebración, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-jalm-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Location Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Location Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <MapPin className="h-8 w-8 text-jalm-teal mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Nuestra Ubicación</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900">Oficina Administrativa</p>
                    <p className="text-gray-600">CRA 48 A 16 SUR 24</p>
                    <p className="text-gray-600">SECTOR AGUACATALA</p>
                    <p className="text-gray-600">Medellín, Colombia</p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">
                      Atendemos eventos en Medellín, Área Metropolitana y Oriente Antioqueño
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-jalm-orange/10 text-jalm-orange px-3 py-1 rounded-full text-sm font-medium">
                        Medellín
                      </span>
                      <span className="bg-jalm-teal/10 text-jalm-teal px-3 py-1 rounded-full text-sm font-medium">
                        Área Metropolitana
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        Oriente Antioqueño
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-jalm-orange to-jalm-teal p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">¿Necesitas una respuesta rápida?</h3>
                <p className="mb-6 opacity-90">
                  Para cotizaciones urgentes o consultas inmediatas, contáctanos 
                  directamente por WhatsApp. ¡Te asesoramos en línea!
                </p>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/573185481866?text=Hola%20JALM,%20necesito%20una%20cotización%20urgente"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-lg transition-colors text-center font-semibold"
                  >
                    <MessageCircle className="inline-block mr-2 h-5 w-5" />
                    WhatsApp: 318 548 18 66
                  </a>
                  <a
                    href="https://wa.me/573185481710?text=Hola%20JALM,%20necesito%20una%20cotización%20urgente"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-lg transition-colors text-center font-semibold"
                  >
                    <MessageCircle className="inline-block mr-2 h-5 w-5" />
                    WhatsApp: 318 548 17 10
                  </a>
                </div>
                <p className="text-center text-sm mt-4 opacity-75">
                  ⚡ Respuesta en menos de 1 hora
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
