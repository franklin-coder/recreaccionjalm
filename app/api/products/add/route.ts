
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

    // Generar slug a partir del nombre
    const slug = productData.nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Preparar datos del producto
    const productToInsert = {
      ...productData,
      slug,
      activo: true,
    }

    let insertedProduct
    let imageTableName

    if (productType === 'inflable') {
      // Insertar inflable
      const { data, error } = await supabase
        .from('inflables')
        .insert([productToInsert])
        .select()
        .single()

      if (error) {
        console.error('Error al insertar inflable:', error)
        return NextResponse.json(
          { error: 'Error al crear el inflable', details: error.message },
          { status: 500 }
        )
      }

      insertedProduct = data
      imageTableName = 'imagenes_inflables'
    } else {
      // Insertar paquete
      const { data, error } = await supabase
        .from('paquetes')
        .insert([productToInsert])
        .select()
        .single()

      if (error) {
        console.error('Error al insertar paquete:', error)
        return NextResponse.json(
          { error: 'Error al crear el paquete', details: error.message },
          { status: 500 }
        )
      }

      insertedProduct = data
      imageTableName = 'imagenes_paquetes'
    }

    // Insertar imágenes
    const imagenesToInsert = imagenes.map((img: any, index: number) => ({
      [`${productType}_id`]: insertedProduct.id,
      url: img.url,
      alt: img.alt || productData.nombre,
      orden: index,
    }))

    const { error: imageError } = await supabase
      .from(imageTableName)
      .insert(imagenesToInsert)

    if (imageError) {
      console.error('Error al insertar imágenes:', imageError)
      // Intentar eliminar el producto si falló la inserción de imágenes
      await supabase
        .from(productType === 'inflable' ? 'inflables' : 'paquetes')
        .delete()
        .eq('id', insertedProduct.id)

      return NextResponse.json(
        { error: 'Error al agregar las imágenes', details: imageError.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        product: insertedProduct,
        message: `${productType === 'inflable' ? 'Inflable' : 'Paquete'} agregado exitosamente`,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error en POST /api/products/add:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    )
  }
}
