import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AuthRoutes = ["/login"];
const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // If no access token, redirect to login unless it's an auth route
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }

  // If user is logged in and trying to access auth routes, redirect to dashboard
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For protected routes, allow if token exists
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // For other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/unauthorized", "/profile"],
};
