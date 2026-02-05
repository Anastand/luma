"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { stripe } from "@/lib/stripe";
import { revalidateTag } from "next/cache";

export async function createCourse(formData: FormData) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if ((user.publicMetadata.role as string) !== "INSTRUCTOR") redirect("/Courses");

  await prisma.user.upsert({
    where: { clerkId: user.id },
    update: { role: "INSTRUCTOR" },
    create: {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress || "no-email",
      name: user.firstName || user.lastName || null,
      role: "INSTRUCTOR",
    },
  });

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const price = Number(formData.get("price") || 0);

  if (!title) throw new Error("Title required");
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000;

  if (price < MIN_PRICE || price > MAX_PRICE) {
    throw new Error(`Price must be between $${MIN_PRICE} and $${MAX_PRICE}`);
  }

  let stripeProductId: string | null = null;
  let stripePriceId: string | null = null;

  if (price > 0) {
    try {
      const stripeProduct = await stripe().products.create({
        name: title,
        description: description || undefined,
        metadata: {
          internal_id: "temp",
        },
      });

      stripeProductId = stripeProduct.id;

      const stripePrice = await stripe().prices.create({
        product: stripeProduct.id,
        unit_amount: Math.round(price * 100),
        currency: 'usd',
      });

      stripePriceId = stripePrice.id;
    } catch (error) {
      console.error('Stripe error:', error);
      throw new Error('Failed to create Stripe product');
    }
  }

  const course = await prisma.course.create({
    data: {
      title,
      description,
      price,
      instructorId: user.id,
      stripeProductId,
      stripePriceId,
    },
  });

  revalidateTag("course:list", "max");
  revalidateTag(`course:${course.id}`, "max");

  redirect("/dashboard");
}
