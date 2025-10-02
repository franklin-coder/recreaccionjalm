
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Verificar si la ruta es del admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Permitir acceso a la página de login sin autenticación
    if (req.nextUrl.pathname === '/admin/login') {
      return res
    }

    // Para todas las demás rutas de admin, verificar autenticación
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // Redirigir a login si no hay sesión
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/admin/login'
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}
