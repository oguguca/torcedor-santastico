"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { routes, safeNextPath } from "@/config/routes";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { Field, FormMessage, PasswordField, SubmitButton } from "./form-ui";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get("next"));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    setError(null);

    const { error: authError } = await authClient.signIn.email({
      email: String(data.get("email")),
      password: String(data.get("password")),
      rememberMe: data.get("remember") === "on",
      callbackURL: next,
    });

    if (authError) {
      setError(authErrorMessage(authError));
      setPending(false);
      return;
    }
    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && <FormMessage tone="error">{error}</FormMessage>}
      <Field label="E-mail" name="email" type="email" autoComplete="email" required inputMode="email" />
      <PasswordField label="Senha" name="password" autoComplete="current-password" required minLength={8} />
      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="flex min-h-11 items-center gap-2.5">
          <input type="checkbox" name="remember" defaultChecked className="size-4 accent-ink" />
          Manter conectado
        </label>
        <Link href={routes.forgotPassword} className="font-medium underline underline-offset-4">
          Esqueci a senha
        </Link>
      </div>
      <SubmitButton pending={pending}>{pending ? "Entrando…" : "Entrar"}</SubmitButton>
    </form>
  );
}
