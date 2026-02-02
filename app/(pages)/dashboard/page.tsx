import prisma from "@/lib/db/prisma";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./course-card";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { serializeCourses } from "@/lib/serialize";
import { EmptyState } from "@/components/empty-state";
import { BookOpen, GraduationCap, Plus } from "lucide-react";

export default async function DashboardPage() {
  // Get the current user; if not logged in, redirect to sign-in
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Get the user's role from Clerk
  const role = user.publicMetadata.role as string;

  // If user is an instructor, show their courses/dash
  if (role === "INSTRUCTOR") {
    // Get this user's courses from DB
    const courses = await prisma.course.findMany({
      where: { instructorId: user.id },
      orderBy: { createdAt: "desc" },
    });

    // Serialize courses to convert Decimal price to string
    const plainCourses = serializeCourses(courses);

    return (
      <Container className="py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your created courses
            </p>
          </div>
          <Link href="/create">
            <Button className="w-full sm:w-auto gap-2">
              <Plus className="w-4 h-4" />
              Create Course
            </Button>
          </Link>
        </div>

        {plainCourses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses yet"
            description="Get started by creating your first course and sharing your knowledge with students."
            action={
              <Link href="/create">
                <Button>Create your first course</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plainCourses.map((course) => (
              <CourseCard key={course.id} course={course} userId={user.id} />
            ))}
          </div>
        )}
      </Container>
    );
  }

  // Student view
  const userEnrolledCourses = await prisma.enrollment.findMany({
    where: { userId: user.id },
    include: {
      course: true,
    },
  });

  // Student view - show enrolled courses
  const plainCourses = userEnrolledCourses.map((enrollment) => ({
    ...enrollment.course,
    price: enrollment.course.price.toString(),
  }));

  return (
    <Container className="py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Learning</h1>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey
          </p>
        </div>
        <Link href="/Courses">
          <Button variant="outline" className="w-full sm:w-auto">
            Browse More Courses
          </Button>
        </Link>
      </div>

      {plainCourses.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No courses yet"
          description="Start learning by exploring our courses and enrolling in what interests you."
          action={
            <Link href="/Courses">
              <Button>Explore Courses</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plainCourses.map((course) => (
            <CourseCard key={course.id} course={course} userId={user.id} />
          ))}
        </div>
      )}
    </Container>
  );
}
