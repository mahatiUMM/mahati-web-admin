import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./lib/utils";

export function middleware(req: NextRequest, res: NextResponse) {
  const token = getToken();

  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}