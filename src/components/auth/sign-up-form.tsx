"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { routes } from "@/config/routes";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { Field, FormMessage, PasswordField, SubmitButton } from "./form-ui";

export function SignUpForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password"));

    if (password !== String(data.get("confirm"))) {
      setError("As senhas não são iguais.");
      return;
    }

    setPending(true);
    setError(null);
    const email = String(data.get("email")).trim();

    const { error: authError } = await authClient.signUp.email({
      name: String(data.get("name")).trim(),
      email,
      password,
      callbackURL: routes.appHome,
    });

    if (authError) {
      setError(authErrorMessage(authError));
      setPending(false);
      return;
    }
    router.push(`${routes.verifyEmail}?email=${encodeURIComponent(email)}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && <FormMessage tone="error">{error}</FormMessage>}
      <Field label="Nome" name="name" autoComplete="name" required maxLength={60} hint="Como a torcida vai te ver." />
      <Field label="E-mail" name="email" type="email" autoComplete="email" required inputMode="email" />
      <PasswordField
        label="Senha"
        name="password"
        autoComplete="new-password"
        required
        minLength={8}
        maxLength={128}
        hint="Pelo menos 8 caracteres."
      />
      <PasswordField label="Confirme a senha" name="confirm" autoComplete="new-password" required minLength={8} />
      <SubmitButton pending={pending}>{pending ? "Criando conta…" : "Criar conta"}</SubmitButton>
    </form>
  );
}
