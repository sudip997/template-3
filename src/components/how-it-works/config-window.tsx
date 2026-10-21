import { IconCheck } from "@tabler/icons-react";
import { StepWindow, WindowBadge } from "./step-window";
import { configWindow, type ConfigWindowContent } from "./how-it-works-data";

/**
 * Step 1: the config file. Table headers take the bright accent, keys stay
 * quiet and values are full contrast, so the structure reads at a glance.
 */
export function ConfigWindow({
  content = configWindow,
  anchor,
}: {
  content?: ConfigWindowContent;
  anchor: "left" | "right";
}) {
  return (
    <StepWindow
      ariaLabel={content.ariaLabel}
      title={content.title}
      anchor={anchor}
      status={
        <WindowBadge>
          <IconCheck className="size-3 text-accent-400" />
          {content.statusLabel}
        </WindowBadge>
      }
    >
      <div className="space-y-5 bg-background px-5 py-5 font-mono text-[13px] leading-6">
        {content.blocks.map((block) => (
          <div key={block.header}>
            <p className="text-accent-400">{block.header}</p>
            <div className="grid grid-cols-[max-content_max-content_1fr] gap-x-2">
              {block.entries.map((entry) => (
                <p
                  key={entry.key}
                  className="col-span-3 grid grid-cols-subgrid"
                >
                  <span className="text-muted-foreground">{entry.key}</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="min-w-0 break-words text-foreground">
                    {entry.value}
                  </span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="border-t border-border px-5 py-3 font-mono text-xs tracking-wide text-muted-foreground">
        {content.footer}
      </p>
    </StepWindow>
  );
}
