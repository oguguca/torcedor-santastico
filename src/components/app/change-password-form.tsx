"use client";

import { useState, type FormEvent } from "react";
import { FormMessage, PasswordField, SubmitButton } from "@/components/auth/form-ui";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";

export function ChangePasswordForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const newPassword = String(data.get("newPassword"));
    if (newPassword !== String(data.get("confirm"))) {
      setMessage({ tone: "error", text: "As senhas novas não são iguais." });
      return;
    }

    setPending(true);
    setMessage(null);
    const { error } = await authClient.changePassword({
      currentPassword: String(data.get("currentPassword")),
      newPassword,
      revokeOtherSessions: true,
    });
    setPending(false);

    if (error) {
      const text =
        error.code === "INVALID_PASSWORD" ? "A senha atual está incorreta." : authErrorMessage(error);
      setMessage({ tone: "error", text });
      return;
    }
    form.reset();
    setMessage({ tone: "success", text: "Senha alterada. As sessões em outros aparelhos foram encerradas." });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {message && <FormMessage tone={message.tone}>{message.text}</FormMessage>}
      <PasswordField label="Senha atual" name="currentPassword" autoComplete="current-password" required />
      <PasswordField
        label="Nova senha"
        name="newPassword"
        autoComplete="new-password"
        required
        minLength={8}
        maxLength={128}
        hint="Pelo menos 8 caracteres."
      />
      <PasswordField label="Confirme a nova senha" name="confirm" autoComplete="new-password" required minLength={8} />
      <div className="sm:max-w-xs">
        <SubmitButton pending={pending}>{pending ? "Alterando…" : "Alterar senha"}</SubmitButton>
      </div>
    </form>
  );
}
