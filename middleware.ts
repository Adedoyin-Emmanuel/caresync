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
  const tokenData: any = jwt.decode(token!);

  // if it is a protected route and there is no token
  if (!token || !tokenData) {
    if (
      request.nextUrl.pathname !== "/auth/login" &&
      request.nextUrl.pathname !== "/auth/signup" &&
      request.nextUrl.pathname !== "/auth/forgot-password" &&
      request.nextUrl.pathname !== "/auth/verified" &&
      request.nextUrl.pathname !== "/auth/reset-password"
    ) {
      console.log("Trying to visit a protected route with no token data!");
      //return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
  }

  if (isPublicPath && tokenData) {
    if (tokenData?.role === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.nextUrl));
    } else if (tokenData?.role === "hospital") {
      return NextResponse.redirect(
        new URL("/hospital/dashboard", request.nextUrl)
      );
    } else {
      console.log("No token role!");
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
  }

  if (tokenData) {
    // Check if the path starts with "/user/"
    if (path.startsWith("/user/")) {
      // Check the user's role
      if (tokenData.role !== "user") {
        // Redirect to a suitable page based on the user's role
        return NextResponse.redirect(
          new URL("/hospital/dashboard", request.nextUrl)
        );
      }
    }

    // Check if the path starts with "/hospital/"
    if (path.startsWith("/hospital/")) {
      // Check the user's role
      if (tokenData.role !== "hospital") {
        // Redirect to a suitable page based on the user's role
        return NextResponse.redirect(
          new URL("/user/dashboard", request.nextUrl)
        );
      }
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/auth/:path*", "/user/:path*", "/hospital/:path*"],
};
