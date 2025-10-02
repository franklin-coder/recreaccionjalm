
'use client'

import { useState } from 'react'
import { Filter, X, ChevronDown, Search } from 'lucide-react'

interface FilterSidebarProps {
  categories: { id: string; name: string; slug: string }[]
  selectedCategory?: string
  onCategoryChange: (category: string) => void
  ageRanges: string[]
  selectedAgeRange?: string
  onAgeRangeChange: (ageRange: string) => void
  spaceTypes: string[]
  selectedSpaceType?: string
  onSpaceTypeChange: (spaceType: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearFilters: () => void
}

export function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  ageRanges,
  selectedAgeRange,
  onAgeRangeChange,
  spaceTypes,
  selectedSpaceType,
  onSpaceTypeChange,
  searchQuery,
  onSearchChange,
  onClearFilters
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    ageRanges: true,
    spaceTypes: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const hasActiveFilters = selectedCategory || selectedAgeRange || selectedSpaceType || searchQuery

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-5 w-5 text-gray-600" />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className="bg-jalm-orange text-white text-xs px-2 py-1 rounded-full">
              Activos
            </span>
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <FilterContent
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          ageRanges={ageRanges}
          selectedAgeRange={selectedAgeRange}
          onAgeRangeChange={onAgeRangeChange}
          spaceTypes={spaceTypes}
          selectedSpaceType={selectedSpaceType}
          onSpaceTypeChange={onSpaceTypeChange}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onClearFilters={onClearFilters}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white w-80 max-w-[90vw] h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filtros</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterContent
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
                ageRanges={ageRanges}
                selectedAgeRange={selectedAgeRange}
                onAgeRangeChange={onAgeRangeChange}
                spaceTypes={spaceTypes}
                selectedSpaceType={selectedSpaceType}
                onSpaceTypeChange={onSpaceTypeChange}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onClearFilters={onClearFilters}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface FilterContentProps {
  categories: { id: string; name: string; slug: string }[]
  selectedCategory?: string
  onCategoryChange: (category: string) => void
  ageRanges: string[]
  selectedAgeRange?: string
  onAgeRangeChange: (ageRange: string) => void
  spaceTypes: string[]
  selectedSpaceType?: string
  onSpaceTypeChange: (spaceType: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearFilters: () => void
  expandedSections: { categories: boolean; ageRanges: boolean; spaceTypes: boolean }
  toggleSection: (section: 'categories' | 'ageRanges' | 'spaceTypes') => void
}

function FilterContent({
  categories,
  selectedCategory,
  onCategoryChange,
  ageRanges,
  selectedAgeRange,
  onAgeRangeChange,
  spaceTypes,
  selectedSpaceType,
  onSpaceTypeChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  expandedSections,
  toggleSection
}: FilterContentProps) {
  // Ensure all filter arrays are valid arrays before rendering
  const categoryList = Array.isArray(categories) ? categories : []
  const ageRangeList = Array.isArray(ageRanges) ? ageRanges : []
  const spaceTypeList = Array.isArray(spaceTypes) ? spaceTypes : []

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Buscar</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-semibold text-gray-900">Categorías</h4>
          <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.categories && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={!selectedCategory}
                onChange={() => onCategoryChange('')}
                className="mr-3 text-jalm-orange"
              />
              <span className="text-gray-700">Todas</span>
            </label>
            {categoryList.length > 0 ? (
              categoryList.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.slug}
                    onChange={() => onCategoryChange(category.slug)}
                    className="mr-3 text-jalm-orange"
                  />
                  <span className="text-gray-700">{category.name}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No hay categorías disponibles</p>
            )}
          </div>
        )}
      </div>

      {/* Age Ranges */}
      <div>
        <button
          onClick={() => toggleSection('ageRanges')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-semibold text-gray-900">Edades</h4>
          <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${expandedSections.ageRanges ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.ageRanges && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="ageRange"
                checked={!selectedAgeRange}
                onChange={() => onAgeRangeChange('')}
                className="mr-3 text-jalm-orange"
              />
              <span className="text-gray-700">Todas las edades</span>
            </label>
            {ageRangeList.length > 0 ? (
              ageRangeList.map((range) => (
                <label key={range} className="flex items-center">
                  <input
                    type="radio"
                    name="ageRange"
                    checked={selectedAgeRange === range}
                    onChange={() => onAgeRangeChange(range)}
                    className="mr-3 text-jalm-orange"
                  />
                  <span className="text-gray-700">{range}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No hay rangos de edad disponibles</p>
            )}
          </div>
        )}
      </div>

      {/* Space Types */}
      <div>
        <button
          onClick={() => toggleSection('spaceTypes')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-semibold text-gray-900">Espacio</h4>
          <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${expandedSections.spaceTypes ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.spaceTypes && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="spaceType"
                checked={!selectedSpaceType}
                onChange={() => onSpaceTypeChange('')}
                className="mr-3 text-jalm-orange"
              />
              <span className="text-gray-700">Cualquier espacio</span>
            </label>
            {spaceTypeList.length > 0 ? (
              spaceTypeList.map((space) => (
                <label key={space} className="flex items-center">
                  <input
                    type="radio"
                    name="spaceType"
                    checked={selectedSpaceType === space}
                    onChange={() => onSpaceTypeChange(space)}
                    className="mr-3 text-jalm-orange"
                  />
                  <span className="text-gray-700">{space}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No hay tipos de espacio disponibles</p>
            )}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <button
        onClick={onClearFilters}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
      >
        Limpiar Filtros
      </button>
    </div>
  )
}
