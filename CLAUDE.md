# Template #3 — Claude Code Instructions

## 1. Project Overview

This project is a commercially reusable SaaS landing-page template built with:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui where appropriate
- Motion for React
- Lucide or Tabler Icons, following the project's existing conventions

The goal is to create a polished, production-quality template that customers can customize easily.

Template #3 must have a distinct visual identity from Templates #1 and #2. Do not copy their palettes, section compositions, or overall visual treatment.

Before coding, inspect the existing repository, package versions, scripts, folder structure, shared components, fonts, CSS variables, and current implementation.
Follow the project's actual setup rather than assuming that every dependency or convention is present.

---

## 2. Core Design Direction — Midnight Teal

The visual identity is **technical minimalism with a dark-only Midnight Teal palette**.

The design should feel:

- Premium
- Precise
- Modern
- Product-focused
- Technical without being cold
- Confident and understated
- Cohesive and commercially usable

The main visual signature is the thoughtful use of **thin outlines, framed section containers, and horizontal dividers**.

Lines should establish layout, alignment, rhythm, and hierarchy.

Avoid noisy gradients and childish visuals.

The template should work for a range of SaaS products, including developer tools, productivity software, automation platforms, and modern B2B software.
Keep marketing copy and visuals specific to the chosen example product rather than making unsupported claims.

---

## 3. Dark-Only Color System

Use these as the starting design tokens. Inspect the existing CSS setup and implement them consistently using the project's existing token conventions.

### Core palette

- Page background: `#090D0D`
- Raised surface / container: `#101817`
- Secondary surface: `#151F1D`
- Primary text: `#DCE7E4`
- Secondary text: `#9AAEAA`
- Subtle border: `#263432`
- Stronger border: `#354743`
- Primary teal: `#14B8A6`
- Bright teal highlight: `#5EEAD4`
- Dark teal accent surface: `#102B28`

### Color usage

- Keep the page background near-black with a subtle green undertone.
- Use raised surfaces only when they improve separation or readability.
- Use subtle borders for most section boundaries and containers.
- Reserve brighter borders and teal accents for important interactions, active states, key data, and selected emphasis.
- Use the primary teal for key actions and meaningful highlights, not for every icon or heading.
- Use the brighter teal sparingly for small highlights and focus/active states.
- Do not flood entire sections with teal.
- Avoid introducing unrelated blue, indigo, purple, amber, or rainbow accents unless the user explicitly requests a deliberate change.
- Do not rely on color alone to communicate state or meaning.

The exact colors may be refined after reviewing them in the actual interface, but keep the palette coherent.

### Dark-only requirement

This template is intentionally dark-only.

- Do not add a light/dark theme toggle.
- Do not create a second light-mode palette.
- Ensure all UI components, dropdowns, dialogs, accordions, mobile navigation, form controls, and shadcn/ui components match the dark theme.

---

## 4. Typography

Use a restrained, modern typography system.

Preferred direction:

- Headings: Space Grotesk
- Body: Inter
- Optional technical labels: a monospace font already available in the project, such as Geist Mono

Typography should be:

- Clear and confident
- Easy to scan
- Carefully spaced
- Strong without being excessively heavy
- Consistent across sections

Use large headings where they support the content, but do not make every section headline oversized.
Keep body copy readable and line lengths comfortable. Use tight tracking for large headings when appropriate.

---

## 5. Lines, Borders, and Container Language

Lines are a core part of this template's identity.

### Use lines to:

- Frame selected section content
- Separate adjacent sections
- Establish consistent column alignment
- Divide feature groups and footer columns
- Structure bento layouts
- Separate FAQ items
- Add subtle boundaries to product UI previews
- Emphasize selected interactive elements

### Rules

- Prefer thin, low-contrast borders for large containers.
- Use stronger borders only when hierarchy requires them.
- Align lines with the main content grid wherever possible.
- Keep border thickness, color, and corner treatment consistent.
- Use open-ended lines or partial borders when they improve composition.
- Combine borders with spacing and typography; do not rely on boxes alone.
- Avoid stacking multiple nested outlines without a clear reason.
- Avoid bright teal outlines on every container.
- Do not let section borders create accidental double-thick lines where sections meet.

Use a shared container and spacing convention throughout the page. Inspect the existing `Container` component before creating another one.
If the project needs a reusable section wrapper or divider, keep it simple and consistent with the existing architecture.

---

## 6. Layout Philosophy

Prioritize:

- Strong visual hierarchy
- Consistent alignment and container widths
- Generous but purposeful spacing
- Responsive composition
- Clear relationships between sections
- Distinct visual rhythm throughout the page

Do not force every section into a centered layout. Do not make every section a grid of three cards. Each section should contribute something new while still following the same design system.

---

## 7. Hero Section

The hero establishes the visual identity for the rest of the page.

Before implementation, propose a specific layout and product-visual concept. Avoid defaulting automatically to a centered headline above a generic dashboard with a large teal glow.

The hero should include, where appropriate:

- A concise eyebrow or product label
- A strong, believable headline
- Supporting copy
- A clear primary CTA and optional secondary action
- A purposeful product UI preview or custom visualization

Potential visual treatments:

- A product interface framed by a fine outline
- A split layout with structured borders
- A dashboard preview integrated into a larger container
- Small, purposeful teal details

Every visual element should support the product story. Do not use random shapes or floating UI elements merely to fill empty space.

Make the hero distinctive without overwhelming the rest of the page.

---

## 8. Cards and Product Surfaces

Use cards and surfaces intentionally.

- Prefer subtle borders, surface contrast, spacing, and typography.
- Use consistent corner radii; choose the radius based on the component's role.
- Do not turn every piece of content into a card.
- Avoid excessive glassmorphism, blur, and translucent layers.
- Use teal borders or brighter accents only for meaningful emphasis.
- Keep product UI believable and internally consistent.

For dashboards and product visualizations, use meaningful examples such as workflow states, tables, activity feeds, charts, notifications, metrics, or integration panels. Avoid random fake UI that does not explain the product.

---

## 9. Bento and Feature Sections

Bento layouts are optional, not mandatory.

Use them only when they help communicate product functionality. Vary panel sizes and content according to the story being told.

Possible content:

- Product previews
- Automation workflows
- Performance indicators
- Integrations
- Team activity
- Data or reporting interfaces

Use fine outlines and structural dividers to create cohesion.

Do not create a section consisting of a heading followed by three nearly identical cards unless the content genuinely calls for it.

---

## 10. Motion and Interactions

Use Motion for React only when it adds value.

Suitable uses include:

- A restrained hero entrance
- Subtle product-preview movement
- A short border highlight on hover
- Small, smooth state transitions
- Accordion and navigation transitions where appropriate

Animation principles:

- Keep motion subtle, smooth, and purposeful.
- Do not animate every border or card independently.
- Avoid constant glowing, flashing, bouncing, or distracting movement.
- Do not make animation necessary for understanding the content.
- Respect `prefers-reduced-motion`.
- Ensure the page remains visually complete when animations are reduced or disabled.
- Avoid expensive animation patterns that unnecessarily affect performance.

The design must be strong even when nothing is moving.

---

## 11. Sections and Page Flow

Possible sections include:

1. Navbar
2. Hero
3. Logo cloud
4. Features
5. Product showcase
6. Bento features
7. How it works
8. Integrations
9. Testimonials
10. Metrics or results
11. Pricing
12. FAQ
13. CTA
14. Footer

Not every section is required. Choose sections based on the product story and overall page flow.

Avoid redundant sections that repeat the same message. Build one section at a time and maintain continuity with the sections already approved.

### Section review questions

Before implementing a section, consider:

1. What is this section communicating?
2. What should the user notice first?
3. What is its main visual composition?
4. How do borders and dividers support its layout?
5. Does it introduce new information rather than repeat a previous section?
6. How will it adapt to mobile screens?

---

## 12. Responsive Design

The template must work well on desktop, laptop, tablet, and mobile.

Do not simply shrink desktop layouts. Recompose them when necessary.

Pay special attention to:

- Hero layout and product previews
- Navigation and mobile menu
- Framed containers and decorative lines
- Bento grids
- Pricing comparisons
- Testimonials
- Tables and dashboards
- Typography and line lengths
- Section spacing
- Horizontal overflow

Decorative borders and grid lines must not cause horizontal scrolling or become visually crowded on small screens. Simplify or remove nonessential lines on mobile when needed.

Test at multiple viewport sizes where tooling is available.

---

## 13. Accessibility

- Use semantic HTML and a logical heading hierarchy.
- Use real buttons for actions and links for navigation.
- Make interactive controls keyboard accessible.
- Provide visible focus indicators.
- Maintain sufficient text and control contrast.
- Provide meaningful alternative text for informative images; use empty alt text for purely decorative images.
- Give icon-only controls accessible names.
- Ensure accordions, menus, dialogs, and forms work with keyboard and assistive technologies.
- Respect reduced-motion preferences.
- Do not communicate important states using color alone.

---

## 14. Code Quality and Maintainability

Write clean, understandable TypeScript.

- Prefer small, meaningful reusable components.
- Avoid unnecessary abstractions and overengineering.
- Use clear component and prop names.
- Keep content easy for a customer to customize.
- Reuse existing project components where appropriate.
- Keep section-specific code scoped to the section being built.
- Avoid unrelated refactors.
- Do not introduce dependencies unless they provide clear value.
- Do not change package versions or project configuration without a clear need.
- Avoid hiding TypeScript problems with `any`, `@ts-ignore`, or broad lint suppression.

If a section becomes complex, split it into small components that have clear responsibilities.

---

## 15. Existing Project Conventions

Before creating or changing a component:

- Inspect the existing folder structure.
- Inspect `package.json` and available scripts.
- Inspect the existing `Container` component.
- Inspect shadcn/ui components already installed.
- Inspect CSS variables and Tailwind configuration.
- Inspect font setup and global styles.
- Inspect existing button, link, and section conventions.
- Inspect existing animations and dependencies.

Reuse existing patterns where appropriate. Do not create duplicates when an existing component already solves the problem.

Follow the actual versions and conventions in this repository. Do not assume a package, file, or script exists without checking.

---

## 16. Tailwind and Styling Guidelines

- Prefer Tailwind utility classes and the project's existing styling conventions.
- Use shared design tokens for recurring colors and values.
- Avoid scattering arbitrary colors throughout components.
- Use custom CSS only when it meaningfully improves maintainability or enables an effect that is awkward with utilities.
- Keep complex class strings understandable.
- Avoid adding another CSS framework.
- Do not use arbitrary values when an existing token or utility is suitable.
- Keep hover, focus, active, disabled, and reduced-motion states consistent.
- Ensure borders and surface colors remain consistent across sections.

---

## 17. Icons and Assets

Use the icon library already established in the project, such as Lucide or Tabler.

- Keep icon style, size, and stroke weight consistent.
- Use icons to support meaning, not as decoration in every component.
- Avoid mixing unrelated icon libraries.
- Do not add external images or assets without a clear reason.
- Prefer purposeful product UI built from real components when it creates a more cohesive result.

---

## 18. Commercial Template Quality

This is a template intended for commercial reuse.

Prioritize:

- Attractive, distinctive and cohesive design
- Easy customization
- Responsive layouts
- Accessible interactions
- Clean TypeScript
- Reusable components
- Consistent design tokens
- Realistic sample content
- Sensible performance
- Minimal dependencies
- Clear setup and customization conventions

Avoid hardcoding unnecessary assumptions about a particular customer's business. Keep copy, labels, links, and sample data straightforward to replace.

---

## 19. Required Workflow When Creating a Section

When asked to create or revise a section:

1. Inspect the existing project and relevant components.
2. Follow this `CLAUDE.md` and any applicable repository instructions.
3. Briefly plan the section's purpose and visual composition.
4. Implement only the requested section and necessary supporting components.
5. Reuse the existing design tokens, container conventions, and components.
6. Keep the Midnight Teal palette and line-based design language consistent.
7. Ensure responsive behavior, accessibility, and reduced-motion support.
8. Do not modify unrelated sections or rewrite the project.
9. Do not install unnecessary packages.
10. Run the relevant available checks, such as linting, type checking, or a production build, when practical.
11. Summarize the files changed and any checks that were run. Never claim a check passed unless it was actually run successfully.

If multiple design approaches are reasonable, choose the one that feels most distinctive, attractive, intentional, and commercially useful while remaining consistent with this design system.

---

## 20. Final Design Principle

Build a premium, dark-only SaaS template with a recognizable Midnight Teal identity.

The defining characteristics should be:

- Thin, intentional outlines
- Structural lines and dividers
- Restrained teal accents
- Strong typography
- Believable product visuals
- Varied section compositions
- Purposeful motion
- Excellent responsive behavior
- Clean, customizable code

**Use lines to create structure, not clutter. Use teal to direct attention, not dominate the interface. Make every section feel individually designed while belonging to the same product.**
