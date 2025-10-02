
import { NextRequest, NextResponse } from 'next/server'
import { getInflableBySlug } from '@/lib/supabase-queries'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const inflable = await getInflableBySlug(params.slug)

    if (!inflable) {
      return NextResponse.json(
        { error: 'Inflable not found' },
        { status: 404 }
      )
    }

    // Transform to match expected format
    const transformedInflable = {
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
    }

    return NextResponse.json(transformedInflable)
  } catch (error) {
    console.error('Error fetching inflable:', error)
    return NextResponse.json(
      { error: 'Error fetching inflable', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
