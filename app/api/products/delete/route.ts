
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, productType } = body

    // Validar parámetros
    if (!productId || !productType) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      )
    }

    // Validar tipo de producto
    if (!['inflable', 'paquete'].includes(productType)) {
      return NextResponse.json(
        { error: 'Tipo de producto inválido' },
        { status: 400 }
      )
    }

    const tableName = productType === 'inflable' ? 'inflables' : 'paquetes'
    const imageTableName = productType === 'inflable' ? 'imagenes_inflables' : 'imagenes_paquetes'
    const foreignKey = `${productType}_id`

    // Primero eliminar las imágenes asociadas
    const { error: imageError } = await supabase
      .from(imageTableName)
      .delete()
      .eq(foreignKey, productId)

    if (imageError) {
      console.error('Error al eliminar imágenes:', imageError)
      return NextResponse.json(
        { error: 'Error al eliminar las imágenes', details: imageError.message },
        { status: 500 }
      )
    }

    // Luego eliminar el producto
    const { error: productError } = await supabase
      .from(tableName)
      .delete()
      .eq('id', productId)

    if (productError) {
      console.error('Error al eliminar producto:', productError)
      return NextResponse.json(
        { error: 'Error al eliminar el producto', details: productError.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: `${productType === 'inflable' ? 'Inflable' : 'Paquete'} eliminado exitosamente`,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error en DELETE /api/products/delete:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    )
  }
}
