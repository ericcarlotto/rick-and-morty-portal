'use client';

import type { MouseEvent } from 'react';

export function LetterIndex({ letters, onChoose }: { letters: string[]; onChoose?: (letter: string) => void }) {
  return (
    <nav className="letter-index" aria-label="Índice">
      <h2 className="sr-only">Índice</h2>
      <ul className="index-list">
        {letters.map((letter) => (
          <li key={letter}>
            <a
              className="index-letter"
              href={`#letra-${letter}`}
              onClick={(event) => openLetter({ event, letter, onChoose })}
            >
              {letter}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function openLetter(input: {
  event: MouseEvent<HTMLAnchorElement>;
  letter: string;
  onChoose?: (letter: string) => void;
}) {
  if (document.getElementById(`letra-${input.letter}`)) return;
  input.event.preventDefault();
  input.onChoose?.(input.letter);
  window.location.hash = `letra-${input.letter}`;
}
