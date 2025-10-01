-- ============================================
-- ESQUEMA DE BASE DE DATOS PARA SUPABASE
-- Proyecto: Recreacción JALM
-- ============================================

-- Tabla: paquetes
-- Descripción: Almacena los paquetes recreativos ofrecidos
CREATE TABLE IF NOT EXISTS paquetes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  descripcion TEXT NOT NULL,
  descripcion_corta TEXT,
  precio DECIMAL(10, 2),
  duracion VARCHAR(100) NOT NULL,
  cantidad_bases INTEGER,
  edades VARCHAR(100) NOT NULL,
  espacio VARCHAR(20) CHECK (espacio IN ('cerrado', 'abierto', 'mixto')) DEFAULT 'mixto',
  incluye_mega_inflable BOOLEAN DEFAULT false,
  incluye_final_musical BOOLEAN DEFAULT false,
  destacado BOOLEAN DEFAULT false,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para paquetes
CREATE INDEX idx_paquetes_slug ON paquetes(slug);
CREATE INDEX idx_paquetes_destacado ON paquetes(destacado);
CREATE INDEX idx_paquetes_activo ON paquetes(activo);

-- Tabla: imagenes_paquetes
-- Descripción: Almacena las imágenes asociadas a cada paquete
CREATE TABLE IF NOT EXISTS imagenes_paquetes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paquete_id UUID NOT NULL REFERENCES paquetes(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para imagenes_paquetes
CREATE INDEX idx_imagenes_paquetes_paquete_id ON imagenes_paquetes(paquete_id);
CREATE INDEX idx_imagenes_paquetes_orden ON imagenes_paquetes(orden);

-- Tabla: inflables
-- Descripción: Almacena los inflables individuales disponibles
CREATE TABLE IF NOT EXISTS inflables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  descripcion TEXT NOT NULL,
  dimensiones VARCHAR(100),
  capacidad INTEGER,
  edades VARCHAR(100) NOT NULL,
  tipo VARCHAR(20) CHECK (tipo IN ('seco', 'mojado', 'ambos')) DEFAULT 'seco',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para inflables
CREATE INDEX idx_inflables_slug ON inflables(slug);
CREATE INDEX idx_inflables_tipo ON inflables(tipo);
CREATE INDEX idx_inflables_activo ON inflables(activo);

-- Tabla: imagenes_inflables
-- Descripción: Almacena las imágenes asociadas a cada inflable
CREATE TABLE IF NOT EXISTS imagenes_inflables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inflable_id UUID NOT NULL REFERENCES inflables(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para imagenes_inflables
CREATE INDEX idx_imagenes_inflables_inflable_id ON imagenes_inflables(inflable_id);
CREATE INDEX idx_imagenes_inflables_orden ON imagenes_inflables(orden);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_paquetes_updated_at
  BEFORE UPDATE ON paquetes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inflables_updated_at
  BEFORE UPDATE ON inflables
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ============================================

-- Insertar paquetes de ejemplo
INSERT INTO paquetes (nombre, slug, descripcion, descripcion_corta, precio, duracion, cantidad_bases, edades, espacio, incluye_mega_inflable, incluye_final_musical, destacado, activo)
VALUES 
  (
    'Paquete Fiesta Infantil',
    'paquete-fiesta-infantil',
    'Paquete completo para fiestas infantiles con inflables, juegos y animación. Incluye 3 bases recreativas con diferentes actividades adaptadas para niños de 3 a 10 años.',
    'Diversión garantizada para los más pequeños',
    15000.00,
    '3 horas',
    3,
    '3-10 años',
    'mixto',
    true,
    true,
    true,
    true
  ),
  (
    'Paquete Evento Corporativo',
    'paquete-evento-corporativo',
    'Paquete diseñado para eventos corporativos y team building. Incluye actividades recreativas para adultos, juegos de integración y dinámicas de grupo.',
    'Fortalece el trabajo en equipo',
    25000.00,
    '4 horas',
    5,
    'Adultos',
    'abierto',
    false,
    false,
    true,
    true
  ),
  (
    'Paquete Familiar',
    'paquete-familiar',
    'Paquete ideal para reuniones familiares con actividades para todas las edades. Combina inflables para niños y juegos recreativos para adolescentes y adultos.',
    'Diversión para toda la familia',
    18000.00,
    '3 horas',
    4,
    'Todas las edades',
    'mixto',
    true,
    false,
    false,
    true
  );

-- Insertar imágenes de ejemplo para los paquetes
INSERT INTO imagenes_paquetes (paquete_id, url, alt, orden)
SELECT 
  id,
  'https://placehold.co/800x600/orange/white?text=Paquete+' || nombre,
  'Imagen de ' || nombre,
  0
FROM paquetes;

-- Insertar inflables de ejemplo
INSERT INTO inflables (nombre, slug, descripcion, dimensiones, capacidad, edades, tipo, activo)
VALUES 
  (
    'Castillo Saltarín',
    'castillo-saltarin',
    'Castillo inflable clásico con área de salto amplia y colorida. Perfecto para fiestas infantiles.',
    '4m x 4m x 3m',
    8,
    '3-10 años',
    'seco',
    true
  ),
  (
    'Tobogán Acuático',
    'tobogan-acuatico',
    'Tobogán inflable con sistema de agua para diversión en días calurosos. Incluye piscina de aterrizaje.',
    '6m x 3m x 4m',
    6,
    '5-12 años',
    'mojado',
    true
  ),
  (
    'Obstáculos Extremos',
    'obstaculos-extremos',
    'Circuito de obstáculos inflables para desafíos y competencias. Ideal para eventos deportivos.',
    '10m x 3m x 3m',
    10,
    '8-16 años',
    'seco',
    true
  ),
  (
    'Mega Inflable Combo',
    'mega-inflable-combo',
    'Estructura inflable gigante que combina área de salto, obstáculos y tobogán. La atracción principal de cualquier evento.',
    '8m x 5m x 4m',
    12,
    '5-14 años',
    'ambos',
    true
  );

-- Insertar imágenes de ejemplo para los inflables
INSERT INTO imagenes_inflables (inflable_id, url, alt, orden)
SELECT 
  id,
  'https://placehold.co/800x600/teal/white?text=' || REPLACE(nombre, ' ', '+'),
  'Imagen de ' || nombre,
  0
FROM inflables;

-- ============================================
-- POLÍTICAS DE SEGURIDAD (RLS - Row Level Security)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE paquetes ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagenes_paquetes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inflables ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagenes_inflables ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (cualquiera puede leer datos activos)
CREATE POLICY "Permitir lectura pública de paquetes activos"
  ON paquetes FOR SELECT
  USING (activo = true);

CREATE POLICY "Permitir lectura pública de imágenes de paquetes"
  ON imagenes_paquetes FOR SELECT
  USING (true);

CREATE POLICY "Permitir lectura pública de inflables activos"
  ON inflables FOR SELECT
  USING (activo = true);

CREATE POLICY "Permitir lectura pública de imágenes de inflables"
  ON imagenes_inflables FOR SELECT
  USING (true);

-- Nota: Para operaciones de escritura (INSERT, UPDATE, DELETE), 
-- deberás configurar políticas adicionales basadas en autenticación
-- o usar el service_role key desde el backend.

-- ============================================
-- COMENTARIOS EN LAS TABLAS
-- ============================================

COMMENT ON TABLE paquetes IS 'Almacena los paquetes recreativos ofrecidos por Recreacción JALM';
COMMENT ON TABLE imagenes_paquetes IS 'Imágenes asociadas a cada paquete recreativo';
COMMENT ON TABLE inflables IS 'Catálogo de inflables individuales disponibles';
COMMENT ON TABLE imagenes_inflables IS 'Imágenes asociadas a cada inflable';

COMMENT ON COLUMN paquetes.espacio IS 'Tipo de espacio requerido: cerrado, abierto o mixto';
COMMENT ON COLUMN paquetes.destacado IS 'Indica si el paquete debe mostrarse como destacado en la página principal';
COMMENT ON COLUMN inflables.tipo IS 'Tipo de inflable: seco (sin agua), mojado (con agua) o ambos';
