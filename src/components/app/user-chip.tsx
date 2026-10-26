import Link from "next/link";
import { routes } from "@/config/routes";
import { getSession } from "@/lib/session";

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/** Avatar com o nome do torcedor no cabeçalho. Lê a sessão: fica dentro de <Suspense>. */
export async function UserChip() {
  const session = await getSession();
  if (!session) return null;
  const { name } = session.user;
  return (
    <Link
      href={routes.profile}
      aria-label={`Seu perfil, ${name}`}
      className="flex min-h-11 items-center gap-2.5 text-sm font-medium"
    >
      <span className="hidden sm:inline">{name.split(" ")[0]}</span>
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-full bg-paper text-xs font-semibold text-ink"
      >
        {initials(name)}
      </span>
    </Link>
  );
}
