/** Formatação de partidas (pode ser usada no servidor e no cliente). */

export type MatchStatus =
  | "SCHEDULED"
  | "TIMED"
  | "IN_PLAY"
  | "PAUSED"
  | "FINISHED"
  | "SUSPENDED"
  | "POSTPONED"
  | "CANCELLED"
  | "AWARDED";

export const MATCH_STATUSES: MatchStatus[] = [
  "SCHEDULED",
  "TIMED",
  "IN_PLAY",
  "PAUSED",
  "FINISHED",
  "SUSPENDED",
  "POSTPONED",
  "CANCELLED",
  "AWARDED",
];

const statusLabels: Record<MatchStatus, string> = {
  SCHEDULED: "Data a confirmar",
  TIMED: "Agendado",
  IN_PLAY: "Ao vivo",
  PAUSED: "Intervalo",
  FINISHED: "Encerrado",
  SUSPENDED: "Suspenso",
  POSTPONED: "Adiado",
  CANCELLED: "Cancelado",
  AWARDED: "Decidido fora de campo",
};

export function statusLabel(status: string): string {
  return statusLabels[status as MatchStatus] ?? status;
}

export const isLive = (status: string) => status === "IN_PLAY" || status === "PAUSED";
export const isFinished = (status: string) => status === "FINISHED" || status === "AWARDED";
/** Horário definitivo só existe a partir de TIMED; SCHEDULED pode mudar. */
export const hasConfirmedTime = (status: string) => status !== "SCHEDULED";

const TIME_ZONE = "America/Sao_Paulo";

const weekdayFormat = new Intl.DateTimeFormat("pt-BR", { timeZone: TIME_ZONE, weekday: "short" });
const shortDateFormat = new Intl.DateTimeFormat("pt-BR", { timeZone: TIME_ZONE, day: "2-digit", month: "2-digit" });
const longDayFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const timeFormat = new Intl.DateTimeFormat("pt-BR", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit" });

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** "Qua 28/10" */
export const formatMatchDay = (date: Date) =>
  `${capitalize(weekdayFormat.format(date).replace(".", ""))} ${shortDateFormat.format(date)}`;
/** "Quarta-feira, 28 de outubro de 2026" */
export const formatMatchLongDay = (date: Date) => capitalize(longDayFormat.format(date));

/** Nome curto da competição pelo id na API Santos (365Scores). */
const competitionNames: Record<string, string> = {
  "113": "Brasileirão",
  "114": "Paulistão",
  "115": "Copa do Brasil",
  "389": "Sul-Americana",
  "321": "Amistoso",
};
export const competitionLabel = (code: string, fallback: string) => competitionNames[code] ?? fallback;
export const formatMatchTime = (date: Date) => timeFormat.format(date);

export type SantosResult = "win" | "draw" | "loss";

export const resultLabels: Record<SantosResult, string> = { win: "Vitória", draw: "Empate", loss: "Derrota" };

/** Resultado do ponto de vista do Santos, ou null se o jogo não terminou. */
export function santosResult(
  m: { status: string; homeScore: number | null; awayScore: number | null },
  santosIsHome: boolean,
): SantosResult | null {
  if (!isFinished(m.status) || m.homeScore === null || m.awayScore === null) return null;
  const own = santosIsHome ? m.homeScore : m.awayScore;
  const other = santosIsHome ? m.awayScore : m.homeScore;
  return own > other ? "win" : own < other ? "loss" : "draw";
}

/** "Rodada 33", ou null em jogos sem rodada (mata-mata, amistosos). */
export const roundLabel = (matchday: number | null) => (matchday ? `Rodada ${matchday}` : null);
