import { Archive, Award, Gauge, LineChart } from "lucide-react";
import { demoMatch, demoResult, demoSeasonAverages } from "@/data/match-cycle-demo";
import { cx } from "@/lib/cx";

const decimal = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const maxShare = Math.max(...demoResult.distribution);

const outcomes = [
  {
    icon: Gauge,
    title: "A nota da torcida é revelada",
    description: "A média de todos os votos válidos vira a nota oficial da torcida para aquele jogo.",
  },
  {
    icon: Award,
    title: "O craque é anunciado",
    description: "O jogador mais votado leva o título de craque da partida, com o percentual de votos.",
  },
  {
    icon: Archive,
    title: "A resenha vira arquivo",
    description: "A conversa fica guardada, só para leitura, como memória daquele jogo.",
  },
  {
    icon: LineChart,
    title: "Entra no histórico da temporada",
    description: "Jogo a jogo, as notas formam a linha da temporada na visão de quem torce.",
  },
];

/** Card de resultado, no formato pensado para compartilhar no grupo. */
function ResultCard() {
  return (
    <figure
      aria-label={`Exemplo de resultado: nota da torcida ${decimal.format(demoResult.average)}, craque camisa ${demoResult.craque.shirt}`}
      className="relative mx-auto w-full max-w-sm overflow-hidden bg-ink p-7 text-paper shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)]"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold">Torcedor Santastico</span>
        <span className="border border-paper/30 px-2 py-0.5 text-muted-on-ink">Exemplo</span>
      </div>

      <p className="mt-8 text-sm text-muted-on-ink">{demoMatch.label}</p>
      <p className="mt-1 text-sm text-muted-on-ink">Sala encerrada</p>

      <p className="mt-6 text-sm font-medium">Nota da torcida</p>
      <p className="text-[5.5rem] font-semibold leading-none tracking-[-0.05em] tabular-nums">
        {decimal.format(demoResult.average)}
      </p>

      <div aria-hidden="true" className="mt-6">
        <div className="flex h-14 items-end gap-1">
          {demoResult.distribution.map((share, note) => (
            <span
              key={note}
              style={{ height: `${Math.max(4, (share / maxShare) * 100)}%` }}
              className={cx("flex-1", note === Math.round(demoResult.average) ? "bg-paper" : "bg-paper/25")}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[0.625rem] text-muted-on-ink">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-3 border-t border-paper/15 pt-5">
        <Award aria-hidden="true" className="size-5" />
        <p className="text-sm">
          <span className="font-semibold">Craque: camisa {demoResult.craque.shirt}</span>
          <span className="text-muted-on-ink">
            {" "}
            · {demoResult.craque.position}, {demoResult.craque.share}% dos votos
          </span>
        </p>
      </div>
    </figure>
  );
}

function SeasonLine() {
  return (
    <div aria-hidden="true" className="mt-4 flex h-20 items-end gap-2">
      {demoSeasonAverages.map((item, index) => {
        const last = index === demoSeasonAverages.length - 1;
        return (
          <div key={item.round} className="flex flex-1 flex-col items-center gap-1.5">
            <span className={cx("text-[0.6875rem] tabular-nums", last ? "font-semibold" : "text-muted")}>
              {decimal.format(item.average)}
            </span>
            <span
              style={{ height: `${item.average * 5}px` }}
              className={cx("w-full max-w-8", last ? "bg-ink" : "bg-ink/20")}
            />
          </div>
        );
      })}
    </div>
  );
}

export function MatchResult() {
  return (
    <section id="resultado" aria-labelledby="result-title" className="bg-surface py-20 text-ink lg:py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ResultCard />
          <p className="mt-4 text-center text-xs text-muted">
            O resultado vira um card pronto para mandar no grupo. Dados de exemplo.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="result-title" className="headline text-section">
            Quando o prazo fecha
          </h2>
          <p className="mt-5 max-w-lg text-lead text-muted">
            Passadas as {demoMatch.windowHours} horas, a sala encerra e a torcida
            ganha o seu veredito sobre o jogo.
          </p>

          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {outcomes.map(({ icon: Icon, title, description }) => (
              <li key={title}>
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-ink/10 pt-6">
            <p className="text-sm font-medium">Nota da torcida, jogo a jogo (exemplo)</p>
            <SeasonLine />
          </div>
        </div>
      </div>
    </section>
  );
}
