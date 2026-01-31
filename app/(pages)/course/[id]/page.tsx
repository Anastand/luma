import prisma from "@/lib/db/prisma";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutButton } from "./checkout-button";

export default async function CoursePage({
	params,
}: {
	params: Promise<{ id: string }>; // next js 16 bs
}) {
	const { id } = await params; // ← AWAIT params

	const course = await prisma.course.findUnique({
		where: { id },
		include: { instructor: true },
	});

	if (!course) notFound();
	const user = await currentUser();
	const isOwner = user?.id === course.instructorId;

	let isEnrolled = false;
	if (user) {
		isEnrolled = !!(await prisma.enrollment.findUnique({
			where: {
				userId_courseId: {
					userId: user.id,
					courseId: id,
				},
			},
		}));
	}
	return (
		<Container className="py-6 sm:py-12 max-w-2xl">
			<Link
				href="/Courses"
				className="text-sm text-primary underline mb-4 sm:mb-6 block"
			>
				← Back to Courses
			</Link>

			<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
				{course.title}
			</h1>
			<p className="text-muted-foreground mt-2 text-sm sm:text-base">
				by {course.instructor.name || course.instructor.email}
			</p>
			<p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
				{course.description || "No description provided"}
			</p>

			<div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-card rounded-lg border">
				<p className="text-2xl sm:text-3xl font-bold">
					${course.price.toString()}
				</p>

				{isOwner ? (
					<Link href={`/course/${id}/view`}>
						<Button className="mt-4 w-full">View Course</Button>
					</Link>
				) : user ? (
					isEnrolled ? (
						<Link href={`/course/${id}/view`}>
							<Button className="mt-4 w-full">View Course</Button>
						</Link>
					) : (
						<CheckoutButton courseId={id} price={course.price.toString()} /> // ← CHANGE: use id, not params.id
					)
				) : (
					<Link href="/sign-in">
						<Button className="mt-4 w-full">Sign in to buy</Button>
					</Link>
				)}
			</div>
		</Container>
	);
}
