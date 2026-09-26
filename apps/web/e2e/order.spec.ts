import { expect, test } from '@playwright/test';

test('mostra o elenco na ordem recebida', async ({ page }) => {
  await page.goto('/episodes/2');
  const names = page.locator('section[aria-label^="Letra"] a');
  await expect(names).toHaveText([/Abradolf Lincler/, /Birdperson/, /Morty Smith/, /Rick Sanchez/]);
});
