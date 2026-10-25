import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { AuthActions } from "./auth-actions";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#inicio" aria-label={`${siteConfig.name}, voltar ao início`} className="-my-2 py-2">
          <Logo />
        </a>

        <nav aria-label="Seções da página" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative py-2 text-[0.9375rem] font-medium text-muted transition-colors hover:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <AuthActions />
        </div>

        <MobileNav items={siteConfig.nav} footer={<AuthActions />} />
      </div>
    </header>
  );
}
