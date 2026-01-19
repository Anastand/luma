// server component
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { Container } from "@/components/container";
import { ManageChaptersClient } from "./manage-client";

export default async function ManageCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Auth check
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // 2. Get course ID
  const { id: courseId } = await params;

  // 3. Fetch course with all chapters and lessons
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  // 4. Check course exists and user owns it
  if (!course) {
    return <div>Course not found</div>;
  }

  if (course.instructorId !== user.id) {
    redirect("/dashboard");
  }

  // 5. Convert Decimal to string for client
  const courseData = {
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price.toString(),
    chapters: course.chapters,
  };

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <ManageChaptersClient course={courseData} userId={user.id} />
      </div>
    </Container>
  );
}