# 🚀 Guía de Configuración de Supabase

Esta guía te ayudará a configurar Supabase para tu proyecto Recreacción JALM.

## 📋 Resumen de Cambios Realizados

### ✅ Correcciones
- **Error corregido**: Se solucionó el error "packages.filter is not a function" en `/app/paquetes/page.tsx`
- **Validación mejorada**: Ahora la página de paquetes valida que los datos recibidos sean un array antes de procesarlos
- **Manejo de errores**: Se agregó mejor manejo de errores en la obtención de datos

### 🆕 Nuevas Funcionalidades
- **Integración con Supabase**: Se migró de Prisma a Supabase como base de datos
- **Cliente de Supabase**: Configurado en `/lib/supabase.ts`
- **Funciones de consulta**: Creadas en `/lib/supabase-queries.ts` para obtener paquetes e inflables
- **API actualizada**: `/app/api/packages/route.ts` ahora usa Supabase
- **Esquema de base de datos**: Archivo SQL completo con las tablas necesarias

### 📊 Estructura de Base de Datos
Se crearon 4 tablas principales:
1. **paquetes**: Información de los paquetes recreativos
2. **imagenes_paquetes**: Imágenes asociadas a cada paquete
3. **inflables**: Catálogo de inflables individuales
4. **imagenes_inflables**: Imágenes asociadas a cada inflable

---

## 🔧 Pasos para Configurar Supabase

### Paso 1: Crear un Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Inicia sesión con tu cuenta (o crea una si no tienes)
3. Haz clic en **"New Project"** (Nuevo Proyecto)
4. Completa la información:
   - **Name**: `recreaccion-jalm` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (guárdala en un lugar seguro)
   - **Region**: Selecciona la región más cercana a tu ubicación (ej: South America - São Paulo)
   - **Pricing Plan**: Selecciona "Free" para comenzar
5. Haz clic en **"Create new project"**
6. Espera unos minutos mientras Supabase configura tu proyecto

### Paso 2: Crear las Tablas en Supabase

Una vez que tu proyecto esté listo:

1. En el panel lateral izquierdo, haz clic en **"SQL Editor"** (Editor SQL)
2. Haz clic en **"New query"** (Nueva consulta)
3. Abre el archivo `supabase-schema.sql` de este repositorio
4. Copia **TODO** el contenido del archivo
5. Pégalo en el editor SQL de Supabase
6. Haz clic en **"Run"** (Ejecutar) en la esquina inferior derecha
7. Deberías ver un mensaje de éxito indicando que las tablas se crearon correctamente

**Nota**: El script incluye datos de ejemplo. Si no quieres los datos de ejemplo, puedes eliminar la sección "DATOS DE EJEMPLO" del archivo SQL antes de ejecutarlo.

### Paso 3: Verificar las Tablas Creadas

1. En el panel lateral izquierdo, haz clic en **"Table Editor"** (Editor de Tablas)
2. Deberías ver las siguientes tablas:
   - `paquetes`
   - `imagenes_paquetes`
   - `inflables`
   - `imagenes_inflables`
3. Haz clic en cada tabla para ver su estructura y los datos de ejemplo (si los incluiste)

### Paso 4: Obtener las Credenciales de Supabase

1. En el panel lateral izquierdo, haz clic en **"Project Settings"** (Configuración del Proyecto)
2. En el menú de configuración, haz clic en **"API"**
3. Encontrarás dos valores importantes:

   **a) Project URL** (URL del Proyecto):
   - Busca la sección "Project URL"
   - Copia el valor que se ve así: `https://tuproyecto.supabase.co`
   
   **b) API Key (anon/public)**:
   - Busca la sección "Project API keys"
   - Copia el valor de **"anon" "public"** (es una clave larga que empieza con `eyJ...`)
   - **NO copies** la clave "service_role" (esa es privada y no debe usarse en el frontend)

### Paso 5: Configurar las Variables de Entorno Localmente

1. En la raíz de tu proyecto, crea un archivo llamado `.env.local` (si no existe)
2. Agrega las siguientes líneas, reemplazando los valores con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tu-clave-aqui
```

3. Guarda el archivo

**⚠️ IMPORTANTE**: 
- El archivo `.env.local` NO debe subirse a GitHub (ya está en `.gitignore`)
- Usa `.env.example` como referencia para saber qué variables necesitas

### Paso 6: Instalar Dependencias

Ejecuta el siguiente comando en la terminal:

```bash
npm install
```

Esto instalará `@supabase/supabase-js` y todas las demás dependencias necesarias.

### Paso 7: Ejecutar el Proyecto

```bash
npm run dev
```

Abre tu navegador en [http://localhost:3000/paquetes](http://localhost:3000/paquetes) para ver la página de paquetes funcionando con Supabase.

---

## 📝 Agregar Tus Propios Datos

### Opción 1: Usando la Interfaz de Supabase

1. Ve a **"Table Editor"** en Supabase
2. Selecciona la tabla `paquetes`
3. Haz clic en **"Insert row"** (Insertar fila)
4. Completa los campos:
   - **nombre**: Nombre del paquete
   - **slug**: URL amigable (ej: "paquete-premium")
   - **descripcion**: Descripción completa
   - **descripcion_corta**: Descripción breve
   - **precio**: Precio en formato decimal (ej: 15000.00)
   - **duracion**: Duración (ej: "3 horas")
   - **cantidad_bases**: Número de bases recreativas
   - **edades**: Rango de edades (ej: "5-12 años")
   - **espacio**: Selecciona "cerrado", "abierto" o "mixto"
   - **incluye_mega_inflable**: true o false
   - **incluye_final_musical**: true o false
   - **destacado**: true o false
   - **activo**: true
5. Haz clic en **"Save"** (Guardar)

### Opción 2: Usando SQL

Puedes ejecutar consultas SQL directamente en el **SQL Editor**:

```sql
-- Insertar un nuevo paquete
INSERT INTO paquetes (nombre, slug, descripcion, descripcion_corta, precio, duracion, cantidad_bases, edades, espacio, incluye_mega_inflable, incluye_final_musical, destacado, activo)
VALUES (
  'Mi Paquete Personalizado',
  'mi-paquete-personalizado',
  'Descripción completa del paquete...',
  'Descripción corta',
  20000.00,
  '4 horas',
  4,
  '6-14 años',
  'mixto',
  true,
  true,
  true,
  true
);

-- Insertar una imagen para el paquete (usa el ID del paquete creado)
INSERT INTO imagenes_paquetes (paquete_id, url, alt, orden)
VALUES (
  'id-del-paquete-aqui',
  'https://cdn.tvc.mx/media/1498606/Paquete-10-tarjetas-ID-125-kHz-clamshell-IDCARDKR2K-ZKTeco-TVC-Secundaria2.webp',
  'Descripción de la imagen',
  0
);
```

---

## 🎨 Subir Imágenes a Supabase Storage (Opcional)

Si quieres almacenar las imágenes en Supabase en lugar de usar URLs externas:

1. En el panel lateral, haz clic en **"Storage"**
2. Haz clic en **"Create a new bucket"** (Crear un nuevo bucket)
3. Nombre: `imagenes-paquetes` (o el nombre que prefieras)
4. Marca como **"Public bucket"** para que las imágenes sean accesibles públicamente
5. Haz clic en **"Create bucket"**
6. Sube tus imágenes al bucket
7. Copia la URL pública de cada imagen y úsala en la tabla `imagenes_paquetes`

---

## 🔒 Seguridad y Políticas RLS

El esquema incluye políticas de Row Level Security (RLS) que permiten:
- ✅ Lectura pública de todos los paquetes e inflables activos
- ❌ Escritura restringida (necesitas configurar autenticación para permitir escritura)

Si necesitas permitir que usuarios autenticados puedan crear/editar paquetes, deberás:
1. Configurar autenticación en Supabase
2. Crear políticas adicionales para operaciones de escritura

---

## 🆘 Solución de Problemas

### Error: "Invalid API key"
- Verifica que copiaste correctamente la clave "anon/public" (no la "service_role")
- Asegúrate de que las variables de entorno estén en `.env.local`
- Reinicia el servidor de desarrollo después de agregar las variables

### Error: "relation does not exist"
- Verifica que ejecutaste el script SQL completo en Supabase
- Revisa que las tablas se crearon correctamente en el Table Editor

### No se muestran datos
- Verifica que tienes datos en las tablas (usa el Table Editor)
- Asegúrate de que el campo `activo` esté en `true`
- Revisa la consola del navegador para ver errores específicos

### Error de CORS
- Las credenciales de Supabase deben tener el prefijo `NEXT_PUBLIC_` para funcionar en el cliente
- Verifica que las variables estén correctamente configuradas

---

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Next.js con Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

## 🎉 ¡Listo!

Tu aplicación ahora está configurada con Supabase. Puedes comenzar a agregar tus propios paquetes e inflables a través de la interfaz de Supabase o mediante la API.

Si tienes alguna pregunta o problema, revisa la documentación de Supabase o contacta al equipo de desarrollo.
