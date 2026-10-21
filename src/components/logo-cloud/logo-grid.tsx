"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { MotionConfig, motion, type Variants } from "motion/react";
import { LogoMark } from "./logo-marks";
import type { LogoItem } from "./logo-cloud-data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Entrance: the grid staggers its cells in once, when scrolled into view.
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// Hover / focus: the logo lifts, the "Learn More" hint rises in beneath it,
// and the arrow nudges forward. All three follow the link's "hover" state.
const hoverTransition = { duration: 0.25, ease };
const logoVariants: Variants = {
  rest: { y: 0, transition: hoverTransition },
  hover: { y: -9, transition: hoverTransition },
};
const hintVariants: Variants = {
  rest: { opacity: 0, y: 6, transition: hoverTransition },
  hover: { opacity: 1, y: 0, transition: hoverTransition },
};
const arrowVariants: Variants = {
  rest: { x: 0, transition: hoverTransition },
  hover: { x: 3, transition: { ...hoverTransition, delay: 0.05 } },
};

const MotionLink = motion.create(Link);

type LogoGridProps = {
  logos: LogoItem[];
  learnMoreLabel: string;
};

/**
 * Hairline-divided grid of logos. The negative right/bottom margin plus the
 * clipping wrapper hide each cell's outer edge, so the only lines drawn are
 * the ones between cells (the section and page rails draw the rest). It works
 * for any number of logos.
 */
export function LogoGrid({ logos, learnMoreLabel }: LogoGridProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-hidden">
        <motion.ul
          role="list"
          className="-mr-px -mb-px grid grid-cols-2 md:grid-cols-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        >
          {logos.map((logo) => (
            <li key={logo.name} className="border-r border-b border-border">
              <motion.div variants={revealVariants} className="h-full">
                <MotionLink
                  href={logo.href}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileFocus="hover"
                  className="relative flex h-28 items-center justify-center text-muted-foreground/80 transition-colors outline-none hover:bg-card hover:text-foreground focus-visible:bg-card focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent-500/40 focus-visible:ring-inset motion-reduce:transition-none sm:h-32"
                >
                  <motion.span variants={logoVariants} className="block">
                    <LogoMark mark={logo.mark} name={logo.name} />
                  </motion.span>

                  <motion.span
                    variants={hintVariants}
                    className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5 font-mono text-xs tracking-wide text-accent-400 sm:bottom-5"
                  >
                    {learnMoreLabel}
                    <motion.span variants={arrowVariants} className="flex">
                      <IconArrowRight aria-hidden="true" className="size-3.5" />
                    </motion.span>
                  </motion.span>
                </MotionLink>
              </motion.div>
            </li>
          ))}
        </motion.ul>
      </div>
    </MotionConfig>
  );
}
