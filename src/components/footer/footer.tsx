import Link from "next/link";
import { IconArrowUp } from "@tabler/icons-react";
import { Crosshair } from "@/components/layout/crosshair";
import { Logo } from "@/components/navbar/logo";
import { buttonVariants } from "@/components/ui/button";
import { footerContent, type FooterContent } from "./footer-data";
import { FooterLinks } from "./footer-links";
import { FooterReveal } from "./footer-reveal";
import { FooterWordmark } from "./footer-wordmark";

// The frame rails sit at the viewport edge below this width, so the
// crosshair marks would overflow the page. Only show them on wide screens.
const crosshair = "hidden xl:block";

export function Footer({
  content = footerContent,
}: {
  content?: FooterContent;
}) {
  const {
    srHeading,
    description,
    status,
    socials,
    navLabel,
    groups,
    legalName,
    backToTop,
  } = content;

  return (
    <footer aria-labelledby="footer-heading" className="relative">
      <h2 id="footer-heading" className="sr-only">
        {srHeading}
      </h2>

      {/* No top border: the call to action above already closes with the
          shared section line. The vertical divider uses the same 1/3 split as
          the FAQ and metrics sections, so the lines stay in one column. */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Brand */}
        <div className="flex px-6 py-12 md:px-12 lg:py-12">
          <FooterReveal className="flex flex-1 flex-col gap-6">
            <Logo />
            <p className="max-w-[34ch] text-sm text-pretty text-muted-foreground">
              {description}
            </p>

            <div className="flex flex-col gap-6 lg:mt-auto">
              <Link
                href={status.href}
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs tracking-wide text-muted-foreground outline-none transition-colors hover:border-border-strong hover:text-foreground focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/40 motion-reduce:transition-none"
              >
                <span aria-hidden="true" className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-accent-400 opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent-400" />
                </span>
                {status.label}
              </Link>

              <ul className="flex items-center gap-2">
                {socials.map(({ label, href, icon: SocialIcon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      aria-label={label}
                      className={buttonVariants({
                        variant: "outline",
                        size: "icon-lg",
                        className: "text-muted-foreground hover:text-accent-400",
                      })}
                    >
                      <SocialIcon aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FooterReveal>
        </div>

        {/* Link columns, divided by hairlines */}
        <div className="border-t border-border lg:border-t-0 lg:border-l">
          <FooterReveal delay={0.1} className="h-full">
            <FooterLinks groups={groups} label={navLabel} />
          </FooterReveal>
        </div>
      </div>

      {/* The outlined wordmark, between two section lines */}
      <div className="relative border-t border-border">
        <Crosshair className={`top-[-5px] left-[-6px] ${crosshair}`} />
        <Crosshair className={`top-[-5px] right-[-6px] ${crosshair}`} />
        <FooterReveal delay={0.1}>
          <FooterWordmark />
        </FooterReveal>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-border">
        <Crosshair className={`top-[-5px] left-[-6px] ${crosshair}`} />
        <Crosshair className={`top-[-5px] right-[-6px] ${crosshair}`} />
        <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-12">
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            © {new Date().getFullYear()} {legalName} All rights reserved.
          </p>
          <Link
            href="#"
            className="group inline-flex w-fit items-center gap-1.5 rounded-sm font-mono text-xs tracking-wide text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent-500/40 motion-reduce:transition-none"
          >
            {backToTop}
            <IconArrowUp
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
