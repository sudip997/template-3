"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconChevronRight } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavbarContent } from "./navbar-data";

const MENU_ID = "mobile-menu";

/**
 * Hamburger toggle plus a disclosure panel that drops from the navbar's
 * bottom line. Closes on Escape (returning focus to the toggle), outside
 * click, link click, and when the viewport grows to the desktop layout.
 */
export function MobileMenu({ links, signIn, cta }: NavbarContent) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    // Matches the `lg` breakpoint where the desktop navigation takes over.
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => media.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    media.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      media.removeEventListener("change", onChange);
    };
  }, [open]);

  const close = () => setOpen(false);
  const duration = reduceMotion ? 0 : 0.25;

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={MENU_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative grid size-9 place-items-center rounded-full border border-border text-foreground outline-none transition-colors hover:border-border-strong hover:bg-muted focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/40"
      >
        <span aria-hidden="true" className="relative block h-3 w-4">
          <Bar className={open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"} />
          <Bar
            className={cn(
              "top-1/2 -translate-y-1/2",
              open && "scale-x-0 opacity-0",
            )}
          />
          <Bar
            className={
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={MENU_ID}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-border bg-background"
          >
            <nav aria-label="Mobile" className="px-6 pt-2 pb-6 md:px-12">
              <ul>
                {links.map((link) => (
                  <li key={link.href} className="border-b border-border">
                    <Link
                      href={link.href}
                      onClick={close}
                      className="group flex items-center justify-between rounded-sm py-4 font-heading text-lg tracking-[-0.02em] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40"
                    >
                      {link.label}
                      <IconChevronRight
                        aria-hidden="true"
                        className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-400 motion-reduce:transition-none"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={cta.href}
                  onClick={close}
                  className={buttonVariants({
                    size: "lg",
                    className: "w-full sm:flex-1",
                  })}
                >
                  {cta.label}
                </Link>
                <Link
                  href={signIn.href}
                  onClick={close}
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "w-full sm:flex-1",
                  })}
                >
                  {signIn.label}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Bar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "absolute left-0 h-px w-4 bg-current transition-all duration-200 motion-reduce:transition-none",
        className,
      )}
    />
  );
}
