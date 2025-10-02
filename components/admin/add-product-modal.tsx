
'use client'

import { useState } from 'react'
import { X, Plus, Upload, Trash2, AlertCircle, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
}

type ProductType = 'inflable' | 'paquete'

interface ImageData {
  url: string
  alt: string
  orden: number
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [productType, setProductType] = useState<ProductType>('inflable')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Campos comunes
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [descripcionCorta, setDescripcionCorta] = useState('')
  const [edades, setEdades] = useState('')
  const [images, setImages] = useState<ImageData[]>([{ url: '', alt: '', orden: 0 }])

  // Campos específicos de inflables
  const [dimensiones, setDimensiones] = useState('')
  const [capacidad, setCapacidad] = useState('')
  const [espacioRequerido, setEspacioRequerido] = useState('')
  const [tiempoInstalacion, setTiempoInstalacion] = useState('')
  const [tipo, setTipo] = useState<'seco' | 'mojado' | 'ambos'>('seco')

  // Campos específicos de paquetes
  const [precio, setPrecio] = useState('')
  const [duracion, setDuracion] = useState('')
  const [cantidadBases, setCantidadBases] = useState('')
  const [espacio, setEspacio] = useState<'cerrado' | 'abierto' | 'mixto'>('abierto')
  const [incluyeMegaInflable, setIncluyeMegaInflable] = useState(false)
  const [incluyeFinalMusical, setIncluyeFinalMusical] = useState(false)
  const [destacado, setDestacado] = useState(false)

  const handleAddImage = () => {
    setImages([...images, { url: '', alt: '', orden: images.length }])
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleImageChange = (index: number, field: 'url' | 'alt', value: string) => {
    const newImages = [...images]
    newImages[index][field] = value
    setImages(newImages)
  }

  const resetForm = () => {
    setNombre('')
    setDescripcion('')
    setDescripcionCorta('')
    setEdades('')
    setImages([{ url: '', alt: '', orden: 0 }])
    setDimensiones('')
    setCapacidad('')
    setEspacioRequerido('')
    setTiempoInstalacion('')
    setTipo('seco')
    setPrecio('')
    setDuracion('')
    setCantidadBases('')
    setEspacio('abierto')
    setIncluyeMegaInflable(false)
    setIncluyeFinalMusical(false)
    setDestacado(false)
    setError('')
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validar que al menos haya una imagen con URL
      const validImages = images.filter(img => img.url.trim() !== '')
      if (validImages.length === 0) {
        throw new Error('Debes agregar al menos una imagen')
      }

      // Preparar datos según el tipo de producto
      const productData: any = {
        productType,
        nombre,
        descripcion,
        descripcion_corta: descripcionCorta,
        edades,
        imagenes: validImages,
      }

      if (productType === 'inflable') {
        productData.dimensiones = dimensiones
        productData.capacidad = capacidad ? parseInt(capacidad) : null
        productData.espacio_requerido = espacioRequerido
        productData.tiempo_instalacion = tiempoInstalacion
        productData.tipo = tipo
      } else {
        productData.precio = precio ? parseFloat(precio) : null
        productData.duracion = duracion
        productData.cantidad_bases = cantidadBases ? parseInt(cantidadBases) : null
        productData.espacio = espacio
        productData.incluye_mega_inflable = incluyeMegaInflable
        productData.incluye_final_musical = incluyeFinalMusical
        productData.destacado = destacado
      }

      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al agregar el producto')
      }

      setSuccess(true)
      setTimeout(() => {
        resetForm()
        onClose()
        window.location.reload()
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Error al agregar el producto')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-jalm-orange to-jalm-teal p-6 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Agregar Producto</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
              >
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <p className="text-sm text-green-700">¡Producto agregado exitosamente!</p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
              >
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Tipo de Producto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Producto *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setProductType('inflable')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    productType === 'inflable'
                      ? 'border-jalm-orange bg-jalm-orange/10 text-jalm-orange'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="font-semibold">Inflable</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProductType('paquete')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    productType === 'paquete'
                      ? 'border-jalm-teal bg-jalm-teal/10 text-jalm-teal'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="font-semibold">Paquete</span>
                </button>
              </div>
            </div>

            {/* Campos Comunes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="descripcionCorta" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción Corta
                </label>
                <input
                  id="descripcionCorta"
                  type="text"
                  value={descripcionCorta}
                  onChange={(e) => setDescripcionCorta(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                  placeholder="Ej: Diversión garantizada para todas las edades"
                />
              </div>

              <div>
                <label htmlFor="edades" className="block text-sm font-medium text-gray-700 mb-2">
                  Rango de Edades *
                </label>
                <input
                  id="edades"
                  type="text"
                  value={edades}
                  onChange={(e) => setEdades(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                  placeholder="Ej: 3-12 años"
                  required
                />
              </div>
            </div>

            {/* Campos Específicos de Inflables */}
            {productType === 'inflable' && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900">Detalles del Inflable</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dimensiones" className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensiones
                    </label>
                    <input
                      id="dimensiones"
                      type="text"
                      value={dimensiones}
                      onChange={(e) => setDimensiones(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                      placeholder="Ej: 5m x 4m x 3m"
                    />
                  </div>

                  <div>
                    <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700 mb-2">
                      Capacidad (personas)
                    </label>
                    <input
                      id="capacidad"
                      type="number"
                      value={capacidad}
                      onChange={(e) => setCapacidad(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                      placeholder="Ej: 10"
                    />
                  </div>

                  <div>
                    <label htmlFor="espacioRequerido" className="block text-sm font-medium text-gray-700 mb-2">
                      Espacio Requerido
                    </label>
                    <input
                      id="espacioRequerido"
                      type="text"
                      value={espacioRequerido}
                      onChange={(e) => setEspacioRequerido(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                      placeholder="Ej: 6m x 5m"
                    />
                  </div>

                  <div>
                    <label htmlFor="tiempoInstalacion" className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de Instalación
                    </label>
                    <input
                      id="tiempoInstalacion"
                      type="text"
                      value={tiempoInstalacion}
                      onChange={(e) => setTiempoInstalacion(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                      placeholder="Ej: 30 minutos"
                    />
                  </div>

                  <div>
                    <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo *
                    </label>
                    <select
                      id="tipo"
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value as 'seco' | 'mojado' | 'ambos')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                      required
                    >
                      <option value="seco">Seco</option>
                      <option value="mojado">Mojado</option>
                      <option value="ambos">Ambos</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Campos Específicos de Paquetes */}
            {productType === 'paquete' && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900">Detalles del Paquete</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="duracion" className="block text-sm font-medium text-gray-700 mb-2">
                      Duración *
                    </label>
                    <input
                      id="duracion"
                      type="text"
                      value={duracion}
                      onChange={(e) => setDuracion(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                      placeholder="Ej: 3 horas"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
                      Precio (opcional)
                    </label>
                    <input
                      id="precio"
                      type="number"
                      step="0.01"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                      placeholder="Ej: 500000"
                    />
                  </div>

                  <div>
                    <label htmlFor="cantidadBases" className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad de Bases
                    </label>
                    <input
                      id="cantidadBases"
                      type="number"
                      value={cantidadBases}
                      onChange={(e) => setCantidadBases(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                      placeholder="Ej: 5"
                    />
                  </div>

                  <div>
                    <label htmlFor="espacio" className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Espacio *
                    </label>
                    <select
                      id="espacio"
                      value={espacio}
                      onChange={(e) => setEspacio(e.target.value as 'cerrado' | 'abierto' | 'mixto')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
                      required
                    >
                      <option value="abierto">Abierto</option>
                      <option value="cerrado">Cerrado</option>
                      <option value="mixto">Mixto</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={incluyeMegaInflable}
                        onChange={(e) => setIncluyeMegaInflable(e.target.checked)}
                        className="w-4 h-4 text-jalm-orange focus:ring-jalm-orange"
                      />
                      <span className="text-sm font-medium text-gray-700">Incluye Mega Inflable</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={incluyeFinalMusical}
                        onChange={(e) => setIncluyeFinalMusical(e.target.checked)}
                        className="w-4 h-4 text-jalm-orange focus:ring-jalm-orange"
                      />
                      <span className="text-sm font-medium text-gray-700">Incluye Final Musical</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={destacado}
                        onChange={(e) => setDestacado(e.target.checked)}
                        className="w-4 h-4 text-jalm-orange focus:ring-jalm-orange"
                      />
                      <span className="text-sm font-medium text-gray-700">Marcar como Destacado</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Imágenes */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Imágenes *</h3>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="flex items-center space-x-2 px-4 py-2 bg-jalm-teal text-white rounded-lg hover:bg-jalm-teal/90 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Agregar Imagen</span>
                </button>
              </div>

              <div className="space-y-3">
                {images.map((image, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 space-y-2">
                      <input
                        type="url"
                        value={image.url}
                        onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                        placeholder="URL de la imagen"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent text-sm"
                        required
                      />
                      <input
                        type="text"
                        value={image.alt}
                        onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                        placeholder="Texto alternativo (opcional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent text-sm"
                      />
                    </div>
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botones */}
            <div className="flex space-x-3 pt-4 border-t sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={() => {
                  resetForm()
                  onClose()
                }}
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || success}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-jalm-orange to-jalm-teal text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Agregando...' : success ? '¡Agregado!' : 'Agregar Producto'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
