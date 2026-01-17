import prisma from "@/lib/db/prisma";
import { Container } from "@/components/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    include: { instructor: { select: { name: true, email: true } } },
  });

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description || "No description"}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${course.price.toString()}</p>
              <p className="text-sm text-muted-foreground">by {course.instructor.name || course.instructor.email}</p>
              <Link href={`/courses/${course.id}`}>
                <Button className="w-full mt-4">View</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}