
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, Star, ArrowRight, Music, Zap } from 'lucide-react'

interface PackageCardProps {
  package: {
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
  index: number
}

export function PackageCard({ package: pkg, index }: PackageCardProps) {
  const imageUrl = pkg.images[0]?.url || '/placeholder-package.jpg'
  const imageAlt = pkg.images[0]?.alt || pkg.name

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative"
    >
      {pkg.isFeatured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-jalm-orange text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
            <Star className="h-4 w-4 mr-1 fill-current" />
            Destacado
          </div>
        </div>
      )}
      
      <Link href={`/paquetes/${pkg.slug}`} className="group block">
        <div className="card-jalm h-full overflow-hidden">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
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

            {/* Special features */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {pkg.includeMegaInflatable && (
                <div className="bg-jalm-teal/90 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                  <Zap className="h-3 w-3 mr-1" />
                  Mega Inflable
                </div>
              )}
              {pkg.includeMusicalFinale && (
                <div className="bg-jalm-orange/90 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                  <Music className="h-3 w-3 mr-1" />
                  Remate Musical
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-jalm-orange transition-colors duration-300">
              {pkg.name}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
              {pkg.shortDesc || pkg.description}
            </p>

            {/* Package Details */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-jalm-teal" />
                {pkg.ageRange}
              </div>
              {pkg.basesCount && (
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 mr-2 text-jalm-orange" />
                  {pkg.basesCount} bases
                </div>
              )}
            </div>

            {/* Features indicators */}
            <div className="flex flex-wrap gap-2 mb-6">
              {pkg.includeMegaInflatable && (
                <span className="bg-jalm-teal/10 text-jalm-teal px-2 py-1 rounded text-xs font-medium">
                  Mega Inflable Incluido
                </span>
              )}
              {pkg.includeMusicalFinale && (
                <span className="bg-jalm-orange/10 text-jalm-orange px-2 py-1 rounded text-xs font-medium">
                  Con Remate Musical
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center text-jalm-orange font-semibold group-hover:text-jalm-teal transition-colors duration-300">
              <span>Ver detalles completos</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
