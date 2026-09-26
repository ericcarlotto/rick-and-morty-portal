import { expect, test } from '@playwright/test';

test('mostra o catálogo de episódios', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Catálogo de episódios' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Pilot/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Lawnmower Dog/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Anatomy Park/ })).toBeVisible();
});
