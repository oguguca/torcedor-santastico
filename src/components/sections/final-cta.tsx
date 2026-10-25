import { ArrowUp } from "lucide-react";
import { BrandMark } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { ShareButton } from "./share-button";

export function FinalCta() {
  return (
    <section id="participar" aria-labelledby="cta-title" className="relative overflow-hidden py-20 lg:py-32">
      <BrandMark className="pointer-events-none absolute bottom-16 right-6 hidden size-64 text-surface lg:block lg:bottom-24 lg:right-10 lg:size-[22rem]" />

      <div className="shell relative">
        <p className="eyebrow text-muted">Em construção</p>
        <h2
          id="cta-title"
          className="headline mt-5 max-w-5xl text-[clamp(2.5rem,0.9rem+6.4vw,6.75rem)] leading-[0.92]"
        >
          A arquibancada está sendo montada.
        </h2>
        <p className="mt-8 max-w-xl text-lead text-muted">
          O Torcedor Santastico ainda está em desenvolvimento. O cadastro abre
          quando a primeira versão estiver pronta para receber a torcida. Até
          lá, chame outros santistas para conhecer a ideia.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-start">
          <ShareButton />
          <ButtonLink href="#inicio" variant="secondary">
            Voltar ao início
            <ArrowUp
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
