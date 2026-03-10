import { useEffect, useRef } from 'react';

export function useIntersectionObserver(
  callback: () => void,
  enabled: boolean
) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callback();
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [callback, enabled]);

  return sentinelRef;
}
