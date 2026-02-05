"use server";
import prisma from "@/lib/db/prisma";
import { revalidateTag } from "next/cache";

// ===== COURSE ACTIONS =====
export async function updateCourse(
  courseId: string,
  userId: string,
  data: { title: string; description: string | null; price: number }
) {
  console.log("=== updateCourse called ===");
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });


  if (!course || course.instructorId !== userId) {
    console.log("Authorization FAILED");
    throw new Error("Unauthorized");
  }

  if (!data.title?.trim()) throw new Error("Title required");
  if (data.price < 0 || data.price > 1000000) {
    throw new Error("Price must be between 0 and 1,000,000");
  }

  console.log("About to update course...");
  await prisma.course.update({
    where: { id: courseId },
    data: {
      title: data.title.trim(),
      description: data.description?.trim() || null,
      price: data.price,
    },
  });

  revalidateTag("course:list", "max");
  revalidateTag(`course:${courseId}`, "max");
  console.log("Course updated successfully");
}

// ===== CHAPTER ACTIONS =====

export async function createChapter(
  courseId: string,
  userId: string,
  title: string
) {
  // Find course by ID
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  // Check ownership
  if (!course || course.instructorId !== userId) {
    throw new Error("Unauthorized");
  }
  // Validate title
  if (!title?.trim()) throw new Error("Chapter title required");

  // Count current chapters to set order index
  const chapterCount = await prisma.chapter.count({
    where: { courseId },
  });

  // Create new chapter
  const chapter = await prisma.chapter.create({
    data: {
      title: title.trim(),
      courseId,
      order: chapterCount + 1,
    },
  });

  revalidateTag(`course:${courseId}`, "max");
  return chapter;
}

export async function updateChapter(
  chapterId: string,
  userId: string,
  title: string
) {
  // Find chapter and course
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: { course: true },
  });

  // Check ownership
  if (!chapter || chapter.course.instructorId !== userId) {
    throw new Error("Unauthorized");
  }
  // Validate title
  if (!title?.trim()) throw new Error("Chapter title required");

  // Update chapter title
  const updated = await prisma.chapter.update({
    where: { id: chapterId },
    data: { title: title.trim() },
  });

  revalidateTag(`course:${chapter.courseId}`, "max");
  return updated;
}

export async function deleteChapter(chapterId: string, userId: string) {
  // Find chapter and course
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: { course: true },
  });

  // Check ownership
  if (!chapter || chapter.course.instructorId !== userId) {
    throw new Error("Unauthorized");
  }

  // Delete chapter
  const deleted = await prisma.chapter.delete({
    where: { id: chapterId },
  });

  revalidateTag(`course:${chapter.courseId}`, "max");
  return deleted;
}

// ===== LESSON ACTIONS =====

export async function createLesson(
  chapterId: string,
  userId: string,
  data: {
    title: string;
    youtubeVideoId: string;
    description: string | null;
  }
) {
  // Find chapter and course
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: { course: true },
  });

  // Check ownership
  if (!chapter || chapter.course.instructorId !== userId) {
    throw new Error("Unauthorized");
  }
  // Validate title and YouTube video ID
  if (!data.title?.trim()) throw new Error("Lesson title required");
  if (!data.youtubeVideoId?.trim()) throw new Error("YouTube ID required");

  // Count current lessons to set order index
  const lessonCount = await prisma.lesson.count({
    where: { chapterId },
  });

  // Create new lesson
  const lesson = await prisma.lesson.create({
    data: {
      title: data.title.trim(),
      youtubeVideoId: data.youtubeVideoId.trim(),
      description: data.description?.trim() || null,
      chapterId,
      order: lessonCount + 1,
    },
  });

  revalidateTag(`course:${chapter.courseId}`, "max");
  return lesson;
}

export async function updateLesson(
  lessonId: string,
  userId: string,
  data: {
    title: string;
    youtubeVideoId: string;
    description: string | null;
  }
) {
  // Find lesson, chapter, and course
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { chapter: { include: { course: true } } },
  });

  // Check ownership
  if (!lesson || lesson.chapter.course.instructorId !== userId) {
    throw new Error("Unauthorized");
  }
  // Validate title and YouTube video ID
  if (!data.title?.trim()) throw new Error("Lesson title required");
  if (!data.youtubeVideoId?.trim()) throw new Error("YouTube ID required");

  // Update lesson info
  const updated = await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      title: data.title.trim(),
      youtubeVideoId: data.youtubeVideoId.trim(),
      description: data.description?.trim() || null,
    },
  });

  revalidateTag(`course:${lesson.chapter.courseId}`, "max");
  return updated;
}

export async function deleteLesson(lessonId: string, userId: string) {
  // Find lesson, chapter, and course
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { chapter: { include: { course: true } } },
  });

  // Check ownership
  if (!lesson || lesson.chapter.course.instructorId !== userId) {
    throw new Error("Unauthorized");
  }

  // Delete lesson
  const deleted = await prisma.lesson.delete({
    where: { id: lessonId },
  });

  revalidateTag(`course:${lesson.chapter.courseId}`, "max");
  return deleted;
}
