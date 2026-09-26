import { expect, test } from '@playwright/test';

test('filtra o catálogo por nome ou código', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Nome').fill('Lawn');
  await page.getByRole('button', { name: 'Filtrar' }).click();
  await expect(page.getByRole('link', { name: /Lawnmower Dog/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Pilot/ })).toHaveCount(0);
  await page.getByLabel('Nome').fill('');
  await page.getByLabel('Código').fill('S01E03');
  await page.getByRole('button', { name: 'Filtrar' }).click();
  await expect(page.getByRole('link', { name: /Anatomy Park/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Pilot/ })).toHaveCount(0);
});
