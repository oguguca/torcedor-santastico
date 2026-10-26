import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { competition, match, team } from "@/db/schema";
import { fetchSeasonMatches, SOURCE, toMatchStatus, type ApiMatch, type ApiTeam } from "./santos-api";

export type SyncResult = {
  matches: number;
  competitions: number;
  skippedOverrides: number;
};

async function upsertTeam(apiTeam: ApiTeam): Promise<number> {
  const values = {
    name: apiTeam.nome,
    shortName: apiTeam.nome,
    tla: apiTeam.sigla,
    crestUrl: apiTeam.escudo,
  };
  const [row] = await db
    .insert(team)
    .values({ source: SOURCE, externalId: String(apiTeam.id), ...values })
    .onConflictDoUpdate({ target: [team.source, team.externalId], set: values })
    .returning({ id: team.id });
  return row.id;
}

async function upsertCompetition(code: string, name: string, season: number): Promise<number> {
  const [row] = await db
    .insert(competition)
    .values({ code, name, season })
    .onConflictDoUpdate({ target: [competition.code, competition.season], set: { name } })
    .returning({ id: competition.id });
  return row.id;
}

/** Temporada pelo ano do jogo no horário de Brasília. */
const seasonOf = (m: ApiMatch) => Number(m.data.slice(0, 4));

/**
 * Busca a temporada do Santos na API própria e grava no banco. Idempotente.
 * Jogos corrigidos à mão (manualOverride) não têm horário, status nem placar sobrescritos.
 */
export async function syncSantosMatches(): Promise<SyncResult> {
  const matches = await fetchSeasonMatches();
  const now = new Date();

  const competitionIds = new Map<string, number>();
  const teamIds = new Map<number, number>();
  for (const m of matches) {
    const key = `${m.competicao.id}:${seasonOf(m)}`;
    if (!competitionIds.has(key)) {
      competitionIds.set(key, await upsertCompetition(String(m.competicao.id), m.competicao.nome, seasonOf(m)));
    }
    for (const side of [m.mandante, m.visitante]) {
      if (!teamIds.has(side.id)) teamIds.set(side.id, await upsertTeam(side));
    }
  }

  let skippedOverrides = 0;
  for (const m of matches) {
    const externalId = String(m.id);
    const values = {
      source: SOURCE,
      externalId,
      competitionId: competitionIds.get(`${m.competicao.id}:${seasonOf(m)}`)!,
      matchday: m.rodada,
      kickoffAt: new Date(m.data),
      status: toMatchStatus(m, now),
      homeTeamId: teamIds.get(m.mandante.id)!,
      awayTeamId: teamIds.get(m.visitante.id)!,
      homeScore: m.mandante.gols,
      awayScore: m.visitante.gols,
      lastSyncedAt: now,
    };

    const [existing] = await db
      .select({ manualOverride: match.manualOverride })
      .from(match)
      .where(and(eq(match.source, SOURCE), eq(match.externalId, externalId)));

    if (existing?.manualOverride) {
      // Mantém a correção do admin; só atualiza o que não foi corrigido.
      skippedOverrides += 1;
      await db
        .update(match)
        .set({ matchday: values.matchday, lastSyncedAt: now })
        .where(and(eq(match.source, SOURCE), eq(match.externalId, externalId)));
      continue;
    }

    await db
      .insert(match)
      .values(values)
      .onConflictDoUpdate({
        target: [match.source, match.externalId],
        set: {
          competitionId: sql`excluded.competition_id`,
          matchday: sql`excluded.matchday`,
          kickoffAt: sql`excluded.kickoff_at`,
          status: sql`excluded.status`,
          homeTeamId: sql`excluded.home_team_id`,
          awayTeamId: sql`excluded.away_team_id`,
          homeScore: sql`excluded.home_score`,
          awayScore: sql`excluded.away_score`,
          lastSyncedAt: sql`excluded.last_synced_at`,
        },
      });
  }

  return { matches: matches.length, competitions: competitionIds.size, skippedOverrides };
}
