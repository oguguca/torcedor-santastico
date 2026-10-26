import "server-only";

/**
 * Cliente da API Santos FC (projeto próprio, em FastAPI, com dados do 365Scores).
 * Só os campos que usamos; o resto da resposta é ignorado.
 */

export const SOURCE = "santos-api";
/** Santos FC na API (id do 365Scores). */
export const SANTOS_EXTERNAL_ID = 1224;

export type ApiTeam = {
  id: number;
  nome: string;
  sigla: string | null;
  escudo: string | null;
  gols: number | null;
};

export type ApiStatus = "agendado" | "ao_vivo" | "encerrado" | "adiado" | "cancelado" | "outro";

export type ApiMatch = {
  id: number;
  competicao: { id: number; nome: string };
  rodada: number | null;
  data: string;
  status: ApiStatus;
  status_texto: string | null;
  mandante: ApiTeam;
  visitante: ApiTeam;
};

type Page<T> = { itens: T[]; pagina: number; total_paginas: number };

export class SantosApiError extends Error {}

async function get<T>(path: string): Promise<T> {
  const baseUrl = process.env.SANTOS_API_URL;
  const key = process.env.SANTOS_API_KEY;
  if (!baseUrl || !key) throw new SantosApiError("SANTOS_API_URL ou SANTOS_API_KEY não configuradas.");

  const response = await fetch(new URL(path, baseUrl), {
    headers: { "x-api-key": key },
    cache: "no-store",
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new SantosApiError(`API Santos respondeu ${response.status} em ${path}.`);
  return (await response.json()) as T;
}

/** Todos os jogos da temporada, em todas as competições (percorre a paginação). */
export async function fetchSeasonMatches(): Promise<ApiMatch[]> {
  const matches: ApiMatch[] = [];
  for (let page = 1; ; page += 1) {
    const body = await get<Page<ApiMatch>>(`/jogos?limite=100&pagina=${page}`);
    matches.push(...body.itens);
    if (page >= body.total_paginas) return matches;
  }
}

/** O 365Scores usa 11:00 (Brasília) como horário provisório de jogos ainda sem horário definido. */
const PLACEHOLDER_TIME = "T11:00:00";
const PLACEHOLDER_MIN_DAYS = 10;

function hasPlaceholderTime(m: Pick<ApiMatch, "data">, now: Date): boolean {
  const daysAway = (new Date(m.data).getTime() - now.getTime()) / 86_400_000;
  return m.data.includes(PLACEHOLDER_TIME) && daysAway > PLACEHOLDER_MIN_DAYS;
}

/** Converte o status da API para o vocabulário usado no banco. */
export function toMatchStatus(m: Pick<ApiMatch, "status" | "status_texto" | "data">, now: Date): string {
  switch (m.status) {
    case "agendado":
      // Horário provisório vira "a definir" (SCHEDULED); perto do jogo, vale o que a fonte disser.
      return hasPlaceholderTime(m, now) ? "SCHEDULED" : "TIMED";
    case "ao_vivo":
      return /intervalo/i.test(m.status_texto ?? "") ? "PAUSED" : "IN_PLAY";
    case "encerrado":
      return "FINISHED";
    case "adiado":
      return "POSTPONED";
    case "cancelado":
      return "CANCELLED";
    default:
      // "outro": data ou situação ainda indefinida na fonte.
      return "SCHEDULED";
  }
}
