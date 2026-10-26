"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { db } from "@/db";
import { user } from "@/db/schema";
import { requireUser } from "@/lib/session";

/** Ano de fundação do Santos: ninguém é santista antes disso. */
const FOUNDING_YEAR = 1912;

export type ProfileState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "city" | "supporterSince", string>>;
  /** Valores enviados, para o formulário não perder o que foi digitado. */
  values?: { name: string; city: string; supporterSince: string };
};

export async function updateProfile(_prev: ProfileState, formData: FormData): Promise<ProfileState> {
  const current = await requireUser();

  const name = String(formData.get("name") ?? "").trim().replace(/\s+/g, " ");
  const city = String(formData.get("city") ?? "").trim().replace(/\s+/g, " ");
  const sinceRaw = String(formData.get("supporterSince") ?? "").trim();
  const thisYear = new Date().getFullYear();

  const fieldErrors: ProfileState["fieldErrors"] = {};
  if (name.length < 2 || name.length > 60) fieldErrors.name = "O nome precisa ter entre 2 e 60 caracteres.";
  if (city.length > 60) fieldErrors.city = "A cidade pode ter no máximo 60 caracteres.";

  let supporterSince: number | null = null;
  if (sinceRaw) {
    const year = Number(sinceRaw);
    if (!Number.isInteger(year) || year < FOUNDING_YEAR || year > thisYear) {
      fieldErrors.supporterSince = `Use um ano entre ${FOUNDING_YEAR} e ${thisYear}.`;
    } else {
      supporterSince = year;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Confira os campos destacados.",
      fieldErrors,
      values: { name, city, supporterSince: sinceRaw },
    };
  }

  await db
    .update(user)
    .set({ name, city: city || null, supporterSince })
    .where(eq(user.id, current.id));

  refresh();
  return { status: "success", message: "Perfil atualizado." };
}
