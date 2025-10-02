
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getAllPaquetes, deletePaquete } from '@/lib/supabase-admin'
import { Paquete } from '@/lib/supabase'
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

export default function PaquetesAdminPage() {
  const router = useRouter()
  const [paquetes, setPaquetes] = useState<Paquete[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    loadPaquetes()
  }, [])

  const loadPaquetes = async () => {
    try {
      const data = await getAllPaquetes()
      setPaquetes(data)
    } catch (error) {
      console.error('Error loading paquetes:', error)
      toast.error('Error al cargar los paquetes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      await deletePaquete(deleteId)
      toast.success('Paquete eliminado exitosamente')
      loadPaquetes()
    } catch (error) {
      console.error('Error deleting paquete:', error)
      toast.error('Error al eliminar el paquete')
    } finally {
      setDeleteId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jalm-orange"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paquetes Recreativos</h1>
          <p className="mt-2 text-gray-600">Gestiona los paquetes disponibles</p>
        </div>
        <Link href="/admin/paquetes/new">
          <Button className="bg-jalm-orange hover:bg-jalm-orange/90">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Paquete
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {paquetes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 text-lg mb-4">No hay paquetes registrados</p>
              <Link href="/admin/paquetes/new">
                <Button className="bg-jalm-orange hover:bg-jalm-orange/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Primer Paquete
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          paquetes.map((paquete) => (
            <Card key={paquete.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{paquete.nombre}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      {paquete.activo ? (
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
                      {paquete.destacado && (
                        <Badge className="bg-jalm-orange">Destacado</Badge>
                      )}
                      <Badge variant="outline">{paquete.espacio}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/paquetes/${paquete.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteId(paquete.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Duración</p>
                    <p className="font-medium">{paquete.duracion}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Edades</p>
                    <p className="font-medium">{paquete.edades}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Precio</p>
                    <p className="font-medium">
                      {paquete.precio ? `$${paquete.precio.toLocaleString()}` : 'Consultar'}
                    </p>
                  </div>
                </div>
                {paquete.descripcion_corta && (
                  <p className="mt-4 text-gray-600 line-clamp-2">{paquete.descripcion_corta}</p>
                )}
                <div className="mt-4 flex gap-2">
                  {paquete.incluye_mega_inflable && (
                    <Badge variant="outline">Mega Inflable</Badge>
                  )}
                  {paquete.incluye_final_musical && (
                    <Badge variant="outline">Final Musical</Badge>
                  )}
                  {paquete.cantidad_bases && (
                    <Badge variant="outline">{paquete.cantidad_bases} bases</Badge>
                  )}
                </div>
                {paquete.imagenes && paquete.imagenes.length > 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    {paquete.imagenes.length} imagen(es)
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
              Esta acción no se puede deshacer. Se eliminará el paquete y todas sus imágenes asociadas.
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
