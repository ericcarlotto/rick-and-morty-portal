export function applySentinel(armed: boolean, visible: boolean): { armed: boolean; reached: boolean } {
  if (!visible) return { armed: true, reached: false };
  if (!armed) return { armed: false, reached: false };
  return { armed: true, reached: true };
}

export function watchSentinel(node: Element, onReach: () => void): () => void {
  let armed = false;
  let done = false;
  const ObserverCtor = globalThis.IntersectionObserver;
  const observer = new ObserverCtor((entries) => {
    if (done) return;
    const step = applySentinel(armed, entries.some((entry) => entry.isIntersecting));
    armed = step.armed;
    if (!step.reached) return;
    done = true;
    onReach();
  });
  observer.observe(node);
  return () => observer.disconnect();
}
