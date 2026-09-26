import { expect, test, vi } from 'vitest';
import { applySentinel, watchSentinel } from './sentinel';

test('só dispara depois de sair da vista', () => {
  expect(applySentinel(false, true)).toEqual({ armed: false, reached: false });
  expect(applySentinel(false, false)).toEqual({ armed: true, reached: false });
  expect(applySentinel(true, true)).toEqual({ armed: true, reached: true });
});

test('o observador avança uma vez e desliga', () => {
  let emit: (visible: boolean) => void = () => {};
  const disconnect = vi.fn();
  class Observer {
    constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
      emit = (visible) => callback([{ isIntersecting: visible }]);
    }
    observe() {}
    disconnect() {
      disconnect();
    }
  }
  vi.stubGlobal('IntersectionObserver', Observer);
  const onReach = vi.fn();
  const stop = watchSentinel(document.createElement('div'), onReach);
  emit(false);
  emit(true);
  emit(true);
  expect(onReach).toHaveBeenCalledOnce();
  stop();
  expect(disconnect).toHaveBeenCalledOnce();
  vi.unstubAllGlobals();
});
