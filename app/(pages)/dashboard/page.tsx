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


    // console.log(userEnrolledCourses)
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">My Courses</h1>
          <Link href="/create">
            <Button className="w-full sm:w-auto">+ Create Course</Button>
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

  if (role != "INSTRUCTOR") {
    const userEnrolledCourses = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: {
        course: true
      }
    })

    // Student view - show enrolled courses
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">My Learning</h1>
          <Link href="/Courses">
            <Button variant="outline" className="w-full sm:w-auto">Browse More Courses</Button>
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
    )
  }
}