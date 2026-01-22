"use server";

import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

// Set minimum and maximum allowed prices for a course
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

/**
 * Delete a course the user owns.
 * @param courseId - The ID of the course to delete
 * @param userId - The ID of the current user (must be instructor)
 */
export async function deleteCourse(courseId: string, userId: string) { 
  // Look up the course in the database
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  // Only allow deletion if course exists and user is the instructor
  if (!course || course.instructorId !== userId) {
    throw new Error("Unauthorized: You can only delete your own courses");
  }

  // Delete the course from the database
  await prisma.course.delete({
    where: { id: courseId },
  });

  // Redirect user back to dashboard after deletion
  redirect("/dashboard");
}

/**
 * Update a course's details if the user owns it.
 * @param courseId - The ID of the course to update
 * @param userId - The ID of the current user (must be instructor)
 * @param data - The new course data to update
 */
export async function updateCourse(
  courseId: string,
  userId: string,
  data: { title: string; description: string | null; price: number }
) {
  // 1. Find course in the database by ID
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  // 2. Make sure course exists and user is the instructor
  if (!course || course.instructorId !== userId) {
    throw new Error("Unauthorized");
  }

  // 3. Validate title is not empty or only whitespace
  if (!data.title?.trim()) {
    throw new Error("Title is required");
  }

  // 4. Validate that price is within allowed bounds (server-side check to prevent bypass)
  if (data.price < MIN_PRICE || data.price > MAX_PRICE) {
    throw new Error(`Price must be between $${MIN_PRICE} and $${MAX_PRICE}`);
  }

  // 5. Update course details in the database
  await prisma.course.update({
    where: { id: courseId },
    data,
  });

  // Redirect user back to dashboard after successful update
  redirect("/dashboard");
}