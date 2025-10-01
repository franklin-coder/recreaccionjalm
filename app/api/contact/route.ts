
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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

    // Create contact request
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        email,
        subject: subject || 'Consulta general',
        message,
        phone,
        eventType,
        status: 'pending'
      }
    })

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
    const requests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching contact requests:', error)
    return NextResponse.json(
      { error: 'Error fetching contact requests' },
      { status: 500 }
    )
  }
}
