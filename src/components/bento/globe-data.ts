import { siteConfig } from "@/config/site";
import type { GlobePlace } from "./globe-math";

/* -------------------------------------------------------------------------
 * Types
 * ---------------------------------------------------------------------- */

/** A place on the globe. Its `id` is the short code shown next to the marker. */
export type GlobeRegion = GlobePlace & {
  /** Shown after the code when there is room, e.g. "Frankfurt". */
  city: string;
};

export type GlobeContent = {
  title: string;
  description: string;
  /** The chip over the globe. It always carries text, never colour alone. */
  statusLabel: string;
  /** Read by screen readers in place of the (decorative) globe. */
  ariaLabel: string;
  view: {
    /**
     * The longitude (degrees east, negative for west) at the centre of the view
     * when the page loads. Visitors who prefer reduced motion see it still.
     */
    longitude: number;
    /** How far the globe is tipped toward the viewer, in degrees. */
    tilt: number;
    /** Turning speed. 4.5 is one slow turn in about 80 seconds. */
    degreesPerSecond: number;
    /** Degrees between land dots. Smaller is denser, and a little heavier. */
    dotSpacing: number;
  };
  regions: GlobeRegion[];
  /**
   * Pairs of region ids joined by an arc. Each sends a pulse of light along
   * the arc, one after another.
   */
  routes: [string, string][];
};

/* -------------------------------------------------------------------------
 * Panel copy and regions. Swap in your own regions (latitude and longitude in
 * degrees) and routes. A mix of both hemispheres looks best, but the bottom of
 * the globe is cropped by the panel edge, so keep most places north of about
 * 25°S to keep them in view.
 * ---------------------------------------------------------------------- */

const regions: GlobeRegion[] = [
  { id: "iad", city: "N. Virginia", lat: 39.0, lon: -77.5 },
  { id: "sfo", city: "San Francisco", lat: 37.6, lon: -122.4 },
  { id: "fra", city: "Frankfurt", lat: 50.1, lon: 8.7 },
  { id: "bom", city: "Mumbai", lat: 19.1, lon: 72.9 },
  { id: "sin", city: "Singapore", lat: 1.35, lon: 103.8 },
  { id: "nrt", city: "Tokyo", lat: 35.7, lon: 139.7 },
  { id: "gru", city: "São Paulo", lat: -23.5, lon: -46.6 },
];

/** "A, B and C". */
const listOf = (items: string[]) =>
  items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export const globeContent: GlobeContent = {
  title: "Runs where your users are",
  description:
    "Pipelines run in regions on four continents and send each event over the shortest path, so delivery stays fast wherever it starts.",
  statusLabel: `${regions.length} regions online`,
  ariaLabel: `${siteConfig.name} runs in ${regions.length} regions: ${listOf(regions.map((region) => region.city))}. Routes between them are drawn as arcs over a slowly turning globe.`,
  view: {
    longitude: -35,
    tilt: 14,
    degreesPerSecond: 4.5,
    dotSpacing: 1.45,
  },
  regions,
  routes: [
    ["iad", "fra"],
    ["fra", "bom"],
    ["bom", "sin"],
    ["sin", "nrt"],
    ["nrt", "sfo"],
    ["sfo", "iad"],
    ["iad", "gru"],
  ],
};
