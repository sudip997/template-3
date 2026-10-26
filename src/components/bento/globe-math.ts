import { LAND_HEIGHT, LAND_ROWS, LAND_WIDTH } from "./globe-land";

/* -------------------------------------------------------------------------
 * Plain geometry for the bento globe. There is no React in this file: it
 * turns places on the Earth into SVG path text for one moment in time, so the
 * same code builds the still first frame on the server and every animation
 * frame in the browser.
 *
 * A point on the Earth is a unit vector (x east, y north, z toward the
 * viewer when it sits at the centre of the view). Viewing the globe from a
 * longitude and a tilt is two rotations; the screen position is then just
 * the x and y of the result, and a point faces us while its z is positive.
 * ---------------------------------------------------------------------- */

export type GlobeGeometry = {
  /** Size of the SVG viewBox. */
  width: number;
  height: number;
  /** Centre of the globe inside the viewBox, and its radius. */
  cx: number;
  cy: number;
  radius: number;
};

/** Which part of the Earth faces us, in degrees. */
export type GlobeView = { longitude: number; tilt: number };

export type GlobePlace = { id: string; lat: number; lon: number };

export type GlobeScene = {
  /** Land dots as flat x, y, z triples. */
  dots: Float32Array;
  /** One entry per route: ARC_STEPS + 1 lifted points as flat x, y, z triples. */
  arcs: Float32Array[];
  /** One unit vector per place, in the order the places were given. */
  places: [number, number, number][];
};

export type GlobePulse = {
  /** The glowing stretch of the arc, as path text ("" when there is none). */
  d: string;
  /** Where the bright head of the pulse is. */
  x: number;
  y: number;
  /** 0 when the pulse is resting or out of sight, up to 1 mid-flight. */
  opacity: number;
};

export type GlobeFrame = {
  /** Land dots as three path strings: the dimmest (nearest the edge) first. */
  dots: [string, string, string];
  /** The part of every arc that faces us, in three depth tiers like the dots. */
  arcs: [string, string, string];
  /** One pulse per route. */
  pulses: GlobePulse[];
  /** One entry per place. */
  places: {
    x: number;
    y: number;
    /** Fades to 0 as the place turns over the horizon. */
    opacity: number;
    /** Which side of the marker its label sits on, so it stays inside. */
    side: "left" | "right";
  }[];
};

/** Points per arc, minus one. */
export const ARC_STEPS = 48;

/* Pulse timing, in seconds. Each route sends one pulse per cycle; routes
   start a little apart so the traffic does not move in lockstep. */
export const PULSE_CYCLE = 6.4;
export const PULSE_TRAVEL = 2.6;
export const PULSE_STAGGER = 0.85;
/** How long the glowing stretch is, as a fraction of the arc. */
const PULSE_LENGTH = 0.22;

const DEG = Math.PI / 180;

/* -------------------------------------------------------------------------
 * Building the scene (once)
 * ---------------------------------------------------------------------- */

export function toVector(lat: number, lon: number): [number, number, number] {
  const phi = lat * DEG;
  const lambda = lon * DEG;
  return [
    Math.cos(phi) * Math.sin(lambda),
    Math.sin(phi),
    Math.cos(phi) * Math.cos(lambda),
  ];
}

let landMask: Uint8Array | null = null;

/** Unpacks the run-length rows into one byte per degree cell. */
function getLandMask(): Uint8Array {
  if (landMask) return landMask;

  const mask = new Uint8Array(LAND_WIDTH * LAND_HEIGHT);
  LAND_ROWS.forEach((row, rowIndex) => {
    let column = 0;
    let isLand = false;
    for (const run of row.split(",")) {
      const length = Number(run);
      if (isLand) mask.fill(1, rowIndex * LAND_WIDTH + column, rowIndex * LAND_WIDTH + column + length);
      column += length;
      isLand = !isLand;
    }
  });

  landMask = mask;
  return mask;
}

function isLand(lat: number, lon: number): boolean {
  const row = Math.min(LAND_HEIGHT - 1, Math.max(0, Math.floor(90 - lat)));
  const column = ((Math.floor(lon + 180) % LAND_WIDTH) + LAND_WIDTH) % LAND_WIDTH;
  return getLandMask()[row * LAND_WIDTH + column] === 1;
}

/**
 * Lays dots over the land, about `spacing` degrees apart. Rings of latitude
 * hold fewer dots toward the poles so the dots stay evenly spread on the
 * sphere, and every other ring is shifted half a step so they pack tightly.
 */
export function buildLandDots(spacing: number): Float32Array {
  const points: number[] = [];
  const rings = Math.floor(180 / spacing);

  for (let ring = 0; ring < rings; ring += 1) {
    const lat = -90 + (ring + 0.5) * (180 / rings);
    const count = Math.max(1, Math.round((360 * Math.cos(lat * DEG)) / spacing));
    const shift = ring % 2 === 0 ? 0 : 0.5;

    for (let i = 0; i < count; i += 1) {
      const lon = -180 + ((i + shift) / count) * 360;
      if (isLand(lat, lon)) points.push(...toVector(lat, lon));
    }
  }

  return Float32Array.from(points);
}

/**
 * A curve between two places along the great circle that joins them, lifted
 * off the surface in the middle so it reads as an arc over the globe. Longer
 * routes rise higher.
 */
export function buildArc(
  from: readonly [number, number, number],
  to: readonly [number, number, number],
): Float32Array {
  const dot = from[0] * to[0] + from[1] * to[1] + from[2] * to[2];
  const angle = Math.acos(Math.min(1, Math.max(-1, dot)));
  const sine = Math.sin(angle) || 1;
  const lift = 0.05 + 0.13 * (angle / Math.PI);

  const points = new Float32Array((ARC_STEPS + 1) * 3);
  for (let i = 0; i <= ARC_STEPS; i += 1) {
    const t = i / ARC_STEPS;
    const a = Math.sin((1 - t) * angle) / sine;
    const b = Math.sin(t * angle) / sine;
    const radius = 1 + lift * Math.sin(Math.PI * t);
    for (let axis = 0; axis < 3; axis += 1) {
      points[i * 3 + axis] = (from[axis] * a + to[axis] * b) * radius;
    }
  }
  return points;
}

export function buildScene(
  places: readonly GlobePlace[],
  routes: readonly (readonly [string, string])[],
  dotSpacing: number,
): GlobeScene {
  const placeVectors = places.map((place) => toVector(place.lat, place.lon));
  const vectors = new Map(places.map((place, i) => [place.id, placeVectors[i]]));

  const arcs = routes.map(([fromId, toId]) => {
    const from = vectors.get(fromId);
    const to = vectors.get(toId);
    if (!from || !to) {
      throw new Error(
        `Globe route "${fromId}" to "${toId}" uses a place id that is not in the list of places.`,
      );
    }
    return buildArc(from, to);
  });

  return {
    dots: buildLandDots(dotSpacing),
    arcs,
    places: placeVectors,
  };
}

/* -------------------------------------------------------------------------
 * Drawing one frame
 * ---------------------------------------------------------------------- */

/** One decimal place is plenty at this size, and keeps the paths short. */
const fmt = (value: number) => String(Math.round(value * 10) / 10);

type Rotation = { cl: number; sl: number; ct: number; st: number };

function makeRotation({ longitude, tilt }: GlobeView): Rotation {
  return {
    cl: Math.cos(longitude * DEG),
    sl: Math.sin(longitude * DEG),
    ct: Math.cos(tilt * DEG),
    st: Math.sin(tilt * DEG),
  };
}

/** Where a point lands on screen (in unit-sphere terms), and how far toward us. */
function rotate(rot: Rotation, x: number, y: number, z: number) {
  const x1 = x * rot.cl - z * rot.sl;
  const z1 = x * rot.sl + z * rot.cl;
  return {
    x: x1,
    y: y * rot.ct - z1 * rot.st,
    z: y * rot.st + z1 * rot.ct,
  };
}

/** How far toward us (z) a point must be before it is drawn. */
const HORIZON = 0.01;

/** Three bands of depth: the nearer to the edge, the dimmer. */
const tierOf = (z: number) => (z > 0.5 ? 2 : z > 0.2 ? 1 : 0);

/** Path text for a run of points; stretches past the horizon become gaps. */
function pathOf(
  points: ArrayLike<number>,
  rot: Rotation,
  geo: GlobeGeometry,
): string {
  let d = "";
  let drawing = false;
  for (let i = 0; i < points.length; i += 3) {
    const p = rotate(rot, points[i], points[i + 1], points[i + 2]);
    if (p.z < HORIZON) {
      drawing = false;
      continue;
    }
    d += `${drawing ? "L" : "M"}${fmt(geo.cx + geo.radius * p.x)} ${fmt(geo.cy - geo.radius * p.y)}`;
    drawing = true;
  }
  return d;
}

/**
 * Adds every arc to three path strings by depth, so each arc fades out as it
 * runs toward the edge of the globe instead of stopping short. A segment goes
 * in the tier of its midpoint; where the tier changes the path simply starts
 * again from the shared point.
 */
function addArcsByDepth(
  arcs: readonly Float32Array[],
  rot: Rotation,
  geo: GlobeGeometry,
): [string, string, string] {
  const tiers = ["", "", ""];

  for (const arc of arcs) {
    let previous: { x: number; y: number; z: number } | null = null;
    let openTier = -1;

    for (let i = 0; i < arc.length; i += 3) {
      const p = rotate(rot, arc[i], arc[i + 1], arc[i + 2]);
      if (p.z < HORIZON) {
        previous = null;
        openTier = -1;
        continue;
      }
      const x = geo.cx + geo.radius * p.x;
      const y = geo.cy - geo.radius * p.y;

      if (previous) {
        const tier = tierOf((previous.z + p.z) / 2);
        if (tier !== openTier) {
          tiers[tier] += `M${fmt(previous.x)} ${fmt(previous.y)}`;
          openTier = tier;
        }
        tiers[tier] += `L${fmt(x)} ${fmt(y)}`;
      }
      previous = { x, y, z: p.z };
    }
  }

  return tiers as [string, string, string];
}

/** The point `position` of the way along an arc (0 to ARC_STEPS). */
function pointAt(arc: Float32Array, position: number): [number, number, number] {
  const index = Math.min(ARC_STEPS - 1, Math.max(0, Math.floor(position)));
  const t = position - index;
  const a = index * 3;
  const b = a + 3;
  return [
    arc[a] + (arc[b] - arc[a]) * t,
    arc[a + 1] + (arc[b + 1] - arc[a + 1]) * t,
    arc[a + 2] + (arc[b + 2] - arc[a + 2]) * t,
  ];
}

const easeInOutSine = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);

const NO_PULSE: GlobePulse = { d: "", x: 0, y: 0, opacity: 0 };

function pulseFor(
  arc: Float32Array,
  index: number,
  time: number,
  rot: Rotation,
  geo: GlobeGeometry,
): GlobePulse {
  const local = (((time - index * PULSE_STAGGER) % PULSE_CYCLE) + PULSE_CYCLE) % PULSE_CYCLE;
  if (local >= PULSE_TRAVEL) return NO_PULSE;

  const progress = local / PULSE_TRAVEL;
  const head = easeInOutSine(progress) * ARC_STEPS;
  const tail = Math.max(0, head - PULSE_LENGTH * ARC_STEPS);

  // The tail, every whole point in between, then the head.
  const run: number[] = [...pointAt(arc, tail)];
  for (let i = Math.floor(tail) + 1; i < head; i += 1) {
    run.push(arc[i * 3], arc[i * 3 + 1], arc[i * 3 + 2]);
  }
  const headPoint = pointAt(arc, head);
  run.push(...headPoint);

  const screen = rotate(rot, headPoint[0], headPoint[1], headPoint[2]);
  return {
    d: pathOf(run, rot, geo),
    x: geo.cx + geo.radius * screen.x,
    y: geo.cy - geo.radius * screen.y,
    // Fade in at take-off and out on landing, and out again toward the edge.
    opacity:
      Math.sqrt(Math.sin(Math.PI * progress)) *
      Math.min(1, Math.max(0, (screen.z - HORIZON) / 0.2)),
  };
}

/**
 * Everything that changes from frame to frame. Pass `time` (in seconds) to
 * include the travelling pulses, or `null` for a still frame without them.
 */
export function renderFrame(
  scene: GlobeScene,
  view: GlobeView,
  geo: GlobeGeometry,
  time: number | null,
): GlobeFrame {
  const rot = makeRotation(view);

  // Land dots, sorted by how head-on they face us: the further round the
  // edge a dot is, the dimmer its path is drawn.
  const tiers = ["", "", ""];
  const { dots } = scene;
  for (let i = 0; i < dots.length; i += 3) {
    const p = rotate(rot, dots[i], dots[i + 1], dots[i + 2]);
    if (p.z <= 0) continue;
    const tier = tierOf(p.z);
    tiers[tier] += `M${fmt(geo.cx + geo.radius * p.x)} ${fmt(geo.cy - geo.radius * p.y)}h.01`;
  }

  return {
    dots: tiers as GlobeFrame["dots"],
    arcs: addArcsByDepth(scene.arcs, rot, geo),
    pulses: scene.arcs.map((arc, index) =>
      time === null ? NO_PULSE : pulseFor(arc, index, time, rot, geo),
    ),
    places: scene.places.map(([x, y, z]) => {
      const p = rotate(rot, x, y, z);
      return {
        x: geo.cx + geo.radius * p.x,
        y: geo.cy - geo.radius * p.y,
        opacity: Math.min(1, Math.max(0, (p.z - 0.02) / 0.2)),
        side: p.x > 0.42 ? "left" : "right",
      };
    }),
  };
}
