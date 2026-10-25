import { ChevronRight } from "lucide-react";
import { getImageProps } from "next/image";
import torcida from "@/assets/torcida-vibra.jpg";
import { ShareButton } from "./share-button";

export function FinalCta() {
  // URL otimizada da foto para usar como textura dentro das letras
  const {
    props: { src: texture },
  } = getImageProps({ src: torcida, alt: "", width: 1200, quality: 70 });

  return (
    <section id="participar" aria-labelledby="cta-title" className="grid lg:grid-cols-12">
      <div className="flex flex-col items-center justify-center overflow-hidden bg-ink px-4 py-20 text-paper lg:col-span-8 lg:py-28">
        {/* Nome com a torcida por dentro das letras; decorativo, o título real está ao lado */}
        <p
          aria-hidden="true"
          style={{ backgroundImage: `url(${texture})` }}
          className="bg-cover bg-clip-text bg-center font-display text-[15vw] font-black leading-[0.9] tracking-[-0.04em] text-transparent lowercase lg:text-[min(9.5vw,9rem)]"
        >
          santastico
        </p>
        <a
          href="#inicio"
          className="eyebrow mt-8 inline-flex min-h-11 items-center gap-1 text-muted-on-ink transition-colors hover:text-paper"
        >
          Voltar ao início
          <ChevronRight aria-hidden="true" className="size-3.5" />
        </a>
      </div>

      <div className="flex flex-col items-center justify-center bg-paper px-6 py-16 text-center lg:col-span-4 lg:px-10">
        <h2 id="cta-title" className="headline max-w-xs text-title">
          A arquibancada está sendo montada
        </h2>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
          O cadastro abre quando a primeira versão estiver pronta para receber a
          torcida. Até lá, chame outros santistas para conhecer a ideia.
        </p>
        <div className="mt-8">
          <ShareButton />
        </div>
      </div>
    </section>
  );
}
