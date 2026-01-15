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

export default async function Onboarding() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const role = user.publicMetadata.role as string | undefined;

  if (role) {
    redirect("/Courses"); // already has role → skip onboarding
  }

  // If we reach here → logged in, but no role yet → show picker
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Choose your role</CardTitle>
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
