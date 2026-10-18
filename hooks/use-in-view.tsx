"use client"

import { useRef, useEffect, useState } from "react"

export function useInView(options = { threshold: 0.1 }) {
  const ref = useRef<any>(null);
  const [_isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [options]);

  return ref;
}
