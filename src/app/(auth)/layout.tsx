import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { routes } from "@/config/routes";
import torcida from "@/assets/torcida-arquibancada.jpg";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative isolate hidden overflow-hidden bg-ink p-12 text-paper lg:flex lg:flex-col lg:justify-between">
        <Image
          src={torcida}
          alt=""
          fill
          sizes="50vw"
          quality={60}
          placeholder="blur"
          className="-z-10 object-cover opacity-45"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/50 to-ink/30" />
        <Link href={routes.home} aria-label="Torcedor Santastico, voltar ao início">
          <Logo />
        </Link>
        <div>
          <p className="max-w-md text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-semibold leading-[1.05] tracking-tight">
            A arquibancada não acaba no apito.
          </p>
          <p className="mt-4 max-w-sm text-muted-on-ink">
            Plataforma independente, feita por santistas. Não é oficial nem afiliada ao
            Santos Futebol Clube.
          </p>
        </div>
      </aside>

      <main id="conteudo" className="flex flex-col px-4 py-8 sm:px-8 lg:px-16">
        <Link href={routes.home} aria-label="Torcedor Santastico, voltar ao início" className="lg:hidden">
          <Logo />
        </Link>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">{children}</div>
      </main>
    </div>
  );
}
