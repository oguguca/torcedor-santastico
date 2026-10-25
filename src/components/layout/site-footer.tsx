import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { photoCredits } from "@/data/photo-credits";

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
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

      <div className="shell pb-12">
        <details className="group border-t border-paper/15 pt-6 text-sm text-muted-on-ink">
          <summary className="inline-flex min-h-10 cursor-pointer items-center gap-2 font-medium text-paper marker:content-none">
            Créditos das fotos
            <span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photoCredits.map((credit) => (
              <li key={credit.source} className="leading-relaxed">
                <a
                  href={credit.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper underline-offset-4 hover:underline"
                >
                  {credit.subject}
                </a>
                <br />
                {credit.author}, {credit.license}. Adaptada: preto e branco
                {credit.license.startsWith("CC") ? ", recorte" : ""}.
              </li>
            ))}
          </ul>
        </details>
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
