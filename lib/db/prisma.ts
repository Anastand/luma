// Prisma is a database toolkit that makes it easy to work with databases in TypeScript/JavaScript.
// Instead of writing raw SQL queries, you use Prisma's type-safe API to interact with your database.

// PrismaClient is the main class that gives you methods to query your database (like prisma.user.findMany())
import { PrismaClient } from "@prisma/client";

// PrismaNeon is an adapter that connects Prisma to Neon (a serverless PostgreSQL database).
// Think of it as a translator that helps Prisma talk to Neon's specific database format.
import { PrismaNeon } from "@prisma/adapter-neon";

// The connection string is like an address + password to connect to your database.
// It's stored in your .env file as DATABASE_URL (for security, never commit .env files to git!)
// Format looks like: postgresql://username:password@host:port/database
const connectionString = process.env.DATABASE_URL;

// Safety check: If the connection string is missing, we can't connect to the database.
// So we throw an error immediately instead of failing later when trying to query.
if (!connectionString) {
  throw new Error("DATABASE_URL is missing in .env");
}

// Create the adapter with our connection string.
// This adapter knows how to communicate with Neon's serverless database.
const adapter = new PrismaNeon({ connectionString });

// Create the Prisma client instance with our adapter.
// This is the main object you'll use throughout your app to query the database.
// Example: prisma.user.findMany() to get all users, prisma.user.create() to create a user, etc.
const prisma = new PrismaClient({ adapter });

// Export it so other files can import and use it.
// Now you can do: import prisma from "@/lib/db/prisma" in any file and start querying!
export default prisma;
