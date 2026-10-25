import type { ReactNode } from "react";
import { demoMatch, demoResult } from "@/data/match-cycle-demo";
import { cx } from "@/lib/cx";

const decimal = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Miniatura do palpite: placar em branco esperando o torcedor. */
function GuessPreview() {
  return (
    <div className="flex items-center gap-2.5 text-sm font-medium">
      <span>Santos</span>
      <span className="flex size-9 items-center justify-center border border-ink/20 text-muted">?</span>
      <span className="text-muted">×</span>
      <span className="flex size-9 items-center justify-center border border-ink/20 text-muted">?</span>
    </div>
  );
}

/** Miniatura da sala aberta. */
function OpenPreview() {
  return (
    <div className="inline-flex items-center gap-2.5 border border-ink px-3 py-2 text-sm font-medium">
      <span className="size-2 animate-pulse bg-ink motion-reduce:animate-none" />
      Sala aberta, fecha em {demoMatch.windowHours}h
    </div>
  );
}

/** Miniatura da nota: escala de 0 a 10 com uma nota marcada. */
function RatingPreview() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 11 }, (_, value) => (
        <span
          key={value}
          className={cx(
            "flex size-6 items-center justify-center text-[0.6875rem]",
            value === 8 ? "bg-ink text-paper" : "border border-ink/15 text-muted",
          )}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

/** Miniatura do resultado revelado. */
function ResultPreview() {
  return (
    <div className="flex items-end gap-4">
      <span className="text-5xl font-semibold leading-none tracking-tight tabular-nums">
        {decimal.format(demoResult.average)}
      </span>
      <span className="pb-1 text-sm leading-snug text-muted">
        Nota da torcida
        <br />
        Craque: camisa {demoResult.craque.shirt}
      </span>
    </div>
  );
}

type Track = "between" | "whistle" | "window" | "close";

type Phase = {
  time: string;
  title: string;
  description: string;
  preview: ReactNode;
  track: Track;
};

const phases: Phase[] = [
  {
    time: "Antes do jogo",
    title: "Dê seu palpite",
    description: "Crave o placar até o apito inicial. No fim, a plataforma mostra quem acertou.",
    preview: <GuessPreview />,
    track: "between",
  },
  {
    time: "Apito final",
    title: "A sala do jogo abre",
    description: "Cada partida ganha uma sala própria, só com santistas e só sobre aquele jogo.",
    preview: <OpenPreview />,
    track: "whistle",
  },
  {
    time: `Durante ${demoMatch.windowHours} horas`,
    title: "Resenha, nota e craque",
    description:
      "Comente o jogo, dê de 0 a 10 para a atuação do Santos e eleja o craque. Dá para mudar o voto até o prazo fechar.",
    preview: <RatingPreview />,
    track: "window",
  },
  {
    time: "Prazo encerrado",
    title: "Sai a nota da torcida",
    description:
      "A média é revelada, o craque é anunciado e a resenha vira arquivo. No próximo jogo, tudo recomeça.",
    preview: <ResultPreview />,
    track: "close",
  },
];

/** Trilho da linha do tempo: tracejado entre jogos, sólido durante a sala. */
function TrackSegment({ track }: { track: Track }) {
  const solid = track === "whistle" || track === "window";
  return (
    <div aria-hidden="true" className="relative hidden h-4 md:block">
      {solid ? (
        <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-ink" />
      ) : (
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-ink/25" />
      )}
      {track === "between" && <span className="absolute left-0 top-1/2 size-2.5 -translate-y-1/2 bg-ink/30" />}
      {track === "whistle" && <span className="absolute left-0 top-1/2 size-4 -translate-y-1/2 bg-ink" />}
      {track === "close" && (
        <span className="absolute left-0 top-1/2 size-4 -translate-y-1/2 border-[3px] border-ink bg-paper" />
      )}
    </div>
  );
}

export function MatchCycle() {
  return (
    <section id="como-funciona" aria-labelledby="cycle-title" className="bg-paper py-20 text-ink lg:py-28">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="cycle-title" className="headline text-section">
              Cada jogo do Santos abre um ciclo
            </h2>
          </div>
          <p className="max-w-md text-lead text-muted lg:col-span-5">
            Começa no palpite, ganha vida no apito final e termina{" "}
            {demoMatch.windowHours} horas depois, com a nota da torcida. Depois,
            recomeça no próximo jogo.
          </p>
        </div>

        <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-0">
          {phases.map((phase) => (
            <li
              key={phase.title}
              className={cx(
                "border-l-2 pl-5 md:border-l-0 md:pl-0",
                phase.track === "window" || phase.track === "whistle" ? "border-ink" : "border-ink/20 border-dashed",
              )}
            >
              <TrackSegment track={phase.track} />
              <div className="md:pr-8 md:pt-6">
                <p className="text-sm font-medium text-muted">{phase.time}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{phase.title}</h3>
                <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-muted">{phase.description}</p>
                <div aria-hidden="true" className="mt-7">
                  {phase.preview}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-xs text-muted">Ilustrações com dados de exemplo.</p>
      </div>
    </section>
  );
}
