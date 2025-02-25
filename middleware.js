import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const accessToken = request.cookies.get("authToken")?.value;
  const user = Boolean(accessToken);

  // Check Facebook session
  const sessionToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = user || sessionToken;
  const url = new URL(request.url);

  // Redirect authenticated users from "/" to "/dashboard"
  if (isAuthenticated && url.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated && ["/dashboard", "/users"].includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// ✅ Hardcoded matcher paths (DO NOT USE VARIABLES)
export const config = {
  matcher: ["/", "/dashboard", "/users"],
};
