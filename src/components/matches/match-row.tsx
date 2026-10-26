import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { routes } from "@/config/routes";
import {
  competitionLabel,
  formatMatchDay,
  formatMatchTime,
  hasConfirmedTime,
  isLive,
  resultLabels,
  roundLabel,
  santosResult,
  statusLabel,
} from "@/lib/matches/format";
import { isSantos, type MatchView } from "@/lib/matches/queries";
import { cx } from "@/lib/cx";
import { TeamCrest } from "./team-crest";

/** Nome do time, com o Santos em destaque. */
function TeamName({ team }: { team: MatchView["home"] }) {
  return <span className={cx("truncate", isSantos(team) ? "font-semibold text-ink" : "text-ink/80")}>{team.shortName}</span>;
}

export function MatchStatusBadge({ m }: { m: MatchView }) {
  const result = santosResult(m, isSantos(m.home));
  if (result) {
    return (
      <span
        className={cx(
          "inline-flex min-w-[4.5rem] justify-center px-2 py-1 text-xs font-semibold",
          result === "win" && "bg-ink text-paper",
          result === "draw" && "border border-ink/25 text-muted",
          result === "loss" && "border-2 border-ink text-ink",
        )}
      >
        {resultLabels[result]}
      </span>
    );
  }
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium",
        isLive(m.status) ? "bg-ink text-paper" : "border border-ink/15 text-muted",
      )}
    >
      {isLive(m.status) && <span aria-hidden="true" className="size-1.5 animate-pulse bg-paper motion-reduce:animate-none" />}
      {statusLabel(m.status)}
    </span>
  );
}

export function MatchRow({ m }: { m: MatchView }) {
  const played = m.homeScore !== null && m.awayScore !== null;
  return (
    <li>
      <Link
        href={`${routes.matches}/${m.id}`}
        className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 border-b border-line bg-paper px-4 py-4 transition-colors hover:bg-surface sm:grid-cols-[6rem_1fr_auto_auto] sm:gap-5 sm:px-6"
      >
        <span className="text-sm leading-tight">
          <span className="block font-medium">{formatMatchDay(m.kickoffAt)}</span>
          <span className="block text-muted">{hasConfirmedTime(m.status) ? formatMatchTime(m.kickoffAt) : "a definir"}</span>
          <span className="mt-1 hidden text-xs text-muted sm:block">{competitionLabel(m.competitionCode, m.competitionName)}</span>
        </span>

        <span className="grid min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <span className="flex min-w-0 items-center justify-end gap-2.5 text-right">
            <TeamName team={m.home} />
            <TeamCrest team={m.home} size={26} />
          </span>
          <span className="min-w-14 text-center text-lg font-semibold tabular-nums">
            {played ? `${m.homeScore} × ${m.awayScore}` : "×"}
          </span>
          <span className="flex min-w-0 items-center gap-2.5">
            <TeamCrest team={m.away} size={26} />
            <TeamName team={m.away} />
          </span>
        </span>

        <span className="hidden sm:block">
          <MatchStatusBadge m={m} />
        </span>
        <ChevronRight aria-hidden="true" className="size-4 text-muted transition-transform group-hover:translate-x-0.5" />
        <span className="col-span-3 -mt-1 flex items-center justify-between text-xs text-muted sm:hidden">
          <span>{[competitionLabel(m.competitionCode, m.competitionName), roundLabel(m.matchday)].filter(Boolean).join(" · ")}</span>
          <MatchStatusBadge m={m} />
        </span>
      </Link>
    </li>
  );
}
