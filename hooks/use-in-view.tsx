"use client";

import { useRef, useEffect, useState, type RefObject } from "react";

export interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

export type InViewRef<T extends HTMLElement = HTMLElement> = RefObject<T | null> & {
  isInView: boolean;
  [Symbol.iterator](): Generator<RefObject<T | null> | boolean, void, unknown>;
};

export function useInView<T extends HTMLElement = HTMLElement>(
  options?: UseInViewOptions
): InViewRef<T> {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  const threshold = options?.threshold ?? 0.1;
  const root = options?.root ?? null;
  const rootMargin = options?.rootMargin ?? "0px";
  const once = options?.once ?? false;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, once]);

  Object.defineProperty(ref, "isInView", {
    value: isInView,
    writable: true,
    configurable: true,
  });

  Object.defineProperty(ref, Symbol.iterator, {
    value: function* () {
      yield ref;
      yield isInView;
    },
    configurable: true,
    writable: true,
  });

  return ref as unknown as InViewRef<T>;
}
