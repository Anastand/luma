// Import the PrismaClient class.
// This is the main object used to talk to the database.
import { PrismaClient } from "@prisma/client";

// Extend the global object (TypeScript only).
// We declare a global variable named `prisma` so that
// TypeScript knows it can exist on `global`.
//
// This does NOT create the variable.
// It only tells TypeScript about its type.
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a Prisma client instance.
//
// If a Prisma client already exists on `global`,
// reuse it. Otherwise, create a new one.
//
// This prevents creating multiple database connections
// during development (hot reloads in Next.js).
const prisma = global.prisma ?? new PrismaClient();

// In development mode, store the Prisma client on `global`.
// This allows the same client to be reused across reloads.
//
// In production, this is skipped because the app
// runs once and does not hot-reload.
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Export the Prisma client.
// Import this single instance everywhere in the app
// instead of creating new PrismaClient objects.
export { prisma };
