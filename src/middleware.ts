import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/crypto";

export function middleware(req: NextRequest) {
  const encryptedToken = req.cookies.get("mahatiToken");
  if (encryptedToken) {
    try {
      const token = decrypt(encryptedToken as any);
      if (token) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
