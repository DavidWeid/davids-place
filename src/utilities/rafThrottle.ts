export type RafThrottled<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

/**
 * requestAnimationFrame-based throttle.
 * Ensures the wrapped function runs at most once per frame,
 * synced to the browser's paint cycle.
 * Captures the latest arguments from calls during the same frame
 * to ensure the function executes with the most recent state.
 */
export function rafThrottle<T extends (...args: any[]) => void>(
  fn: T,
): RafThrottled<T> {
  let ticking = false;
  let latestArgs: Parameters<T>;
  return (...args: Parameters<T>) => {
    latestArgs = args;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        fn(...latestArgs);
        ticking = false;
      });
    }
  };
}
