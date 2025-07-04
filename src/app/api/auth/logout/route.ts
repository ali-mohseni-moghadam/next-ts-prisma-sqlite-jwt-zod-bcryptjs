import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/auth/login", req.url));
  response.cookies.delete("token");
  return response;
}
