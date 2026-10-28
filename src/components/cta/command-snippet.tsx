"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import type { CtaContent } from "./cta-data";

/**
 * A single-line terminal command with a copy button. The state change is
 * announced to screen readers and shown with an icon swap plus a text label,
 * so it does not rely on color alone.
 */
export function CommandSnippet({ content }: { content: CtaContent["command"] }) {
  const { label, text, copyLabel, copiedLabel } = content;
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard access can be blocked (insecure context, permissions).
      // The command stays visible and selectable, so nothing is lost.
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card py-1.5 pr-1.5 pl-4">
      <span aria-hidden="true" className="font-mono text-sm text-accent-400">
        $
      </span>
      <code
        aria-label={label}
        className="min-w-0 flex-1 overflow-x-auto py-1.5 font-mono text-sm whitespace-nowrap text-foreground"
      >
        {text}
      </code>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={copy}
        aria-label={copied ? copiedLabel : copyLabel}
        className="shrink-0 text-muted-foreground"
      >
        {copied ? (
          <IconCheck className="text-accent-400" aria-hidden="true" />
        ) : (
          <IconCopy aria-hidden="true" />
        )}
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  );
}
