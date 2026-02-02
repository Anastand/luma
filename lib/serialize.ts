import type {
  Course,
  CourseWithInstructor,
  CourseWithChaptersAndLessons,
  SerializedCourse,
  SerializedCourseWithInstructor,
  SerializedCourseWithChaptersAndLessons,
} from "@/types";

// Decimal type from Prisma
type Decimal = Course["price"];

/**
 * Serialize a course by converting Decimal price to string
 */
export function serializeCourse(course: Course): SerializedCourse {
  return {
    ...course,
    price: course.price.toString(),
  };
}

/**
 * Serialize a course with instructor
 */
export function serializeCourseWithInstructor(
  course: CourseWithInstructor
): SerializedCourseWithInstructor {
  return {
    ...course,
    price: course.price.toString(),
  };
}

/**
 * Serialize a course with chapters and lessons
 */
export function serializeCourseWithChaptersAndLessons(
  course: CourseWithChaptersAndLessons
): SerializedCourseWithChaptersAndLessons {
  return {
    ...course,
    price: course.price.toString(),
  };
}

/**
 * Serialize an array of courses
 */
export function serializeCourses(courses: Course[]): SerializedCourse[] {
  return courses.map(serializeCourse);
}

/**
 * Convert a Decimal to string safely
 */
export function decimalToString(value: Decimal | string): string {
  if (typeof value === "string") return value;
  return value.toString();
}

/**
 * Format price for display
 */
export function formatPrice(price: Decimal | string | number): string {
  const numericPrice =
    typeof price === "string" ? parseFloat(price) : typeof price === "number" ? price : price.toNumber();

  if (numericPrice === 0) return "Free";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericPrice);
}
