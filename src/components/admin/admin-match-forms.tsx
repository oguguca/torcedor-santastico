"use client";

import { RefreshCw } from "lucide-react";
import { useActionState } from "react";
import { syncNow, updateMatch, type AdminState } from "@/app/(app)/admin/partidas/actions";
import { FormMessage } from "@/components/auth/form-ui";
import { buttonClasses } from "@/components/ui/button";
import { MATCH_STATUSES, statusLabel } from "@/lib/matches/format";

const idle: AdminState = { status: "idle" };

export function SyncNowButton() {
  const [state, action, pending] = useActionState(syncNow, idle);
  return (
    <form action={action} className="flex flex-col items-start gap-3 sm:items-end">
      <button type="submit" disabled={pending} className={buttonClasses({ className: "disabled:opacity-70" })}>
        <RefreshCw aria-hidden="true" className={pending ? "size-4 animate-spin" : "size-4"} />
        {pending ? "Sincronizando…" : "Sincronizar agora"}
      </button>
      {state.message && <FormMessage tone={state.status === "error" ? "error" : "success"}>{state.message}</FormMessage>}
    </form>
  );
}

type EditableMatch = {
  id: number;
  status: string;
  /** "AAAA-MM-DDTHH:mm" no fuso de Brasília. */
  kickoffLocal: string;
  homeScore: number | null;
  awayScore: number | null;
  manualOverride: boolean;
  homeName: string;
  awayName: string;
};

const inputClasses =
  "h-11 w-full border border-ink/20 bg-paper px-3 text-sm focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function EditMatchForm({ m }: { m: EditableMatch }) {
  const [state, action, pending] = useActionState(updateMatch, idle);
  const prefix = `m${m.id}`;
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.4fr_auto_auto]">
      <input type="hidden" name="id" value={m.id} />
      <label className="text-sm font-medium" htmlFor={`${prefix}-status`}>
        Status
        <select id={`${prefix}-status`} name="status" defaultValue={m.status} className={`${inputClasses} mt-1.5`}>
          {MATCH_STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium" htmlFor={`${prefix}-kickoff`}>
        Data e hora (Brasília)
        <input
          id={`${prefix}-kickoff`}
          type="datetime-local"
          name="kickoff"
          defaultValue={m.kickoffLocal}
          required
          className={`${inputClasses} mt-1.5`}
        />
      </label>
      <fieldset className="text-sm font-medium">
        <legend>Placar</legend>
        <div className="mt-1.5 flex items-center gap-2">
          <input
            aria-label={`Gols de ${m.homeName}`}
            name="homeScore"
            type="number"
            min={0}
            max={30}
            defaultValue={m.homeScore ?? ""}
            className={`${inputClasses} w-16 text-center`}
          />
          <span aria-hidden="true">×</span>
          <input
            aria-label={`Gols de ${m.awayName}`}
            name="awayScore"
            type="number"
            min={0}
            max={30}
            defaultValue={m.awayScore ?? ""}
            className={`${inputClasses} w-16 text-center`}
          />
        </div>
      </fieldset>
      <div className="flex flex-col justify-end gap-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="manualOverride" defaultChecked={m.manualOverride} className="size-4 accent-ink" />
          Travar correção
        </label>
        <button type="submit" disabled={pending} className={buttonClasses({ className: "min-h-11 disabled:opacity-70" })}>
          {pending ? "Salvando…" : "Salvar"}
        </button>
      </div>
      {state.message && (
        <div className="sm:col-span-2 lg:col-span-4">
          <FormMessage tone={state.status === "error" ? "error" : "success"}>{state.message}</FormMessage>
        </div>
      )}
    </form>
  );
}
