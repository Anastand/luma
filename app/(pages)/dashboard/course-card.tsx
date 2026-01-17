"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { deleteCourse } from "./actions";

export function CourseCard({
  course,
  userId,
}: {
  course: {
    id: string;
    title: string;
    description: string | null;
    price: string;  // ← Now string, not Decimal
    instructorId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Delete "${course.title}"? This cannot be undone.`)) {
      startTransition(() => deleteCourse(course.id, userId));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-bold mb-2">${course.price}</p>
        <p className="text-sm text-muted-foreground mb-4">
          {course.description || "No description"}
        </p>

        <div className="flex gap-2">
          <Link href={`/course/${course.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View
            </Button>
          </Link>

          <Link href={`/dashboard/${course.id}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>

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