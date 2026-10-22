const SECONDS_PER_DAY = 86_400;

const pad = (value: number) => String(value).padStart(2, "0");

/** "14:02:11" to seconds since midnight. */
export function parseClock(value: string): number {
  const [hours = 0, minutes = 0, seconds = 0] = value.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

/** Seconds since midnight to "14:02:11". Wraps past midnight. */
export function formatClock(totalSeconds: number): string {
  const t =
    ((totalSeconds % SECONDS_PER_DAY) + SECONDS_PER_DAY) % SECONDS_PER_DAY;
  return `${pad(Math.floor(t / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(t % 60)}`;
}
