
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Camera, Play } from 'lucide-react'

const galleryItems = [
  {
    id: 1,
    type: 'image',
    src: '/images/empresrial_exitoso.jpg',
    alt: 'Evento con inflables JALM',
    category: 'eventos',
    title: 'Evento Corporativo Exitoso'
  },
  {
    id: 2,
    type: 'image',
    src: '/images/Empresarial2.jpg',
    alt: 'Competencia extrema con inflables',
    category: 'competencias',
    title: 'Competencia de Obstáculos'
  },
  {
    id: 3,
    type: 'image',
    src: 'https://i.ytimg.com/vi/mvQDpwlH72w/hq720_2.jpg',
    alt: 'Mega evento JALM',
    category: 'mega-eventos',
    title: 'Mega Evento Familiar'
  },
  {
    id: 4,
    type: 'image',
    src: 'https://i.ytimg.com/vi/rq7zDCPcfto/maxresdefault.jpg',
    alt: 'Inflables y atracciones de calidad',
    category: 'inflables',
    title: 'Inflables de Alta Calidad'
  },
  {
    id: 5,
    type: 'image',
    src: 'https://i.ytimg.com/vi/sbduqbbsQwk/maxresdefault.jpg',
    alt: 'Inflable Megatobogan',
    category: 'toboganes',
    title: 'Mega Tobogán Gigante'
  },
  {
    id: 6,
    type: 'image',
    src: 'https://i.ytimg.com/vi/V7tQe2BqVUs/maxresdefault.jpg',
    alt: 'Atracción Big Twist',
    category: 'atracciones',
    title: 'Big Twist Mecánico'
  },
  {
    id: 7,
    type: 'image',
    src: '/images/IMG_4814.jpg',
    alt: 'Inflables acuáticos y Mega inflables',
    category: 'acuaticos',
    title: 'Parque Acuático Espectacular'
  },
  {
    id: 8,
    type: 'image',
    src: 'https://i.ytimg.com/vi/OoaK2txi0-k/maxresdefault.jpg',
    alt: 'Juegos inflables acuáticos',
    category: 'acuaticos',
    title: 'Diversión Acuática sin Límites'
  },
  {
    id: 9,
    type: 'image',
    src: '/images/IMG_4814.jpg',
    alt: 'Atracciones mecánicas',
    category: 'atracciones',
    title: 'Atracciones Mecánicas Exclusivas'
  },
  {
  id: 10,
  type: 'image',
  src: '/images/CANOPY.jpg',
  alt: 'Aventura en Canopy JALM',
  category: 'deportes',
  title: 'Canopy - Adrenalina Pura'
},
{
  id: 11,
  type: 'image',
  src: '/images/pasarela_acuatica1.jpg',
  alt: 'Pasarela Acuática Divertida',
  category: 'recreacion', 
  title: 'Pasarela Acuática - Refrescante'
},
{
  id: 12,
  type: 'image',
  src: '/images/PanoramaUltimateed2.jpg',
  alt: 'Vista Panorámica del Evento',
  category: 'eventos',
  title: 'Evento Panorama Ultimate'
}
]

const categories = [
  { id: 'all', name: 'Todos', count: galleryItems.length },
  { id: 'eventos', name: 'Eventos', count: galleryItems.filter(item => item.category === 'eventos').length },
  { id: 'inflables', name: 'Inflables', count: galleryItems.filter(item => item.category === 'inflables').length },
  { id: 'atracciones', name: 'Atracciones', count: galleryItems.filter(item => item.category === 'atracciones').length },
  { id: 'acuaticos', name: 'Acuáticos', count: galleryItems.filter(item => item.category === 'acuaticos').length },
  { id: 'competencias', name: 'Competencias', count: galleryItems.filter(item => item.category === 'competencias').length }
]

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  const currentImageIndex = selectedImage !== null ? filteredItems.findIndex(item => item.id === selectedImage) : -1

  const nextImage = () => {
    if (currentImageIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentImageIndex + 1].id)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(filteredItems[currentImageIndex - 1].id)
    }
  }

  const closeModal = () => {
    setSelectedImage(null)
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
            <div className="flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-jalm-orange mr-3" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Nuestra <span className="text-jalm-orange">Galería</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Revive los momentos más emocionantes de nuestros eventos. 
              Cada imagen cuenta la historia de sonrisas, diversión y emociones increíbles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-jalm py-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-jalm-orange text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container-jalm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative aspect-square bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(item.id)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs opacity-90 capitalize">{item.category.replace('-', ' ')}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.type === 'video' ? (
                    <Play className="h-6 w-6 text-white" />
                  ) : (
                    <Camera className="h-6 w-6 text-white" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No hay imágenes en esta categoría
              </h3>
              <p className="text-gray-500">
                Selecciona otra categoría para ver más contenido
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && currentImageIndex !== -1 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation Buttons */}
            {currentImageIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeft className="h-12 w-12" />
              </button>
            )}

            {currentImageIndex < filteredItems.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronRight className="h-12 w-12" />
              </button>
            )}

            {/* Image */}
            <div className="relative max-w-full max-h-full">
              <Image
                src={filteredItems[currentImageIndex].src}
                alt={filteredItems[currentImageIndex].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-bold mb-2">
                  {filteredItems[currentImageIndex].title}
                </h3>
                <p className="text-gray-300 capitalize">
                  {filteredItems[currentImageIndex].category.replace('-', ' ')}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {currentImageIndex + 1} de {filteredItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-jalm-orange to-jalm-teal text-white py-16">
        <div className="container-jalm text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ¿Te gustó lo que viste?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Hagamos realidad tu próximo evento increíble. Contáctanos para crear 
              momentos inolvidables llenos de diversión y emociones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacto"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Cotizar mi Evento
              </a>
              <a
                href="https://wa.me/573185481866?text=Hola%20JALM,%20vi%20su%20galería%20y%20me%20interesa%20cotizar%20un%20evento"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                WhatsApp Directo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
