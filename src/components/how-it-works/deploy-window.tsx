"use client";

import { motion, useReducedMotion } from "motion/react";
import { StepWindow, WindowBadge } from "./step-window";
import { deployWindow, type DeployWindowContent } from "./how-it-works-data";

/**
 * Step 2: a deploy plan. Each changed resource gets a progress bar that fills
 * once when the window scrolls into view (a cheap transform, staggered by
 * row). Visitors who prefer reduced motion see the bars already full.
 *
 * Nothing relies on color: every row says what it does (`create`, `update`,
 * `no change`) and what state it ended in, in words.
 */
export function DeployWindow({
  content = deployWindow,
  anchor,
}: {
  content?: DeployWindowContent;
  anchor: "left" | "right";
}) {
  const reduceMotion = useReducedMotion();

  return (
    <StepWindow
      ariaLabel={content.ariaLabel}
      title={content.title}
      anchor={anchor}
      status={
        <WindowBadge>
          <span className="size-1.5 rounded-full bg-accent-400" />
          {content.statusLabel}
        </WindowBadge>
      }
    >
      <p className="border-b border-border bg-background px-5 py-3 font-mono text-[13px]">
        <span className="text-muted-foreground">$</span>{" "}
        <span className="text-foreground">{content.command}</span>
      </p>

      <ul className="divide-y divide-border">
        {content.rows.map((row, index) => (
          <li key={row.name} className="px-5 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border-strong font-mono text-xs text-foreground">
                {row.symbol}
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-sm text-foreground">
                {row.name}
                <span className="ml-2 text-xs text-muted-foreground">
                  {row.kind}
                </span>
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {row.action}
              </span>
            </div>

            {/* Second line sits under the name: pl-9 = icon box + gap. */}
            {row.duration ? (
              <div className="mt-2.5 flex items-center gap-3 pl-9">
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                  <motion.span
                    className="block h-full origin-left rounded-full bg-accent-400"
                    initial={{ scaleX: reduceMotion ? 1 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.9,
                      delay: reduceMotion ? 0 : 0.3 + index * 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                  {row.state} · {row.duration}
                </span>
              </div>
            ) : (
              <p className="mt-2 pl-9 font-mono text-xs text-muted-foreground">
                {row.state}
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border bg-background px-5 py-3 font-mono text-xs">
        <span className="text-muted-foreground">{content.summary}</span>
        <span className="min-w-0 truncate text-accent-400">
          Live at {content.liveUrl}
        </span>
      </div>
    </StepWindow>
  );
}
