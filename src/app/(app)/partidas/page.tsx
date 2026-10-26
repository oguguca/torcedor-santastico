import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import { EmptyState } from "@/components/app/empty-state";
import { MatchRow } from "@/components/matches/match-row";
import { NextMatchCard } from "@/components/matches/next-match-card";
import { santosResult } from "@/lib/matches/format";
import { getFinishedMatches, getUnsettledMatches, getUpcomingMatches, isSantos } from "@/lib/matches/queries";

export const metadata: Metadata = { title: "Partidas", robots: { index: false } };

export default async function MatchesPage() {
  const [upcoming, finished, unsettled] = await Promise.all([
    getUpcomingMatches(),
    getFinishedMatches(),
    getUnsettledMatches(),
  ]);
  const [next, ...rest] = upcoming;

  const record = { win: 0, draw: 0, loss: 0 };
  for (const m of finished) {
    const result = santosResult(m, isSantos(m.home));
    if (result) record[result] += 1;
  }
  const hasData = upcoming.length + finished.length + unsettled.length > 0;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-[clamp(2.25rem,1.8rem+2vw,3.25rem)] font-semibold leading-none tracking-tight">Partidas</h1>
          <p className="mt-3 max-w-xl text-lead text-muted">O Santos na temporada 2026, em todas as competições.</p>
        </div>
        {finished.length > 0 && (
          <dl className="flex gap-6 text-center" aria-label="Campanha na temporada 2026">
            {(
              [
                ["Vitórias", record.win],
                ["Empates", record.draw],
                ["Derrotas", record.loss],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dd className="text-3xl font-semibold tabular-nums">{value}</dd>
                <dt className="text-xs text-muted">{label}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>

      {!hasData && (
        <EmptyState icon={CalendarClock} title="Calendário ainda não sincronizado" className="mt-10">
          Os jogos aparecem aqui assim que a sincronização com a fonte de dados rodar pela primeira vez.
        </EmptyState>
      )}

      {next && (
        <div className="mt-10">
          <NextMatchCard m={next} />
        </div>
      )}

      {rest.length > 0 && (
        <section aria-labelledby="calendar-title" className="mt-12">
          <h2 id="calendar-title" className="mb-3 text-sm font-semibold">
            Calendário
          </h2>
          <ul className="border-t border-line">
            {rest.map((m) => (
              <MatchRow key={m.id} m={m} />
            ))}
          </ul>
        </section>
      )}

      {unsettled.length > 0 && (
        <section aria-labelledby="unsettled-title" className="mt-12">
          <h2 id="unsettled-title" className="mb-3 text-sm font-semibold">
            Adiados ou suspensos
          </h2>
          <ul className="border-t border-line">
            {unsettled.map((m) => (
              <MatchRow key={m.id} m={m} />
            ))}
          </ul>
        </section>
      )}

      {finished.length > 0 && (
        <section aria-labelledby="results-title" className="mt-12">
          <h2 id="results-title" className="mb-3 text-sm font-semibold">
            Resultados
          </h2>
          <ul className="border-t border-line">
            {finished.map((m) => (
              <MatchRow key={m.id} m={m} />
            ))}
          </ul>
        </section>
      )}

      {hasData && (
        <p className="mt-8 text-xs text-muted">
          Dados de partidas: 365Scores. Horários de Brasília.
        </p>
      )}
    </>
  );
}
