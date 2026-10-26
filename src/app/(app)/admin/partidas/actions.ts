"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { db } from "@/db";
import { match } from "@/db/schema";
import { MATCH_STATUSES, type MatchStatus } from "@/lib/matches/format";
import { syncSantosMatches } from "@/lib/matches/sync";
import { requireAdmin } from "@/lib/session";

export type AdminState = { status: "idle" | "success" | "error"; message?: string };

export async function syncNow(): Promise<AdminState> {
  await requireAdmin();
  try {
    const { matches, competitions, skippedOverrides } = await syncSantosMatches();
    refresh();
    return {
      status: "success",
      message: `${matches} jogos de ${competitions} competições sincronizados${
        skippedOverrides ? `, ${skippedOverrides} com correção manual mantida` : ""
      }.`,
    };
  } catch (error) {
    console.error("[admin sync]", error);
    return { status: "error", message: "A API Santos não respondeu. Confira se ela está no ar e tente de novo." };
  }
}

const scoreOrNull = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  if (text === "") return null;
  const n = Number(text);
  return Number.isInteger(n) && n >= 0 && n <= 30 ? n : undefined;
};

/**
 * Corrige horário, status e placar de um jogo. O horário chega no fuso de
 * Brasília (sem horário de verão desde 2019, UTC−3).
 */
export async function updateMatch(_prev: AdminState, formData: FormData): Promise<AdminState> {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as MatchStatus;
  const kickoffLocal = String(formData.get("kickoff") ?? "");
  const homeScore = scoreOrNull(formData.get("homeScore"));
  const awayScore = scoreOrNull(formData.get("awayScore"));
  const manualOverride = formData.get("manualOverride") === "on";

  if (!Number.isInteger(id) || id <= 0) return { status: "error", message: "Jogo inválido." };
  if (!MATCH_STATUSES.includes(status)) return { status: "error", message: "Status inválido." };
  if (homeScore === undefined || awayScore === undefined) {
    return { status: "error", message: "Placar deve ser um número entre 0 e 30, ou vazio." };
  }
  if ((homeScore === null) !== (awayScore === null)) {
    return { status: "error", message: "Preencha os dois lados do placar, ou deixe os dois vazios." };
  }
  const kickoffAt = new Date(`${kickoffLocal}:00-03:00`);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(kickoffLocal) || Number.isNaN(kickoffAt.getTime())) {
    return { status: "error", message: "Data e horário inválidos." };
  }

  await db.update(match).set({ status, kickoffAt, homeScore, awayScore, manualOverride }).where(eq(match.id, id));
  refresh();
  return {
    status: "success",
    message: manualOverride
      ? "Jogo salvo. A sincronização não vai sobrescrever esta correção."
      : "Jogo salvo. A próxima sincronização pode atualizar estes dados.",
  };
}
