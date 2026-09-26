import type { CastCharacter, CharacterStatus } from '@rick/contract';
import { letterOf } from './index-letters';

const STATUS: Record<string, CharacterStatus> = {
  Alive: 'Vivo',
  Dead: 'Morto',
  unknown: 'Desconhecido',
};

export function toCharacterView(input: {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: string;
}): CastCharacter {
  return {
    id: input.id,
    name: input.name,
    species: input.species,
    status: STATUS[input.status] ?? 'Desconhecido',
    origin: input.origin,
    letter: letterOf(input.name),
  };
}
