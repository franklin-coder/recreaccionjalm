
import { NextRequest, NextResponse } from 'next/server'
import { getPaqueteBySlug } from '@/lib/supabase-queries'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const paquete = await getPaqueteBySlug(params.slug)

    if (!paquete) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    // Transform to match expected format
    const transformedPackage = {
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
    }

    return NextResponse.json(transformedPackage)
  } catch (error) {
    console.error('Error fetching package:', error)
    return NextResponse.json(
      { error: 'Error fetching package', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
