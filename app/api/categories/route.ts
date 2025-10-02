
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Fetch categories from Supabase
    // Note: Since we migrated to Supabase with inflables/paquetes structure,
    // we'll create categories based on the inflables types
    const categories = [
      {
        id: '1',
        name: 'Inflables Secos',
        slug: 'inflables-secos',
        order: 1
      },
      {
        id: '2',
        name: 'Inflables Mojados',
        slug: 'inflables-mojados',
        order: 2
      },
      {
        id: '3',
        name: 'Inflables Infantiles',
        slug: 'inflables-infantiles',
        order: 3
      }
    ]

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Error fetching categories' },
      { status: 500 }
    )
  }
}
