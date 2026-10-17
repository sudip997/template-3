import { cn } from "@/lib/utils";

/**
 * The page frame: a centered column with left/right rails. Every section
 * lives inside one Container and closes with a shared `border-b` line.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto min-h-screen w-full max-w-6xl border-x border-border",
        className,
      )}
      {...props}
    />
  );
}
