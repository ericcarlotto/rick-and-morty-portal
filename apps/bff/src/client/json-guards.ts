export function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Resposta inválida');
  }
  return value as Record<string, unknown>;
}

export function asString(value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '') throw new Error('Resposta inválida');
  return value;
}

export function asPositiveInt(value: unknown): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    throw new Error('Resposta inválida');
  }
  return value;
}

export function asStringList(value: unknown): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error('Resposta inválida');
  }
  return value;
}
