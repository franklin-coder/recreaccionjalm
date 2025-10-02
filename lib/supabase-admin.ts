
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Cliente de Supabase para operaciones de administración
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para las operaciones CRUD
export interface PaqueteFormData {
  nombre: string
  slug: string
  descripcion: string
  descripcion_corta?: string
  precio?: number
  duracion: string
  cantidad_bases?: number
  edades: string
  espacio: 'cerrado' | 'abierto' | 'mixto'
  incluye_mega_inflable: boolean
  incluye_final_musical: boolean
  destacado: boolean
  activo: boolean
}

export interface InflableFormData {
  nombre: string
  slug: string
  descripcion: string
  dimensiones?: string
  capacidad?: number
  edades: string
  tipo: 'seco' | 'mojado' | 'ambos'
  activo: boolean
}

export interface ImagenFormData {
  url: string
  alt?: string
  orden: number
}

// Funciones CRUD para Paquetes
export async function createPaquete(data: PaqueteFormData) {
  const { data: paquete, error } = await supabaseAdmin
    .from('paquetes')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return paquete
}

export async function updatePaquete(id: string, data: Partial<PaqueteFormData>) {
  const { data: paquete, error } = await supabaseAdmin
    .from('paquetes')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return paquete
}

export async function deletePaquete(id: string) {
  // Primero eliminar las imágenes asociadas
  await supabaseAdmin
    .from('imagenes_paquetes')
    .delete()
    .eq('paquete_id', id)

  // Luego eliminar el paquete
  const { error } = await supabaseAdmin
    .from('paquetes')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function getAllPaquetes() {
  const { data, error } = await supabaseAdmin
    .from('paquetes')
    .select(`
      *,
      imagenes:imagenes_paquetes(*)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getPaqueteById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('paquetes')
    .select(`
      *,
      imagenes:imagenes_paquetes(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Funciones CRUD para Inflables
export async function createInflable(data: InflableFormData) {
  const { data: inflable, error } = await supabaseAdmin
    .from('inflables')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return inflable
}

export async function updateInflable(id: string, data: Partial<InflableFormData>) {
  const { data: inflable, error } = await supabaseAdmin
    .from('inflables')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return inflable
}

export async function deleteInflable(id: string) {
  // Primero eliminar las imágenes asociadas
  await supabaseAdmin
    .from('imagenes_inflables')
    .delete()
    .eq('inflable_id', id)

  // Luego eliminar el inflable
  const { error } = await supabaseAdmin
    .from('inflables')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function getAllInflables() {
  const { data, error } = await supabaseAdmin
    .from('inflables')
    .select(`
      *,
      imagenes:imagenes_inflables(*)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getInflableById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('inflables')
    .select(`
      *,
      imagenes:imagenes_inflables(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Funciones para Imágenes de Paquetes
export async function addImagenPaquete(paqueteId: string, imagen: ImagenFormData) {
  const { data, error } = await supabaseAdmin
    .from('imagenes_paquetes')
    .insert([{ ...imagen, paquete_id: paqueteId }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateImagenPaquete(id: string, data: Partial<ImagenFormData>) {
  const { data: imagen, error } = await supabaseAdmin
    .from('imagenes_paquetes')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return imagen
}

export async function deleteImagenPaquete(id: string) {
  const { error } = await supabaseAdmin
    .from('imagenes_paquetes')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Funciones para Imágenes de Inflables
export async function addImagenInflable(inflableId: string, imagen: ImagenFormData) {
  const { data, error } = await supabaseAdmin
    .from('imagenes_inflables')
    .insert([{ ...imagen, inflable_id: inflableId }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateImagenInflable(id: string, data: Partial<ImagenFormData>) {
  const { data: imagen, error } = await supabaseAdmin
    .from('imagenes_inflables')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return imagen
}

export async function deleteImagenInflable(id: string) {
  const { error } = await supabaseAdmin
    .from('imagenes_inflables')
    .delete()
    .eq('id', id)

  if (error) throw error
}
