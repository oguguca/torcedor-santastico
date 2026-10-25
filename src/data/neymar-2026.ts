/**
 * Números REAIS de Neymar pelo Santos na temporada 2026 (só jogos do clube).
 * Fonte: ogol.com.br, conferida com o Lance! em 25/10/2026.
 * Contagem até Santos 1 × 1 Bahia, em 24/10/2026. Os dados são fixos:
 * atualize à mão até a integração com uma fonte de dados (Etapa 4).
 */

export type CompetitionStats = {
  id: string;
  label: string;
  games: number;
  minutes: number;
  goals: number;
  assists: number;
};

export const neymarSeason = {
  player: "Neymar",
  position: "Atacante",
  season: 2026,
  lastMatch: "Santos 1 × 1 Bahia",
  updatedAt: "24/10/2026",
  source: {
    label: "ogol.com.br",
    url: "https://www.ogol.com.br/jogador/neymar/54814",
  },
  competitions: [
    { id: "brasileirao", label: "Brasileirão", games: 15, minutes: 1224, goals: 8, assists: 3 },
    { id: "sul-americana", label: "Sul-Americana", games: 5, minutes: 405, goals: 2, assists: 2 },
    { id: "copa-do-brasil", label: "Copa do Brasil", games: 5, minutes: 354, goals: 0, assists: 2 },
    { id: "paulista", label: "Paulistão", games: 2, minutes: 135, goals: 0, assists: 1 },
  ] satisfies CompetitionStats[],
};

/**
 * Números detalhados do Brasileirão 2026 (FotMob, consultado em 25/10/2026).
 * Valores brutos, como o FotMob publica (contagem até Santos 1 × 1 Bahia).
 */
export const neymarBrasileiraoDeep = {
  competition: "Brasileirão",
  source: { label: "FotMob", url: "https://www.fotmob.com/players/19533/neymar" },
  checkedAt: "25/10/2026",
  matches: 15,
  minutes: 1223,
  rating: 7.65,
  goals: 8,
  assists: 3,
  shots: 51,
  shotsOnTarget: 22,
  /** Porcentagem de passes certos. */
  passAccuracy: 74.3,
  /** Porcentagem de duelos ganhos. */
  duelsWon: 45.6,
  yellowCards: 9,
  redCards: 1,
};

/** Soma das competições: a temporada completa pelo clube. */
export const neymarSeasonTotal: CompetitionStats = neymarSeason.competitions.reduce(
  (total, item) => ({
    ...total,
    games: total.games + item.games,
    minutes: total.minutes + item.minutes,
    goals: total.goals + item.goals,
    assists: total.assists + item.assists,
  }),
  { id: "temporada", label: "Temporada completa", games: 0, minutes: 0, goals: 0, assists: 0 },
);
