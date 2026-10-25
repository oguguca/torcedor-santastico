import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

type Variant = "primary" | "secondary";
/** Superfície sobre a qual o botão aparece. */
type Tone = "light" | "dark";

type ButtonStyleOptions = {
  variant?: Variant;
  tone?: Tone;
  className?: string;
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 px-6 text-[0.9375rem] font-semibold transition-[background-color,color,border-color] duration-200 active:translate-y-px select-none";

const styles: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-ink text-paper hover:bg-neutral-700",
    secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  },
  dark: {
    primary: "bg-paper text-ink hover:bg-neutral-300",
    secondary:
      "border border-paper/50 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  },
};

export function buttonClasses({
  variant = "primary",
  tone = "light",
  className,
}: ButtonStyleOptions = {}): string {
  return cx(base, styles[tone][variant], className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & Omit<ButtonStyleOptions, "className">;

export function ButtonLink({ variant, tone, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses({ variant, tone, className })} {...props} />;
}
