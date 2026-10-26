import type { Metadata } from "next";
import { EditMatchForm, SyncNowButton } from "@/components/admin/admin-match-forms";
import { competitionLabel, formatMatchDay, roundLabel, statusLabel } from "@/lib/matches/format";
import { getAllMatchesForAdmin } from "@/lib/matches/queries";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = { title: "Admin · Partidas", robots: { index: false } };

/** "AAAA-MM-DDTHH:mm" no fuso de Brasília, para o campo datetime-local. */
const localParts = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
const toLocalInput = (date: Date) => localParts.format(date).replace(" ", "T");

export default async function AdminMatchesPage() {
  await requireAdmin();
  const matches = await getAllMatchesForAdmin();

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-sm text-muted">Administração</p>
          <h1 className="mt-1 text-[clamp(2rem,1.6rem+1.8vw,3rem)] font-semibold leading-none tracking-tight">Partidas</h1>
          <p className="mt-3 max-w-xl text-muted">
            Os jogos chegam da API Santos (dados do 365Scores). Corrija aqui quando a fonte atrasar ou errar.
            Marque &quot;Travar correção&quot; para a sincronização não sobrescrever.
          </p>
        </div>
        <SyncNowButton />
      </div>

      <ul className="mt-10 space-y-4">
        {matches.map((m) => (
          <li key={m.id} className="bg-paper p-5 sm:p-6">
            <p className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold">
                {[competitionLabel(m.competitionCode, m.competitionName), roundLabel(m.matchday)].filter(Boolean).join(" · ")} ·{" "}
                {m.home.shortName} × {m.away.shortName}
              </span>
              <span className="text-sm text-muted">
                {formatMatchDay(m.kickoffAt)} · {statusLabel(m.status)}
                {m.manualOverride && " · travado"}
              </span>
            </p>
            <div className="mt-4">
              <EditMatchForm
                m={{
                  id: m.id,
                  status: m.status,
                  kickoffLocal: toLocalInput(m.kickoffAt),
                  homeScore: m.homeScore,
                  awayScore: m.awayScore,
                  manualOverride: m.manualOverride,
                  homeName: m.home.shortName,
                  awayName: m.away.shortName,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
