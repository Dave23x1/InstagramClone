import { NextResponse } from "next/server";

const PATHS = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  USER: "/users",
};

const protectedRoutes = Object.values(PATHS).filter(
  (path) => path !== PATHS.ROOT
);

export function middleware(request) {
  const accessToken = request.cookies.get("authToken")?.value;
  const user = Boolean(accessToken);
  const url = new URL(request.url);

  if (user && url.pathname === PATHS.ROOT) {
    return NextResponse.redirect(new URL(PATHS.DASHBOARD, request.url));
  }

  if (!user && protectedRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL(PATHS.ROOT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [PATHS.ROOT, ...protectedRoutes],
};
