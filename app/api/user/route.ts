import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConfig";
import User from "@/utils/models/user.model";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await User.findOne({ email }).lean();
  return NextResponse.json({ user });
}
