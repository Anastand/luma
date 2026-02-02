import { Prisma } from "@prisma/client";

// Base Course type with all fields from Prisma
export type Course = Prisma.CourseGetPayload<Record<string, never>>;

// Course with instructor relation
export type CourseWithInstructor = Prisma.CourseGetPayload<{
  include: { instructor: true };
}>;

// Course with chapters and lessons
export type CourseWithChaptersAndLessons = Prisma.CourseGetPayload<{
  include: {
    chapters: {
      include: {
        lessons: true;
      };
    };
  };
}>;

// Serialized version with price as string instead of Decimal
export type SerializedCourse = Omit<Course, "price"> & {
  price: string;
};

export type SerializedCourseWithInstructor = Omit<CourseWithInstructor, "price"> & {
  price: string;
};

export type SerializedCourseWithChaptersAndLessons = Omit<CourseWithChaptersAndLessons, "price"> & {
  price: string;
};

// Enrollment with course
export type EnrollmentWithCourse = Prisma.EnrollmentGetPayload<{
  include: { course: true };
}>;

// Chapter with lessons
export type ChapterWithLessons = Prisma.ChapterGetPayload<{
  include: { lessons: true };
}>;

// User type
export type User = Prisma.UserGetPayload<Record<string, never>>;

// Lesson type
export type Lesson = Prisma.LessonGetPayload<Record<string, never>>;

// Chapter type
export type Chapter = Prisma.ChapterGetPayload<Record<string, never>>;

// Enrollment type
export type Enrollment = Prisma.EnrollmentGetPayload<Record<string, never>>;
