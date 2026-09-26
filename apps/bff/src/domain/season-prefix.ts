export function seasonPrefix(value: string | undefined): string {
  const text = value?.trim() ?? '';
  if (text === '') return '';
  if (!/^\d{1,2}$/.test(text)) return 's00';
  return `s${text.padStart(2, '0')}`;
}
