
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para las tablas de Supabase
export interface Paquete {
  id: string
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
  imagenes?: ImagenPaquete[]
  created_at?: string
  updated_at?: string
}

export interface ImagenPaquete {
  id: string
  paquete_id: string
  url: string
  alt?: string
  orden: number
  created_at?: string
}

export interface Inflable {
  id: string
  nombre: string
  slug: string
  descripcion: string
  dimensiones?: string
  capacidad?: number
  edades: string
  tipo: 'seco' | 'mojado' | 'ambos'
  categoria?: 'infantil' | 'acuatico'
  activo: boolean
  imagenes?: ImagenInflable[]
  created_at?: string
  updated_at?: string
}

export interface ImagenInflable {
  id: string
  inflable_id: string
  url: string
  alt?: string
  orden: number
  created_at?: string
}

export interface ContactRequest {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  event_type?: string
  status: 'pending' | 'contacted' | 'resolved'
  created_at?: string
  updated_at?: string
}
