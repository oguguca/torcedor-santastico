import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/routes";
import { competitionLabel, formatMatchLongDay, formatMatchTime, hasConfirmedTime, isLive, roundLabel, statusLabel } from "@/lib/matches/format";
import { isSantos, type MatchView } from "@/lib/matches/queries";
import { cx } from "@/lib/cx";
import { TeamCrest } from "./team-crest";

/** Destaque do próximo jogo (ou do jogo em andamento). */
export function NextMatchCard({ m, title = "Próximo jogo" }: { m: MatchView; title?: string }) {
  const live = isLive(m.status);
  const santosHome = isSantos(m.home);
  return (
    <Link
      href={`${routes.matches}/${m.id}`}
      className="group block bg-ink p-6 text-paper transition-colors hover:bg-neutral-900 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-on-ink">
        <span>
          {[live ? "Agora" : title, competitionLabel(m.competitionCode, m.competitionName), roundLabel(m.matchday)]
            .filter(Boolean)
            .join(" · ")}
        </span>
        <span className={cx("px-2 py-1 text-xs font-medium", live ? "bg-paper text-ink" : "border border-paper/25")}>
          {statusLabel(m.status)}
        </span>
      </div>

      <p className="mt-8 grid grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-6">
        <span className="flex flex-col items-center gap-3 text-center">
          <TeamCrest team={m.home} size={64} onDark />
          <span className={cx("text-[clamp(1.25rem,0.9rem+1.6vw,2.25rem)] leading-tight tracking-tight", santosHome ? "font-semibold" : "text-paper/80")}>
            {m.home.shortName}
          </span>
        </span>
        <span className="pt-4 text-[clamp(1.5rem,1rem+2.4vw,2.75rem)] font-light tabular-nums text-paper/60">
          {m.homeScore !== null && m.awayScore !== null ? `${m.homeScore} × ${m.awayScore}` : "×"}
        </span>
        <span className="flex flex-col items-center gap-3 text-center">
          <TeamCrest team={m.away} size={64} onDark />
          <span className={cx("text-[clamp(1.25rem,0.9rem+1.6vw,2.25rem)] leading-tight tracking-tight", !santosHome ? "font-semibold" : "text-paper/80")}>
            {m.away.shortName}
          </span>
        </span>
      </p>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <p className="text-sm text-muted-on-ink">
          {formatMatchLongDay(m.kickoffAt)}
          {hasConfirmedTime(m.status) ? `, às ${formatMatchTime(m.kickoffAt)}` : ", horário a definir"}
          <span className="block">{santosHome ? "Santos joga em casa" : "Santos joga fora de casa"}</span>
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          Ver jogo
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
