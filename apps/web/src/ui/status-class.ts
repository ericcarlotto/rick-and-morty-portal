import type { CharacterStatus } from '@rick/contract';

const STATUS_CLASS: Record<CharacterStatus, string> = {
  Vivo: 'status-vivo',
  Morto: 'status-morto',
  Desconhecido: 'status-desconhecido',
};

export function statusClass(status: CharacterStatus): string {
  return STATUS_CLASS[status];
}
