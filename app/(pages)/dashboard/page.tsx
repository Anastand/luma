// Dashboard displays:
// - For instructors: their own courses list with manage/create options.
// - For other users: a "My Learning" view of their enrolled courses and a button to browse more.

import prisma from "@/lib/db/prisma";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./course-card";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const role = user.publicMetadata.role as string;

  if (role === "INSTRUCTOR") {
    const courses = await prisma.course.findMany({
      where: { instructorId: user.id },
    });

    const plainCourses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      price: String(course.price),
      instructorId: course.instructorId,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    }));

    return (
      <Container className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
          <Link href="/create">
            <Button>+ Create Course</Button>
          </Link>
        </div>
        {plainCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No courses yet.</p>
            <Link href="/create">
              <Button>Create your first course</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plainCourses.map((course) => (
              <CourseCard key={course.id} course={course} userId={user.id} />
            ))}
          </div>
        )}
      </Container>
    );
  }

  if (role !== "INSTRUCTOR") {
    const userEnrolledCourses = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: { course: true }
    });

    const plainCourses = userEnrolledCourses.map((enrollment) => ({
      id: enrollment.course.id,
      title: enrollment.course.title,
      description: enrollment.course.description,
      price: String(enrollment.course.price),
      instructorId: enrollment.course.instructorId,
      createdAt: enrollment.course.createdAt,
      updatedAt: enrollment.course.updatedAt,
    }));

    return (
      <Container className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Learning</h1>
          <Link href="/Courses">
            <Button variant="outline">Browse More Courses</Button>
          </Link>
        </div>
        {plainCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No courses yet.</p>
            <Link href="/Courses">
              <Button>Explore Courses</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plainCourses.map((course: any) => (
              <CourseCard key={course.id} course={course} userId={user.id} />
            ))}
          </div>
        )}
      </Container>
    );
  }
}