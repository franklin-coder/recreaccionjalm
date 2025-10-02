
import { NextRequest, NextResponse } from 'next/server'
import { getInflables } from '@/lib/supabase-queries'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const ageRange = searchParams.get('ageRange')
    const space = searchParams.get('space')
    const search = searchParams.get('search')

    // Determine tipo based on category slug
    let tipo: 'seco' | 'mojado' | 'ambos' | undefined = undefined
    if (category === 'inflables-secos') {
      tipo = 'seco'
    } else if (category === 'inflables-mojados') {
      tipo = 'mojado'
    } else if (category === 'inflables-infantiles') {
      // Infantiles can be both types
      tipo = 'ambos'
    }

    // Get inflables from Supabase
    const inflables = await getInflables({
      tipo,
      busqueda: search || undefined
    })

    // Transform to match the expected Service interface
    let services = inflables.map(inflable => ({
      id: inflable.id,
      name: inflable.nombre,
      slug: inflable.slug,
      description: inflable.descripcion,
      shortDesc: inflable.descripcion_corta,
      images: inflable.imagenes?.map(img => ({
        url: img.url,
        alt: img.alt || inflable.nombre
      })) || [],
      ageRange: inflable.edades,
      space: inflable.espacio_requerido,
      category: {
        name: inflable.tipo === 'seco' ? 'Inflables Secos' : 
              inflable.tipo === 'mojado' ? 'Inflables Mojados' : 
              'Inflables Infantiles',
        slug: inflable.tipo === 'seco' ? 'inflables-secos' : 
              inflable.tipo === 'mojado' ? 'inflables-mojados' : 
              'inflables-infantiles'
      }
    }))

    // Apply additional filters
    if (ageRange) {
      services = services.filter(s => 
        s.ageRange?.toLowerCase().includes(ageRange.toLowerCase())
      )
    }

    if (space) {
      services = services.filter(s => 
        s.space?.toLowerCase().includes(space.toLowerCase())
      )
    }

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Error fetching services', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
