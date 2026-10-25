import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { cx } from "@/lib/cx";

/**
 * Acesso a login e cadastro. Enquanto as rotas não existirem (Etapa 2),
 * mostra apenas um aviso, sem links quebrados. Para ativar, preencha
 * `siteConfig.auth`.
 */
export function AuthActions({ className }: { className?: string }) {
  const { loginHref, signupHref } = siteConfig.auth;

  if (!loginHref && !signupHref) {
    return (
      <p
        className={cx(
          "eyebrow inline-flex items-center gap-2 border border-line px-3 py-2 text-muted",
          className,
        )}
      >
        <span aria-hidden="true" className="size-1.5 bg-ink" />
        Cadastro em breve
      </p>
    );
  }

  return (
    <div className={cx("flex items-center gap-2", className)}>
      {loginHref && (
        <Link
          href={loginHref}
          className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-semibold hover:underline hover:underline-offset-4"
        >
          Entrar
        </Link>
      )}
      {signupHref && (
        <ButtonLink href={signupHref} className="min-h-11 px-5">
          Criar conta
        </ButtonLink>
      )}
    </div>
  );
}
