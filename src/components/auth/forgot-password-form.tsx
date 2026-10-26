"use client";

import { useState, type FormEvent } from "react";
import { routes } from "@/config/routes";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { Field, FormMessage, SubmitButton } from "./form-ui";

export function ForgotPasswordForm() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    setError(null);

    const { error: authError } = await authClient.requestPasswordReset({
      email: String(data.get("email")).trim(),
      redirectTo: routes.resetPassword,
    });

    setPending(false);
    if (authError) {
      setError(authErrorMessage(authError));
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <FormMessage tone="success">
        Se houver uma conta com este e-mail, você vai receber um link para criar uma nova senha. Confira
        também a pasta de spam.
      </FormMessage>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && <FormMessage tone="error">{error}</FormMessage>}
      <Field label="E-mail da conta" name="email" type="email" autoComplete="email" required inputMode="email" />
      <SubmitButton pending={pending}>{pending ? "Enviando…" : "Enviar link"}</SubmitButton>
    </form>
  );
}
