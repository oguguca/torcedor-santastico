import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import peleTrio from "@/assets/pele-trio.png";
import torcida from "@/assets/torcida-arquibancada.jpg";

/** Granulação de filme em SVG, para unir foto e fundo no mesmo tom. */
const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate -mt-16 flex min-h-svh overflow-hidden bg-ink text-paper lg:min-h-[max(100svh,44rem)]"
    >
      {/* Fundo: a torcida da Vila fora de foco, como profundidade de campo rasa */}
      <div aria-hidden="true" className="absolute inset-0 -z-30">
        <Image
          src={torcida}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          placeholder="blur"
          className="scale-110 object-cover object-[50%_35%] blur-[14px] brightness-[0.58] contrast-[0.95]"
        />
      </div>

      {/* Montagem com três momentos do Pelé, saindo pela borda de baixo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[28%] top-16 -z-20 [mask-image:linear-gradient(to_top,transparent,black_18%)] lg:bottom-0 lg:left-[30%] lg:top-auto lg:h-[86%] lg:[mask-image:linear-gradient(to_top,transparent,black_14%),linear-gradient(to_right,transparent,black_22%)] lg:[mask-composite:intersect] xl:left-[34%]"
      >
        <Image
          src={peleTrio}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover object-[42%_100%] drop-shadow-[0_0_60px_rgb(0_0_0/0.45)] lg:object-contain lg:object-[100%_100%]"
        />
      </div>
      <p className="sr-only">
        Montagem com três fotos de Pelé: com a Copa do Mundo, com a camisa do
        Santos e saltando para comemorar um gol.
      </p>

      {/* Luz e sombra: vinheta, leitura do texto e granulação */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_62%_40%,transparent_35%,rgb(10_10_10/0.7)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-linear-to-r from-ink/70 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-linear-to-t from-ink via-ink/75 to-transparent lg:h-1/4 lg:via-ink/20"
      />
      <div
        aria-hidden="true"
        style={{ backgroundImage: grain }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] mix-blend-overlay"
      />

      <div className="shell flex flex-col justify-end pb-16 pt-32 lg:justify-center lg:pb-16 lg:pt-40">
        <div className="max-w-lg">
          <h1
            id="hero-title"
            className="text-[clamp(2.5rem,1.5rem+3.2vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.03em] text-balance animate-rise"
          >
            O maior time da terra
          </h1>

          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-paper/75 animate-rise [animation-delay:100ms] sm:text-base">
            A cada apito final, abre a sala do jogo por 72 horas: dê sua nota para
            o Santos, eleja o craque da partida e entre na resenha com outros
            santistas.
          </p>

          <div className="mt-8 flex flex-col gap-3 animate-rise [animation-delay:200ms] sm:flex-row">
            <ButtonLink href="#como-funciona" tone="dark">
              Veja como funciona
              <ArrowDown
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </ButtonLink>
            <ButtonLink href="#manifesto" tone="dark" variant="secondary">
              Leia o manifesto
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
