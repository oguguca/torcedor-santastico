import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-muted-on-ink">
            Uma plataforma feita por santistas, para santistas. Em construção.
          </p>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-3">
          <h2 className="eyebrow text-muted-on-ink">Nesta página</h2>
          <ul className="mt-4 space-y-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-10 items-center hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="eyebrow text-muted-on-ink">Aviso</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-on-ink">
            O {siteConfig.name} é um projeto independente. Não é oficial, não é
            afiliado e não tem patrocínio do Santos Futebol Clube. Nomes e
            marcas do clube pertencem aos seus respectivos titulares.
          </p>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-muted-on-ink sm:flex-row sm:justify-between">
          <p>© {siteConfig.name}</p>
          <p>Feito por torcedores.</p>
        </div>
      </div>
    </footer>
  );
}
