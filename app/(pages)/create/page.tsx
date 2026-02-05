"use client";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTransition } from "react";
import { createCourse } from "./action";

export default function CreatePage() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => createCourse(formData));
  };

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen py-10 sm:py-12">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">
            Instructor tools
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Create Course</h2>
          <p className="text-muted-foreground mt-2">
            Build a premium learning experience around your best content.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" placeholder="Course name" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} placeholder="What will students learn?" disabled={isPending} />
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
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">Set to 0 for a free course.</p>
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
