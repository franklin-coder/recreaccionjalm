
'use client'

import { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useParams } from 'next/navigation'
import { ArrowLeft, Users, MapPin, Star, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { ImageGallery } from '@/components/ui/image-gallery'

interface Service {
  id: string
  name: string
  slug: string
  description?: string
  shortDesc?: string
  images: { url: string; alt?: string }[]
  ageRange?: string
  space?: string
  features: string[]
  category: { name: string; slug: string }
}

export default function ServiceDetailPage() {
  const params = useParams()
  const categorySlug = params.category as string
  const serviceSlug = params.slug as string
  
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchService()
  }, [categorySlug, serviceSlug])

  const fetchService = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/services?category=${categorySlug}`)
      const services = await response.json()
      const foundService = services.find((s: Service) => s.slug === serviceSlug)
      setService(foundService || null)
    } catch (error) {
      console.error('Error fetching service:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jalm-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando servicio...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Servicio no encontrado</h1>
          <p className="text-gray-600 mb-6">El servicio que buscas no existe o ha sido removido.</p>
          <Link href="/servicios" className="btn-jalm-primary">
            Ver Todos los Servicios
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-jalm py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/servicios" className="hover:text-jalm-orange">Servicios</Link>
            <span>/</span>
            <Link href={`/servicios/${categorySlug}`} className="hover:text-jalm-orange">
              {service.category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{service.name}</span>
          </nav>
        </div>
      </section>

      {/* Service Detail */}
      <section className="py-12">
        <div className="container-jalm">
          <Link 
            href={`/servicios/${categorySlug}`}
            className="inline-flex items-center text-jalm-orange hover:text-jalm-teal mb-8 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a {service.category.name}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ImageGallery 
                images={service.images} 
                productName={service.name} 
              />
            </motion.div>

            {/* Service Info */}

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <span className="bg-jalm-orange/10 text-jalm-orange px-3 py-1 rounded-full text-sm font-semibold">
                  {service.category.name}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
                  {service.name}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {service.description || service.shortDesc}
                </p>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.ageRange && (
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                    <Users className="h-6 w-6 text-jalm-teal" />
                    <div>
                      <p className="font-semibold text-gray-900">Edades</p>
                      <p className="text-gray-600">{service.ageRange}</p>
                    </div>
                  </div>
                )}
                {service.space && (
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                    <MapPin className="h-6 w-6 text-jalm-orange" />
                    <div>
                      <p className="font-semibold text-gray-900">Espacio</p>
                      <p className="text-gray-600">{service.space}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Star className="h-5 w-5 text-jalm-orange mr-2" />
                    Características
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-jalm-teal rounded-full mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Link href="/contacto" className="btn-jalm-primary w-full text-center">
                  Cotizar este Servicio
                </Link>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:6044448693"
                    className="flex items-center justify-center space-x-2 bg-white border-2 border-jalm-orange text-jalm-orange px-4 py-3 rounded-lg font-semibold hover:bg-jalm-orange hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Llamar</span>
                  </a>
                  <a
                    href={`https://wa.me/573185481866?text=Hola%20JALM,%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(service.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-white border-2 border-jalm-teal text-jalm-teal px-4 py-3 rounded-lg font-semibold hover:bg-jalm-teal hover:text-white transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
