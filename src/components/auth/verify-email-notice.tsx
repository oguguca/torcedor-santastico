"use client";

import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { authClient } from "@/lib/auth-client";
import { authErrorFromCode, authErrorMessage } from "@/lib/auth-errors";
import { buttonClasses } from "@/components/ui/button";
import { FormMessage } from "./form-ui";

export function VerifyEmailNotice() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const linkError = authErrorFromCode(searchParams.get("error"));
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function resend() {
    if (!email) return;
    setState("sending");
    const { error: authError } = await authClient.sendVerificationEmail({ email, callbackURL: routes.appHome });
    if (authError) {
      setError(authErrorMessage(authError));
      setState("error");
      return;
    }
    setState("sent");
  }

  return (
    <div>
      <MailCheck aria-hidden="true" className="size-10" strokeWidth={1.5} />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">Confirme seu e-mail</h1>
      <p className="mt-3 leading-relaxed text-muted">
        {email ? (
          <>
            Enviamos um link de confirmação para <strong className="text-ink">{email}</strong>. Abra o
            e-mail e toque no link para entrar.
          </>
        ) : (
          "Enviamos um link de confirmação para o seu e-mail. Abra a mensagem e toque no link para entrar."
        )}
      </p>

      <div className="mt-6 space-y-4">
        {linkError && <FormMessage tone="error">{linkError}</FormMessage>}
        {state === "sent" && <FormMessage tone="success">Link reenviado. Confira também a pasta de spam.</FormMessage>}
        {state === "error" && error && <FormMessage tone="error">{error}</FormMessage>}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {email && (
          <button
            type="button"
            onClick={resend}
            disabled={state === "sending"}
            className={buttonClasses({ variant: "secondary", className: "w-full disabled:opacity-70" })}
          >
            {state === "sending" ? "Reenviando…" : "Reenviar link"}
          </button>
        )}
        <Link href={routes.signIn} className={buttonClasses({ className: "w-full" })}>
          Ir para o login
        </Link>
      </div>
    </div>
  );
}
