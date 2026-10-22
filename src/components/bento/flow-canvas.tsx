"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { FlowProvider } from "./flow-motion";
import {
  IN_STAGGER,
  OUT_STAGGER,
  OUT_START,
  PULSE_DURATION,
  PULSE_LENGTH,
  loop,
} from "./flow-timing";

type Point = { x: number; y: number };

type Edge = {
  id: string;
  /** `in` runs from a source to the pipeline, `out` from it to a destination. */
  kind: "in" | "out";
  /** Position among the sources (or destinations), top to bottom. */
  index: number;
  from: Point;
  to: Point;
  /** SVG path data for the curve. */
  d: string;
};

/** How far from the corners of the pipeline box the outermost ports sit. */
const PORT_PADDING = 28;

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const round = (value: number) => Math.round(value * 10) / 10;

function boxOf(element: HTMLElement, origin: DOMRect) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left - origin.left,
    right: rect.right - origin.left,
    top: rect.top - origin.top,
    bottom: rect.bottom - origin.top,
  };
}

/** Spaces `count` ports evenly along one side of the pipeline box. */
function portAt(index: number, count: number, start: number, length: number) {
  if (count === 1) return start + length / 2;
  const padding = Math.min(PORT_PADDING, length / (count * 2));
  return start + padding + (index * (length - padding * 2)) / (count - 1);
}

function makeEdge(
  kind: Edge["kind"],
  index: number,
  from: Point,
  to: Point,
  horizontal: boolean,
): Edge {
  const a = { x: round(from.x), y: round(from.y) };
  const b = { x: round(to.x), y: round(to.y) };
  const d = horizontal
    ? `M${a.x} ${a.y} C${round((a.x + b.x) / 2)} ${a.y} ${round((a.x + b.x) / 2)} ${b.y} ${b.x} ${b.y}`
    : `M${a.x} ${a.y} C${a.x} ${round((a.y + b.y) / 2)} ${b.x} ${round((a.y + b.y) / 2)} ${b.x} ${b.y}`;
  return { id: `${kind}-${index}`, kind, index, from: a, to: b, d };
}

/**
 * Reads where every node sits and returns one curve per connection. The nodes
 * are found by their `data-flow` attribute, so the lines follow whatever the
 * layout does: side by side on wide screens, stacked on narrow ones.
 */
function measureEdges(wrapper: HTMLElement): Edge[] {
  const engineElement = wrapper.querySelector<HTMLElement>(
    "[data-flow='engine']",
  );
  const sourceElements = Array.from(
    wrapper.querySelectorAll<HTMLElement>("[data-flow='source']"),
  );
  const destinationElements = Array.from(
    wrapper.querySelectorAll<HTMLElement>("[data-flow='destination']"),
  );
  if (
    !engineElement ||
    sourceElements.length === 0 ||
    destinationElements.length === 0
  ) {
    return [];
  }

  const origin = wrapper.getBoundingClientRect();
  const engine = boxOf(engineElement, origin);
  const sources = sourceElements.map((element) => boxOf(element, origin));
  const destinations = destinationElements.map((element) =>
    boxOf(element, origin),
  );

  // Side by side: the first source starts level with the pipeline box.
  // Stacked: it ends above it.
  const horizontal = sources[0].bottom > engine.top;
  const engineHeight = engine.bottom - engine.top;
  const engineWidth = engine.right - engine.left;

  const edges: Edge[] = [];

  sources.forEach((source, index) => {
    const from = horizontal
      ? { x: source.right, y: (source.top + source.bottom) / 2 }
      : { x: (source.left + source.right) / 2, y: source.bottom };
    const to = horizontal
      ? {
          x: engine.left,
          y: portAt(index, sources.length, engine.top, engineHeight),
        }
      : {
          x: portAt(index, sources.length, engine.left, engineWidth),
          y: engine.top,
        };
    edges.push(makeEdge("in", index, from, to, horizontal));
  });

  destinations.forEach((destination, index) => {
    const from = horizontal
      ? {
          x: engine.right,
          y: portAt(index, destinations.length, engine.top, engineHeight),
        }
      : {
          x: portAt(index, destinations.length, engine.left, engineWidth),
          y: engine.bottom,
        };
    const to = horizontal
      ? { x: destination.left, y: (destination.top + destination.bottom) / 2 }
      : { x: (destination.left + destination.right) / 2, y: destination.top };
    edges.push(makeEdge("out", index, from, to, horizontal));
  });

  return edges;
}

function sameEdges(a: Edge[], b: Edge[]) {
  return (
    a.length === b.length &&
    a.every((edge, i) => edge.id === b[i].id && edge.d === b[i].d)
  );
}

type FlowCanvasProps = {
  /** A short summary of the diagram for screen readers. */
  ariaLabel: string;
  /** Layout classes for the grid that holds the three columns. */
  className?: string;
  children: React.ReactNode;
};

/**
 * Wraps the three columns of the diagram and draws the connecting lines over
 * them. Nodes mark themselves with `data-flow="source" | "engine" |
 * "destination"`; this component measures them, draws a gradient curve for
 * each connection, and (while on screen) sends a short pulse of light along
 * every curve. The pulses are decoration only: with reduced motion they are
 * not drawn and the static lines carry the whole diagram.
 */
export function FlowCanvas({ ariaLabel, className, children }: FlowCanvasProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<Edge[]>([]);
  const reduceMotion = useReducedMotion();

  // `seen` draws the lines in once; `visible` pauses the loop off screen.
  const seen = useInView(wrapperRef, { once: true, margin: "0px 0px -80px 0px" });
  const visible = useInView(wrapperRef);
  const running = visible && !reduceMotion;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const update = () => {
      const next = measureEdges(wrapper);
      setEdges((previous) => (sameEdges(previous, next) ? previous : next));
    };

    // The observer fires once as soon as it starts watching, which gives the
    // first measurement, and again whenever the layout changes size.
    const observer = new ResizeObserver(update);
    observer.observe(wrapper);

    // Web fonts can change text widths after the first paint.
    let active = true;
    document.fonts.ready.then(() => {
      if (active) update();
    });

    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  return (
    <FlowProvider value={running}>
      <div
        ref={wrapperRef}
        role="group"
        aria-label={ariaLabel}
        className={cn("relative", className)}
      >
        {children}

        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible"
        >
          <defs>
            {/* One gradient per line, in screen coordinates so that straight
                lines (which have no height or width) still get a colour. Lines
                warm toward the pipeline on the way in and cool on the way out. */}
            {edges.map((edge) => (
              <linearGradient
                key={edge.id}
                id={`${uid}-${edge.id}`}
                gradientUnits="userSpaceOnUse"
                x1={edge.from.x}
                y1={edge.from.y}
                x2={edge.to.x}
                y2={edge.to.y}
              >
                <stop
                  offset="0"
                  style={{
                    stopColor:
                      edge.kind === "in"
                        ? "var(--border-strong)"
                        : "var(--accent-600)",
                  }}
                />
                <stop
                  offset="1"
                  style={{
                    stopColor:
                      edge.kind === "in"
                        ? "var(--accent-600)"
                        : "var(--border-strong)",
                  }}
                />
              </linearGradient>
            ))}
          </defs>

          {/* The lines themselves. They draw in once when scrolled into view. */}
          {edges.map((edge, i) => (
            <motion.path
              key={edge.id}
              d={edge.d}
              fill="none"
              stroke={`url(#${uid}-${edge.id})`}
              strokeWidth={1.25}
              strokeLinecap="round"
              initial={{ pathLength: reduceMotion ? 1 : 0 }}
              animate={{ pathLength: seen || reduceMotion ? 1 : 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.9,
                delay: reduceMotion ? 0 : 0.15 + i * 0.05,
                ease,
              }}
            />
          ))}

          {/* A short bright segment travels along each line, once per loop. */}
          {running ? (
            <g
              style={{
                filter:
                  "drop-shadow(0 0 3px color-mix(in oklab, var(--accent-400) 70%, transparent))",
              }}
            >
              {edges.map((edge) => (
                <motion.path
                  key={`${edge.id}-pulse`}
                  d={edge.d}
                  fill="none"
                  className="stroke-accent-400"
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength: PULSE_LENGTH, pathOffset: -PULSE_LENGTH }}
                  animate={{ pathOffset: 1 }}
                  transition={loop(
                    edge.kind === "in"
                      ? edge.index * IN_STAGGER
                      : OUT_START + edge.index * OUT_STAGGER,
                    PULSE_DURATION,
                  )}
                />
              ))}
            </g>
          ) : null}

          {/* Ports: small rings where each line meets a node. Drawn last so
              they sit on top of the line ends. */}
          {edges.map((edge) => (
            <g key={`${edge.id}-ports`}>
              <circle
                cx={edge.from.x}
                cy={edge.from.y}
                r={3}
                strokeWidth={1.25}
                className={cn(
                  "fill-background",
                  edge.kind === "in"
                    ? "stroke-border-strong"
                    : "stroke-accent-400",
                )}
              />
              <circle
                cx={edge.to.x}
                cy={edge.to.y}
                r={3}
                strokeWidth={1.25}
                className={cn(
                  "fill-background",
                  edge.kind === "in"
                    ? "stroke-accent-400"
                    : "stroke-border-strong",
                )}
              />
            </g>
          ))}
        </svg>
      </div>
    </FlowProvider>
  );
}
