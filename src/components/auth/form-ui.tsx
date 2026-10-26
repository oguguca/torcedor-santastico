"use client";

import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/button";
import { cx } from "@/lib/cx";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  /** Erro de validação do campo, anunciado ao leitor de tela. */
  error?: string;
};

const inputClasses =
  "h-12 w-full border border-ink/20 bg-paper px-4 text-base text-ink transition-colors placeholder:text-muted/70 hover:border-ink/40 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function Field({ label, hint, error, id, className, ...props }: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        aria-invalid={error ? true : undefined}
        className={cx(inputClasses, "mt-2", error && "border-ink border-2")}
        {...props}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

export function PasswordField({ label, hint, id, className, ...props }: FieldProps) {
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          aria-describedby={hintId}
          className={cx(inputClasses, "pr-12")}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Esconder senha" : "Mostrar senha"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted hover:text-ink"
        >
          {visible ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
        </button>
      </div>
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={pending} className={buttonClasses({ className: "w-full disabled:opacity-70" })}>
      {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

export function FormMessage({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  const Icon = tone === "error" ? AlertCircle : CheckCircle2;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cx(
        "flex gap-3 border px-4 py-3 text-sm leading-relaxed",
        tone === "error" ? "border-ink bg-surface" : "border-ink/20 bg-surface",
      )}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
