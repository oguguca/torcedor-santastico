import { BookMarked, Megaphone, MessagesSquare, Target, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const mainFeature: Feature = {
  icon: Megaphone,
  title: "A voz da torcida",
  description:
    "Avalie cada jogador depois da partida, escolha o melhor em campo e compare a sua leitura do jogo com a do restante da torcida. Sua opinião deixa de se perder nos comentários e passa a fazer parte do retrato da partida.",
};

const otherFeatures: Feature[] = [
  {
    icon: Target,
    title: "Palpites e desafios",
    description:
      "Registre seu palpite antes de a bola rolar e acompanhe, rodada a rodada, quantas vezes você acertou.",
  },
  {
    icon: MessagesSquare,
    title: "Discussões por partida",
    description:
      "Cada jogo com seu próprio espaço de conversa, da escalação anunciada à resenha depois do apito.",
  },
  {
    icon: BookMarked,
    title: "Sua história como santista",
    description:
      "Um perfil que guarda suas participações, estatísticas pessoais e conquistas ao longo das temporadas.",
  },
];

function PlannedTag() {
  return (
    <span className="eyebrow inline-flex items-center gap-1.5 border border-line px-2 py-1 text-[0.6875rem] text-muted">
      Planejado
    </span>
  );
}

/** Escala de 0 a 10 que ilustra a avaliação, com uma nota marcada. */
function RatingScale() {
  return (
    <div aria-hidden="true" className="mt-10">
      <div className="grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, value) => (
          <span
            key={value}
            className={
              value === 8
                ? "flex aspect-square items-center justify-center bg-ink font-mono text-xs text-paper sm:text-sm"
                : "flex aspect-square items-center justify-center border border-line font-mono text-xs text-muted sm:text-sm"
            }
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Features() {
  const MainIcon = mainFeature.icon;

  return (
    <section id="funcionalidades" aria-labelledby="features-title" className="py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow text-muted">Funcionalidades</p>
            <h2 id="features-title" className="headline mt-5 text-section">
              O que estamos construindo
            </h2>
          </div>
          <p className="max-w-md text-lead text-muted lg:col-span-5">
            Nada disso está no ar ainda. É o plano da plataforma, e ele vai ganhar
            forma por etapas, ouvindo quem torce.
          </p>
        </div>

        <div className="mt-14 grid border-t-2 border-ink lg:grid-cols-12">
          <article className="border-b border-line py-10 lg:col-span-6 lg:border-b-0 lg:border-r lg:py-12 lg:pr-12">
            <div className="flex items-center justify-between gap-4">
              <MainIcon aria-hidden="true" className="size-9" strokeWidth={1.5} />
              <PlannedTag />
            </div>
            <h3 className="headline mt-10 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[0.92]">
              {mainFeature.title}
            </h3>
            <p className="mt-5 max-w-lg text-lead text-muted">{mainFeature.description}</p>
            <RatingScale />
          </article>

          <ul className="lg:col-span-6">
            {otherFeatures.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-8 last:border-b-0 lg:py-10 lg:pl-12"
              >
                <Icon aria-hidden="true" className="mt-0.5 size-7" strokeWidth={1.5} />
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="headline text-title">{title}</h3>
                    <PlannedTag />
                  </div>
                  <p className="mt-3 max-w-md text-muted">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
