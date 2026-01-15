"use client";

import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) return <div className="p-8">Loading...</div>;
  if (!user) redirect("/sign-in");

  const setRole = async (role: "STUDENT" | "INSTRUCTOR") => {
    try {
      await fetch("/api/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      await user?.reload();
      router.push("/Courses"); // or /dashboard later
    } catch (err) {
      console.error(err);
      alert("Failed to set role");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Choose your role</CardTitle>
          <CardDescription>This sets what you can do on LUMA</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button size="lg" onClick={() => setRole("STUDENT")}>
            Student — I want to learn & buy courses
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setRole("INSTRUCTOR")}
          >
            Instructor — I want to create & sell courses
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
