import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const cookie = req.cookies.get("token");

  if (cookie) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
