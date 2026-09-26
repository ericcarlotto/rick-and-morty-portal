'use client';

import { useEffect, useRef } from 'react';
import { watchSentinel } from './sentinel';

export function ScrollSentinel({ enabled, page, onReach }: { enabled: boolean; page: number; onReach: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onReachRef = useRef(onReach);
  onReachRef.current = onReach;
  useEffect(() => {
    const node = ref.current;
    if (!enabled || node === null) return undefined;
    return watchSentinel(node, () => onReachRef.current());
  }, [enabled, page]);
  if (!enabled) return null;
  return <div ref={ref} className="scroll-sentinel" />;
}
