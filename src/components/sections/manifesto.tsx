import Image from "next/image";
import pele1965 from "@/assets/pele-1965.jpg";

export function Manifesto() {
  return (
    <section id="manifesto" aria-labelledby="manifesto-title" className="grid lg:grid-cols-2">
      <figure className="relative isolate flex min-h-[30rem] flex-col items-center justify-end overflow-hidden bg-ink px-6 pb-14 text-center text-paper lg:min-h-[40rem]">
        <Image
          src={pele1965}
          alt="Pelé sorri com a camisa do Santos, em Mar del Plata, 1965."
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          className="-z-10 object-cover object-[50%_8%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/35 to-transparent" />
        <h2 id="manifesto-title" className="headline text-section">
          Torcer não cabe no placar
        </h2>
        <figcaption className="mt-3 text-sm text-paper/70">Pelé em Mar del Plata, 1965</figcaption>
      </figure>

      <div className="flex flex-col justify-center gap-6 bg-surface px-4 py-16 text-lead text-muted sm:px-8 lg:px-16">
        <p className="text-sm font-semibold text-ink">Por que o Torcedor Santastico existe</p>
        <p>
          Todo santista sabe que o jogo começa antes do apito inicial. Começa na
          escalação discutida com a família, na camisa separada desde cedo, no
          rádio ligado no caminho. E continua depois: na resenha, na nota que
          cada um dá para o lateral, no lance que vai ser lembrado por anos.
        </p>
        <p>
          O Torcedor Santastico nasce para dar lugar a essa conversa. Um espaço
          onde a opinião de quem acompanha o Peixe conta, onde o palpite fica
          registrado e onde a sua história com o clube não se perde no meio de
          tantas outras notícias.
        </p>
        <p className="font-medium text-ink">
          Nas vitórias e nas derrotas. No clássico e na quarta à noite. Para quem
          está na Vila e para quem acompanha de longe.
        </p>
      </div>
    </section>
  );
}
