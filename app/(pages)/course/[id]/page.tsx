import prisma from "@/lib/db/prisma";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: { instructor: true },
  });

  if (!course) notFound(); // Better 404 handling

  const user = await currentUser();
  const isOwner = user?.id === course.instructorId;

  return (
    <Container className="py-12 max-w-2xl">
      <Link href="/Courses" className="text-sm text-primary underline mb-6 block">
        ← Back to Courses
      </Link>
      
      <h1 className="text-4xl font-bold">{course.title}</h1>
      <p className="text-muted-foreground mt-2">
        by {course.instructor.name || course.instructor.email}
      </p>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        {course.description || "No description provided"}
      </p>
      
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <p className="text-3xl font-bold">${course.price.toString()}</p>
        {isOwner ? (
          <p className="text-sm text-green-600 mt-4">✓ You own this course</p>
        ) : (
          <Button className="mt-4 w-full">Buy Now (Coming Soon)</Button>
        )}
      </div>
    </Container>
  );
}