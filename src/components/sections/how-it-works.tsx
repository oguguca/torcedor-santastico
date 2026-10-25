const steps = [
  {
    title: "Entre para a comunidade",
    description:
      "Crie sua conta e monte seu perfil de santista. O cadastro abre junto com a primeira versão da plataforma.",
  },
  {
    title: "Participe dos jogos",
    description:
      "Dê seu palpite antes da partida, avalie o time depois do apito e entre na conversa de cada rodada.",
  },
  {
    title: "Acompanhe a torcida e a sua trajetória",
    description:
      "Veja o termômetro da opinião santista e o histórico de tudo de que você já participou.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="how-title"
      className="border-y border-line bg-surface py-20 lg:py-28"
    >
      <div className="shell">
        <p className="eyebrow text-muted">Como funciona</p>
        <h2 id="how-title" className="headline mt-5 max-w-3xl text-section">
          Do cadastro à arquibancada digital
        </h2>

        <ol className="mt-14 grid border-t-2 border-ink md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="border-b border-line py-8 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0"
            >
              <span aria-hidden="true" className="headline block text-[4.5rem] leading-[0.8] lg:text-[6rem]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-xl font-semibold leading-snug">{step.title}</h3>
              <p className="mt-3 max-w-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
