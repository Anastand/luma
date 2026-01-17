"use server";

import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

// Price bounds (constant)
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

export async function deleteCourse(courseId: string, userId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course || course.instructorId !== userId) {
    throw new Error("Unauthorized: You can only delete your own courses");
  }

  await prisma.course.delete({
    where: { id: courseId },
  });

  redirect("/dashboard");
}

export async function updateCourse(
  courseId: string,
  userId: string,
  data: { title: string; description: string | null; price: number }
) {
  // 1. Find course
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  // 2. Check ownership
  if (!course || course.instructorId !== userId) {
    throw new Error("Unauthorized");
  }

  // 3. Validate title
  if (!data.title?.trim()) {
    throw new Error("Title is required");
  }

  // 4. Validate price (BACKEND CHECK)
  if (data.price < MIN_PRICE || data.price > MAX_PRICE) {
    throw new Error(`Price must be between $${MIN_PRICE} and $${MAX_PRICE}`);
  }

  // 5. Update DB
  await prisma.course.update({
    where: { id: courseId },
    data,
  });

  redirect("/dashboard");
}