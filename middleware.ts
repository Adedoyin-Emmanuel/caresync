import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const allCookies = request.cookies.getAll();
  console.log(allCookies);

  const isPublicPath =
    path === "/auth/login" ||
    path === "/auth/signup" ||
    path === "/auth/verifyemail" ||
    path === "/auth/forgotpassword" ||
    path === "/";

  const token = request.cookies.get("accessToken")?.value || null;
  const tokenData: any = token ? jwt.decode(token) : null;


  // if it is a protected route and there is no token
  if (!isPublicPath && !tokenData) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  if (isPublicPath && tokenData) {
    if (tokenData?.role === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.nextUrl));
    } else if (tokenData?.role === "hospital") {
      return NextResponse.redirect(
        new URL("/hospital/dashboard", request.nextUrl)
      );
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/auth/:path*"],
};
