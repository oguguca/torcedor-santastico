import { Plus } from "lucide-react";
import { demoMatch } from "@/data/match-cycle-demo";

const rules = [
  {
    question: "Quanto tempo a sala fica aberta?",
    answer: `Cerca de ${demoMatch.windowHours} horas depois do apito final. O horário exato de fechamento aparece na sala de cada jogo.`,
  },
  {
    question: "Posso mudar minha nota ou meu craque?",
    answer: "Pode, quantas vezes quiser, até o prazo fechar. Vale um voto por pessoa em cada jogo.",
  },
  {
    question: "Por que não vejo a média enquanto voto?",
    answer:
      "Para cada um votar no que viu, sem ser influenciado pelos outros. A média só aparece quando a sala fecha.",
  },
  {
    question: "Quem pode votar?",
    answer:
      "Contas criadas antes de a partida começar. Assim ninguém cria perfis na hora para inflar ou derrubar a nota.",
  },
  {
    question: "E se pouca gente votar?",
    answer: "Abaixo de um número mínimo de votos, o resultado aparece marcado como amostra pequena.",
  },
  {
    question: "O que acontece com a resenha depois?",
    answer: "Ela fica guardada como arquivo, só para leitura. É a memória daquele jogo.",
  },
  {
    question: "Como vai funcionar a moderação?",
    answer:
      "Os posts poderão ser denunciados e passarão por moderação. Ofensas, racismo e ataques pessoais serão removidos.",
  },
];

export function RoomRules() {
  return (
    <section id="regras" aria-labelledby="rules-title" className="bg-paper py-20 text-ink lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="rules-title" className="headline text-section">
            Regras da sala
          </h2>
          <p className="mt-5 max-w-sm text-muted">
            Planejadas para a primeira versão. Podem mudar com o retorno da torcida.
          </p>
        </div>

        <div className="border-t border-ink lg:col-span-8">
          {rules.map((rule) => (
            <details key={rule.question} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {rule.question}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{rule.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
