import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
  const token = await getToken({ req: request, cookieName });
  const { pathname } = request.nextUrl;
  const authRoutes = ["/login", "/register"];
  const ProtectedRoutes = ["/cart", "checkout", "/profile"];
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && ProtectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/cart", "/login", "/register"],
};
