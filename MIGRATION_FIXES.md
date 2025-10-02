# Migration Fixes - Data Loading Issues

## Overview
This PR fixes critical data loading issues that occurred after the Prisma to Supabase migration. The main problems were:
1. API routes still using Prisma instead of Supabase
2. Missing API routes for inflables
3. Categories endpoint returning errors instead of arrays, causing `categories.map is not a function` error

## Issues Fixed

### 1. Categories API Route (`app/api/categories/route.ts`)
**Problem**: Still using Prisma, causing the endpoint to fail and return an error object instead of an array.

**Solution**: 
- Replaced Prisma with hardcoded categories based on inflables types
- Returns proper array structure: `[{ id, name, slug, order }]`
- Categories now map to inflables types: 'inflables-secos', 'inflables-mojados', 'inflables-infantiles'

### 2. Services API Route (`app/api/services/route.ts`)
**Problem**: Still using Prisma, preventing any services from loading.

**Solution**:
- Migrated to use `getInflables()` from Supabase queries
- Maps category slugs to inflables tipos (seco, mojado, ambos)
- Transforms Supabase data to match expected Service interface
- Properly handles filtering by category, age range, space, and search

### 3. Contact API Route (`app/api/contact/route.ts`)
**Problem**: Still using Prisma for contact requests.

**Solution**:
- Migrated to use Supabase
- Updated to use `contact_requests` table
- Added proper error handling for Supabase operations

### 4. Missing Inflables API Routes
**Problem**: No dedicated API routes for inflables data.

**Solution**: Created new routes:
- `app/api/inflables/route.ts` - GET all inflables with filtering
- `app/api/inflables/[slug]/route.ts` - GET single inflable by slug

### 5. Missing Packages Detail Route
**Problem**: No API route to get individual package by slug.

**Solution**: Created:
- `app/api/packages/[slug]/route.ts` - GET single package by slug

### 6. Supabase Queries Enhancement
**Problem**: `getInflables()` didn't properly handle 'ambos' type.

**Solution**:
- Updated logic to not filter by type when tipo='ambos'
- This allows inflables-infantiles category to show both seco and mojado types

### 7. Type Definitions
**Problem**: Missing fields in Inflable interface and no ContactRequest type.

**Solution**:
- Added missing fields to Inflable: `descripcion_corta`, `espacio_requerido`, `tiempo_instalacion`
- Added ContactRequest interface for type safety

### 8. Database Schema
**Problem**: Missing contact_requests table in Supabase schema.

**Solution**:
- Added complete contact_requests table definition to `supabase-schema.sql`
- Includes proper indexes, RLS policies, and triggers

## Files Changed

### Modified Files:
1. `app/api/categories/route.ts` - Migrated from Prisma to hardcoded categories
2. `app/api/services/route.ts` - Migrated from Prisma to Supabase
3. `app/api/contact/route.ts` - Migrated from Prisma to Supabase
4. `lib/supabase-queries.ts` - Enhanced getInflables() to handle 'ambos' type
5. `lib/supabase.ts` - Added ContactRequest interface and missing Inflable fields
6. `supabase-schema.sql` - Added contact_requests table

### New Files:
1. `app/api/inflables/route.ts` - API for fetching all inflables
2. `app/api/inflables/[slug]/route.ts` - API for fetching single inflable
3. `app/api/packages/[slug]/route.ts` - API for fetching single package
4. `MIGRATION_FIXES.md` - This documentation file

## Testing Recommendations

After merging this PR, test the following:

1. **Paquetes Page** (`/paquetes`)
   - Should load and display all packages
   - Search functionality should work
   - Featured filter should work

2. **Services Page** (`/servicios`)
   - Should load without errors
   - Categories filter should work (no more `categories.map` error)
   - All filters (category, age range, space, search) should work

3. **Category Pages** (e.g., `/servicios/inflables-infantiles`)
   - Should load and display inflables for that category
   - No more `categories.map is not a function` error

4. **Contact Form**
   - Should submit successfully
   - Data should be stored in Supabase contact_requests table

## Database Setup Required

Run the updated SQL schema to create the contact_requests table:

```sql
-- Run the contact_requests section from supabase-schema.sql
-- in your Supabase SQL Editor
```

## Environment Variables

Ensure these are set in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://nkuzcchpnfzlmbwvpcvr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Notes

- All Prisma references have been removed from API routes
- The application now fully uses Supabase for data operations
- Categories are currently hardcoded based on inflables types (can be made dynamic later if needed)
- The 'inflables-infantiles' category shows both seco and mojado types by using tipo='ambos'
