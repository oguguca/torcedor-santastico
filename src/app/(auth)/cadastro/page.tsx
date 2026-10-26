import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Criar conta",
  robots: { index: false },
};

export default function SignUpPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Criar conta</h1>
      <p className="mt-2 text-muted">Seu lugar na arquibancada do Torcedor Santastico.</p>
      <div className="mt-8">
        <SignUpForm />
      </div>
      <p className="mt-8 text-sm text-muted">
        Já tem conta?{" "}
        <Link href={routes.signIn} className="font-medium text-ink underline underline-offset-4">
          Entrar
        </Link>
      </p>
    </>
  );
}
