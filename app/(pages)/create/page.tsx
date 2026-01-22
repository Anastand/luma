import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { stripe } from "@/lib/stripe";

async function createCourse(formData: FormData) {
  "use server";
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if ((user.publicMetadata.role as string) !== "INSTRUCTOR") redirect("/Courses");

  // ✅ UPSERT user first
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

  // 🔴 NEW: Create Stripe product + price (only if paid course)
  let stripeProductId: string | null = null;
  let stripePriceId: string | null = null;

  if (price > 0) {
    try {
      // Create product in Stripe
      const stripeProduct = await stripe.products.create({
        name: title,
        description: description || undefined,
        metadata: {
          internal_id: "temp", // Will keep track of course
        },
      });

      stripeProductId = stripeProduct.id;

      // Create price for product
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: Math.round(price * 100), // Convert dollars to cents
        currency: 'usd',
      });

      stripePriceId = stripePrice.id;
    } catch (error) {
      console.error('Stripe error:', error);
      throw new Error('Failed to create Stripe product');
    }
  }

  // Create course with Stripe IDs
  await prisma.course.create({
    data: {
      title,
      description,
      price,
      instructorId: user.id,
      stripeProductId,
      stripePriceId,
    },
  });

  redirect("/dashboard");
}

export default function CreatePage() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Create Course</h2>
        </div>
        <form action={createCourse} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (USD)</Label>
            <Input
              name="price"
              id="price"
              type="number"
              min="0"
              max="1000000"
              step="0.01"
              defaultValue="0"
              required
            />
          </div>
          <Button type="submit" className="w-full">Create</Button>
        </form>
      </div>
    </Container>
  );
}