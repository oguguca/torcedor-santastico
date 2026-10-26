import { timingSafeEqual } from "node:crypto";
import { syncSantosMatches } from "@/lib/matches/sync";

/** Compara em tempo constante para não vazar o segredo pelo tempo de resposta. */
function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const received = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

/**
 * Sincroniza os jogos do Santos. Chamada por um agendador (Vercel Cron,
 * GitHub Actions) com o cabeçalho `Authorization: Bearer <CRON_SECRET>`.
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "Não autorizado." }, { status: 401 });
  }
  try {
    const results = await syncSantosMatches();
    return Response.json({ ok: true, results });
  } catch (error) {
    console.error("[sync-matches]", error);
    return Response.json({ ok: false, error: "Falha ao sincronizar." }, { status: 502 });
  }
}
