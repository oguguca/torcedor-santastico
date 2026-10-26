import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MessagesSquare, UserRoundPen } from "lucide-react";
import { EmptyState } from "@/components/app/empty-state";
import { NextMatchCard } from "@/components/matches/next-match-card";
import { getNextMatch } from "@/lib/matches/queries";
import { routes } from "@/config/routes";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Início", robots: { index: false } };

export default async function AppHomePage() {
  const [user, next] = await Promise.all([requireUser(), getNextMatch()]);
  const firstName = user.name.split(" ")[0];
  const profileIncomplete = !user.city || !user.supporterSince;

  return (
    <>
      <h1 className="text-[clamp(2.25rem,1.8rem+2vw,3.25rem)] font-semibold leading-none tracking-tight">
        Olá, {firstName}
      </h1>
      <p className="mt-3 text-lead text-muted">Tudo o que acontece com o Peixe, do seu jeito.</p>

      {profileIncomplete && (
        <Link
          href={routes.profile}
          className="group mt-8 flex items-center gap-4 bg-ink p-5 text-paper transition-colors hover:bg-neutral-800 sm:p-6"
        >
          <UserRoundPen aria-hidden="true" className="size-7 shrink-0" strokeWidth={1.5} />
          <span className="flex-1">
            <span className="block font-semibold">Complete seu perfil</span>
            <span className="mt-0.5 block text-sm text-muted-on-ink">
              Conte de onde você torce e desde quando é santista.
            </span>
          </span>
          <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {next ? (
          <NextMatchCard m={next} />
        ) : (
          <EmptyState icon={CalendarDays} title="Próximo jogo" status="Sem jogos agendados">
            Nenhum jogo do Santos agendado no momento. Assim que a tabela tiver o próximo, ele aparece aqui.
          </EmptyState>
        )}
        <EmptyState icon={MessagesSquare} title="Salas de jogo" status="Em construção">
          No apito final de cada partida, abre aqui a sala do jogo: 72 horas para a resenha, a sua nota
          para o time e o voto no craque.
        </EmptyState>
      </div>
    </>
  );
}
