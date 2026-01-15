import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = await req.json();
  if (!["STUDENT", "INSTRUCTOR"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }


  await (await clerkClient()).users.updateUser(user.id, {
    publicMetadata: {
      ...user.publicMetadata,
      role,
    },
  });

  return NextResponse.json({ success: true });
}
