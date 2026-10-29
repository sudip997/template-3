import { siteConfig } from "@/config/site";

/**
 * An oversized, outline-only product name that closes the page. It is purely
 * decorative (hidden from assistive tech) and clipped by its row, so a long
 * product name can never cause horizontal scroll. The thin stroke and the
 * fade toward the bottom keep it in the same line language as the sections.
 */
export function FooterWordmark() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden px-6 pt-10 pb-2 md:px-12 md:pt-14"
    >
      <p className="font-heading text-[clamp(3rem,14.5vw,12rem)] leading-[0.85] font-semibold tracking-[-0.05em] text-transparent select-none [-webkit-text-stroke:1px_var(--border-strong)] [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]">
        {siteConfig.name}
      </p>
    </div>
  );
}
