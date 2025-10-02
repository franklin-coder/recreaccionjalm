
-- Migration: Add categoria column to inflables table
-- This allows categorizing inflables as 'infantil' or 'acuatico'

-- Add categoria column to inflables table
ALTER TABLE inflables 
ADD COLUMN IF NOT EXISTS categoria VARCHAR(20) 
CHECK (categoria IN ('infantil', 'acuatico')) 
DEFAULT 'infantil';

-- Create index for categoria column for better query performance
CREATE INDEX IF NOT EXISTS idx_inflables_categoria ON inflables(categoria);

-- Update existing records based on tipo field (optional - adjust as needed)
-- This is a suggested mapping, adjust based on your actual data
UPDATE inflables 
SET categoria = CASE 
  WHEN tipo = 'mojado' THEN 'acuatico'
  ELSE 'infantil'
END
WHERE categoria IS NULL;

-- Add comment to explain the column
COMMENT ON COLUMN inflables.categoria IS 'Categoría del inflable: infantil (para niños) o acuatico (con agua)';
