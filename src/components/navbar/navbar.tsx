import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { navbarContent, type NavbarContent } from "./navbar-data";

export function Navbar({ content = navbarContent }: { content?: NavbarContent }) {
  const { links, signIn, cta } = content;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      {/* Keyboard users can jump past the navigation. */}
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:border focus-visible:border-border-strong focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40"
      >
        Skip to content
      </a>

      <div className="flex h-16 items-center justify-between gap-6 px-6 md:px-12">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center">
            {links.map((link) => (
              <li key={link.href}>
                {/* The teal underline sits on the bar's bottom line. */}
                <Link
                  href={link.href}
                  className="relative flex h-16 items-center px-4 text-sm text-muted-foreground outline-none transition-colors after:absolute after:inset-x-4 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent-400 after:transition-transform hover:text-foreground hover:after:scale-x-100 focus-visible:text-foreground focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href={signIn.href}
              className={buttonVariants({
                variant: "ghost",
                className: "h-9 px-4 text-muted-foreground",
              })}
            >
              {signIn.label}
            </Link>
            <Link
              href={cta.href}
              className={buttonVariants({ className: "h-9 px-4" })}
            >
              {cta.label}
            </Link>
          </div>
          <MobileMenu links={links} signIn={signIn} cta={cta} />
        </div>
      </div>
    </header>
  );
}
