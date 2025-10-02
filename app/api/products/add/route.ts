import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const formData = await request.formData();
    
    const productType = formData.get('productType') as string;
    
    if (productType === 'inflable') {
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
        );
      }

      // Procesar imágenes
      const imageUrls = formData.getAll('imageUrls') as string[];
      
      if (imageUrls.length > 0) {
        const imageRecords = imageUrls.map((url, index) => ({
          inflable_id: inflable.id,
          url: url,
          orden: index,
        }));

        const { error: imageError } = await supabase
          .from('imagenes_inflables')
          .insert(imageRecords);

        if (imageError) {
          console.error('Error al insertar imágenes:', imageError);
        }
      }

      return NextResponse.json({ success: true, data: inflable });
      
    } else if (productType === 'paquete') {
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