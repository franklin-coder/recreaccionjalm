
import { NextRequest, NextResponse } from 'next/server'
import { getInflables } from '@/lib/supabase-queries'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo') as 'seco' | 'mojado' | 'ambos' | null
    const search = searchParams.get('search')

    // Get inflables from Supabase
    const inflables = await getInflables({
      tipo: tipo || undefined,
      busqueda: search || undefined
    })

    // Transform to match expected format
    const transformedInflables = inflables.map(inflable => ({
      id: inflable.id,
      name: inflable.nombre,
      slug: inflable.slug,
      description: inflable.descripcion,
      shortDesc: inflable.descripcion_corta,
      tipo: inflable.tipo,
      dimensions: inflable.dimensiones,
      capacity: inflable.capacidad,
      ageRange: inflable.edades,
      spaceRequired: inflable.espacio_requerido,
      setupTime: inflable.tiempo_instalacion,
      images: inflable.imagenes?.map(img => ({
        url: img.url,
        alt: img.alt || inflable.nombre
      })) || [],
      isActive: inflable.activo
    }))

    return NextResponse.json(transformedInflables)
  } catch (error) {
    console.error('Error fetching inflables:', error)
    return NextResponse.json(
      { error: 'Error fetching inflables', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
