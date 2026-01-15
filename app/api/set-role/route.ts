// app/api/set-role/route.ts
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const role = formData.get("role")?.toString() || (await req.json()).role;

  if (!["STUDENT", "INSTRUCTOR"].includes(role)) {
    return new Response("Invalid role", { status: 400 });
  }

  await (await clerkClient()).users.updateUser(user.id, {
    publicMetadata: { ...user.publicMetadata, role },
  });

  redirect("/Courses");
}
