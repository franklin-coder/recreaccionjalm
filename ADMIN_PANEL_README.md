# Panel de Administración - JALM Recreación

## Descripción General

Este panel de administración permite gestionar completamente los paquetes recreativos e inflables del sitio web de JALM Recreación. Incluye autenticación segura mediante Supabase Auth y operaciones CRUD completas para todos los recursos.

## Características

### 🔐 Autenticación
- Sistema de login seguro con email y contraseña
- Protección de rutas mediante middleware
- Sesiones persistentes
- Logout seguro

### 📦 Gestión de Paquetes Recreativos
- **Listar**: Ver todos los paquetes con su estado (activo/inactivo, destacado)
- **Crear**: Agregar nuevos paquetes con toda su información
- **Editar**: Modificar paquetes existentes
- **Eliminar**: Borrar paquetes (incluye eliminación de imágenes asociadas)
- **Gestión de Imágenes**: Agregar, editar y eliminar múltiples imágenes por paquete

### 🎈 Gestión de Inflables
- **Listar**: Ver todos los inflables con su estado
- **Crear**: Agregar nuevos inflables
- **Editar**: Modificar inflables existentes
- **Eliminar**: Borrar inflables (incluye eliminación de imágenes asociadas)
- **Gestión de Imágenes**: Agregar, editar y eliminar múltiples imágenes por inflable

### 📊 Dashboard
- Estadísticas en tiempo real
- Contadores de paquetes e inflables
- Tasas de activación
- Accesos rápidos a funciones principales

## Estructura de Rutas

```
/admin/login              → Página de inicio de sesión
/admin/dashboard          → Dashboard principal (protegido)
/admin/paquetes           → Lista de paquetes (protegido)
/admin/paquetes/new       → Crear nuevo paquete (protegido)
/admin/paquetes/[id]/edit → Editar paquete (protegido)
/admin/inflables          → Lista de inflables (protegido)
/admin/inflables/new      → Crear nuevo inflable (protegido)
/admin/inflables/[id]/edit → Editar inflable (protegido)
```

## Configuración Inicial

### 1. Configurar Supabase Auth

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navega a **Authentication** > **Users**
3. Haz clic en **Add User** > **Create new user**
4. Ingresa:
   - Email: tu-email@ejemplo.com
   - Password: tu-contraseña-segura
   - Confirma que "Auto Confirm User" esté marcado
5. Guarda el usuario

### 2. Variables de Entorno

Asegúrate de tener configuradas las siguientes variables en tu archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://nkukzchpnfzlmbwvpcvr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

### 3. Verificar Tablas de Supabase

El panel requiere las siguientes tablas en Supabase:

- `paquetes`: Información de paquetes recreativos
- `imagenes_paquetes`: Imágenes asociadas a paquetes
- `inflables`: Información de inflables
- `imagenes_inflables`: Imágenes asociadas a inflables

## Uso del Panel

### Acceso al Panel

1. Navega a la página principal del sitio
2. Haz clic en el botón **"Admin"** en la barra de navegación
3. Serás redirigido a `/admin/login`
4. Ingresa tus credenciales de Supabase Auth
5. Una vez autenticado, accederás al dashboard

### Crear un Paquete

1. Desde el dashboard, haz clic en **"Crear Nuevo Paquete"**
2. Completa el formulario:
   - **Información Básica**: Nombre, slug, descripciones, precio, duración, etc.
   - **Características**: Mega inflable, final musical, destacado, activo
   - **Imágenes**: Agrega URLs de imágenes con texto alternativo y orden
3. Haz clic en **"Crear Paquete"**

### Editar un Paquete

1. Ve a **"Paquetes"** en el menú lateral
2. Haz clic en el ícono de editar (lápiz) del paquete deseado
3. Modifica los campos necesarios
4. Puedes agregar, editar o eliminar imágenes
5. Haz clic en **"Guardar Cambios"**

### Eliminar un Paquete

1. Ve a **"Paquetes"** en el menú lateral
2. Haz clic en el ícono de eliminar (papelera) del paquete deseado
3. Confirma la eliminación en el diálogo
4. El paquete y todas sus imágenes serán eliminados permanentemente

### Gestión de Inflables

El proceso es idéntico al de paquetes:
- Navega a **"Inflables"** en el menú lateral
- Usa los botones de crear, editar o eliminar según necesites

## Campos de Formularios

### Paquete Recreativo

**Campos Obligatorios:**
- Nombre
- Slug (se genera automáticamente desde el nombre)
- Descripción completa
- Duración
- Edades
- Tipo de espacio (cerrado/abierto/mixto)

**Campos Opcionales:**
- Descripción corta
- Precio
- Cantidad de bases
- Incluye mega inflable (switch)
- Incluye final musical (switch)
- Destacado (switch)
- Activo (switch, por defecto: true)

**Imágenes:**
- URL de la imagen (obligatorio)
- Texto alternativo (opcional)
- Orden (número, por defecto: secuencial)

### Inflable

**Campos Obligatorios:**
- Nombre
- Slug (se genera automáticamente desde el nombre)
- Descripción
- Edades
- Tipo (seco/mojado/ambos)

**Campos Opcionales:**
- Dimensiones
- Capacidad (número de personas)
- Activo (switch, por defecto: true)

**Imágenes:**
- URL de la imagen (obligatorio)
- Texto alternativo (opcional)
- Orden (número, por defecto: secuencial)

## Seguridad

### Protección de Rutas

Todas las rutas del panel (excepto `/admin/login`) están protegidas mediante middleware que:
- Verifica la sesión de Supabase Auth
- Redirige a login si no hay sesión activa
- Mantiene la URL de destino para redirigir después del login

### Mejores Prácticas

1. **Contraseñas Seguras**: Usa contraseñas fuertes para los usuarios admin
2. **Sesiones**: Las sesiones se mantienen activas, pero puedes cerrar sesión en cualquier momento
3. **Permisos**: Solo usuarios autenticados pueden acceder al panel
4. **Validación**: Todos los formularios tienen validación del lado del cliente y servidor

## Tecnologías Utilizadas

- **Next.js 14**: Framework de React con App Router
- **Supabase Auth**: Sistema de autenticación
- **Supabase Database**: Base de datos PostgreSQL
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos
- **shadcn/ui**: Componentes de UI
- **Sonner**: Notificaciones toast
- **Lucide React**: Iconos

## Solución de Problemas

### No puedo iniciar sesión

1. Verifica que el usuario esté creado en Supabase Auth
2. Confirma que las variables de entorno estén correctamente configuradas
3. Asegúrate de que el usuario esté confirmado (Auto Confirm User)
4. Revisa la consola del navegador para errores

### Las imágenes no se muestran

1. Verifica que las URLs de las imágenes sean válidas y accesibles
2. Confirma que las imágenes estén en formato compatible (JPG, PNG, WebP)
3. Revisa que las URLs comiencen con `http://` o `https://`

### Error al crear/editar

1. Verifica que todos los campos obligatorios estén completos
2. Confirma que el slug sea único
3. Revisa la consola para mensajes de error específicos
4. Verifica la conexión con Supabase

### Sesión expirada

1. Cierra sesión y vuelve a iniciar sesión
2. Verifica que las credenciales de Supabase sean correctas
3. Limpia las cookies del navegador si persiste el problema

## Mantenimiento

### Actualizar Dependencias

```bash
npm update @supabase/auth-helpers-nextjs @supabase/ssr
```

### Backup de Datos

Se recomienda hacer backups regulares de la base de datos de Supabase:
1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **Database** > **Backups**
3. Configura backups automáticos o crea backups manuales

## Soporte

Para problemas o preguntas sobre el panel de administración:
1. Revisa este README
2. Consulta la documentación de [Supabase](https://supabase.com/docs)
3. Revisa los logs de la aplicación
4. Contacta al equipo de desarrollo

## Próximas Mejoras

Posibles mejoras futuras para el panel:
- [ ] Upload directo de imágenes a Supabase Storage
- [ ] Búsqueda y filtros avanzados
- [ ] Exportación de datos a CSV/Excel
- [ ] Historial de cambios (audit log)
- [ ] Roles y permisos múltiples
- [ ] Vista previa en tiempo real
- [ ] Gestión de categorías
- [ ] Analytics y reportes

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025  
**Desarrollado para**: JALM Deporte y Recreación
