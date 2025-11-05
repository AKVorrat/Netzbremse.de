import { createSignal, onCleanup } from "solid-js";

export function createTimeSignal(intervalMs: number = 1000) {
  const [now, setNow] = createSignal(new Date());

  const interval = setInterval(() => {
    setNow(new Date());
  }, intervalMs);

  onCleanup(() => {
    clearInterval(interval);
  });

  return now;
}
