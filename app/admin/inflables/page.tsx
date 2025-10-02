
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getAllInflables, deleteInflable } from '@/lib/supabase-admin'
import { Inflable } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function InflablesAdminPage() {
  const router = useRouter()
  const [inflables, setInflables] = useState<Inflable[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    loadInflables()
  }, [])

  const loadInflables = async () => {
    try {
      const data = await getAllInflables()
      setInflables(data)
    } catch (error) {
      console.error('Error loading inflables:', error)
      toast.error('Error al cargar los inflables')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      await deleteInflable(deleteId)
      toast.success('Inflable eliminado exitosamente')
      loadInflables()
    } catch (error) {
      console.error('Error deleting inflable:', error)
      toast.error('Error al eliminar el inflable')
    } finally {
      setDeleteId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jalm-teal"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inflables</h1>
          <p className="mt-2 text-gray-600">Gestiona los inflables disponibles</p>
        </div>
        <Link href="/admin/inflables/new">
          <Button className="bg-jalm-teal hover:bg-jalm-teal/90">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Inflable
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {inflables.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 text-lg mb-4">No hay inflables registrados</p>
              <Link href="/admin/inflables/new">
                <Button className="bg-jalm-teal hover:bg-jalm-teal/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Primer Inflable
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          inflables.map((inflable) => (
            <Card key={inflable.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{inflable.nombre}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      {inflable.activo ? (
                        <Badge className="bg-green-500">
                          <Eye className="mr-1 h-3 w-3" />
                          Activo
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <EyeOff className="mr-1 h-3 w-3" />
                          Inactivo
                        </Badge>
                      )}
                      <Badge variant="outline">{inflable.tipo}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/inflables/${inflable.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteId(inflable.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Dimensiones</p>
                    <p className="font-medium">{inflable.dimensiones || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Capacidad</p>
                    <p className="font-medium">
                      {inflable.capacidad ? `${inflable.capacidad} personas` : 'No especificado'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Edades</p>
                    <p className="font-medium">{inflable.edades}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 line-clamp-2">{inflable.descripcion}</p>
                {inflable.imagenes && inflable.imagenes.length > 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    {inflable.imagenes.length} imagen(es)
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará el inflable y todas sus imágenes asociadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
