export function recordOf(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Contrato inválido');
  }
  return value as Record<string, unknown>;
}

export function textOf(value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error('Contrato inválido');
  }
  return value;
}

export function intOf(value: unknown): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    throw new Error('Contrato inválido');
  }
  return value;
}

export function stringList(value: unknown): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error('Contrato inválido');
  }
  return value;
}
