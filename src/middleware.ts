import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Protect routes starting with /dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      // Redirect to sign-in page if not authenticated
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to /dashboard and its subroutes
};
