export type RafThrottled<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

/**
 * requestAnimationFrame-based throttle.
 * Ensures the wrapped function runs at most once per frame,
 * synced to the browser's paint cycle.
 */
export function rafThrottle<T extends (...args: any[]) => void>(
  fn: T,
): RafThrottled<T> {
  let ticking = false;
  return (...args: Parameters<T>) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        fn(...args);
        ticking = false;
      });
    }
  };
}
