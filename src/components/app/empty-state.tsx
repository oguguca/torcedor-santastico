import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  /** Etiqueta curta do que falta, ex.: "Chega com o calendário". */
  status?: string;
  action?: ReactNode;
  className?: string;
};

/** Bloco para recursos que ainda não têm dados: diz o que vai aparecer, sem inventar. */
export function EmptyState({ icon: Icon, title, children, status, action, className }: EmptyStateProps) {
  return (
    <div className={cx("border border-dashed border-ink/20 bg-paper p-6 sm:p-8", className)}>
      <div className="flex items-start justify-between gap-4">
        <Icon aria-hidden="true" className="size-7" strokeWidth={1.5} />
        {status && <span className="border border-line px-2 py-1 text-xs text-muted">{status}</span>}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
      <div className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-muted">{children}</div>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
