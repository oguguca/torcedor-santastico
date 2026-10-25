"use client";

import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { buttonClasses } from "@/components/ui/button";

type Status = "idle" | "copied" | "error";

const messages: Record<Status, string> = {
  idle: "",
  copied: "Link copiado. É só colar na conversa.",
  error: "Não foi possível copiar o link automaticamente.",
};

/** Compartilha a página pelo menu nativo ou, sem ele, copia o link. */
export function ShareButton() {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 5000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  async function handleShare() {
    const url = `${window.location.origin}${window.location.pathname}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: siteConfig.name, url });
        return;
      } catch (error) {
        // Cancelar o menu nativo não é erro; outras falhas caem para a cópia.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button type="button" onClick={handleShare} className={buttonClasses()}>
        <Share2 aria-hidden="true" className="size-4" />
        Compartilhar com outro santista
      </button>
      <p role="status" className="min-h-5 text-sm text-muted">
        {messages[status]}
      </p>
    </div>
  );
}
