"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import type { GlobeContent } from "./globe-data";
import {
  buildScene,
  renderFrame,
  type GlobeFrame,
  type GlobeGeometry,
} from "./globe-math";

/**
 * The SVG's own coordinates. The globe is bigger than the panel is tall: its
 * bottom is cropped by the panel edge, and the space above leaves room for the
 * glow and for arcs that rise over the top.
 */
const GEOMETRY: GlobeGeometry = {
  width: 640,
  height: 480,
  cx: 320,
  cy: 292,
  radius: 262,
};

/**
 * Redraw at most this often. About 33 frames a second is smooth for a slow
 * turn and does half the work of 60.
 */
const MIN_FRAME_MS = 30;

/** The elements the animation loop rewrites, collected by callback refs. */
type Nodes = {
  dots: (SVGPathElement | null)[];
  arcs: (SVGPathElement | null)[];
  pulses: (SVGGElement | null)[];
  markers: (SVGGElement | null)[];
  labels: (HTMLSpanElement | null)[];
};

/* Land and routes are each drawn in three paths by depth (see globe-math.ts).
   Full class names, so Tailwind can find them. */
const DOT_TIERS = [
  "stroke-muted-foreground/20",
  "stroke-muted-foreground/40",
  "stroke-muted-foreground/65",
];
const ARC_TIERS = [
  "stroke-accent-600/15",
  "stroke-accent-600/35",
  "stroke-accent-600/65",
];

const round1 = (value: number) => String(Math.round(value * 10) / 10);
const round2 = (value: number) => String(Math.round(value * 100) / 100);
const percent = (value: number, of: number) => `${round2((value / of) * 100)}%`;

/**
 * Writes one frame straight to the DOM. Rebuilding thousands of dots through
 * React every frame would be slow; React draws the first frame and then
 * leaves these attributes alone.
 */
function applyFrame(nodes: Nodes, frame: GlobeFrame) {
  frame.dots.forEach((d, i) => nodes.dots[i]?.setAttribute("d", d));
  frame.arcs.forEach((d, i) => nodes.arcs[i]?.setAttribute("d", d));

  frame.pulses.forEach((pulse, i) => {
    const group = nodes.pulses[i];
    if (!group) return;
    group.style.opacity = round2(pulse.opacity);
    if (pulse.opacity === 0) return;

    // The group's children, in order: glow, core, halo, head (see the JSX).
    const [glow, core, halo, head] = [0, 1, 2, 3].map((n) => group.children[n]);
    glow.setAttribute("d", pulse.d);
    core.setAttribute("d", pulse.d);
    for (const circle of [halo, head]) {
      circle.setAttribute("cx", round1(pulse.x));
      circle.setAttribute("cy", round1(pulse.y));
    }
  });

  frame.places.forEach((place, i) => {
    const marker = nodes.markers[i];
    if (marker) {
      marker.setAttribute(
        "transform",
        `translate(${round1(place.x)} ${round1(place.y)})`,
      );
      marker.style.opacity = round2(place.opacity);
    }

    const label = nodes.labels[i];
    if (label) {
      label.style.left = percent(place.x, GEOMETRY.width);
      label.style.top = percent(place.y, GEOMETRY.height);
      label.style.opacity = round2(place.opacity);
      label.dataset.side = place.side;
    }
  });
}

/**
 * A slowly turning globe of land dots with glowing routes between regions,
 * drawn in plain SVG (no map or 3D library). The first frame comes from the
 * server, so the globe is complete without JavaScript; the turning and the
 * travelling pulses only run while it is on screen, and not at all for
 * visitors who prefer reduced motion (they see the still globe, arcs
 * included).
 *
 * The globe is decorative: it is one image with a text description, and the
 * region codes drawn on it are hidden from assistive tech.
 */
export function GlobeView({ content }: { content: GlobeContent }) {
  const { ariaLabel, view, regions, routes } = content;
  const { longitude: startLongitude, tilt, degreesPerSecond, dotSpacing } = view;

  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<Nodes>({
    dots: [],
    arcs: [],
    pulses: [],
    markers: [],
    labels: [],
  });
  // Where the turn has got to survives pausing, so the globe carries on from
  // where it stopped when it scrolls back into view.
  const longitude = useRef(startLongitude);
  const clock = useRef(0);

  const scene = useMemo(
    () => buildScene(regions, routes, dotSpacing),
    [regions, routes, dotSpacing],
  );
  const first = useMemo(
    () =>
      renderFrame(scene, { longitude: startLongitude, tilt }, GEOMETRY, null),
    [scene, startLongitude, tilt],
  );

  const reduceMotion = useReducedMotion();
  const inView = useInView(rootRef);
  const running = inView && !reduceMotion;

  useEffect(() => {
    if (!running) return;

    let frameId = 0;
    let previous = performance.now();
    let lastDraw = 0;

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);

      // Cap the step so a long pause (a background tab) never makes a jump.
      const seconds = Math.min(now - previous, 100) / 1000;
      previous = now;
      longitude.current = (longitude.current + seconds * degreesPerSecond) % 360;
      clock.current += seconds;

      if (now - lastDraw < MIN_FRAME_MS) return;
      lastDraw = now;
      applyFrame(
        nodes.current,
        renderFrame(
          scene,
          { longitude: longitude.current, tilt },
          GEOMETRY,
          clock.current,
        ),
      );
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [running, scene, tilt, degreesPerSecond]);

  const { width, height, cx, cy, radius } = GEOMETRY;

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={ariaLabel}
      className="@container relative w-full"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          {/* The sphere: lit from the upper left, dark toward the lower right. */}
          <radialGradient id={`${uid}-sphere`} cx="0.36" cy="0.3" r="0.95">
            <stop offset="0" style={{ stopColor: "var(--muted)" }} />
            <stop offset="0.55" style={{ stopColor: "var(--card)" }} />
            <stop offset="1" style={{ stopColor: "var(--background)" }} />
          </radialGradient>
          {/* The rim: a bright teal edge on top that settles to a hairline. */}
          <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0"
              stopOpacity="0.6"
              style={{ stopColor: "var(--accent-400)" }}
            />
            <stop
              offset="0.5"
              stopOpacity="0.9"
              style={{ stopColor: "var(--border-strong)" }}
            />
            <stop
              offset="1"
              stopOpacity="0.6"
              style={{ stopColor: "var(--border)" }}
            />
          </linearGradient>
          {/* A soft atmosphere that fades out past the edge of the sphere. */}
          <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
            <stop
              offset="0.79"
              stopOpacity="0.2"
              style={{ stopColor: "var(--accent-600)" }}
            />
            <stop
              offset="0.86"
              stopOpacity="0.2"
              style={{ stopColor: "var(--accent-600)" }}
            />
            <stop
              offset="1"
              stopOpacity="0"
              style={{ stopColor: "var(--accent-600)" }}
            />
          </radialGradient>
          {/* Arcs and pulses are lifted off the surface, so near the edge they
              would float outside the globe. This keeps them on it. */}
          <clipPath id={`${uid}-disc`}>
            <circle cx={cx} cy={cy} r={radius + 1} />
          </clipPath>
        </defs>

        <circle cx={cx} cy={cy} r={radius + 50} fill={`url(#${uid}-glow)`} />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill={`url(#${uid}-sphere)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.2}
        />

        {/* Land, in three paths by depth: the nearer the edge, the dimmer. */}
        {first.dots.map((d, i) => (
          <path
            key={i}
            ref={(element) => {
              nodes.current.dots[i] = element;
            }}
            d={d}
            fill="none"
            strokeWidth={2.1}
            strokeLinecap="round"
            className={DOT_TIERS[i]}
            suppressHydrationWarning
          />
        ))}

        <g clipPath={`url(#${uid}-disc)`}>
          {/* Routes, in three paths by depth like the land. */}
          {first.arcs.map((d, i) => (
            <path
              key={i}
              ref={(element) => {
                nodes.current.arcs[i] = element;
              }}
              d={d}
              fill="none"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={ARC_TIERS[i]}
              suppressHydrationWarning
            />
          ))}

          {/* One pulse of light per route. Children are glow, core, halo and
              head, in that order: `applyFrame` relies on it. */}
          {routes.map(([from, to], i) => (
            <g
              key={`${from}-${to}`}
              ref={(element) => {
                nodes.current.pulses[i] = element;
              }}
              style={{ opacity: 0 }}
            >
              <path
                d=""
                fill="none"
                strokeWidth={5}
                strokeLinecap="round"
                className="stroke-accent-400/30"
              />
              <path
                d=""
                fill="none"
                strokeWidth={1.8}
                strokeLinecap="round"
                className="stroke-accent-400"
              />
              <circle r={5.5} className="fill-accent-400/25" />
              <circle r={2.4} className="fill-accent-400" />
            </g>
          ))}
        </g>

        {/* Region markers: a dot, a still halo and a slow ping. */}
        {regions.map((region, i) => (
          <g
            key={region.id}
            ref={(element) => {
              nodes.current.markers[i] = element;
            }}
            transform={`translate(${round1(first.places[i].x)} ${round1(first.places[i].y)})`}
            style={{ opacity: round2(first.places[i].opacity) }}
            suppressHydrationWarning
          >
            <circle r={8} className="fill-accent-400/15" />
            <circle
              r={4}
              className="origin-center animate-ping fill-accent-400/40 [transform-box:fill-box] motion-reduce:animate-none"
              style={{ animationDelay: `${(i * 0.7).toFixed(1)}s`, animationDuration: "2.8s" }}
            />
            <circle
              r={3.4}
              strokeWidth={2}
              className="fill-accent-400 stroke-background"
            />
          </g>
        ))}
      </svg>

      {/* Labels are HTML so their text stays a readable size however small the
          globe is drawn. The city only shows when there is room for it. */}
      {regions.map((region, i) => (
        <span
          key={region.id}
          ref={(element) => {
            nodes.current.labels[i] = element;
          }}
          data-side={first.places[i].side}
          style={{
            left: percent(first.places[i].x, width),
            top: percent(first.places[i].y, height),
            opacity: round2(first.places[i].opacity),
          }}
          className="pointer-events-none absolute -translate-y-1/2 px-3 font-mono text-[11px] leading-none whitespace-nowrap text-foreground [text-shadow:0_0_6px_var(--background),0_0_2px_var(--background)] data-[side=left]:-translate-x-full"
          suppressHydrationWarning
        >
          {region.id}
          <span className="hidden text-muted-foreground @min-[30rem]:inline">
            {" "}
            {region.city}
          </span>
        </span>
      ))}
    </div>
  );
}
