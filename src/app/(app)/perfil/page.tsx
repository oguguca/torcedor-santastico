import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { ChangePasswordForm } from "@/components/app/change-password-form";
import { ProfileForm } from "@/components/app/profile-form";
import { initials } from "@/components/app/user-chip";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Perfil", robots: { index: false } };

const dateFormat = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });

export default async function ProfilePage() {
  const user = await requireUser();
  const details = [
    user.city,
    user.supporterSince ? `Santista desde ${user.supporterSince}` : null,
    `Na arquibancada desde ${dateFormat.format(new Date(user.createdAt))}`,
  ].filter(Boolean);

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <span
          aria-hidden="true"
          className="flex size-20 shrink-0 items-center justify-center rounded-full bg-ink text-2xl font-semibold text-paper"
        >
          {initials(user.name)}
        </span>
        <div>
          <h1 className="text-[clamp(2rem,1.6rem+1.8vw,3rem)] font-semibold leading-none tracking-tight">{user.name}</h1>
          <p className="mt-2 text-muted">{details.join(" · ")}</p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="profile-title" className="bg-paper p-6 sm:p-8">
          <h2 id="profile-title" className="text-xl font-semibold tracking-tight">
            Dados do perfil
          </h2>
          <p className="mt-1 text-sm text-muted">É assim que a torcida vai te ver.</p>
          <div className="mt-6">
            <ProfileForm name={user.name} city={user.city} supporterSince={user.supporterSince} />
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section aria-labelledby="security-title" className="bg-paper p-6 sm:p-8">
            <h2 id="security-title" className="text-xl font-semibold tracking-tight">
              Segurança
            </h2>
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-muted">
              {user.email}
              {user.emailVerified && (
                <span className="inline-flex items-center gap-1">
                  <BadgeCheck aria-hidden="true" className="size-4" /> confirmado
                </span>
              )}
            </p>
            <div className="mt-6">
              <ChangePasswordForm />
            </div>
          </section>

          <section aria-labelledby="session-title" className="flex flex-wrap items-center justify-between gap-4 bg-paper p-6 sm:p-8">
            <div>
              <h2 id="session-title" className="text-xl font-semibold tracking-tight">
                Sessão
              </h2>
              <p className="mt-1 text-sm text-muted">Sair da sua conta neste aparelho.</p>
            </div>
            <SignOutButton />
          </section>
        </div>
      </div>
    </>
  );
}
