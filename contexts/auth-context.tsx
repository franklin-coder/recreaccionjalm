
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  adminName: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminName, setAdminName] = useState<string | null>(null)

  // Cargar sesión desde localStorage al montar
  useEffect(() => {
    const storedAuth = localStorage.getItem('jalm_admin_auth')
    if (storedAuth) {
      try {
        const { isAuthenticated, adminName, timestamp } = JSON.parse(storedAuth)
        // Verificar que la sesión no tenga más de 24 horas
        const now = Date.now()
        const twentyFourHours = 24 * 60 * 60 * 1000
        if (now - timestamp < twentyFourHours) {
          setIsAuthenticated(isAuthenticated)
          setAdminName(adminName)
        } else {
          // Sesión expirada
          localStorage.removeItem('jalm_admin_auth')
        }
      } catch (error) {
        console.error('Error al cargar sesión:', error)
        localStorage.removeItem('jalm_admin_auth')
      }
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // TODO: En producción, esto debería validarse contra una API segura
    // Por ahora, usamos credenciales hardcodeadas (CAMBIAR EN PRODUCCIÓN)
    const validCredentials = [
      { username: 'admin', password: 'jalm2024', name: 'Administrador' },
      { username: 'franklin', password: 'franklin123', name: 'Franklin' }
    ]

    const user = validCredentials.find(
      cred => cred.username === username && cred.password === password
    )

    if (user) {
      setIsAuthenticated(true)
      setAdminName(user.name)
      
      // Guardar en localStorage con timestamp
      localStorage.setItem('jalm_admin_auth', JSON.stringify({
        isAuthenticated: true,
        adminName: user.name,
        timestamp: Date.now()
      }))
      
      return true
    }
    
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setAdminName(null)
    localStorage.removeItem('jalm_admin_auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminName, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
