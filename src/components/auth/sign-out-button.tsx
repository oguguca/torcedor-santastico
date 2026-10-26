"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await authClient.signOut();
    router.replace(routes.home);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className={buttonClasses({ variant: "secondary", className: "disabled:opacity-70" })}
    >
      <LogOut aria-hidden="true" className="size-4" />
      {pending ? "Saindo…" : "Sair"}
    </button>
  );
}
