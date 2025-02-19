import { NextResponse } from "next/server";

export function middleware(req) {
  const authToken = req.cookies.get("authToken");

  if (!authToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
