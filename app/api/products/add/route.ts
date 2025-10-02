

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

    // Preparar datos del producto según el tipo
    let productToInsert: any = {
      nombre: productData.nombre,
      slug,
      descripcion: productData.descripcion,
      edades: productData.edades,
      activo: true,
    }

    let insertedProduct
    let imageTableName

    if (productType === 'inflable') {
      // Campos específicos de inflables (solo los que existen en la BD)
      productToInsert = {
        ...productToInsert,
        dimensiones: productData.dimensiones || null,
        capacidad: productData.capacidad ? parseInt(productData.capacidad) : null,
        tipo: productData.tipo || 'seco',
        categoria: productData.categoria, // NUEVO: campo categoria
      }

      // Insertar inflable
      const inflableData = {
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        precio: parseFloat(formData.get('precio') as string),
        categoria: formData.get('categoria'), // infantil o acuatico
        tipo: formData.get('tipo'),
        capacidad: parseInt(formData.get('capacidad') as string),
        slug: (formData.get('nombre') as string)
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, ''),
      };

      const { data: inflable, error: inflableError } = await supabase
        .from('inflables')
        .insert([inflableData])
        .select()
        .single();

      if (inflableError) {
        console.error('Error al insertar inflable:', inflableError);
        return NextResponse.json(
          { error: 'Error al crear el inflable', details: inflableError },
          { status: 500 }
        )
      }

      insertedProduct = data
      imageTableName = 'imagenes_inflables'
    } else {
      // Campos específicos de paquetes
      productToInsert = {
        ...productToInsert,
        descripcion_corta: productData.descripcion_corta || null,
        precio: productData.precio ? parseFloat(productData.precio) : null,
        duracion: productData.duracion,
        cantidad_bases: productData.cantidad_bases ? parseInt(productData.cantidad_bases) : null,
        espacio: productData.espacio || 'mixto',
        incluye_mega_inflable: productData.incluye_mega_inflable || false,
        incluye_final_musical: productData.incluye_final_musical || false,
        destacado: productData.destacado || false,
      }

      // Insertar paquete
      const paqueteData = {
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        descripcion_corta: formData.get('descripcion_corta'),
        precio: parseFloat(formData.get('precio') as string),
        duracion_horas: parseInt(formData.get('duracion_horas') as string),
        slug: (formData.get('nombre') as string)
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, ''),
      };

      const { data: paquete, error: paqueteError } = await supabase
        .from('paquetes')
        .insert([paqueteData])
        .select()
        .single();

      if (paqueteError) {
        console.error('Error al insertar paquete:', paqueteError);
        return NextResponse.json(
          { error: 'Error al crear el paquete', details: paqueteError },
          { status: 500 }
        );
      }

      // Procesar imágenes
      const imageUrls = formData.getAll('imageUrls') as string[];
      
      if (imageUrls.length > 0) {
        const imageRecords = imageUrls.map((url, index) => ({
          paquete_id: paquete.id,
          url: url,
          orden: index,
        }));

        const { error: imageError } = await supabase
          .from('imagenes_paquetes')
          .insert(imageRecords);

        if (imageError) {
          console.error('Error al insertar imágenes:', imageError);
        }
      }

      return NextResponse.json({ success: true, data: paquete });
    }

    return NextResponse.json(
      { error: 'Tipo de producto no válido' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error en el endpoint:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}