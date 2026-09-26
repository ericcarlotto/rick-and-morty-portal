import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test } from 'vitest';
import RootLayout, { metadata } from './layout';

test('o layout está em português', () => {
  const html = renderToStaticMarkup(
    <RootLayout>
      <p>Olá</p>
    </RootLayout>,
  );
  expect(html).toContain('lang="pt"');
  expect(html).toContain('font-mock');
  expect(html).toContain('Olá');
  expect(metadata.title).toBe('Elenco');
});
