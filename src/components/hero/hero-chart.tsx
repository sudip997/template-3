"use client";

import { motion, useReducedMotion } from "motion/react";

const WIDTH = 320;
const HEIGHT = 96;
const PAD_X = 6;
const PAD_Y = 10;

/**
 * A small line chart drawn in plain SVG (no chart library). The line draws
 * itself once when it scrolls into view; visitors who prefer reduced motion
 * see it appear instantly instead.
 */
export function HeroChart({ points }: { points: number[] }) {
  const reduceMotion = useReducedMotion();

  const min = Math.min(...points);
  const span = Math.max(...points) - min || 1;
  const coords = points.map((value, i) => ({
    x: PAD_X + (i / (points.length - 1)) * (WIDTH - PAD_X * 2),
    y: PAD_Y + (1 - (value - min) / span) * (HEIGHT - PAD_Y * 2),
  }));

  const line = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${coords[coords.length - 1].x} ${HEIGHT} L${coords[0].x} ${HEIGHT} Z`;
  const last = coords[coords.length - 1];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="block h-auto w-full"
      aria-hidden="true"
    >
      {[0.25, 0.5, 0.75].map((fraction) => (
        <line
          key={fraction}
          x1={0}
          x2={WIDTH}
          y1={HEIGHT * fraction}
          y2={HEIGHT * fraction}
          className="stroke-border"
          strokeWidth={1}
          strokeDasharray="2 4"
        />
      ))}
      <path d={area} className="fill-accent-subtle" opacity={0.7} />
      <motion.path
        d={line}
        fill="none"
        className="stroke-accent-400"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reduceMotion ? 0 : 1.1,
          delay: reduceMotion ? 0 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <circle
        cx={last.x}
        cy={last.y}
        r={3}
        className="fill-background stroke-accent-400"
        strokeWidth={1.5}
      />
    </svg>
  );
}
