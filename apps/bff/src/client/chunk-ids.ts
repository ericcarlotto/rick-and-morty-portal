export const CHARACTER_BATCH = 20;

export function chunkIds(ids: number[], size: number): number[][] {
  if (size < 1) throw new Error('Lote inválido');
  const chunks: number[][] = [];
  for (let index = 0; index < ids.length; index += size) {
    chunks.push(ids.slice(index, index + size));
  }
  return chunks;
}
