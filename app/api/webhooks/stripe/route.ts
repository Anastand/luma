import prisma from "@/lib/db/prisma";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Webhook received:", body.type);

    if (body.type === "checkout.session.completed") {
      const metadata = body.data.object.metadata;
      const userId = metadata?.userId;
      const courseId = metadata?.courseId;

      console.log("Metadata:", { userId, courseId });

      if (!userId || !courseId) {
        throw new Error("Missing userId or courseId");
      }

      // Ensure user exists
      await prisma.user.upsert({
        where: { clerkId: userId },
        update: {},
        create: {
          clerkId: userId,
          email: `${userId}@clerk.local`,
          name: null,
          role: "STUDENT",
        },
      });

      await prisma.enrollment.create({
        data: { userId, courseId },
      });

      console.log(`✅ Enrollment created: ${userId} → ${courseId}`);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal error", { status: 500 });
  }
}