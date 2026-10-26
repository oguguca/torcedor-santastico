/** Rotas da plataforma, num lugar só para links, redirects e o proxy. */
export const routes = {
  home: "/",
  signIn: "/entrar",
  signUp: "/cadastro",
  forgotPassword: "/esqueci-senha",
  resetPassword: "/redefinir-senha",
  verifyEmail: "/verificar-email",
  appHome: "/inicio",
  matches: "/partidas",
  explore: "/explorar",
  profile: "/perfil",
  adminMatches: "/admin/partidas",
} as const;

/** Aceita só caminhos internos ("/inicio"), nunca URLs externas ("//site.com"). */
export function safeNextPath(value: string | null | undefined, fallback: string = routes.appHome): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
