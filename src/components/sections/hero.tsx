import { ArrowDown, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

/** Atividades pós-jogo, do degrau mais alto (mais estreito) ao mais baixo. */
const afterWhistle = ["Notas", "Palpites", "Melhor em campo", "Debate do jogo"];

function HeroVisual() {
  return (
    <figure className="relative overflow-hidden bg-ink p-6 text-paper sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="stripes absolute inset-y-0 right-0 w-1/3 text-paper opacity-[0.07] [mask-image:linear-gradient(to_left,black,transparent)]"
      />

      <figcaption className="relative flex items-baseline justify-between gap-4">
        <span className="eyebrow text-muted-on-ink">Depois do apito final</span>
        <span className="headline text-title">90+&apos;</span>
      </figcaption>

      <ol className="relative mt-8 flex flex-col gap-1.5 sm:mt-10">
        {afterWhistle.map((label, index) => (
          <li
            key={label}
            style={{ marginLeft: `${(afterWhistle.length - 1 - index) * 14}%` }}
            className="flex items-center justify-between gap-3 border-t-2 border-paper bg-paper/[0.08] px-4 py-3 sm:py-3.5"
          >
            <span className="eyebrow">{label}</span>
            <span aria-hidden="true" className="font-mono text-xs text-muted-on-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ol>

      {/* Linha do tempo: o jogo acaba aos 90', a conversa continua */}
      <div aria-hidden="true" className="relative mt-10 pb-1">
        <div className="relative h-5 font-mono text-xs text-muted-on-ink">
          <span className="absolute left-0">0&apos;</span>
          <span className="absolute left-[37.5%] -translate-x-1/2">45&apos;</span>
          <span className="absolute left-3/4 -translate-x-1/2 text-paper">90&apos;</span>
          <span className="absolute right-0">depois</span>
        </div>
        <div className="relative mt-2 h-0.5">
          <span className="absolute inset-y-0 left-0 w-3/4 bg-paper" />
          <span className="absolute left-3/4 right-0 top-0 border-t-2 border-dashed border-paper/60" />
          <span className="absolute left-[37.5%] top-1/2 h-2.5 w-px -translate-y-1/2 bg-paper" />
          <span className="absolute left-3/4 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 bg-paper" />
        </div>
      </div>
    </figure>
  );
}

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="border-b border-line">
      <div className="shell pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-muted animate-rise">
          <span>Plataforma independente</span>
          <span aria-hidden="true" className="h-px w-6 bg-muted" />
          <span>Em construção</span>
        </p>

        <h1
          id="hero-title"
          className="headline mt-6 text-display animate-rise [animation-delay:80ms] sm:mt-8"
        >
          A arquibancada <br className="hidden sm:block" />
          não acaba <span className="text-outline whitespace-nowrap">no apito.</span>
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col animate-rise [animation-delay:160ms] lg:col-span-5">
            <p className="max-w-xl text-lead text-muted">
              Um espaço para quem vive o Santos. Dê sua nota para o time, escolha
              o melhor em campo e divida a paixão pelo Peixe com outros santistas.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="#demonstracao">
                Veja como vai funcionar
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </ButtonLink>
              <ButtonLink href="#manifesto" variant="secondary">
                Leia o manifesto
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </ButtonLink>
            </div>
          </div>

          <div className="animate-rise [animation-delay:240ms] lg:col-span-7">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
