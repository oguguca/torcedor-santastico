"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { routes } from "@/config/routes";
import { authClient } from "@/lib/auth-client";
import { authErrorFromCode, authErrorMessage } from "@/lib/auth-errors";
import { buttonClasses } from "@/components/ui/button";
import { FormMessage, PasswordField, SubmitButton } from "./form-ui";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const linkError = authErrorFromCode(searchParams.get("error"));
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (linkError || !token) {
    return (
      <div className="space-y-6">
        <FormMessage tone="error">{linkError ?? "Link incompleto. Peça um novo link de redefinição."}</FormMessage>
        <Link href={routes.forgotPassword} className={buttonClasses({ className: "w-full" })}>
          Pedir novo link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="space-y-6">
        <FormMessage tone="success">Senha alterada. Por segurança, encerramos as outras sessões.</FormMessage>
        <Link href={routes.signIn} className={buttonClasses({ className: "w-full" })}>
          Entrar com a nova senha
        </Link>
      </div>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newPassword = String(data.get("password"));
    if (newPassword !== String(data.get("confirm"))) {
      setError("As senhas não são iguais.");
      return;
    }
    setPending(true);
    setError(null);
    const { error: authError } = await authClient.resetPassword({ newPassword, token: token! });
    setPending(false);
    if (authError) {
      setError(authErrorMessage(authError));
      return;
    }
    setDone(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && <FormMessage tone="error">{error}</FormMessage>}
      <PasswordField
        label="Nova senha"
        name="password"
        autoComplete="new-password"
        required
        minLength={8}
        maxLength={128}
        hint="Pelo menos 8 caracteres."
      />
      <PasswordField label="Confirme a nova senha" name="confirm" autoComplete="new-password" required minLength={8} />
      <SubmitButton pending={pending}>{pending ? "Salvando…" : "Salvar nova senha"}</SubmitButton>
    </form>
  );
}
