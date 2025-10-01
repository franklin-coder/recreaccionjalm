
'use client'

import { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { PackageCard } from '@/components/ui/package-card'
import { Search, Filter, Star, Clock, Users } from 'lucide-react'

interface Package {
  id: string
  name: string
  slug: string
  description: string
  shortDesc?: string
  duration: string
  ageRange: string
  basesCount?: number
  includeMegaInflatable: boolean
  includeMusicalFinale: boolean
  images: { url: string; alt?: string }[]
  isFeatured: boolean
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  useEffect(() => {
    fetchPackages()
  }, [searchQuery, showFeaturedOnly])

  const fetchPackages = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (showFeaturedOnly) params.append('featured', 'true')

      const response = await fetch(`/api/packages?${params.toString()}`)
      const data = await response.json()
      setPackages(data)
    } catch (error) {
      console.error('Error fetching packages:', error)
    } finally {
      setLoading(false)
    }
  }

  const featuredPackages = packages.filter(pkg => pkg.isFeatured)
  const regularPackages = packages.filter(pkg => !pkg.isFeatured)

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
              Paquetes <span className="text-jalm-teal">Recreativos</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Experiencias completas diseñadas para crear momentos inolvidables. 
              Cada paquete incluye actividades especializadas para diferentes grupos de edad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-jalm py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar paquetes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
              />
            </div>

            {/* Filter toggle */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="mr-2 text-jalm-orange"
                />
                <span className="text-gray-700">Solo destacados</span>
              </label>
              
              <div className="text-sm text-gray-500">
                {loading ? 'Cargando...' : `${packages.length} paquetes`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-jalm">
          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-64 bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Featured Packages */}
          {!loading && !showFeaturedOnly && featuredPackages.length > 0 && (
            <div className="mb-16">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-jalm-orange mr-2" />
                  <h2 className="text-3xl font-bold text-gray-900">Paquetes Destacados</h2>
                  <Star className="h-6 w-6 text-jalm-orange ml-2" />
                </div>
                <p className="text-gray-600">Nuestras experiencias más populares y completas</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {featuredPackages.map((pkg, index) => (
                  <PackageCard key={pkg.id} package={pkg} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* All Packages or Regular Packages */}
          {!loading && (
            <div>
              {!showFeaturedOnly && regularPackages.length > 0 && (

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Más Paquetes Recreativos
                  </h2>
                  <p className="text-gray-600">Experiencias adicionales para todo tipo de eventos</p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(showFeaturedOnly ? featuredPackages : regularPackages).map((pkg, index) => (
                  <PackageCard 
                    key={pkg.id} 
                    package={pkg} 
                    index={showFeaturedOnly ? index : index + featuredPackages.length} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {!loading && packages.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron paquetes
              </h3>
              <p className="text-gray-500 mb-6">
                Prueba ajustando los filtros o realizando una búsqueda diferente
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setShowFeaturedOnly(false)
                }}
                className="btn-jalm-primary"
              >
                Ver Todos los Paquetes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-16">
        <div className="container-jalm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-br from-jalm-orange/10 to-jalm-orange/5 rounded-xl"
            >
              <Clock className="h-12 w-12 text-jalm-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexibilidad de Horarios</h3>
              <p className="text-gray-600">
                Paquetes de 3 a 4 horas adaptables a tu evento
              </p>
            </motion.div>



            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-br from-jalm-teal/10 to-jalm-teal/5 rounded-xl"
            >
              <Users className="h-12 w-12 text-jalm-teal mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Para Todas las Edades</h3>
              <p className="text-gray-600">
                Desde los más pequeños hasta adultos, tenemos opciones para todos
              </p>
            </motion.div>



            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl"
            >
              <Filter className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personalización</h3>
              <p className="text-gray-600">
                Adaptamos cada paquete a las necesidades específicas de tu evento
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
