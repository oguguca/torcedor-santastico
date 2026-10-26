import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/brand/logo";
import { AppBottomNav, AppTopNav, BottomNavList, TopNavList } from "@/components/app/app-nav";
import { UserChip } from "@/components/app/user-chip";
import { routes } from "@/config/routes";
import { requireUser } from "@/lib/session";

/** Valida a sessão no servidor antes de mostrar qualquer página da área logada. */
async function RequireSession({ children }: { children: React.ReactNode }) {
  await requireUser();
  return children;
}

function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando" className="animate-pulse space-y-4">
      <div className="h-10 w-1/2 bg-paper" />
      <div className="h-5 w-1/3 bg-paper" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="h-48 bg-paper" />
        <div className="h-48 bg-paper" />
      </div>
    </div>
  );
}

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh bg-surface text-ink">
      <header className="sticky top-0 z-40 bg-ink text-paper">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link href={routes.appHome} aria-label="Torcedor Santastico, início" className="-my-2 py-2">
            <Logo />
          </Link>
          <Suspense fallback={<TopNavList pathname="" />}>
            <AppTopNav />
          </Suspense>
          <Suspense fallback={<span className="size-9 rounded-full bg-paper/10" />}>
            <UserChip />
          </Suspense>
        </div>
      </header>

      <main id="conteudo" className="shell pb-28 pt-10 lg:pb-20 lg:pt-14">
        <Suspense fallback={<PageSkeleton />}>
          <RequireSession>{children}</RequireSession>
        </Suspense>
      </main>

      <Suspense fallback={<BottomNavList pathname="" />}>
        <AppBottomNav />
      </Suspense>
    </div>
  );
}
