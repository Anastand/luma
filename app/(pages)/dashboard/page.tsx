// WTF did we do? 
//
// 1. We checked the current user (via Clerk) and redirected to /sign-in if no user found.
// 2. Determined the user's role from their public metadata.
// 3. If the user is an INSTRUCTOR, we:
//      - Loaded all courses from the DB where the instructorId matches the current user's id.
//      - Converted any Decimal price values to strings for serialization.
//      - Rendered a list of CourseCards for each course, or a prompt/CTA if they have no courses yet.
// 4. If the user is *not* an instructor (i.e., a student or some other role), we:
//      - Showed them a My Learning dashboard indicating their enrolled courses will appear here in future.
//      - Provided a button to browse all available courses.
//
// The logic is:
//   - Instructors manage their own course listings from this dashboard and can create courses.
//   - Non-instructors see a placeholder for their learning and can browse courses instead.
//
// File implementation below.

import prisma from "@/lib/db/prisma";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./course-card";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    });

    // Convert price (Decimal) to string for rendering/serialization
    // how the f this works: convert each course from DB to a plain JS object where price becomes a string (for UI/serialization)
    const plainCourses = courses.map((course) => {
      return {
        id: course.id,
        title: course.title,
        description: course.description,
        price: String(course.price), // Decimal price -> string for UI and safety
        instructorId: course.instructorId,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
      };
    });

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

  // For students/other users, show a learning placeholder and a browse link
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8">My Learning</h1>
      <p className="text-muted-foreground">
        Your enrolled courses will appear here (coming soon).
      </p>
      <Link href="/Courses" className="mt-4 block">
        <Button>Browse Courses</Button>
      </Link>
    </Container>
  );
}