
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  getPaqueteById, 
  updatePaquete, 
  addImagenPaquete, 
  updateImagenPaquete,
  deleteImagenPaquete 
} from '@/lib/supabase-admin'
import { Paquete, ImagenPaquete } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface ImagenInput extends Partial<ImagenPaquete> {
  url: string
  alt?: string
  orden: number
  isNew?: boolean
}

export default function EditPaquetePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [paquete, setPaquete] = useState<Paquete | null>(null)
  const [formData, setFormData] = useState({
    nombre: '',
    slug: '',
    descripcion: '',
    descripcion_corta: '',
    precio: '',
    duracion: '',
    cantidad_bases: '',
    edades: '',
    espacio: 'mixto' as 'cerrado' | 'abierto' | 'mixto',
    incluye_mega_inflable: false,
    incluye_final_musical: false,
    destacado: false,
    activo: true,
  })
  const [imagenes, setImagenes] = useState<ImagenInput[]>([])
  const [imagenesToDelete, setImagenesToDelete] = useState<string[]>([])

  useEffect(() => {
    loadPaquete()
  }, [id])

  const loadPaquete = async () => {
    try {
      const data = await getPaqueteById(id)
      if (data) {
        setPaquete(data)
        setFormData({
          nombre: data.nombre,
          slug: data.slug,
          descripcion: data.descripcion,
          descripcion_corta: data.descripcion_corta || '',
          precio: data.precio?.toString() || '',
          duracion: data.duracion,
          cantidad_bases: data.cantidad_bases?.toString() || '',
          edades: data.edades,
          espacio: data.espacio,
          incluye_mega_inflable: data.incluye_mega_inflable,
          incluye_final_musical: data.incluye_final_musical,
          destacado: data.destacado,
          activo: data.activo,
        })
        setImagenes(data.imagenes || [])
      }
    } catch (error) {
      console.error('Error loading paquete:', error)
      toast.error('Error al cargar el paquete')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Actualizar el paquete
      const paqueteData = {
        ...formData,
        precio: formData.precio ? parseFloat(formData.precio) : undefined,
        cantidad_bases: formData.cantidad_bases ? parseInt(formData.cantidad_bases) : undefined,
      }

      await updatePaquete(id, paqueteData)

      // Eliminar imágenes marcadas para eliminar
      await Promise.all(
        imagenesToDelete.map((imageId) => deleteImagenPaquete(imageId))
      )

      // Actualizar o crear imágenes
      await Promise.all(
        imagenes.map((imagen) => {
          if (imagen.isNew) {
            return addImagenPaquete(id, {
              url: imagen.url,
              alt: imagen.alt,
              orden: imagen.orden,
            })
          } else if (imagen.id) {
            return updateImagenPaquete(imagen.id, {
              url: imagen.url,
              alt: imagen.alt,
              orden: imagen.orden,
            })
          }
        })
      )

      toast.success('Paquete actualizado exitosamente')
      router.push('/admin/paquetes')
    } catch (error) {
      console.error('Error updating paquete:', error)
      toast.error('Error al actualizar el paquete')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addImagen = () => {
    setImagenes([
      ...imagenes,
      { url: '', alt: '', orden: imagenes.length + 1, isNew: true },
    ])
  }

  const removeImagen = (index: number) => {
    const imagen = imagenes[index]
    if (imagen.id && !imagen.isNew) {
      setImagenesToDelete([...imagenesToDelete, imagen.id])
    }
    setImagenes(imagenes.filter((_, i) => i !== index))
  }

  const updateImagen = (index: number, field: keyof ImagenInput, value: string | number) => {
    const updated = [...imagenes]
    updated[index] = { ...updated[index], [field]: value }
    setImagenes(updated)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jalm-orange"></div>
      </div>
    )
  }

  if (!paquete) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Paquete no encontrado</p>
        <Link href="/admin/paquetes">
          <Button className="mt-4">Volver a Paquetes</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/paquetes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Paquete</h1>
          <p className="mt-2 text-gray-600">{paquete.nombre}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion_corta">Descripción Corta</Label>
              <Input
                id="descripcion_corta"
                value={formData.descripcion_corta}
                onChange={(e) => handleChange('descripcion_corta', e.target.value)}
                placeholder="Breve descripción del paquete"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción Completa *</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="precio">Precio</Label>
                <Input
                  id="precio"
                  type="number"
                  value={formData.precio}
                  onChange={(e) => handleChange('precio', e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duracion">Duración *</Label>
                <Input
                  id="duracion"
                  value={formData.duracion}
                  onChange={(e) => handleChange('duracion', e.target.value)}
                  placeholder="Ej: 4 horas"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cantidad_bases">Cantidad de Bases</Label>
                <Input
                  id="cantidad_bases"
                  type="number"
                  value={formData.cantidad_bases}
                  onChange={(e) => handleChange('cantidad_bases', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edades">Edades *</Label>
                <Input
                  id="edades"
                  value={formData.edades}
                  onChange={(e) => handleChange('edades', e.target.value)}
                  placeholder="Ej: 3-12 años"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="espacio">Tipo de Espacio *</Label>
                <Select
                  value={formData.espacio}
                  onValueChange={(value) => handleChange('espacio', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cerrado">Cerrado</SelectItem>
                    <SelectItem value="abierto">Abierto</SelectItem>
                    <SelectItem value="mixto">Mixto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Incluye Mega Inflable</Label>
                <p className="text-sm text-gray-500">El paquete incluye un mega inflable</p>
              </div>
              <Switch
                checked={formData.incluye_mega_inflable}
                onCheckedChange={(checked) => handleChange('incluye_mega_inflable', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Incluye Final Musical</Label>
                <p className="text-sm text-gray-500">El paquete incluye final musical</p>
              </div>
              <Switch
                checked={formData.incluye_final_musical}
                onCheckedChange={(checked) => handleChange('incluye_final_musical', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Destacado</Label>
                <p className="text-sm text-gray-500">Mostrar como paquete destacado</p>
              </div>
              <Switch
                checked={formData.destacado}
                onCheckedChange={(checked) => handleChange('destacado', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Activo</Label>
                <p className="text-sm text-gray-500">El paquete está visible en el sitio</p>
              </div>
              <Switch
                checked={formData.activo}
                onCheckedChange={(checked) => handleChange('activo', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Imágenes</CardTitle>
              <Button type="button" onClick={addImagen} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Imagen
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {imagenes.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay imágenes agregadas</p>
            ) : (
              imagenes.map((imagen, index) => (
                <div key={index} className="flex gap-4 items-start p-4 border rounded-lg">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label>URL de la Imagen *</Label>
                      <Input
                        value={imagen.url}
                        onChange={(e) => updateImagen(index, 'url', e.target.value)}
                        placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Generic_placeholder_page.pdf/page1-543px-Generic_placeholder_page.pdf.jpg"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Texto Alternativo</Label>
                        <Input
                          value={imagen.alt || ''}
                          onChange={(e) => updateImagen(index, 'alt', e.target.value)}
                          placeholder="Descripción de la imagen"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Orden</Label>
                        <Input
                          type="number"
                          value={imagen.orden}
                          onChange={(e) => updateImagen(index, 'orden', parseInt(e.target.value))}
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeImagen(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/paquetes">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={saving}
            className="bg-jalm-orange hover:bg-jalm-orange/90"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </div>
  )
}
