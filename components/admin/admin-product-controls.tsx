
'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { DeleteConfirmModal } from './delete-confirm-modal'
import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface AdminProductControlsProps {
  productId: string
  productName: string
  productType: 'inflable' | 'paquete'
  onDelete?: () => void
}

export function AdminProductControls({ 
  productId, 
  productName, 
  productType,
  onDelete 
}: AdminProductControlsProps) {
  const { isAuthenticated } = useAuth()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isAuthenticated) return null

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/products/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          productType,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el producto')
      }

      // Cerrar modal
      setShowDeleteModal(false)
      
      // Callback opcional
      if (onDelete) {
        onDelete()
      } else {
        // Recargar la página si no hay callback
        window.location.reload()
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      alert('Error al eliminar el producto. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowDeleteModal(true)}
        className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
        title="Eliminar producto"
      >
        <Trash2 className="h-5 w-5" />
      </motion.button>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        productName={productName}
        loading={loading}
      />
    </>
  )
}
