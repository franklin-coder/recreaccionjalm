
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, phone, eventType } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      )
    }

    // Create contact request in Supabase
    const { data: contactRequest, error } = await supabase
      .from('contact_requests')
      .insert({
        name,
        email,
        subject: subject || 'Consulta general',
        message,
        phone,
        event_type: eventType,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Error al enviar la solicitud' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Tu solicitud ha sido enviada exitosamente. Te contactaremos pronto.',
      id: contactRequest.id
    })
  } catch (error) {
    console.error('Error creating contact request:', error)
    return NextResponse.json(
      { error: 'Error al enviar la solicitud' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data: requests, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Error fetching contact requests' },
        { status: 500 }
      )
    }

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching contact requests:', error)
    return NextResponse.json(
      { error: 'Error fetching contact requests' },
      { status: 500 }
    )
  }
}
