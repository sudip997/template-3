import { cn } from "@/lib/utils";
import type { WallQuote } from "./testimonials-data";

/**
 * Where each quote's divider lines go. Mobile is one column (a rule above
 * every quote but the first); from `sm` it is a 2×2 grid (a rule above the
 * second row and beside the second column). Lines sit between cells only, so
 * the wall never doubles up with the row above or the section line below.
 */
function cellBorders(index: number) {
  return cn(
    index > 0 && "border-t",
    index < 2 ? "sm:border-t-0" : "sm:border-t",
    index % 2 === 1 ? "sm:border-l" : "sm:border-l-0",
  );
}

export function QuoteWall({
  items,
  label,
}: {
  items: WallQuote[];
  label: string;
}) {
  return (
    <div>
      <h3 className="sr-only">{label}</h3>
      <div className="grid sm:auto-rows-fr sm:grid-cols-2">
        {items.map((item, index) => (
          <figure
            key={item.id}
            className={cn(
              "flex flex-col justify-between gap-8 border-border p-6 md:p-10",
              cellBorders(index),
            )}
          >
            <blockquote className="max-w-[36ch] text-base text-pretty text-foreground md:text-lg">
              {item.quote}
            </blockquote>
            <figcaption className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {item.author}
              </span>
              <span className="font-mono text-xs tracking-wide text-muted-foreground">
                {item.role}, {item.company}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
