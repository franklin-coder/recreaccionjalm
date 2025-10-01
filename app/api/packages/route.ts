
import { NextRequest, NextResponse } from 'next/server'
import { getPaquetes } from '@/lib/supabase-queries'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    // Obtener paquetes de Supabase
    const paquetes = await getPaquetes({
      destacados: featured === 'true',
      busqueda: search || undefined
    })

    // Transformar los datos al formato esperado por el frontend
    const packages = paquetes.map(paquete => ({
      id: paquete.id,
      name: paquete.nombre,
      slug: paquete.slug,
      description: paquete.descripcion,
      shortDesc: paquete.descripcion_corta,
      duration: paquete.duracion,
      ageRange: paquete.edades,
      basesCount: paquete.cantidad_bases,
      includeMegaInflatable: paquete.incluye_mega_inflable,
      includeMusicalFinale: paquete.incluye_final_musical,
      images: paquete.imagenes?.map(img => ({
        url: img.url,
        alt: img.alt || paquete.nombre
      })) || [],
      isFeatured: paquete.destacado
    }))

    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json(
      { error: 'Error fetching packages', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
