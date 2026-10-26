import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SignInForm } from "@/components/auth/sign-in-form";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false },
};

export default function SignInPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Entrar</h1>
      <p className="mt-2 text-muted">Bom te ver de volta, santista.</p>
      <div className="mt-8">
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
      <p className="mt-8 text-sm text-muted">
        Ainda não tem conta?{" "}
        <Link href={routes.signUp} className="font-medium text-ink underline underline-offset-4">
          Criar conta
        </Link>
      </p>
    </>
  );
}
