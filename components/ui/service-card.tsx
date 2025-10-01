
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Calendar, MapPin } from 'lucide-react'

interface ServiceCardProps {
  service: {
    id: string
    name: string
    slug: string
    description?: string
    shortDesc?: string
    images: { url: string; alt?: string }[]
    ageRange?: string
    space?: string
    category: { name: string }
  }
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const imageUrl = service.images[0]?.url || '/placeholder-service.jpg'
  const imageAlt = service.images[0]?.alt || service.name

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/servicios/${service.category.name.toLowerCase().replace(/ /g, '-')}/${service.slug}`} className="group block">
        <div className="card-jalm h-full overflow-hidden">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                {service.category.name}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-jalm-orange transition-colors duration-300">
              {service.name}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
              {service.shortDesc || service.description}
            </p>

            {/* Service Details */}
            <div className="space-y-2 mb-4">
              {service.ageRange && (
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-jalm-teal" />
                  {service.ageRange}
                </div>
              )}
              {service.space && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-jalm-orange" />
                  {service.space}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center text-jalm-orange font-semibold group-hover:text-jalm-teal transition-colors duration-300">
              <span>Ver detalles</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
