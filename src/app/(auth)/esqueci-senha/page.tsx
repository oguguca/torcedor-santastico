import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Esqueci a senha",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Esqueci a senha</h1>
      <p className="mt-2 text-muted">Digite seu e-mail e enviaremos um link para criar uma nova senha.</p>
      <div className="mt-8">
        <ForgotPasswordForm />
      </div>
      <p className="mt-8 text-sm text-muted">
        Lembrou?{" "}
        <Link href={routes.signIn} className="font-medium text-ink underline underline-offset-4">
          Voltar ao login
        </Link>
      </p>
    </>
  );
}
