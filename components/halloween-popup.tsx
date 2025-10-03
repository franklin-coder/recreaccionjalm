

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Ghost, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function HalloweenPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if popup has been shown before
    const hasShown = localStorage.getItem('halloween_popup_shown')
    
    // Show popup after 2 seconds if not shown before
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('halloween_popup_shown', 'true')
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!nombre.trim()) {
      setError('Por favor ingresa tu nombre')
      return
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo válido')
      return
    }

    setIsSubmitting(true)

    try {
      const { error: supabaseError } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            nombre: nombre.trim(),
            email: email.toLowerCase().trim(),
            source: 'halloween_popup'
          }
        ])

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError('Este correo ya está suscrito')
        } else {
          setError('Hubo un error. Por favor intenta de nuevo')
        }
        setIsSubmitting(false)
        return
      }

      setShowSuccess(true)
      setNombre('')
      setEmail('')
      
      // Close popup after 3 seconds
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (err) {
      setError('Hubo un error. Por favor intenta de nuevo')
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateZ: -10 }}
              animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateZ: 10 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-md pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Bats */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-8 -left-8 text-6xl z-10"
              >
                🦇
              </motion.div>
              
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-6 -right-6 text-5xl z-10"
              >
                🦇
              </motion.div>

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-[#1A1A1A] via-[#6B2D5C] to-[#1A1A1A] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#FF6B35]">
                {/* Spooky Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/20 via-transparent to-[#6B2D5C]/20 animate-pulse" />
                
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-20 text-white hover:text-[#FF6B35] transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative p-8 pt-12">
                  {/* Floating Ghost */}
                  <motion.div
                    animate={{
                      y: [-5, 5, -5],
                      rotate: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-4 left-8 text-4xl"
                  >
                    👻
                  </motion.div>

                  {/* Pumpkin Header */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="text-center mb-6"
                  >
                    <div className="text-7xl mb-2">🎃</div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      ¡Ofertas de{' '}
                      <span className="text-[#FF6B35] drop-shadow-[0_0_10px_rgba(255,107,53,0.8)]">
                        Miedo
                      </span>
                      !
                    </h2>
                    <p className="text-purple-200 text-sm">
                      Suscríbete y recibe descuentos{' '}
                      <span className="font-bold text-[#FF6B35]">terroríficamente buenos</span>
                    </p>
                  </motion.div>

                  {/* Success Message */}
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-6 p-4 bg-green-500/20 border-2 border-green-400 rounded-xl text-center"
                      >
                        <div className="text-4xl mb-2">✨🎉✨</div>
                        <p className="text-white font-semibold">
                          ¡Gracias {nombre}!
                        </p>
                        <p className="text-green-200 text-sm mt-1">
                          Prepárate para ofertas espeluznantes
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form */}
                  {!showSuccess && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          placeholder="Tu nombre"
                          className="w-full px-4 py-3 bg-white/10 border-2 border-[#FF6B35]/50 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
                          disabled={isSubmitting}
                          required
                        />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <Sparkles className="w-5 h-5 text-[#FF6B35]" />
                        </motion.div>
                      </div>

                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@correo.com"
                          className="w-full px-4 py-3 bg-white/10 border-2 border-[#FF6B35]/50 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
                          disabled={isSubmitting}
                          required
                        />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <Sparkles className="w-5 h-5 text-[#FF6B35]" />
                        </motion.div>
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/30"
                        >
                          {error}
                        </motion.p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-[#FF6B35]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              >
                                🎃
                              </motion.div>
                              Suscribiendo...
                            </>
                          ) : (
                            <>
                              <Ghost className="w-5 h-5" />
                              ¡Quiero las Ofertas!
                            </>
                          )}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#6B2D5C] to-[#8B3D7C]"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </form>
                  )}

                  {/* Decorative Elements */}
                  <div className="mt-6 flex justify-center gap-4 text-3xl">
                    <motion.span
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      🕷️
                    </motion.span>
                    <motion.span
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      🕸️
                    </motion.span>
                    <motion.span
                      animate={{ rotate: [10, -10, 10] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      🍬
                    </motion.span>
                  </div>

                  <p className="text-center text-purple-300 text-xs mt-4">
                    No spam, solo ofertas espeluznantes 👻
                  </p>
                </div>

                {/* Bottom Decoration */}
                <div className="h-2 bg-gradient-to-r from-[#FF6B35] via-[#6B2D5C] to-[#FF6B35]" />
              </div>

              {/* Floating Pumpkins */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-6 -left-6 text-5xl"
              >
                🎃
              </motion.div>
              
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [5, -5, 5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -right-8 text-6xl"
              >
                🎃
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

