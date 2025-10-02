
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createInflable, addImagenInflable } from '@/lib/supabase-admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface ImagenInput {
  url: string
  alt: string
  orden: number
}

export default function NewInflablePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    slug: '',
    descripcion: '',
    dimensiones: '',
    capacidad: '',
    edades: '',
    tipo: 'seco' as 'seco' | 'mojado' | 'ambos',
    activo: true,
  })
  const [imagenes, setImagenes] = useState<ImagenInput[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Crear el inflable
      const inflableData = {
        ...formData,
        capacidad: formData.capacidad ? parseInt(formData.capacidad) : undefined,
      }

      const inflable = await createInflable(inflableData)

      // Agregar imágenes si existen
      if (imagenes.length > 0) {
        await Promise.all(
          imagenes.map((imagen) =>
            addImagenInflable(inflable.id, imagen)
          )
        )
      }

      toast.success('Inflable creado exitosamente')
      router.push('/admin/inflables')
    } catch (error) {
      console.error('Error creating inflable:', error)
      toast.error('Error al crear el inflable')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // Auto-generar slug desde el nombre
    if (field === 'nombre') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const addImagen = () => {
    setImagenes([...imagenes, { url: '', alt: '', orden: imagenes.length + 1 }])
  }

  const removeImagen = (index: number) => {
    setImagenes(imagenes.filter((_, i) => i !== index))
  }

  const updateImagen = (index: number, field: keyof ImagenInput, value: string | number) => {
    const updated = [...imagenes]
    updated[index] = { ...updated[index], [field]: value }
    setImagenes(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/inflables">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nuevo Inflable</h1>
          <p className="mt-2 text-gray-600">Crea un nuevo inflable</p>
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
              <Label htmlFor="descripcion">Descripción *</Label>
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
                <Label htmlFor="dimensiones">Dimensiones</Label>
                <Input
                  id="dimensiones"
                  value={formData.dimensiones}
                  onChange={(e) => handleChange('dimensiones', e.target.value)}
                  placeholder="Ej: 5m x 4m x 3m"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacidad">Capacidad</Label>
                <Input
                  id="capacidad"
                  type="number"
                  value={formData.capacidad}
                  onChange={(e) => handleChange('capacidad', e.target.value)}
                  placeholder="Número de personas"
                />
              </div>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) => handleChange('tipo', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seco">Seco</SelectItem>
                  <SelectItem value="mojado">Mojado</SelectItem>
                  <SelectItem value="ambos">Ambos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Activo</Label>
                <p className="text-sm text-gray-500">El inflable está visible en el sitio</p>
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
                        placeholder="https://easifyapps.com/wp-content/uploads/2023/08/placeholder-scaled.jpg"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Texto Alternativo</Label>
                        <Input
                          value={imagen.alt}
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
          <Link href="/admin/inflables">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="bg-jalm-teal hover:bg-jalm-teal/90"
          >
            {loading ? 'Creando...' : 'Crear Inflable'}
          </Button>
        </div>
      </form>
    </div>
  )
}
