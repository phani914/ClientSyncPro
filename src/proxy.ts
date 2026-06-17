import { NextResponse, type NextRequest } from "next/server";
import { parseSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth-token";

const authRoutes = ["/", "/forgot-password"];
const protectedRoutes = [
  "/clients",
  "/dashboard",
  "/projects",
  "/reports",
  "/roles",
  "/settings",
  "/users",
];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = parseSessionToken(
    request.cookies.get(SESSION_COOKIE_NAME)?.value,
  );
  const isAuthenticated = Boolean(session);

  if (isProtectedRoute(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/forgot-password",
    "/clients/:path*",
    "/dashboard/:path*",
    "/projects/:path*",
    "/reports/:path*",
    "/roles/:path*",
    "/settings/:path*",
    "/users/:path*",
  ],
};
