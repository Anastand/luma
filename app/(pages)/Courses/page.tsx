import prisma from "@/lib/db/prisma";
import { Container } from "@/components/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { BookOpen, Search } from "lucide-react";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      instructor: {
        select: {
          name: true,
          email: true,
        },
      },
      chapters: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Container className="py-6 sm:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">All Courses</h1>
          <p className="text-muted-foreground mt-1">
            Discover courses from our expert instructors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>

      {courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses available"
          description="Check back soon! New courses are being added regularly."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const isFree = course.price.toNumber() === 0;
            const chapterCount = course.chapters.length;

            return (
              <Card key={course.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Thumbnail placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="text-5xl relative z-10">📚</span>
                  <Badge className="absolute top-3 right-3 z-10" variant={isFree ? "secondary" : "default"}>
                    {isFree ? "Free" : `$${course.price.toString()}`}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-1">
                    by {course.instructor.name || course.instructor.email}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                    {course.description || "No description provided"}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}</span>
                    <Badge variant="outline" className="text-xs">
                      {isFree ? "Free" : "Paid"}
                    </Badge>
                  </div>

                  <Link href={`/course/${course.id}`}>
                    <Button className="w-full">View Course</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}
