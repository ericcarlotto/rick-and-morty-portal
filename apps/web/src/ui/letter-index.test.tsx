import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { LetterIndex } from './letter-index';

test('pede outra página quando a letra ainda não está na lista', () => {
  const onChoose = vi.fn();
  render(<LetterIndex letters={['A', 'Z']} onChoose={onChoose} />);
  fireEvent.click(screen.getByRole('link', { name: 'Z' }));
  expect(onChoose).toHaveBeenCalledWith('Z');
  expect(window.location.hash).toBe('#letra-Z');
  window.location.hash = '';
});

test('deixa o browser saltar quando a secção já está visível', () => {
  const onChoose = vi.fn();
  const section = document.createElement('section');
  section.id = 'letra-A';
  document.body.append(section);
  render(<LetterIndex letters={['A']} onChoose={onChoose} />);
  fireEvent.click(screen.getByRole('link', { name: 'A' }));
  expect(onChoose).not.toHaveBeenCalled();
  section.remove();
});
