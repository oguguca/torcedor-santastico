import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Radar, UsersRound } from "lucide-react";
import { EmptyState } from "@/components/app/empty-state";

export const metadata: Metadata = { title: "Explorar", robots: { index: false } };

export default function ExplorePage() {
  return (
    <>
      <h1 className="text-[clamp(2.25rem,1.8rem+2vw,3.25rem)] font-semibold leading-none tracking-tight">
        Explorar
      </h1>
      <p className="mt-3 max-w-xl text-lead text-muted">Jogadores, torcedores e a memória do Peixe.</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <Link
          href="/#temporada"
          className="group flex flex-col bg-ink p-6 text-paper transition-colors hover:bg-neutral-800 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <Radar aria-hidden="true" className="size-7" strokeWidth={1.5} />
            <span className="border border-paper/25 px-2 py-1 text-xs text-muted-on-ink">Neymar disponível</span>
          </div>
          <h2 className="mt-5 text-lg font-semibold tracking-tight">Raio-x dos jogadores</h2>
          <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted-on-ink">
            Números reais da temporada, por competição. Os outros jogadores do elenco chegam aos poucos.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            Ver o raio-x do Neymar
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        <EmptyState icon={UsersRound} title="Torcedores" status="Chega com a comunidade">
          Perfis de outros santistas, de onde torcem e o histórico de participação de cada um.
        </EmptyState>

        <EmptyState icon={BookOpen} title="Memória santista" status="Em planejamento">
          Jogos marcantes, histórias da torcida e as resenhas guardadas de cada partida.
        </EmptyState>
      </div>
    </>
  );
}
