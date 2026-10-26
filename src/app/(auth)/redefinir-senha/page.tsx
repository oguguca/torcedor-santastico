import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Nova senha",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Crie uma nova senha</h1>
      <p className="mt-2 text-muted">Escolha uma senha que você não usa em outros sites.</p>
      <div className="mt-8">
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </>
  );
}
