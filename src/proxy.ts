import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/config/routes";

/**
 * Checagem otimista: sem cookie de sessão, nem renderiza a área logada.
 * Não substitui a validação real, feita em cada página com `requireUser()`.
 */
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const signIn = new URL(routes.signIn, request.url);
  signIn.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(signIn);
}

export const config = {
  matcher: ["/inicio/:path*", "/partidas/:path*", "/explorar/:path*", "/perfil/:path*", "/admin/:path*"],
};
