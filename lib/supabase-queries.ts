import { supabase, Paquete, Inflable } from './supabase'

/**
 * Obtiene todos los paquetes activos con sus imágenes
 */
export async function getPaquetes(options?: {
  destacados?: boolean
  busqueda?: string
}): Promise<Paquete[]> {
  try {
    let query = supabase
      .from('paquetes')
      .select(`
        *,
        imagenes:imagenes_paquetes(*)
      `)
      .eq('activo', true)
      .order('destacado', { ascending: false })
      .order('created_at', { ascending: false })

    // Filtrar por destacados si se especifica
    if (options?.destacados) {
      query = query.eq('destacado', true)
    }

    // Buscar por nombre o descripción si se especifica
    if (options?.busqueda) {
      query = query.or(`nombre.ilike.%${options.busqueda}%,descripcion.ilike.%${options.busqueda}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching paquetes:', error)
      return []
    }

    // Ordenar las imágenes por orden
    const paquetesConImagenesOrdenadas = data?.map(paquete => ({
      ...paquete,
      imagenes: paquete.imagenes?.sort((a, b) => a.orden - b.orden) || []
    })) || []

    return paquetesConImagenesOrdenadas
  } catch (error) {
    console.error('Error in getPaquetes:', error)
    return []
  }
}

/**
 * Obtiene un paquete por su slug
 */
export async function getPaqueteBySlug(slug: string): Promise<Paquete | null> {
  try {
    const { data, error } = await supabase
      .from('paquetes')
      .select(`
        *,
        imagenes:imagenes_paquetes(*)
      `)
      .eq('slug', slug)
      .eq('activo', true)
      .single()

    if (error) {
      console.error('Error fetching paquete by slug:', error)
      return null
    }

    // Ordenar las imágenes por orden
    if (data?.imagenes) {
      data.imagenes = data.imagenes.sort((a, b) => a.orden - b.orden)
    }

    return data
  } catch (error) {
    console.error('Error in getPaqueteBySlug:', error)
    return null
  }
}

/**
 * Obtiene todos los inflables activos con sus imágenes
 */
export async function getInflables(options?: {
  tipo?: 'seco' | 'mojado' | 'ambos'
  categoria?: 'infantil' | 'acuatico'
  busqueda?: string
}): Promise<Inflable[]> {
  try {
    let query = supabase
      .from('inflables')
      .select(`
        *,
        imagenes:imagenes_inflables(*)
      `)
      .eq('activo', true)
      .order('created_at', { ascending: false })

    // Filtrar por categoria si se especifica
    if (options?.categoria) {
      query = query.eq('categoria', options.categoria)
    }

    // Filtrar por tipo si se especifica
    // 'ambos' significa que queremos tanto secos como mojados (no filtrar por tipo)
    if (options?.tipo && options.tipo !== 'ambos') {
      query = query.eq('tipo', options.tipo)
    }

    // Buscar por nombre o descripción si se especifica
    if (options?.busqueda) {
      query = query.or(`nombre.ilike.%${options.busqueda}%,descripcion.ilike.%${options.busqueda}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching inflables:', error)
      return []
    }

    // Ordenar las imágenes por orden
    const inflablesConImagenesOrdenadas = data?.map(inflable => ({
      ...inflable,
      imagenes: inflable.imagenes?.sort((a, b) => a.orden - b.orden) || []
    })) || []

    return inflablesConImagenesOrdenadas
  } catch (error) {
    console.error('Error in getInflables:', error)
    return []
  }
}

/**
 * Obtiene un inflable por su slug
 */
export async function getInflableBySlug(slug: string): Promise<Inflable | null> {
  try {
    const { data, error } = await supabase
      .from('inflables')
      .select(`
        *,
        imagenes:imagenes_inflables(*)
      `)
      .eq('slug', slug)
      .eq('activo', true)
      .single()

    if (error) {
      console.error('Error fetching inflable by slug:', error)
      return null
    }

    // Ordenar las imágenes por orden
    if (data?.imagenes) {
      data.imagenes = data.imagenes.sort((a, b) => a.orden - b.orden)
    }

    return data
  } catch (error) {
    console.error('Error in getInflableBySlug:', error)
    return null
  }
}
