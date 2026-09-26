'use client';

export function NameFilter({ name, onName }: { name: string; onName: (name: string) => void }) {
  return (
    <label className="name-filter">
      Nome
      <input value={name} onChange={(event) => onName(event.target.value)} />
    </label>
  );
}
