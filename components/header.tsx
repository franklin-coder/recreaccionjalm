
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Search, Menu, X, ChevronDown } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navigation = [
    { name: 'Inicio', href: '/' },
    {
      name: 'Nuestros Servicios',
      href: '/servicios',
      dropdown: [
        { name: 'Inflables Infantiles', href: '/servicios/inflables-infantiles' },
        { name: 'Mega Inflables', href: '/servicios/mega-inflables' },
        { name: 'Inflables Acuáticos', href: '/servicios/inflables-acuaticos' },
        { name: 'Atracciones Mecánicas', href: '/servicios/atracciones-mecanicas' },
        { name: 'Juegos Extremos', href: '/servicios/juegos-extremos' },
      ]
    },
    { name: 'Paquetes Recreativos', href: '/paquetes' },
    { name: 'Eventos Corporativos', href: '/eventos-corporativos' },
    { name: 'Galería', href: '/galeria' },
    { name: 'Contacto', href: '/contacto' }
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="container-jalm">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-jalm-orange" />
              <span>PBX: 60 4 444 86 93</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-jalm-teal" />
              <span>WhatsApp: 318 548 18 66</span>
            </div>
          </div>
          <div className="text-gray-600">
            <span className="font-semibold text-jalm-orange">30+ años</span> de experiencia
          </div>
        </div>

      {/* Main header */}
<div className="flex items-center justify-between py-4">
  {/* Logo */}
  <Link href="/" className="flex items-center space-x-3">
    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100">
      <Image
        src="/images/logoJALMdeporte.png"
        alt="JALM Deporte y Recreación - Logo Oficial"
        fill
        className="object-contain p-1"
        priority
      />
    </div>
    <div>
      <h1 className="text-xl font-bold text-gray-800"></h1>
      <p className="text-sm text-gray-600"></p>
    </div>
  </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-jalm-orange font-medium transition-colors duration-200"
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-jalm-orange transition-colors duration-200"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servicios..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jalm-orange focus:border-transparent"
              />
            </div>
            <Link href="/admin/dashboard" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-jalm-orange transition-colors">
              Admin
            </Link>
            <Link href="/contacto" className="btn-jalm-primary">
              Cotizar Ahora
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-jalm-orange transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-jalm-orange font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-1 text-sm text-gray-600 hover:text-jalm-orange transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-4 px-3 space-y-2">
              <Link
                href="/admin/dashboard"
                className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-jalm-orange border border-gray-300 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                href="/contacto"
                className="btn-jalm-primary w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Cotizar Ahora
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
