import { cx } from "@/lib/cx";

/** Símbolo: degraus de arquibancada com a bola subindo sobre eles. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <rect x="0" y="28" width="40" height="12" />
      <rect x="12" y="15" width="28" height="10" />
      <rect x="24" y="4" width="16" height="8" />
      <circle cx="6" cy="8" r="5" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <BrandMark className="size-7 shrink-0" />
      <span className="font-display text-[1.125rem] leading-none tracking-[0.01em] whitespace-nowrap uppercase font-stretch-75%">
        <span className="font-normal">Torcedor</span>{" "}
        <span className="font-extrabold">Santastico</span>
      </span>
    </span>
  );
}
