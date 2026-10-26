import Image from "next/image";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import neymar from "@/assets/neymar-recorte.png";
import { neymarBrasileiraoDeep as deep, neymarSeason, neymarSeasonTotal } from "@/data/neymar-2026";
import { santosSquad } from "@/data/santos-elenco";
import { RadarChart } from "./radar-chart";

const decimal = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });
const percent = (value: number) => `${decimal.format(value)}%`;

const goalParticipations = deep.goals + deep.assists;
const cards = deep.yellowCards + deep.redCards;
const shotsOnTargetRate = (deep.shotsOnTarget / deep.shots) * 100;

/**
 * Cada ponto fica na posição do valor real, na escala natural do dado:
 * nota de 0 a 10, porcentagens de 0 a 100%, participações e cartões por jogo de 0 a 1.
 */
const radarAxes = [
  { label: "Nota média", value: deep.rating / 10, detail: `${decimal.format(deep.rating)} de 10` },
  {
    label: "Participações",
    value: goalParticipations / deep.matches,
    detail: `${goalParticipations} em ${deep.matches} jogos`,
  },
  { label: "Passes certos", value: deep.passAccuracy / 100, detail: percent(deep.passAccuracy) },
  {
    label: "Finalizações no alvo",
    value: shotsOnTargetRate / 100,
    detail: `${percent(Math.round(shotsOnTargetRate))} (${deep.shotsOnTarget} de ${deep.shots})`,
  },
  { label: "Duelos ganhos", value: deep.duelsWon / 100, detail: percent(deep.duelsWon) },
  { label: "Cartões", value: cards / deep.matches, detail: `${cards} em ${deep.matches} jogos` },
];

const radarLabel = `Neymar no ${deep.competition} ${neymarSeason.season}: ${radarAxes
  .map((axis) => `${axis.label}, ${axis.detail}`)
  .join("; ")}.`;

const stats = [
  { label: "Partidas", value: neymarSeasonTotal.games },
  { label: "Gols", value: neymarSeasonTotal.goals },
  { label: "Assistências", value: neymarSeasonTotal.assists },
  { label: "G + A", value: neymarSeasonTotal.goals + neymarSeasonTotal.assists },
];

/** Quantos colegas de posição aparecem, travados, abaixo do jogador em destaque. */
const PREVIEW_TEAMMATES = 3;

export function SeasonSpotlight() {
  return (
    <section
      id="temporada"
      aria-labelledby="season-title"
      className="grid bg-ink text-paper lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12"
    >
      {/* Perfil do jogador: radar e números da temporada */}
      <div className="relative isolate flex flex-col justify-center overflow-hidden px-4 py-14 sm:px-8 lg:col-span-8 lg:px-12 lg:py-10">
        <div aria-hidden="true" className="absolute -left-[8%] top-0 -z-10 h-[115%] opacity-25 blur-[3px]">
          <Image src={neymar} alt="" sizes="50vw" className="h-full w-auto" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-ink/40 via-ink/70 to-ink" />

        <div className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
          <figure>
            <RadarChart axes={radarAxes} max={1} label={radarLabel} className="mx-auto w-full max-w-[28rem] 2xl:max-w-[34rem]" />
            <figcaption className="mx-auto mt-1 max-w-sm text-center text-xs leading-relaxed text-muted-on-ink">
              Brasileirão {neymarSeason.season}, segundo o{" "}
              <a href={deep.source.url} target="_blank" rel="noopener noreferrer" className="text-paper underline underline-offset-4">
                {deep.source.label}
              </a>
              . Escalas: nota de 0 a 10, porcentagens de 0 a 100%, participações e
              cartões por jogo de 0 a 1.
            </figcaption>
          </figure>

          <div>
            <p className="eyebrow text-muted-on-ink">{neymarSeason.position}</p>
            <h2 id="season-title" className="mt-2 text-[clamp(2.5rem,1.9rem+2.2vw,3.75rem)] font-semibold leading-none tracking-tight">
              {neymarSeason.player}
            </h2>
            <div className="mt-5 max-w-sm space-y-3 text-sm leading-relaxed text-muted-on-ink">
              <p>
                Revelado na base do Santos, Neymar estreou como profissional em 7 de
                março de 2009, contra o Oeste, aos 17 anos. Depois de Barcelona, PSG
                e Al-Hilal, voltou à Vila em janeiro de 2025.
              </p>
              <p>
                No {deep.competition} {neymarSeason.season}, tem nota média de{" "}
                {decimal.format(deep.rating)} e participou de {goalParticipations} gols em{" "}
                {deep.matches} jogos. Acerta {percent(deep.passAccuracy)} dos passes e já
                recebeu {cards} cartões.
              </p>
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-[repeat(4,auto)] sm:justify-start">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="eyebrow text-[0.6875rem] text-paper/80">{stat.label}</dt>
                  <dd className="mt-1 text-4xl font-extralight tabular-nums text-muted-on-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-on-ink">
          Partidas, gols e assistências somam todas as competições pelo Santos em{" "}
          {neymarSeason.season}, até {neymarSeason.lastMatch} ({neymarSeason.updatedAt}). Fonte:{" "}
          <a
            href={neymarSeason.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper underline underline-offset-4"
          >
            {neymarSeason.source.label}
          </a>
          .
        </p>
      </div>

      {/* Elenco: posições visíveis, mas travadas no jogador em destaque */}
      <aside
        aria-labelledby="squad-title"
        className="flex flex-col justify-center bg-ink-raised px-4 py-14 sm:px-8 lg:col-span-4 lg:px-10 lg:py-10"
      >
        <h3 id="squad-title" className="text-3xl font-medium tracking-tight">
          Elenco
        </h3>
        <ul className="mt-5">
          {santosSquad.groups.map((group) => {
            const isActiveGroup = group.players.includes(neymarSeason.player);
            const teammates = group.players.filter((name) => name !== neymarSeason.player);

            if (!isActiveGroup) {
              return (
                <li
                  key={group.label}
                  className="flex min-h-12 cursor-not-allowed select-none items-center justify-between border-b border-paper/10 font-medium text-paper/40"
                >
                  <span>
                    {group.label}
                    <span className="sr-only"> (bloqueado)</span>
                  </span>
                  <ChevronDown aria-hidden="true" className="size-4" />
                </li>
              );
            }

            return (
              <li key={group.label} className="border-b border-paper/10">
                <p className="flex min-h-12 items-center justify-between font-medium">
                  {group.label}
                  <ChevronUp aria-hidden="true" className="size-4 text-muted-on-ink" />
                </p>
                <ul className="pb-3 text-sm">
                  <li
                    aria-current="true"
                    className="flex items-center justify-between bg-paper/10 px-3 py-2.5 font-medium"
                  >
                    {neymarSeason.player}
                    <span className="text-xs text-paper/70">Em destaque</span>
                  </li>
                  {teammates.slice(0, PREVIEW_TEAMMATES).map((name) => (
                    <li
                      key={name}
                      className="flex cursor-not-allowed select-none items-center justify-between border-t border-paper/5 px-3 py-2.5 text-paper/35"
                    >
                      <span>
                        {name}
                        <span className="sr-only"> (bloqueado)</span>
                      </span>
                      <Lock aria-hidden="true" className="size-3.5" />
                    </li>
                  ))}
                  <li className="border-t border-paper/5 px-3 pt-2.5 text-xs text-paper/35">
                    + {teammates.length - PREVIEW_TEAMMATES} {group.label.toLowerCase()}
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 flex gap-2 text-xs leading-relaxed text-muted-on-ink">
          <Lock aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Por enquanto, só o raio-x do Neymar está aberto. Os outros jogadores chegam
            com a plataforma. Elenco segundo o{" "}
            <a
              href={santosSquad.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline underline-offset-4"
            >
              {santosSquad.source.label}
            </a>{" "}
            em {santosSquad.checkedAt}.
          </span>
        </p>
      </aside>
    </section>
  );
}
