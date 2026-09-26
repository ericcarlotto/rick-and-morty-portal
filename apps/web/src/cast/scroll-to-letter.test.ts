import { expect, test, vi } from 'vitest';
import { scrollToLetterHash } from './scroll-to-letter';

test('rola até a secção da letra no hash', () => {
  const scroll = vi.fn();
  const section = document.createElement('section');
  section.id = 'letra-M';
  section.scrollIntoView = scroll;
  document.body.append(section);
  window.location.hash = '#outro';
  scrollToLetterHash();
  expect(scroll).not.toHaveBeenCalled();
  window.location.hash = '#letra-M';
  scrollToLetterHash();
  expect(scroll).toHaveBeenCalledOnce();
  window.location.hash = '#letra-Z';
  scrollToLetterHash();
  section.remove();
  window.location.hash = '';
});
