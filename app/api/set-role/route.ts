// app/api/set-role/route.ts

// This API route lets a signed-in user pick their role as either "STUDENT" or "INSTRUCTOR".
// We'll check that the user is logged in, get the role from their request,
// update their info in our user database, and send back a simple response.

// --- Imports needed for this route ---
// clerkClient and currentUser help us talk to the authentication system (Clerk)
// redirect is for sending users to another page (not used here, but shown)
// prisma helps us talk to our app's database
// NextResponse is a helper for sending HTTP responses
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

// This function runs when a POST request is sent to this API endpoint
export async function POST(req: Request) {
  // 1. Get the current user (who is making the request)
  const user = await currentUser();

  // 2. If no user is logged in, stop and send "Unauthorized"
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 3. Get the role ("STUDENT" or "INSTRUCTOR") that the user wants to set
  // Try to read it from a form right away. If not found, try reading JSON instead.
  let role: string | undefined;
  try {
    const formData = await req.formData();
    role = formData.get("role")?.toString();
  } catch {
    // if not form data, maybe it's JSON
    const data = await req.json().catch(() => ({}));
    role = data.role;
  }

  // 4. Make sure the role is valid
  if (role !== "STUDENT" && role !== "INSTRUCTOR") {
    return new Response("Invalid role", { status: 400 });
  }

  // 5. Update the user's role in Clerk (authentication system)
  const client = await clerkClient();
  await client.users.updateUser(user.id, {
    publicMetadata: { ...user.publicMetadata, role },
  });

  // 6. Update or create the user in our app's database, and set their role there too
  await prisma.user.upsert({
    where: { clerkId: user.id },
    update: { role },
    create: {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      name: user.firstName || user.lastName || null,
      role,
    },
  });

  // 7. Respond that the change was successful
  console.log(NextResponse.json({ success: true }));
  redirect('/Courses')
}
