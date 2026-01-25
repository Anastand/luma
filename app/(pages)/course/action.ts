"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma  from "@/lib/db/prisma";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(courseId: string) {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");

  const userId = user.id;

    await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: {
      clerkId: userId,
      email: user.emailAddresses[0]?.emailAddress || "no-email",
      name: user.firstName || user.lastName || null,
      role: "STUDENT",
    },
  });

  // Check if already enrolled
  const enrolled = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  if (enrolled) throw new Error("Already enrolled");

  // Fetch course
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) throw new Error("Course not found");

  const priceInDollars = course.price.toNumber();

  // FREE COURSE: create enrollment instantly
  if (priceInDollars === 0) {
    await prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });
    return { url: `/course/${courseId}?enrolled=true` };
  }

  // PAID COURSE: create Stripe checkout session
  if (!course.stripePriceId) {
    throw new Error("Course not set up for payment");
  }

  const session = await stripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: course.stripePriceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    // success_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${courseId}?success=true`,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${courseId}?canceled=true`,
    metadata: {
      userId,
      courseId,
    },
  });

  if (!session.url) throw new Error("Failed to create checkout session");

  return { url: session.url };
}