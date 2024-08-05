import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("cookieToken");
  console.log("Token from cookie: ", token); // Verificar si el token está disponible

  const publicRoutes = ["/login", "/register"];
  console.log("Pathname: ", request.nextUrl.pathname); // Verificar la ruta actual

  if (token && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const protectedRoutes = ["/dashboard", "/dashboard/orders"];
  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/register", "/login", "/dashboard/:path*"],
};
