/**
 * Formats a metric number the same way on the server and the client, so the
 * count-up and the screen-reader text can never disagree. The locale is fixed
 * on purpose: it avoids hydration mismatches between server and browser.
 */
export function formatMetricNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
