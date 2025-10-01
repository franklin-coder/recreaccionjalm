
'use client'

import { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useParams } from 'next/navigation'
import { ArrowLeft, Users, Clock, Star, MapPin, Phone, MessageCircle, Music, Zap } from 'lucide-react'
import Link from 'next/link'
import { ImageGallery } from '@/components/ui/image-gallery'

interface Package {
  id: string
  name: string
  slug: string
  description: string
  shortDesc?: string
  duration: string
  ageRange: string
  basesCount?: number
  space: string
  includeMegaInflatable: boolean
  includeMusicalFinale: boolean
  activities: string[]
  images: { url: string; alt?: string }[]
  isFeatured: boolean
}

export default function PackageDetailPage() {
  const params = useParams()
  const packageSlug = params.slug as string
  
  const [packageData, setPackageData] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackage()
  }, [packageSlug])

  const fetchPackage = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/packages')
      const packages = await response.json()
      const foundPackage = packages.find((p: Package) => p.slug === packageSlug)
      setPackageData(foundPackage || null)
    } catch (error) {
      console.error('Error fetching package:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jalm-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando paquete...</p>
        </div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Paquete no encontrado</h1>
          <p className="text-gray-600 mb-6">El paquete que buscas no existe o ha sido removido.</p>
          <Link href="/paquetes" className="btn-jalm-primary">
            Ver Todos los Paquetes
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
            <Link href="/paquetes" className="hover:text-jalm-orange">Paquetes Recreativos</Link>
            <span>/</span>
            <span className="text-gray-900">{packageData.name}</span>
          </nav>
        </div>
      </section>

      {/* Package Detail */}
      <section className="py-12">
        <div className="container-jalm">
          <Link 
            href="/paquetes"
            className="inline-flex items-center text-jalm-orange hover:text-jalm-teal mb-8 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Paquetes
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <ImageGallery 
                images={packageData.images} 
                productName={packageData.name} 
              />
              {packageData.isFeatured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-jalm-blue text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    Destacado
                  </div>
                </div>
              )}
            </motion.div>

            {/* Package Info */}

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-jalm-teal/10 text-jalm-teal px-3 py-1 rounded-full text-sm font-semibold">
                    Paquete Recreativo
                  </span>
                  {packageData.includeMegaInflatable && (
                    <span className="bg-jalm-orange/10 text-jalm-orange px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Zap className="h-3 w-3 mr-1" />
                      Mega Inflable
                    </span>
                  )}
                  {packageData.includeMusicalFinale && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Music className="h-3 w-3 mr-1" />
                      Remate Musical
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {packageData.name}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {packageData.description}
                </p>
              </div>

              {/* Package Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                  <Clock className="h-6 w-6 text-jalm-orange" />
                  <div>
                    <p className="font-semibold text-gray-900">Duración</p>
                    <p className="text-gray-600">{packageData.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                  <Users className="h-6 w-6 text-jalm-teal" />
                  <div>
                    <p className="font-semibold text-gray-900">Edades</p>
                    <p className="text-gray-600">{packageData.ageRange}</p>
                  </div>
                </div>
                {packageData.basesCount && (
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                    <Star className="h-6 w-6 text-jalm-orange" />
                    <div>
                      <p className="font-semibold text-gray-900">Bases</p>
                      <p className="text-gray-600">{packageData.basesCount} bases</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                  <MapPin className="h-6 w-6 text-jalm-teal" />
                  <div>
                    <p className="font-semibold text-gray-900">Espacio</p>
                    <p className="text-gray-600">{packageData.space}</p>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 text-jalm-orange mr-2" />
                  Actividades Incluidas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {packageData.activities.map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-jalm-teal rounded-full mr-3" />
                      <span className="text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Link href="/contacto" className="btn-jalm-primary w-full text-center">
                  Cotizar este Paquete
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
                    href={`https://wa.me/573185481866?text=Hola%20JALM,%20me%20interesa%20el%20paquete%20${encodeURIComponent(packageData.name)}`}
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
