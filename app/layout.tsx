
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HalloweenPopup } from '@/components/halloween-popup'
import { AuthProvider } from '@/contexts/auth-context'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'JALM Deporte y Recreación | Inflables y Eventos en Medellín',
  description: 'Más de 30 años creando eventos increíbles en Medellín. Alquiler de inflables, atracciones mecánicas, juegos extremos y paquetes recreativos. ¡Despertamos emociones!',
  keywords: 'inflables Medellín, eventos corporativos, paquetes recreativos, atracciones mecánicas, JALM, fiestas infantiles',
  authors: [{ name: 'JALM Deporte y Recreación' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'JALM Deporte y Recreación | Inflables y Eventos en Medellín',
    description: 'Más de 30 años creando eventos increíbles en Medellín. Despertamos emociones, creamos eventos increíbles.',
    type: 'website',
    locale: 'es_CO',
    siteName: 'JALM Deporte y Recreación'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <HalloweenPopup />
        </AuthProvider>
      </body>
    </html>
  )
}
