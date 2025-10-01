"use client";

import { useCallback, useRef } from "react";

// Debounce hook for performance optimization
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
}

// Throttle hook for performance optimization
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
}

// Lazy loading utility
export function lazyLoad<T>(importFunc: () => Promise<{ default: T }>) {
  return importFunc;
}

// Image optimization utility
export function getOptimizedImageUrl(
  src: string,
  width: number,
  height: number,
  quality = 75
) {
  if (src.startsWith("/")) {
    return `${src}?w=${width}&h=${height}&q=${quality}`;
  }
  return src;
}
// Prefetching utility
export function prefetchResource(url: string) {
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => {
      fetch(url, { method: "GET", mode: "no-cors" });
    });
  } else {
    setTimeout(() => {
      fetch(url, { method: "GET", mode: "no-cors" });
    }, 200);
  }
}
