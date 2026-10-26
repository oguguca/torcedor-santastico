import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailNotice } from "@/components/auth/verify-email-notice";

export const metadata: Metadata = {
  title: "Confirme seu e-mail",
  robots: { index: false },
};

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailNotice />
    </Suspense>
  );
}
