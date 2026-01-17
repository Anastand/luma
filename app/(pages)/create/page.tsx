// This is a Next.js server component page that lets an instructor create a new course.
// I'll add lots of comments to help you understand each part!

import { Container } from "@/components/container"; // Nicely styled center/box layout
import { Button } from "@/components/ui/button";    // Pre-built styled button
import { Input } from "@/components/ui/input";      // Pre-built styled input field
import { Textarea } from "@/components/ui/textarea"; // Pre-built styled textarea
import { currentUser } from "@clerk/nextjs/server"; // Clerk auth to get the logged in user
import { redirect } from "next/navigation";         // Next.js redirect helper
import prisma from "@/lib/db/prisma";               // Our ORM, for database queries
import { createCourse } from "@/app/actions/createcourse";

export default async function CreatePage() {
  // 1. Get the current logged-in user.
  const user = await currentUser();
  // 2. If the user isn't logged in, kick them to sign-in page.
  if (!user) return redirect("/sign-in");

  // 3. Clerk stores the user's role in publicMetadata.
  //    Get the role (could be "STUDENT", "INSTRUCTOR", or undefined).
  const role = user.publicMetadata.role as string | undefined;

  // 4. Only allow INSTRUCTORs to create courses! If not, bounce them to courses list.
  if (role !== "INSTRUCTOR") return redirect("/Courses");

  // 5. If we get here, they're logged in AND an instructor, so render the form.
  return (
    <Container className="flex flex-col items-center justify-center">
      <h2>Create a New Course</h2>
      {/* 
        This <form> runs a server action when submitted.
        The server action gets the form values and creates a new course in the DB.
      */}
      <form
        action={createCourse }>
        {/* Title input */}
        <div>
          <label htmlFor="title">Title</label>
          {/* "required" means browser won't let you submit without filling this */}
          <Input name="title" id="title" required />
        </div>
        {/* Description input */}
        <div>
          <label htmlFor="description">Description</label>
          <Textarea name="description" id="description" />
        </div>
        {/* Price input */}
        <div>
          <label htmlFor="price">Price (USD)</label>
          <Input name="price" id="price" type="number" min="0" step="0.01" />
        </div>
        {/* Submit button */}
        <Button type="submit">Create</Button>
      </form>
    </Container>
  );
}

// In summary:
// - Only logged in INSTRUCTORs can access this page.
// - They fill in a simple form: title, description, price.
// - Submitting creates a course in the DB (linked to them as instructor).
// - Then they're sent to the Courses page.