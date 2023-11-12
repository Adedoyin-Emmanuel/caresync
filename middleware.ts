import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/auth/login" ||
    path === "/auth/signup" ||
    path === "/auth/forgot-password" ||
    path === "/auth/verified" ||
    path === "/auth/reset-password";

  const token = request.cookies.get("refreshToken")?.value || null;
  const tokenData: any = token ? jwt.decode(token) : null;

  // if it is a protected route and there is no token
  if (!isPublicPath && !tokenData) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isPublicPath && tokenData) {
    if (tokenData?.role === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    } else if (tokenData?.role === "hospital") {
      return NextResponse.redirect(new URL("/hospital/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (tokenData) {
    // Check if the path starts with "/user/"
    if (path.startsWith("/user/")) {
      // Check the user's role
      if (tokenData.role !== "user") {
        // Redirect to a suitable page based on the user's role
        return NextResponse.redirect(
          new URL("/hospital/dashboard", request.url)
        );
      }
    }

    // Check if the path starts with "/hospital/"
    if (path.startsWith("/hospital/")) {
      // Check the user's role
      if (tokenData.role !== "hospital") {
        // Redirect to a suitable page based on the user's role
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
      }
    }
  }
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_static|_vercel|favicon.ico|sitemap.xml|robots.txt|caresync.png|doctor.png|favicon.ico|next.svg|vercel.svg|fonts/|assets/).*)",
  ],
};
