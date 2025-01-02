import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const headers = new Headers(req.headers);
    headers.set("x-current-path", req.nextUrl.pathname);
    return NextResponse.next({ headers });
}

export const config = {
    matcher: [
      // match all routes except static files and APIs
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
  };