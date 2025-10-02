
import { supabaseAdmin } from './supabase-admin'

export interface AdminUser {
  id: string
  email: string
  role: string
}

// Función para iniciar sesión
export async function signIn(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

// Función para cerrar sesión
export async function signOut() {
  const { error } = await supabaseAdmin.auth.signOut()
  if (error) throw error
}

// Función para obtener el usuario actual
export async function getCurrentUser() {
  const { data: { user }, error } = await supabaseAdmin.auth.getUser()
  if (error) throw error
  return user
}

// Función para verificar si el usuario está autenticado
export async function isAuthenticated() {
  try {
    const user = await getCurrentUser()
    return !!user
  } catch {
    return false
  }
}
