import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const cookie = req.cookies.get("token");

  if (cookie) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
