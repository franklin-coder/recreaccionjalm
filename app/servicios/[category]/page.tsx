
'use client'

import { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useParams } from 'next/navigation'
import { ServiceCard } from '@/components/ui/service-card'
import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  slug: string
  description?: string
  shortDesc?: string
  images: { url: string; alt?: string }[]
  ageRange?: string
  space?: string
  category: { name: string; slug: string }
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string
  
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    fetchServices()
  }, [categorySlug])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/services?category=${categorySlug}`)
      const data = await response.json()
      setServices(data)
      if (data.length > 0) {
        setCategoryName(data[0].category.name)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const categoryDisplayName = categoryName || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-jalm py-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/servicios" 
              className="inline-flex items-center text-jalm-orange hover:text-jalm-teal mb-4 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Servicios
            </Link>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {categoryDisplayName.split(' ').map((word, index) => (
                <span key={index}>
                  {index === 0 ? (
                    <span className="text-jalm-orange">{word}</span>
                  ) : (
                    ` ${word}`
                  )}
                </span>
              ))}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Descubre nuestra selección especializada de {categoryDisplayName.toLowerCase()} 
              diseñados para hacer de tu evento una experiencia única e inolvidable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container-jalm">
          {/* Results header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {categoryDisplayName}
              </h2>
              <p className="text-gray-600">
                {loading ? 'Cargando...' : `${services.length} servicios disponibles`}
              </p>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Services grid */}
          {!loading && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index}
                />
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && services.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron servicios en esta categoría
              </h3>
              <p className="text-gray-500 mb-6">
                Esta categoría aún no tiene servicios disponibles
              </p>
              <Link href="/servicios" className="btn-jalm-primary">
                Ver Todos los Servicios
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
