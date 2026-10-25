export function Manifesto() {
  return (
    <section id="manifesto" aria-labelledby="manifesto-title" className="bg-ink text-paper">
      <div aria-hidden="true" className="stripes h-3 text-paper" />

      <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-6">
          <p className="eyebrow text-muted-on-ink">Manifesto</p>
          <h2 id="manifesto-title" className="headline mt-5 text-section">
            Torcer não cabe no placar.
          </h2>
        </div>

        <div className="space-y-6 text-lead text-muted-on-ink lg:col-span-6 lg:pt-12">
          <p>
            Todo santista sabe que o jogo começa antes do apito inicial. Começa
            na escalação discutida com a família, na camisa separada desde cedo,
            no rádio ligado no caminho. E continua depois: na resenha, na nota
            que cada um dá para o lateral, no lance que vai ser lembrado por
            anos.
          </p>
          <p>
            O Torcedor Santastico nasce para dar lugar a essa conversa. Um espaço
            onde a opinião de quem acompanha o Peixe conta, onde o palpite fica
            registrado e onde a sua história com o clube não se perde no meio de
            tantas outras notícias.
          </p>
          <p className="text-paper">
            Nas vitórias e nas derrotas. No clássico e na quarta à noite. Para
            quem está na Vila e para quem acompanha de longe.
          </p>
        </div>
      </div>
    </section>
  );
}
