"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { deleteCourse } from "./actions";
import type { SerializedCourse } from "@/types";
import { toast } from "sonner";

// Card component for displaying a single course with manage/delete options
export function CourseCard({
  course,
  userId,
}: {
  course: SerializedCourse;
  userId: string;
}) {
  // useTransition for handling async deletion and loading UI
  const [isPending, startTransition] = useTransition();

  const isOwner = userId === course.instructorId;

  // Confirm and delete course if user agrees
  const handleDelete = () => {
    if (confirm(`Delete "${course.title}"? This cannot be undone.`)) {
      startTransition(async () => {
        try {
          await deleteCourse(course.id, userId);
          toast.success(`"${course.title}" has been deleted`);
        } catch (error) {
          toast.error("Failed to delete course");
          console.error(error);
        }
      });
    }
  };

  // Format price for display
  const formattedPrice = parseFloat(course.price) === 0 
    ? "Free" 
    : `$${course.price}`;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Course thumbnail placeholder */}
      <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <span className="text-4xl">📚</span>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1 text-lg">{course.title}</CardTitle>
          <span className="text-sm font-semibold text-primary whitespace-nowrap">
            {formattedPrice}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Display course description or fallback */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
          {course.description || "No description provided"}
        </p>

        {/* Action buttons: View, Manage, Delete */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* View course page */}
          <Link href={`/course/${course.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View
            </Button>
          </Link>

          {/* Manage course page - only for owner */}
          {isOwner && (
            <Link href={`/Courses/${course.id}/manage`} className="flex-1 sm:flex-none">
              <Button variant="outline" className="w-full sm:w-auto">Manage</Button>
            </Link>
          )}

          {/* Delete course button - only for owner */}
          {isOwner && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
