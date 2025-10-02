import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productType, imagenes, ...productData } = body

    // Validar tipo de producto
    if (!['inflable', 'paquete'].includes(productType)) {
      return NextResponse.json(
        { error: 'Tipo de producto inválido' },
        { status: 400 }
      )
    }

    // Validar campos requeridos
    if (!productData.nombre || !productData.descripcion || !productData.edades) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Validar imágenes
    if (!imagenes || imagenes.length === 0) {
      return NextResponse.json(
        { error: 'Debe incluir al menos una imagen' },
        { status: 400 }
      )
    }

    // Validar categoria para inflables
    if (productType === 'inflable' && !productData.categoria) {
      return NextResponse.json(
        { error: 'Debe seleccionar una categoría para el inflable' },
        { status: 400 }
      )
    }

    // Generar slug a partir del nombre
    const slug = productData.nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    let insertedProduct
    let imageTableName

    if (productType === 'inflable') {
      // Preparar datos del inflable
      const inflableData = {
        nombre: productData.nombre,
        slug,
        descripcion: productData.descripcion,
        edades: productData.edades,
        dimensiones: productData.dimensiones || null,
        capacidad: productData.capacidad ? parseInt(productData.capacidad) : null,
        tipo: productData.tipo || 'seco',
        categoria: productData.categoria,
        activo: true,
      }

      // Insertar inflable
      const { data: inflable, error: inflableError } = await supabase
        .from('inflables')
        .insert([inflableData])
        .select()
        .single()

      if (inflableError) {
        console.error('Error al insertar inflable:', inflableError)
        return NextResponse.json(
          { error: 'Error al crear el inflable', details: inflableError.message },
          { status: 500 }
        )
      }

      insertedProduct = inflable
      imageTableName = 'imagenes_inflables'

      // Procesar imágenes del inflable
      if (imagenes && imagenes.length > 0) {
        const imageRecords = imagenes.map((url: string, index: number) => ({
          inflable_id: inflable.id,
          url: url,
          orden: index,
        }))

        const { error: imageError } = await supabase
          .from(imageTableName)
          .insert(imageRecords)

        if (imageError) {
          console.error('Error al insertar imágenes del inflable:', imageError)
          // No retornamos error aquí, el producto ya fue creado
        }
      }

      return NextResponse.json({ success: true, data: inflable })

    } else if (productType === 'paquete') {
      // Preparar datos del paquete
      const paqueteData = {
        nombre: productData.nombre,
        slug,
        descripcion: productData.descripcion,
        descripcion_corta: productData.descripcion_corta || null,
        edades: productData.edades,
        precio: productData.precio ? parseFloat(productData.precio) : null,
        duracion: productData.duracion,
        cantidad_bases: productData.cantidad_bases ? parseInt(productData.cantidad_bases) : null,
        espacio: productData.espacio || 'mixto',
        incluye_mega_inflable: productData.incluye_mega_inflable || false,
        incluye_final_musical: productData.incluye_final_musical || false,
        destacado: productData.destacado || false,
        activo: true,
      }

      // Insertar paquete
      const { data: paquete, error: paqueteError } = await supabase
        .from('paquetes')
        .insert([paqueteData])
        .select()
        .single()

      if (paqueteError) {
        console.error('Error al insertar paquete:', paqueteError)
        return NextResponse.json(
          { error: 'Error al crear el paquete', details: paqueteError.message },
          { status: 500 }
        )
      }

      insertedProduct = paquete
      imageTableName = 'imagenes_paquetes'

      // Procesar imágenes del paquete
      if (imagenes && imagenes.length > 0) {
        const imageRecords = imagenes.map((url: string, index: number) => ({
          paquete_id: paquete.id,
          url: url,
          orden: index,
        }))

        const { error: imageError } = await supabase
          .from(imageTableName)
          .insert(imageRecords)

        if (imageError) {
          console.error('Error al insertar imágenes del paquete:', imageError)
          // No retornamos error aquí, el producto ya fue creado
        }
      }

      return NextResponse.json({ success: true, data: paquete })
    }

    return NextResponse.json(
      { error: 'Tipo de producto no válido' },
      { status: 400 }
    )
    
  } catch (error: any) {
    console.error('Error en el endpoint:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    )
  }
}
