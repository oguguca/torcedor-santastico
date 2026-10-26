import Image from "next/image";
import { cx } from "@/lib/cx";

type TeamCrestProps = {
  team: { shortName: string; crestUrl: string | null };
  /** Tamanho em pixels; com `className` de tamanho (ex.: "size-16 sm:size-24"), vira só a resolução pedida. */
  size: number;
  /** Disco claro atrás do escudo, para legibilidade em fundo escuro. */
  onDark?: boolean;
  className?: string;
};

/** Escudo do time. É decorativo: o nome do time sempre aparece ao lado. */
export function TeamCrest({ team, size, onDark = false, className }: TeamCrestProps) {
  const frame = onDark ? "rounded-full bg-paper" : "";
  // Padding em em, não em %: % de padding é calculado sobre a largura do pai, não do disco.
  const box = className ? undefined : { width: size, height: size };
  const disc = onDark ? { ...box, padding: "0.12em", fontSize: size } : box;

  if (!team.crestUrl) {
    return (
      <span
        aria-hidden="true"
        style={box}
        className={cx(
          "flex shrink-0 items-center justify-center rounded-full text-[0.6em] font-semibold",
          onDark ? "bg-paper text-ink" : "bg-surface text-muted",
          className,
        )}
      >
        {team.shortName.slice(0, 3).toUpperCase()}
      </span>
    );
  }

  return (
    <span aria-hidden="true" style={disc} className={cx("flex shrink-0", frame, className)}>
      <Image
        src={team.crestUrl}
        alt=""
        width={size}
        height={size}
        className="size-full object-contain"
      />
    </span>
  );
}
