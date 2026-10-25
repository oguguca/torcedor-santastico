import { useId } from "react";

export type RadarAxis = {
  label: string;
  value: number;
  /** Valor real exibido abaixo do rótulo (opcional). */
  detail?: string;
};

const CENTER = 160;
const RADIUS = 112;
const RINGS = [0.25, 0.5, 0.75, 1];

function polar(index: number, total: number, scale: number): [number, number] {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return [CENTER + Math.cos(angle) * RADIUS * scale, CENTER + Math.sin(angle) * RADIUS * scale];
}

const toPoints = (coords: Array<[number, number]>) =>
  coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

type RadarChartProps = {
  axes: RadarAxis[];
  max?: number;
  label: string;
  className?: string;
};

/** Radar em SVG puro; valores também ficam no nome acessível. */
export function RadarChart({ axes, max = 10, label, className }: RadarChartProps) {
  const total = axes.length;
  const data = axes.map((axis, index) => polar(index, total, axis.value / max));
  const fillId = `radar-fill-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="-95 -14 510 344" role="img" aria-label={label} className={className}>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {RINGS.map((ring) => (
        <polygon
          key={ring}
          points={toPoints(axes.map((_, index) => polar(index, total, ring)))}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={ring === 1 ? 0.3 : 0.12}
        />
      ))}

      {axes.map((axis, index) => {
        const [x, y] = polar(index, total, 1);
        return (
          <line key={axis.label} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="#ffffff" strokeOpacity="0.12" />
        );
      })}

      <polygon points={toPoints(data)} fill={`url(#${fillId})`} stroke="#ffffff" strokeWidth="1.5" />

      {data.map(([x, y], index) => (
        <circle key={axes[index].label} cx={x} cy={y} r="3.5" fill="#ffffff" />
      ))}

      {axes.map((axis, index) => {
        const [x, y] = polar(index, total, 1.2);
        const anchor = Math.abs(x - CENTER) < 4 ? "middle" : x > CENTER ? "start" : "end";
        return (
          <text
            key={axis.label}
            x={x}
            y={axis.detail ? y - 8 : y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-muted-on-ink text-[11px] font-medium uppercase tracking-[0.12em]"
          >
            {axis.label}
            {axis.detail && (
              <tspan x={x} dy="17" className="fill-paper text-[13px] font-semibold normal-case tracking-normal">
                {axis.detail}
              </tspan>
            )}
          </text>
        );
      })}
    </svg>
  );
}
