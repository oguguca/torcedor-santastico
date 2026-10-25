import { Award, Gauge, MessagesSquare, Target, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";

type Pillar = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Fundo do bloco, alternado como numa faixa de placares. */
  surface: string;
};

const pillars: Pillar[] = [
  {
    icon: MessagesSquare,
    title: "Resenha do jogo",
    description: "Uma sala por partida, aberta por 72 horas depois do apito final.",
    surface: "bg-ink text-paper",
  },
  {
    icon: Gauge,
    title: "Nota da torcida",
    description: "Sua nota de 0 a 10 para o Santos. A média sai quando a sala fecha.",
    surface: "bg-[#1f1f1f] text-paper",
  },
  {
    icon: Award,
    title: "Craque da partida",
    description: "Seu voto no melhor em campo, anunciado no fechamento da sala.",
    surface: "bg-ink text-paper",
  },
  {
    icon: Target,
    title: "Palpites e histórico",
    description: "Seu palpite antes de cada jogo e o registro de tudo de que você participou.",
    surface: "bg-surface text-ink",
  },
];

export function PillarsStrip() {
  return (
    <section id="funcionalidades" aria-labelledby="pillars-title">
      <h2 id="pillars-title" className="sr-only">
        Funcionalidades planejadas
      </h2>
      <ul className="grid grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ icon: Icon, title, description, surface }) => {
          const isLight = surface.includes("bg-surface");
          return (
            <li
              key={title}
              className={cx("flex flex-col items-center px-4 py-10 text-center sm:px-6 lg:py-14", surface)}
            >
              <span
                className={cx(
                  "eyebrow border px-2 py-1 text-[0.6875rem]",
                  isLight ? "border-ink/20 text-muted" : "border-paper/20 text-muted-on-ink",
                )}
              >
                Planejado
              </span>
              <Icon aria-hidden="true" className="mt-8 size-10" strokeWidth={1.25} />
              <h3 className="mt-6 text-base font-semibold sm:text-lg">{title}</h3>
              <p
                className={cx(
                  "mt-2 max-w-60 text-sm leading-relaxed",
                  isLight ? "text-muted" : "text-muted-on-ink",
                )}
              >
                {description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
