import { expect, test } from '@playwright/test';

test('filtra o catálogo por nome ou código', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Filtrar' })).toHaveCount(0);
  await page.getByLabel('Nome').pressSequentially('Lawn');
  await expect(page.getByRole('link', { name: /Lawnmower Dog/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Pilot/ })).toHaveCount(0);
  await page.getByLabel('Nome').fill('');
  await page.getByLabel('Código').fill('S01E03');
  await expect(page.getByRole('link', { name: /Anatomy Park/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Pilot/ })).toHaveCount(0);
});

test('filtra o catálogo por temporada', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Temporada').selectOption('2');
  await expect(page.getByRole('link', { name: /Arquivo 4/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Pilot/ })).toHaveCount(0);
});
