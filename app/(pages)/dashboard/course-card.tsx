"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { deleteCourse } from "./actions";

// Card component for displaying a single course with manage/delete options
export function CourseCard({
  course,
  userId,
}: {
  course: any;
  userId: string;
}) {
  // useTransition for handling async deletion and loading UI
  const [isPending, startTransition] = useTransition();

  // Confirm and delete course if user agrees
  const handleDelete = () => {
    if (confirm(`Delete "${course.title}"? This cannot be undone.`)) {
      startTransition(() => deleteCourse(course.id, userId));
    }
  };

  return (
    <Card>
      <CardHeader>
        {/* Course title */}
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Display course price */}
        <p className="text-lg font-bold mb-2">${course.price.toString()}</p>
        {/* Display course description or fallback */}
        <p className="text-sm text-muted-foreground mb-4">
          {course.description || "No description"}
        </p>

        {/* Action buttons: View, Manage, Delete */}
        <div className="flex gap-2">
          {/* View course page */}
          <Link href={`/course/${course.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View
            </Button>
          </Link>

          {/* Manage course page */}
          <Link href={`/Courses/${course.id}/manage`}>
            <Button variant="outline">Manage</Button>
          </Link>

          {/* Delete course button */}
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}