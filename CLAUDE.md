# CLAUDE.md — Template #3

A SaaS landing-page template for founders. Distinct from Template #1 (bright blue, glow) and Template #2 (warm neutral, editorial). Template #3 is a **technical, line-structured** design: teal/cyan accent, cool neutrals, visible hairline borders around every container. Inspired by the structural feel of developer-infra sites, never a copy of any specific site.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (CSS-first config, tokens in `globals.css` via `@theme`)
- shadcn/ui for primitives
- Motion (`motion/react`) for animation
- `@tabler/icons-react` for all icons, including social/brand icons (`IconBrandGithub`, `IconBrandX`, `IconBrandLinkedin`, `IconBrandDiscord`). Do not use `lucide-react`.
- No new dependencies without asking first

## Design principles

1. **Structure is the decoration.** Hairline borders, spacing and typography do the work. Avoid heavy shadows, large gradients, and blurred glows.
2. **One grid, one frame.** The page lives inside a centered bordered frame (left/right rails). Sections are stacked cells separated by shared horizontal lines. Components inside sections use shared borders, not floating cards.
3. **Restraint with the accent.** Teal/cyan is used for primary actions, active/hover states, small highlights and focus rings. Everything else is neutral.
4. **Precision over softness.** Small radii, crisp 1px lines, tight alignment, consistent padding. It should feel engineered.
5. **Calm motion.** Subtle fade/translate on entry, quick hover transitions. No looping or constant-movement animation. Respect `prefers-reduced-motion`.

## Color tokens

**Dark mode only.** There is no light theme, no theme toggle, no `next-themes`, and no `dark:` variants. Set `<html class="dark">` and `color-scheme: dark` permanently, and define the tokens once on `:root` in `globals.css`.

```css
:root {
  color-scheme: dark;

  --background: oklch(0.15 0.01 230);
  --foreground: oklch(0.96 0.004 220);
  --muted: oklch(0.2 0.01 230);
  --muted-foreground: oklch(0.68 0.015 225);
  --border: oklch(0.27 0.012 230);        /* the hairline */
  --border-strong: oklch(0.36 0.014 230); /* frame, hover */

  --accent-subtle: oklch(0.25 0.04 195);  /* tinted backgrounds, badges */
  --accent-400: oklch(0.85 0.12 192);     /* text highlights, links */
  --accent-500: oklch(0.78 0.13 190);     /* primary hover, focus ring */
  --accent-600: oklch(0.72 0.13 190);     /* primary buttons */
  --accent-700: oklch(0.62 0.12 191);     /* pressed, borders on accent */
  --accent-foreground: oklch(0.16 0.01 230); /* dark text on bright teal */
}
```

Rules:
- Neutrals are slightly cool (hue ~220–230), never warm or pure gray.
- Accent usage should stay under roughly 10% of any viewport.
- Text on accent backgrounds must pass contrast; use `--accent-foreground`.
- Do not introduce other hues except for status colors (success/warning/error) where genuinely needed.

## Typography

- Headings and body: **Geist** (via `next/font/google`), tight tracking on large headings (`-0.02em` to `-0.03em`).
- Labels, badges, eyebrows, metadata, code: **Geist Mono**, small, uppercase or lowercase with slight letter-spacing.
- Scale: hero `text-5xl md:text-6xl`, section headings `text-3xl md:text-4xl`, body `text-base`, supporting text `text-sm text-muted-foreground`.
- Keep line lengths comfortable (headline max ~14 words, supporting text max ~60ch).

## Borders and layout (the signature)

- Page frame: `max-w-6xl mx-auto border-x border-border`.
- Sections: `border-b border-border`, with generous padding inside (`py-20 md:py-28`, `px-6 md:px-12`).
- Grids (bento, features, pricing): cells separated by shared borders using `divide-x` / `divide-y` or `gap-px` on a `bg-border` container with `bg-background` cells. Avoid one rounded card per item.
- Optional intersection details: tiny `+` marks or corner ticks where lines meet, built as a small reusable `<Crosshair />` component. Use sparingly, only at major junctions.
- Radius: `rounded-md` max for buttons/inputs, `rounded-lg` max for framed visuals. Frame and section cells are square.
- Borders stay low-contrast. Use `--border-strong` only for hover, focus, or the outer frame.
- Subtle background grid or dot texture is allowed in the hero only, masked so it fades out, at very low opacity.
- Avoid: drop shadows on cards, colorful glows, glassmorphism, big gradient blobs.

## Components and buttons

- Primary button: `bg-accent-600 text-accent-foreground hover:bg-accent-500`, `rounded-md`, 1px inner border for crispness.
- Secondary button: transparent with `border border-border hover:border-border-strong hover:bg-muted`.
- Badges/eyebrows: mono, small, `border border-border`, optional small accent dot.
- Inputs: `border-border`, focus ring in accent (`focus-visible:ring-2 ring-accent-500/40`).
- Focus states must always be visible.

## Motion

- Use Motion for: section entry (opacity + 8–16px translate, once, `viewport={{ once: true }}`), accordion expand/collapse, pricing toggle, hover micro-interactions.
- Durations 0.2–0.5s, easing `[0.22, 1, 0.36, 1]`.
- No infinite animations unless explicitly requested. Everything respects reduced motion.

## Code conventions

- Each section is its own folder: `src/components/<section>/` with a main component and any subcomponents. Section components are modular and accept content via props or a local data file so placeholder content is easy to replace.
- Use the existing `Container`/layout primitives. Do not duplicate layout wrappers.
- Server components by default; add `"use client"` only where interaction or Motion requires it.
- Semantic HTML, accessible by default (labels, aria attributes on accordions/toggles, keyboard support).
- Responsive: design mobile-first, verify at 375px, 768px, 1280px.
- Dark mode only: no light-mode styles, no theme toggle in the Navbar or anywhere else.
- Format with Prettier-style wrapping.

## Working rules

- Build one section at a time and only touch what the request names. Do not modify unrelated sections or files.
- Do not add dependencies without asking.
- Placeholder copy should be realistic, fictional, and easy to customize. No real brand names, no lorem ipsum.
- When a layout choice is ambiguous (grid structure for a new section), propose it briefly before building.
- Keep the template generic enough to rebrand: product name, logo, copy and accent color all swappable from one place.

## Section order (planned)

Navbar → Hero → Logo Cloud → Bento/Features → How It Works → Testimonials → Pricing → FAQ → CTA → Footer