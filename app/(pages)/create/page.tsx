// This is a Next.js server component page that lets an instructor create a new course.
// I'll add lots of comments to help you understand each part!

import { Container } from "@/components/container"; // Nicely styled center/box layout
import { Button } from "@/components/ui/button";    // Pre-built styled button
import { Input } from "@/components/ui/input";      // Pre-built styled input field
import { Textarea } from "@/components/ui/textarea"; // Pre-built styled textarea
import { currentUser } from "@clerk/nextjs/server"; // Clerk auth to get the logged in user
import { redirect } from "next/navigation";         // Next.js redirect helper
import prisma from "@/lib/db/prisma";               // Our ORM, for database queries

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
        action={async (formData) => {
          "use server"; // This tells Next.js: this code runs on the server!

          // --- Get and process form values ---
          const title = (formData.get("title") as string)?.trim();              // Remove spaces from the start/end
          const description = (formData.get("description") as string)?.trim() || null; // Optional: if no description, store null
          const priceStr = formData.get("price");                              // Get as string (from input)
          const price = priceStr ? Number(priceStr) : 0;                       // Convert to a number (our DB expects a number)

          // --- Validate: Make sure required fields are filled in ---
          if (!title) {
            // This should be caught by the `required` attribute on the input too, but this is a backup.
            throw new Error("Title is required.");
          }

          // --- Actually create the course in the database ---
          // We need to connect the new course to the instructor (user).
          // WARNING: Our Prisma schema expects instructorId to be the Clerk "clerkId" field, not the primary key "id".
          // In Clerk's user object, "id" corresponds to clerkId!
          await prisma.course.create({
            data: {
              title,
              description,
              price,
              instructorId: user.id, // This is the Clerk user id (same as clerkId in our user model)
            },
          });

          // --- After successful creation, send them back to the Courses page! ---
          redirect("/Courses");
        }}
        className="space-y-6"
      >
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