// app/onboarding/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import prisma from "@/lib/db/prisma";

export default async function Onboarding() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Check if user already has a role in Clerk metadata
  const clerkRole = user.publicMetadata?.role as string | undefined;

  // Also check database (more reliable)
  let dbRole: string | undefined;
  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: { role: true },
    });
    dbRole = dbUser?.role;
  } catch {
    // If DB fails, rely on Clerk metadata
    dbRole = undefined;
  }

  // If user has role in either Clerk or DB, they're already onboarded
  if (clerkRole || dbRole) {
    redirect("/dashboard");
  }

  // If we reach here → logged in, but no role yet → show picker
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-lg border-border/70 bg-card/80">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Choose your role</CardTitle>
          <CardDescription>This cannot be changed later.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form action="/api/set-role" method="POST">
            <input type="hidden" name="role" value="STUDENT" />
            <Button type="submit" size="lg" className="w-full">
              Student — I want to learn & buy courses
            </Button>
          </form>

          <form action="/api/set-role" method="POST">
            <input type="hidden" name="role" value="INSTRUCTOR" />
            <Button
              type="submit"
              size="lg"
              variant="outline"
              className="w-full"
            >
              Instructor — I want to create & sell courses
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
