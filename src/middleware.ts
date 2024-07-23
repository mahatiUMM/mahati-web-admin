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
      console.error("Failed to decrypt token:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
