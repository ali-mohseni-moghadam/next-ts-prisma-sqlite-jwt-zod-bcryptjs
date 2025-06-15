import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const protectedPaths = ["/tasks", "/"];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isProtectedPath) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined");
      }
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("Invalid token in middleware:", error);
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/"],
};
