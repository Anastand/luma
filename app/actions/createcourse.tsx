'use server'
import prisma  from '@/lib/db/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

/**
 * This function creates a new course in the database for the current instructor.
 * 
 * Error explanation & fix:
 * 
 * The error: "Cannot read properties of undefined (reading 'create')" at "prisma.course.create({..." 
 * means that `prisma.course` is undefined (should be `prisma.course` with the correct Prisma client import).
 * 
 * Most commonly, this is because the generated Prisma client (`@/lib/db/prisma`) file is returning a
 * default export, but it's being imported incorrectly, or the Prisma client is not properly instantiated.
 * 
 * Another possible reason is Prisma doesn't recognize the `course` model because in your Prisma schema 
 * the correct model is `Course` (uppercase), so the generated client exposes it as `prisma.course` (lowercase),
 * which is actually correct in Prisma JS/TS. Typically:
 *    prisma.course.create()
 * However, if you're seeing `undefined`, it is likely that the Prisma client was not generated after adding
 * the `Course` model, or the import is wrong.
 * 
 * Ensure THREE THINGS:
 *   1. Your `@/lib/db/prisma` default export is actually an instance of PrismaClient.
 *   2. You ran `npx prisma generate` after schema changes.
 *   3. "Course" is in your schema (which it is).
 *   4. You are using Node.js (not edge runtime), as Prisma core doesn't run on edge.
 * 
 * For extra robustness, let's add a check for `prisma.course` and fail gracefully.
 * 
 * Also, in the schema, the relation is set by `instructorId: String` referencing `User.clerkId`!
 * In Clerk, the "user.id" is the Clerk user ID (should match). So we use `user.id`.
 */
export async function createCourse(formData: FormData) {
  const user = await currentUser()
  if (!user || user.publicMetadata.role !== 'INSTRUCTOR') {
    throw new Error('Unauthorized')
  }

  // Defensive: prisma may not be loaded or generated properly.
  if (!prisma || !prisma.course) {
    throw new Error('Database not initialized. Check your Prisma setup and generation.')
  }

  const title = formData.get('title') as string
  const descriptionRaw = formData.get('description')
  const description = typeof descriptionRaw === "string" && descriptionRaw.trim().length > 0 ? descriptionRaw.trim() : null
  const priceRaw = formData.get('price')
  const price = priceRaw ? Number(priceRaw) : 0

  if (!title || !title.trim()) throw new Error('Title required')

  await prisma.course.create({
    data: {
      title: title.trim(),
      description,
      price,
      instructorId: user.id // this should match User.clerkId field
    }
  })

  redirect('/Courses')
}