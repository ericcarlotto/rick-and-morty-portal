export function LetterIndex({ letters }: { letters: string[] }) {
  return (
    <nav aria-label="Índice">
      <h2 className="sr-only">Índice</h2>
      <ul className="index-list">
        {letters.map((letter) => (
          <li key={letter}>
            <a className="index-letter" href={`#letra-${letter}`}>
              {letter}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
