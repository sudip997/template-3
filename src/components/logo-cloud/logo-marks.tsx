/**
 * Placeholder brand marks for the logo cloud. They are invented glyphs, not
 * real company logos. To use real logos, replace a glyph with the brand's SVG
 * (keep `stroke="currentColor"` / `fill="currentColor"` so the hover color
 * still works), or swap `LogoMark` for an <Image> in `logo-grid.tsx`.
 */
const glyphs = {
  arc: (
    <>
      <path d="M4 18a8 8 0 0 1 16 0" />
      <path d="M8 18a4 4 0 0 1 8 0" />
    </>
  ),
  hexagon: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  page: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 10h8M8 14h5" />
    </>
  ),
  loop: (
    <>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </>
  ),
  arch: (
    <>
      <path d="M5 20V10a7 7 0 0 1 14 0v10" />
      <path d="M3 20h18M9 20v-5h6v5" />
    </>
  ),
  slant: <path d="M8 4L4 20M14 4l-4 16M20 4l-4 16" />,
  waves: (
    <>
      <path d="M3 9c3-3 6 3 9 0s6 3 9 0" />
      <path d="M3 15c3-3 6 3 9 0s6 3 9 0" />
    </>
  ),
  diamond: (
    <>
      <path d="M12 3l9 9-9 9-9-9z" />
      <path d="M12 8l4 4-4 4-4-4z" />
    </>
  ),
} as const;

export type LogoMarkId = keyof typeof glyphs;

/** A glyph plus the brand name, drawn in the current text color. */
export function LogoMark({ mark, name }: { mark: LogoMarkId; name: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6 shrink-0"
      >
        {glyphs[mark]}
      </svg>
      <span className="font-heading text-lg font-semibold tracking-tight">
        {name}
      </span>
    </span>
  );
}
