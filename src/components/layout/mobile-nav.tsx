"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { NavItem } from "@/config/site";

type MobileNavProps = {
  items: NavItem[];
  /** Conteúdo extra no fim do painel (ex.: acesso à conta). */
  footer?: ReactNode;
};

export function MobileNav({ items, footer }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="-mr-3 inline-flex size-12 items-center justify-center"
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-paper/10 bg-ink text-paper"
      >
        <nav aria-label="Seções da página" className="shell">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-b border-paper/10">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="headline flex min-h-16 items-center text-[1.75rem] leading-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {footer && <div className="shell py-6">{footer}</div>}
      </div>
    </div>
  );
}
