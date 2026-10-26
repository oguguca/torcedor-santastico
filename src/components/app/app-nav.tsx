"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNav } from "@/config/app-nav";
import { cx } from "@/lib/cx";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Links da área logada no cabeçalho (desktop). */
export function AppTopNav() {
  return <TopNavList pathname={usePathname()} />;
}

/** Abas fixas no rodapé (celular e tablet), ao alcance do polegar. */
export function AppBottomNav() {
  return <BottomNavList pathname={usePathname()} />;
}

/**
 * Versões sem hook: usadas também como fallback do <Suspense> (sem aba ativa),
 * para a navegação aparecer já no HTML inicial.
 */
export function TopNavList({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Navegação principal" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {appNav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "inline-flex min-h-10 items-center px-4 text-[0.9375rem] font-medium transition-colors",
                  active ? "bg-paper/10 text-paper" : "text-muted-on-ink hover:text-paper",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function BottomNavList({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-paper/10 bg-ink text-paper pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-4">
        {appNav.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                  active ? "text-paper" : "text-muted-on-ink",
                )}
              >
                <Icon aria-hidden="true" className="size-5" strokeWidth={active ? 2.25 : 1.75} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
