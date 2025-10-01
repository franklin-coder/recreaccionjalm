
'use client'

import { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { ServiceCard } from '@/components/ui/service-card'
import { FilterSidebar } from '@/components/ui/filter-sidebar'
import { Search, Grid, List } from 'lucide-react'

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

interface Category {
  id: string
  name: string
  slug: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>('')
  const [selectedSpaceType, setSelectedSpaceType] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Get unique filter options
  const ageRanges = Array.from(new Set(services.map(s => s.ageRange).filter(Boolean))) as string[]
  const spaceTypes = Array.from(new Set(services.map(s => s.space).filter(Boolean))) as string[]

  useEffect(() => {
    fetchCategories()
    fetchServices()
  }, [selectedCategory, selectedAgeRange, selectedSpaceType, searchQuery])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchServices = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory) params.append('category', selectedCategory)
      if (selectedAgeRange) params.append('ageRange', selectedAgeRange)
      if (selectedSpaceType) params.append('space', selectedSpaceType)
      if (searchQuery) params.append('search', searchQuery)

      const response = await fetch(`/api/services?${params.toString()}`)
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedAgeRange('')
    setSelectedSpaceType('')
    setSearchQuery('')
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
              Nuestros <span className="text-jalm-orange">Servicios</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Descubre nuestra amplia gama de inflables, atracciones mecánicas y juegos 
              diseñados para hacer de tu evento una experiencia inolvidable
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-jalm">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                ageRanges={ageRanges}
                selectedAgeRange={selectedAgeRange}
                onAgeRangeChange={setSelectedAgeRange}
                spaceTypes={spaceTypes}
                selectedSpaceType={selectedSpaceType}
                onSpaceTypeChange={setSelectedSpaceType}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Services Grid */}
            <div className="flex-1">
              {/* Results header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedCategory 
                      ? categories.find(c => c.slug === selectedCategory)?.name 
                      : 'Todos los Servicios'
                    }
                  </h2>
                  <p className="text-gray-600">
                    {loading ? 'Cargando...' : `${services.length} servicios encontrados`}
                  </p>
                </div>

                {/* View mode toggle */}
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <span className="text-sm text-gray-600">Vista:</span>
                  <div className="flex bg-gray-200 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white text-jalm-orange shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white text-jalm-orange shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
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
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
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
                    No se encontraron servicios
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Prueba ajustando los filtros o realizando una búsqueda diferente
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-jalm-primary"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
