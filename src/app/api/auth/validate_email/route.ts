import { temEmail } from "@/service/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) return NextResponse.json({ exists: false });
  const has = await temEmail(email);
  if (!has) return NextResponse.json({ exists: false });

  return NextResponse.json({ exists: true });
}
