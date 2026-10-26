import "server-only";
import { aliasedTable, asc, desc, eq, inArray, notInArray } from "drizzle-orm";
import { db } from "@/db";
import { competition, match, team } from "@/db/schema";
import { SANTOS_EXTERNAL_ID } from "./santos-api";

const homeTeam = aliasedTable(team, "home_team");
const awayTeam = aliasedTable(team, "away_team");

/** Status de jogos que ainda não aconteceram ou estão acontecendo. */
const UPCOMING = ["SCHEDULED", "TIMED", "IN_PLAY", "PAUSED"];
const DONE = ["FINISHED", "AWARDED"];

const selection = {
  id: match.id,
  matchday: match.matchday,
  kickoffAt: match.kickoffAt,
  status: match.status,
  homeScore: match.homeScore,
  awayScore: match.awayScore,
  venue: match.venue,
  manualOverride: match.manualOverride,
  lastSyncedAt: match.lastSyncedAt,
  /** Nome curto ("Brasileirão"); o nome completo vem do provedor. */
  competitionCode: competition.code,
  competitionName: competition.name,
  competitionSeason: competition.season,
  home: {
    id: homeTeam.id,
    name: homeTeam.name,
    shortName: homeTeam.shortName,
    externalId: homeTeam.externalId,
    crestUrl: homeTeam.crestUrl,
  },
  away: {
    id: awayTeam.id,
    name: awayTeam.name,
    shortName: awayTeam.shortName,
    externalId: awayTeam.externalId,
    crestUrl: awayTeam.crestUrl,
  },
};

export type MatchView = NonNullable<Awaited<ReturnType<typeof getMatch>>>;

function baseQuery() {
  return db
    .select(selection)
    .from(match)
    .innerJoin(competition, eq(match.competitionId, competition.id))
    .innerJoin(homeTeam, eq(match.homeTeamId, homeTeam.id))
    .innerJoin(awayTeam, eq(match.awayTeamId, awayTeam.id));
}

export const isSantos = (t: { externalId: string }) => t.externalId === String(SANTOS_EXTERNAL_ID);

export async function getUpcomingMatches() {
  return baseQuery().where(inArray(match.status, UPCOMING)).orderBy(asc(match.kickoffAt));
}

export async function getFinishedMatches() {
  return baseQuery().where(inArray(match.status, DONE)).orderBy(desc(match.kickoffAt));
}

/** Adiados, suspensos ou cancelados: aparecem à parte. */
export async function getUnsettledMatches() {
  return baseQuery()
    .where(notInArray(match.status, [...UPCOMING, ...DONE]))
    .orderBy(asc(match.kickoffAt));
}

export async function getNextMatch() {
  const [next] = await baseQuery().where(inArray(match.status, UPCOMING)).orderBy(asc(match.kickoffAt)).limit(1);
  return next ?? null;
}

export async function getMatch(id: number) {
  const [row] = await baseQuery().where(eq(match.id, id)).limit(1);
  return row ?? null;
}

export async function getAllMatchesForAdmin() {
  return baseQuery().orderBy(asc(match.kickoffAt));
}

