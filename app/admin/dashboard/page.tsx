
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllPaquetes, getAllInflables } from '@/lib/supabase-admin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Wind, Plus, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPaquetes: 0,
    paquetesActivos: 0,
    totalInflables: 0,
    inflablesActivos: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [paquetes, inflables] = await Promise.all([
        getAllPaquetes(),
        getAllInflables(),
      ])

      setStats({
        totalPaquetes: paquetes.length,
        paquetesActivos: paquetes.filter(p => p.activo).length,
        totalInflables: inflables.length,
        inflablesActivos: inflables.filter(i => i.activo).length,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Bienvenido al panel de administración de JALM Recreación</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paquetes</CardTitle>
            <Package className="h-4 w-4 text-jalm-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPaquetes}</div>
            <p className="text-xs text-muted-foreground">
              {stats.paquetesActivos} activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inflables</CardTitle>
            <Wind className="h-4 w-4 text-jalm-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInflables}</div>
            <p className="text-xs text-muted-foreground">
              {stats.inflablesActivos} activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paquetes Destacados</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalPaquetes > 0 ? Math.round((stats.paquetesActivos / stats.totalPaquetes) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Tasa de activación
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inflables Activos</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalInflables > 0 ? Math.round((stats.inflablesActivos / stats.totalInflables) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Tasa de activación
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gestionar Paquetes</CardTitle>
            <CardDescription>
              Administra los paquetes recreativos disponibles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/paquetes">
              <Button className="w-full" variant="outline">
                Ver Todos los Paquetes
              </Button>
            </Link>
            <Link href="/admin/paquetes/new">
              <Button className="w-full bg-jalm-orange hover:bg-jalm-orange/90">
                <Plus className="mr-2 h-4 w-4" />
                Crear Nuevo Paquete
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestionar Inflables</CardTitle>
            <CardDescription>
              Administra los inflables disponibles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/inflables">
              <Button className="w-full" variant="outline">
                Ver Todos los Inflables
              </Button>
            </Link>
            <Link href="/admin/inflables/new">
              <Button className="w-full bg-jalm-teal hover:bg-jalm-teal/90">
                <Plus className="mr-2 h-4 w-4" />
                Crear Nuevo Inflable
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
