/**
 * Dados FICTÍCIOS usados apenas na demonstração visual da landing page.
 * Não representam jogadores, partidas nem opiniões reais da torcida.
 */

export type DemoPlayerRating = {
  shirt: number;
  position: string;
  /** Nota média de exemplo, de 0 a 10. */
  rating: number;
};

export type DemoMoodSlice = {
  label: string;
  percent: number;
};

export const demoMatchLabel = "Santos × Adversário";

export const demoPlayerRatings: DemoPlayerRating[] = [
  { shirt: 1, position: "Goleiro", rating: 6.8 },
  { shirt: 4, position: "Zagueiro", rating: 7.1 },
  { shirt: 6, position: "Lateral-esquerdo", rating: 6.4 },
  { shirt: 8, position: "Volante", rating: 7.4 },
  { shirt: 10, position: "Meia", rating: 8.6 },
  { shirt: 11, position: "Ponta", rating: 7.9 },
  { shirt: 9, position: "Centroavante", rating: 7.0 },
];

/** Termômetro de exemplo: soma 100%. */
export const demoMood: DemoMoodSlice[] = [
  { label: "Confiante", percent: 46 },
  { label: "Dividida", percent: 31 },
  { label: "Preocupada", percent: 23 },
];
