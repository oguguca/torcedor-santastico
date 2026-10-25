"use client";

import { Award, Clock, Gauge, Heart, Lock, MessageCircle, MessagesSquare } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { demoMatch, demoPlayers, demoPosts, type DemoPost } from "@/data/match-cycle-demo";
import { cx } from "@/lib/cx";

type TabId = "resenha" | "nota" | "craque";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "resenha", label: "Resenha" },
  { id: "nota", label: "Nota do time" },
  { id: "craque", label: "Craque" },
];

const features = [
  {
    icon: MessagesSquare,
    title: "Resenha",
    description:
      "Posts curtos sobre a partida, com respostas e curtidas. Uma conversa só de santistas e só sobre aquele jogo.",
  },
  {
    icon: Gauge,
    title: "Nota do time",
    description: "De 0 a 10 para a atuação do Santos. Um voto por pessoa, que pode ser trocado até o prazo fechar.",
  },
  {
    icon: Award,
    title: "Craque da partida",
    description: "Seu voto no melhor jogador do Santos em campo. O eleito é anunciado no fechamento.",
  },
];

const MAX_POST = 280;

function Post({ post }: { post: DemoPost }) {
  const initials = post.author === "Você" ? "VC" : `T${post.author.slice(-1)}`;
  return (
    <li className="flex gap-3 border-b border-paper/10 px-5 py-4 last:border-b-0">
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-paper/10 text-xs font-semibold"
      >
        {initials}
      </span>
      <div className="min-w-0">
        <p className="text-sm">
          <span className="font-semibold">{post.author}</span>{" "}
          <span className="text-muted-on-ink">· {post.time}</span>
        </p>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-paper/90">{post.text}</p>
        <p className="mt-2 flex gap-5 text-xs text-muted-on-ink">
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle aria-hidden="true" className="size-3.5" />
            {post.replies} <span className="sr-only">respostas</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Heart aria-hidden="true" className="size-3.5" />
            {post.likes} <span className="sr-only">curtidas</span>
          </span>
        </p>
      </div>
    </li>
  );
}

function ResenhaPanel() {
  const [posts, setPosts] = useState(demoPosts);
  const [draft, setDraft] = useState("");
  const inputId = useId();

  function publish() {
    const text = draft.trim();
    if (!text) return;
    setPosts((current) => [
      { id: `local-${current.length}`, author: "Você", time: "agora", text, replies: 0, likes: 0 },
      ...current,
    ]);
    setDraft("");
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          publish();
        }}
        className="border-b border-paper/10 p-5"
      >
        <label htmlFor={inputId} className="sr-only">
          Comente o jogo
        </label>
        <textarea
          id={inputId}
          value={draft}
          maxLength={MAX_POST}
          rows={2}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="O que você achou do jogo?"
          className="w-full resize-none bg-transparent text-[0.9375rem] placeholder:text-muted-on-ink focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xs tabular-nums text-muted-on-ink">
            {draft.length}/{MAX_POST}
          </span>
          <button
            type="submit"
            disabled={!draft.trim()}
            className="min-h-10 bg-paper px-4 text-sm font-semibold text-ink transition-colors hover:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Publicar
          </button>
        </div>
      </form>
      <ul aria-label="Posts da resenha" className="max-h-80 overflow-y-auto">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

function RatingPanel() {
  const [rating, setRating] = useState<number | null>(null);
  return (
    <div className="p-5 sm:p-7">
      <p id="rating-question" className="text-lg font-semibold">
        Que nota você dá para a atuação do Santos?
      </p>
      <div role="radiogroup" aria-labelledby="rating-question" className="mt-5 grid grid-cols-6 gap-1.5 sm:grid-cols-11">
        {Array.from({ length: 11 }, (_, value) => {
          const selected = rating === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setRating(value)}
              className={cx(
                "flex aspect-square min-h-11 items-center justify-center text-base font-semibold tabular-nums transition-colors",
                selected ? "bg-paper text-ink" : "border border-paper/20 text-paper/80 hover:border-paper",
              )}
            >
              {value}
            </button>
          );
        })}
      </div>
      <p role="status" className="mt-5 min-h-6 text-sm text-muted-on-ink">
        {rating === null
          ? "Toque em uma nota."
          : `Sua nota: ${rating}. Você pode trocar até o prazo fechar.`}
      </p>
      <div className="mt-6 flex items-center gap-3 border border-dashed border-paper/25 p-4 text-sm text-muted-on-ink">
        <Lock aria-hidden="true" className="size-4 shrink-0 text-paper" />
        A média da torcida fica escondida até a sala fechar, para cada um votar no que viu.
      </div>
    </div>
  );
}

function CraquePanel() {
  const [shirt, setShirt] = useState<number | null>(null);
  const chosen = demoPlayers.find((player) => player.shirt === shirt);
  return (
    <div className="p-5 sm:p-7">
      <p id="craque-question" className="text-lg font-semibold">
        Quem foi o craque da partida?
      </p>
      <div role="radiogroup" aria-labelledby="craque-question" className="mt-5 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {demoPlayers.map((player) => {
          const selected = player.shirt === shirt;
          return (
            <button
              key={player.shirt}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setShirt(player.shirt)}
              className={cx(
                "flex min-h-14 items-center gap-3 px-3 text-left transition-colors",
                selected ? "bg-paper text-ink" : "border border-paper/20 hover:border-paper",
              )}
            >
              <span className="text-xl font-semibold tabular-nums">{player.shirt}</span>
              <span className="text-sm">{player.position}</span>
            </button>
          );
        })}
      </div>
      <p role="status" className="mt-5 min-h-6 text-sm text-muted-on-ink">
        {chosen
          ? `Seu voto: camisa ${chosen.shirt} (${chosen.position}). O eleito aparece quando a sala fechar.`
          : "Escolha um jogador."}
      </p>
    </div>
  );
}

export function MatchRoom() {
  const [active, setActive] = useState<TabId>("resenha");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="sala-do-jogo" aria-labelledby="room-title" className="bg-ink text-paper">
      <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="room-title" className="headline text-section">
            A sala do jogo
          </h2>
          <p className="mt-5 text-lead text-muted-on-ink">
            No apito final, cada partida ganha a sua sala. Ela fica aberta por{" "}
            {demoMatch.windowHours} horas e reúne tudo o que a torcida tem a dizer
            sobre aquele jogo.
          </p>

          <ul className="mt-10 space-y-7">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <Icon aria-hidden="true" className="mt-0.5 size-6 shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-on-ink">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-paper/15 bg-ink-raised">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 px-5 py-4">
              <div>
                <p className="font-semibold">{demoMatch.label}</p>
                <p className="text-sm text-muted-on-ink">{demoMatch.competition}, partida de exemplo</p>
              </div>
              <p className="inline-flex items-center gap-2 border border-paper/25 px-3 py-1.5 text-sm">
                <Clock aria-hidden="true" className="size-4" />
                Fecha em {demoMatch.closesIn}
              </p>
            </div>

            <div role="tablist" aria-label="Seções da sala" className="flex border-b border-paper/10">
              {tabs.map((tab, index) => {
                const selected = tab.id === active;
                return (
                  <button
                    key={tab.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={cx(
                      "relative min-h-12 flex-1 px-3 text-sm font-medium transition-colors",
                      selected
                        ? "text-paper after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-paper"
                        : "text-muted-on-ink hover:text-paper",
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`${baseId}-panel-${active}`}
              aria-labelledby={`${baseId}-tab-${active}`}
              className="min-h-[26rem]"
            >
              {active === "resenha" && <ResenhaPanel />}
              {active === "nota" && <RatingPanel />}
              {active === "craque" && <CraquePanel />}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-on-ink">
            Demonstração interativa com dados de exemplo. Pode testar: nada é salvo nem
            enviado.
          </p>
        </div>
      </div>
    </section>
  );
}
