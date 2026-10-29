import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FooterGroup } from "./footer-data";

/**
 * Where each column's divider lines go. Mobile is a 2×2 grid (a rule above
 * the second row and beside the second column); from `sm` it is one row of
 * four with a rule between neighbours. Lines sit between columns only, so
 * the footer never doubles up with the frame or the section line.
 */
function columnBorders(index: number) {
  return cn(
    index > 1 && "border-t sm:border-t-0",
    index % 2 === 1 && "border-l",
    index > 0 && "sm:border-l",
  );
}

/**
 * A single footer link. A short teal line draws in before the label on hover
 * and focus, in step with the underline used in the navbar.
 */
function FooterNavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group/link inline-flex items-center rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent-500/40 motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className="h-px w-0 bg-accent-400 transition-all duration-200 group-hover/link:mr-2 group-hover/link:w-3 group-focus-visible/link:mr-2 group-focus-visible/link:w-3 motion-reduce:transition-none"
      />
      {label}
    </Link>
  );
}

export function FooterLinks({
  groups,
  label,
}: {
  groups: FooterGroup[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="h-full">
      <div className="grid h-full grid-cols-2 sm:grid-cols-4">
        {groups.map((group, index) => (
          <div
            key={group.title}
            className={cn("px-6 py-10 md:px-8 md:py-12", columnBorders(index))}
          >
            <h3 className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              {group.title}
            </h3>
            <ul className="mt-5 flex flex-col items-start gap-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <FooterNavLink label={link.label} href={link.href} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
