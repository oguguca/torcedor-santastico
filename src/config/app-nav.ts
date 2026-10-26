import { CalendarDays, Compass, House, UserRound, type LucideIcon } from "lucide-react";
import { routes } from "./routes";

export type AppNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** Navegação da área logada: barra no topo (desktop) e abas embaixo (celular). */
export const appNav: AppNavItem[] = [
  { label: "Início", href: routes.appHome, icon: House },
  { label: "Partidas", href: routes.matches, icon: CalendarDays },
  { label: "Explorar", href: routes.explore, icon: Compass },
  { label: "Perfil", href: routes.profile, icon: UserRound },
];
