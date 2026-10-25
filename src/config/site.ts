export type NavItem = {
  label: string;
  href: string;
};

type AuthLinks = {
  /** Rota de login. `null` enquanto a autenticação não existir (Etapa 2). */
  loginHref: string | null;
  /** Rota de cadastro. `null` enquanto a autenticação não existir (Etapa 2). */
  signupHref: string | null;
};

export const siteConfig = {
  name: "Torcedor Santastico",
  description:
    "Plataforma independente feita para a torcida do Santos: avalie o time, dê seus palpites e acompanhe a opinião dos santistas depois de cada jogo. Em construção.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Demonstração", href: "#demonstracao" },
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Manifesto", href: "#manifesto" },
  ] satisfies NavItem[],
  auth: {
    loginHref: null,
    signupHref: null,
  } satisfies AuthLinks as AuthLinks,
};
