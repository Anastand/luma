import prisma  from "@/lib/db/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    // Verify Stripe signature
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata?.userId;
      const courseId = session.metadata?.courseId;

      if (!userId || !courseId) {
        throw new Error("Missing userId or courseId in metadata");
      }

      // Create enrollment
      await prisma.enrollment.create({
        data: {
          userId,
          courseId,
        },
      });

      console.log(`✅ Enrollment created: user=${userId}, course=${courseId}`);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal error", { status: 500 });
  }
}