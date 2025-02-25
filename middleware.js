import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const PATHS = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  USER: "/users",
};

const protectedRoutes = Object.values(PATHS).filter(
  (path) => path !== PATHS.ROOT
);

export async function middleware(request) {
  // Check if user is logged in using authToken from cookies
  const accessToken = request.cookies.get("authToken")?.value;
  const user = Boolean(accessToken);

  // Also check for Facebook login session using NextAuth.js
  const sessionToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = user || sessionToken; // True if logged in via token or Facebook

  const url = new URL(request.url);

  // Redirect authenticated users from "/" to "/dashboard"
  if (isAuthenticated && url.pathname === PATHS.ROOT) {
    return NextResponse.redirect(new URL(PATHS.DASHBOARD, request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && protectedRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL(PATHS.ROOT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [PATHS.ROOT, ...protectedRoutes],
};
