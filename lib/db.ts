import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// During build, create a mock Prisma client to avoid database connection errors
const createPrismaClient = () => {
  try {
    return new PrismaClient()
  } catch (error) {
    console.warn('Failed to create Prisma client, using mock:', error)
    // Return a mock client during build
    return {} as PrismaClient
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
