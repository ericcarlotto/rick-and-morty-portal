'use client';

import { useState } from 'react';
import { INITIAL_COUNT, SCROLL_STEP } from './page-size';

export function useWindow(total: number, resetKey = '') {
  const [slot, setSlot] = useState({ resetKey, count: INITIAL_COUNT });
  if (slot.resetKey !== resetKey) setSlot({ resetKey, count: INITIAL_COUNT });
  const count = slot.resetKey === resetKey ? slot.count : INITIAL_COUNT;
  const shown = Math.min(count, total);
  function grow() {
    setSlot((current) => ({ resetKey, count: Math.min(total, current.count + SCROLL_STEP) }));
  }
  function reveal(next: number) {
    setSlot((current) => ({ resetKey, count: Math.min(total, Math.max(current.count, next)) }));
  }
  return { shown, grow, reveal, done: shown >= total };
}
