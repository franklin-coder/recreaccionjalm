
'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { LoginModal } from './login-modal'
import { AddProductModal } from './add-product-modal'
import { Shield, Plus, LogOut, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AdminControls() {
  const { isAuthenticated, adminName, logout } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <div className="fixed top-20 right-4 z-50">
        {!isAuthenticated ? (
          // Botón de Admin cuando no está autenticado
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLoginModal(true)}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 transition-colors"
          >
            <Shield className="h-4 w-4" />
            <span className="text-sm font-semibold">Admin</span>
          </motion.button>
        ) : (
          // Menú de admin cuando está autenticado
          <div className="relative">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className="bg-jalm-orange hover:bg-jalm-orange/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-semibold">Hola {adminName}</span>
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setShowAddProductModal(true)
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-jalm-teal" />
                    <span className="font-medium text-gray-700">Agregar Producto</span>
                  </button>
                  <div className="border-t border-gray-200" />
                  <button
                    onClick={() => {
                      logout()
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                  >
                    <LogOut className="h-5 w-5 text-red-500" />
                    <span className="font-medium text-gray-700">Cerrar Sesión</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modales */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      <AddProductModal 
        isOpen={showAddProductModal} 
        onClose={() => setShowAddProductModal(false)} 
      />
    </>
  )
}
