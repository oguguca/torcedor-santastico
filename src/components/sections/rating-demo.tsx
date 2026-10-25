import { Info, Star } from "lucide-react";
import {
  demoMatchLabel,
  demoMood,
  demoPlayerRatings,
  type DemoMoodSlice,
} from "@/data/rating-demo";
import { cx } from "@/lib/cx";

const formatRating = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Preenchimentos distintos por padrão, não só por tom, para o termômetro. */
const moodFills = [
  "bg-ink",
  "bg-[repeating-linear-gradient(135deg,var(--color-ink)_0_2px,transparent_2px_6px)]",
  "bg-line",
];

function MoodBar({ slices }: { slices: DemoMoodSlice[] }) {
  return (
    <div>
      <div aria-hidden="true" className="flex h-3 w-full gap-0.5">
        {slices.map((slice, index) => (
          <span
            key={slice.label}
            style={{ width: `${slice.percent}%` }}
            className={cx("h-full", moodFills[index % moodFills.length])}
          />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-3 gap-3">
        {slices.map((slice, index) => (
          <li key={slice.label} className="flex flex-col gap-1">
            <span className="flex items-center gap-2 text-sm text-muted">
              <span
                aria-hidden="true"
                className={cx("size-2.5 shrink-0 border border-ink", moodFills[index % moodFills.length])}
              />
              {slice.label}
            </span>
            <span className="headline text-2xl leading-none">{slice.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DemoBoard() {
  const best = demoPlayerRatings.reduce((top, player) =>
    player.rating > top.rating ? player : top,
  );
  const average =
    demoPlayerRatings.reduce((sum, player) => sum + player.rating, 0) /
    demoPlayerRatings.length;

  return (
    <article
      aria-label="Demonstração com dados de exemplo"
      className="bg-paper text-ink"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
        <p className="eyebrow text-muted">Partida de exemplo</p>
        <p className="eyebrow border border-ink px-2.5 py-1 font-semibold">
          Demonstração · dados de exemplo
        </p>
      </header>

      <div className="grid gap-6 border-b border-line px-5 py-6 sm:grid-cols-[1fr_auto] sm:items-end sm:px-7">
        <div>
          <h3 className="headline text-title">{demoMatchLabel}</h3>
          <p className="mt-2 text-sm text-muted">Notas da torcida, de 0 a 10</p>
        </div>
        <dl className="flex gap-8">
          <div>
            <dt className="eyebrow text-muted">Média do time</dt>
            <dd className="headline mt-1 text-4xl leading-none">{formatRating(average)}</dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">Melhor em campo</dt>
            <dd className="headline mt-1 text-4xl leading-none">Camisa {best.shirt}</dd>
          </div>
        </dl>
      </div>

      <ol className="divide-y divide-line">
        {demoPlayerRatings.map((player) => {
          const isBest = player === best;
          return (
            <li
              key={player.shirt}
              className={cx(
                "grid grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 px-5 py-3 sm:grid-cols-[3.25rem_1fr_auto] sm:px-7",
                isBest && "bg-ink text-paper",
              )}
            >
              <span className="headline text-3xl leading-none tabular-nums">
                <span className="sr-only">Camisa </span>
                {player.shirt}
              </span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-2 text-sm font-medium">
                  {player.position}
                  {isBest && (
                    <span className="eyebrow inline-flex items-center gap-1 text-[0.6875rem]">
                      <Star aria-hidden="true" className="size-3 fill-current" />
                      Melhor em campo
                    </span>
                  )}
                </p>
                <div
                  aria-hidden="true"
                  className={cx("mt-2 h-1.5 w-full", isBest ? "bg-paper/20" : "bg-surface")}
                >
                  <div
                    style={{ width: `${player.rating * 10}%` }}
                    className={cx("bar-grow h-full", isBest ? "bg-paper" : "bg-ink")}
                  />
                </div>
              </div>
              <span className="font-mono text-lg font-semibold tabular-nums">
                <span className="sr-only">Nota </span>
                {formatRating(player.rating)}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-line px-5 py-6 sm:px-7">
        <h4 className="eyebrow text-muted">Termômetro da torcida</h4>
        <div className="mt-4">
          <MoodBar slices={demoMood} />
        </div>
      </div>
    </article>
  );
}

export function RatingDemo() {
  return (
    <section
      id="demonstracao"
      aria-labelledby="demo-title"
      className="bg-ink text-paper"
    >
      <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-5 lg:pr-6">
          <p className="eyebrow text-muted-on-ink">Prévia do produto</p>
          <h2 id="demo-title" className="headline mt-5 text-section">
            Depois do apito, a nota é sua.
          </h2>
          <p className="mt-6 max-w-md text-lead text-muted-on-ink">
            A ideia é que, ao fim de cada partida, cada santista avalie os
            jogadores e escolha o melhor em campo. Somadas, as notas mostram como
            a torcida enxergou o jogo.
          </p>

          <p className="mt-10 flex max-w-md gap-3 border-l-2 border-paper pl-4 text-sm leading-relaxed text-muted-on-ink">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-paper" />
            <span>
              Esta é uma demonstração visual. Partida, posições, notas e
              percentuais são fictícios e não representam nenhum jogo nem
              nenhuma opinião real da torcida.
            </span>
          </p>
        </div>

        <div className="lg:col-span-7">
          <DemoBoard />
        </div>
      </div>
    </section>
  );
}
