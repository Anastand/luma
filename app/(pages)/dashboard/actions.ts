"use server";

import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export async function deleteCourse(courseId: string, userId: string) {
  // 1. Find the course
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  // 2. Check: Does this user OWN it? (security)
  if (!course || course.instructorId !== userId) {
    throw new Error("Unauthorized: You can only delete your own courses");
  }

  // 3. Delete from DB
  await prisma.course.delete({
    where: { id: courseId },
  });

  // 4. Redirect back to dashboard
  redirect("/dashboard");
}

export async function updateCourse(
  courseId: string,
  userId: string,
  data: { title: string; description: string | null; price: number }
) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course || course.instructorId !== userId) {
    throw new Error("Unauthorized");
  }

  await prisma.course.update({
    where: { id: courseId },
    data,
  });

  redirect("/dashboard");
}