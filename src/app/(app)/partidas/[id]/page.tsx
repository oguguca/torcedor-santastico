import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessagesSquare, Target } from "lucide-react";
import { EmptyState } from "@/components/app/empty-state";
import { MatchStatusBadge } from "@/components/matches/match-row";
import { routes } from "@/config/routes";
import {
  competitionLabel,
  formatMatchLongDay,
  formatMatchTime,
  hasConfirmedTime,
  isFinished,
  isLive,
  roundLabel,
  statusLabel,
} from "@/lib/matches/format";
import { getMatch, isSantos } from "@/lib/matches/queries";
import { cx } from "@/lib/cx";
import { TeamCrest } from "@/components/matches/team-crest";

export const metadata: Metadata = { title: "Partida", robots: { index: false } };

const syncFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function MatchPage({ params }: PageProps<"/partidas/[id]">) {
  const { id } = await params;
  const matchId = Number(id);
  if (!Number.isInteger(matchId) || matchId <= 0) notFound();

  const m = await getMatch(matchId);
  if (!m) notFound();

  const played = m.homeScore !== null && m.awayScore !== null;
  const finished = isFinished(m.status);
  const details = [
    ["Competição", `${competitionLabel(m.competitionCode, m.competitionName)} ${m.competitionSeason}`],
    ["Rodada", m.matchday ? String(m.matchday) : "—"],
    ["Data", formatMatchLongDay(m.kickoffAt)],
    ["Horário", hasConfirmedTime(m.status) ? `${formatMatchTime(m.kickoffAt)} (Brasília)` : "A definir"],
    ["Status", statusLabel(m.status)],
    ...(m.venue ? [["Estádio", m.venue]] : []),
  ];

  return (
    <>
      <Link href={routes.matches} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Todas as partidas
      </Link>

      <section aria-labelledby="scoreboard-title" className="mt-4 bg-ink px-6 py-10 text-paper sm:px-10 sm:py-14">
        <h1 id="scoreboard-title" className="sr-only">
          {m.home.name} contra {m.away.name}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-on-ink">
          <span>
            {[competitionLabel(m.competitionCode, m.competitionName), roundLabel(m.matchday)].filter(Boolean).join(" · ")}
          </span>
          <span className={cx("px-2 py-1 text-xs font-medium", isLive(m.status) ? "bg-paper text-ink" : "border border-paper/25")}>
            {statusLabel(m.status)}
          </span>
        </div>
        <p className="mt-10 grid grid-cols-[1fr_auto_1fr] items-start gap-4 sm:gap-10">
          <span className="flex flex-col items-center gap-4 text-center">
            <TeamCrest team={m.home} size={96} onDark className="size-16 sm:size-24" />
            <span className={cx("text-[clamp(1.25rem,0.8rem+2.4vw,3rem)] leading-tight tracking-tight", isSantos(m.home) ? "font-semibold" : "text-paper/75")}>
              {m.home.shortName}
            </span>
          </span>
          <span className="pt-4 text-[clamp(2.5rem,1.5rem+4vw,5rem)] font-light leading-none tabular-nums sm:pt-6">
            {played ? (
              <>
                {m.homeScore}
                <span className="mx-2 text-paper/40 sm:mx-4">×</span>
                {m.awayScore}
              </>
            ) : (
              <span className="text-paper/40">×</span>
            )}
          </span>
          <span className="flex flex-col items-center gap-4 text-center">
            <TeamCrest team={m.away} size={96} onDark className="size-16 sm:size-24" />
            <span className={cx("text-[clamp(1.25rem,0.8rem+2.4vw,3rem)] leading-tight tracking-tight", isSantos(m.away) ? "font-semibold" : "text-paper/75")}>
              {m.away.shortName}
            </span>
          </span>
        </p>
        <p className="mt-10 text-center text-sm text-muted-on-ink">
          {formatMatchLongDay(m.kickoffAt)}
          {hasConfirmedTime(m.status) && `, ${formatMatchTime(m.kickoffAt)}`}
        </p>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section aria-labelledby="details-title" className="bg-paper p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 id="details-title" className="text-lg font-semibold tracking-tight">
              Detalhes
            </h2>
            <MatchStatusBadge m={m} />
          </div>
          <dl className="mt-4 divide-y divide-line">
            {details.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[7rem_1fr] gap-3 py-3 text-sm">
                <dt className="text-muted">{label}</dt>
                <dd className="font-medium first-letter:uppercase">{value}</dd>
              </div>
            ))}
          </dl>
          {m.lastSyncedAt && (
            <p className="mt-4 text-xs text-muted">
              {m.manualOverride ? "Corrigido manualmente. " : ""}
              Atualizado em {syncFormat.format(m.lastSyncedAt)}.
            </p>
          )}
        </section>

        <div className="flex flex-col gap-6">
          <EmptyState
            icon={MessagesSquare}
            title="Sala do jogo"
            status={finished ? "Chega na próxima etapa" : "Abre no apito final"}
          >
            {finished
              ? "As salas de 72 horas, com resenha, nota da torcida e voto no craque, entram na próxima etapa da plataforma."
              : "No apito final, abre aqui a sala deste jogo: 72 horas para a resenha, a sua nota para o Santos e o voto no craque."}
          </EmptyState>
          {!finished && !isLive(m.status) && (
            <EmptyState icon={Target} title="Seu palpite" status="Em breve">
              Antes de a bola rolar, você vai poder cravar o placar deste jogo.
            </EmptyState>
          )}
        </div>
      </div>
    </>
  );
}
