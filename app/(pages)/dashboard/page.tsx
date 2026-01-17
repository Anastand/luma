import prisma from "@/lib/db/prisma";
import { Container } from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

// The DashboardPage is the main page shown at "/dashboard".
// It displays different content depending on whether the user is an INSTRUCTOR or a STUDENT.
export default async function DashboardPage() {
  // Get the currently logged in user (returns their Clerk user object)
  const user = await currentUser();
  // If no user is logged in, redirect to the sign-in page
  if (!user) redirect('/sign-in');

  // Get the user's role from Clerk user public metadata
  const role = user.publicMetadata.role as string;

  if (role === "INSTRUCTOR") {
    // =============================
    // INSTRUCTOR DASHBOARD SECTION
    // =============================

    // Find all courses where the current user is the instructor
    const courses = await prisma.course.findMany({
      where: { instructorId: user.id },
    });

    return (
      <Container className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
          {/* Button that links to the "create a new course" page */}
          <Link href="/create">
            <Button>+ Create Course</Button>
          </Link>
        </div>

        {courses.length === 0 ? (
          // If instructor has no courses yet, show a message and a button to create their first course
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No courses yet.</p>
            <Link href="/create">
              <Button>Create your first course</Button>
            </Link>
          </div>
        ) : (
          // If instructor has courses, show them in a grid of cards
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  {/* Course title */}
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Course price and description */}
                  <p className="text-lg font-bold mb-2">${course.price.toString()}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.description || "No description"}
                  </p>
                  <div className="flex gap-2">
                    {/* Buttons: View, Edit, Delete 
                        ('Edit' and 'Delete' are placeholders for now) */}
                    <Link href={`/course/${course.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">View</Button>
                    </Link>
                    <Button variant="outline">Edit</Button>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    );
  }

  // =========================
  // STUDENT DASHBOARD SECTION
  // =========================
  // For users with any other role (or no role): 
  // Only a placeholder, actual enrolled courses listing to be implemented later.
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8">My Learning</h1>
      <p className="text-muted-foreground">
        {/* This message informs students that the "enrolled courses" feature is not yet available */}
        Your enrolled courses will appear here (coming soon).
      </p>
      {/* Button for students to browse all available courses */}
      <Link href="/Courses" className="mt-4 block">
        <Button>Browse Courses</Button>
      </Link>
    </Container>
  );
}