/**
 * Dados FICTÍCIOS para as demonstrações do ciclo do jogo na landing page.
 * Não representam partidas, jogadores, votos nem publicações reais.
 */

export const demoMatch = {
  label: "Santos × Adversário",
  competition: "Brasileirão",
  /** Duração planejada da sala de cada jogo. */
  windowHours: 72,
  /** Tempo restante mostrado na demonstração. */
  closesIn: "2d 14h",
};

export type DemoPlayer = {
  shirt: number;
  position: string;
};

export const demoPlayers: DemoPlayer[] = [
  { shirt: 1, position: "Goleiro" },
  { shirt: 4, position: "Zagueiro" },
  { shirt: 8, position: "Volante" },
  { shirt: 10, position: "Meia" },
  { shirt: 11, position: "Ponta" },
  { shirt: 9, position: "Centroavante" },
];

export type DemoPost = {
  id: string;
  author: string;
  time: string;
  text: string;
  replies: number;
  likes: number;
};

export const demoPosts: DemoPost[] = [
  {
    id: "p1",
    author: "Torcedor de exemplo 1",
    time: "12 min",
    text: "O segundo tempo foi outro jogo. Quando o meio passou a segurar a bola, o time cresceu.",
    replies: 4,
    likes: 31,
  },
  {
    id: "p2",
    author: "Torcedor de exemplo 2",
    time: "25 min",
    text: "Minha nota é 7. Ganhou, mas sofreu demais na bola aérea de novo.",
    replies: 9,
    likes: 18,
  },
  {
    id: "p3",
    author: "Torcedor de exemplo 3",
    time: "1 h",
    text: "Craque pra mim é o camisa 10. Participou dos dois gols.",
    replies: 2,
    likes: 44,
  },
];

export const demoResult = {
  average: 7.4,
  craque: { shirt: 10, position: "Meia", share: 41 },
  /** Percentual de votos em cada nota, de 0 a 10. Soma 100. */
  distribution: [1, 0, 1, 2, 3, 6, 12, 24, 29, 14, 8],
};

/** Notas da torcida em jogos anteriores, para o histórico da temporada. */
export const demoSeasonAverages = [
  { round: "J1", average: 6.2 },
  { round: "J2", average: 7.8 },
  { round: "J3", average: 5.1 },
  { round: "J4", average: 6.9 },
  { round: "J5", average: 8.3 },
  { round: "J6", average: 7.4 },
];
