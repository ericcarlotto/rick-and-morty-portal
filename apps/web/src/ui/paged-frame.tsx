'use client';

import type { ReactNode } from 'react';
import { ScrollSentinel } from './scroll-sentinel';

export function PagedFrame(props: { done: boolean; token: number; onReach: () => void; children: ReactNode }) {
  return (
    <div>
      {props.children}
      <ScrollSentinel enabled={!props.done} page={props.token} onReach={props.onReach} />
    </div>
  );
}
