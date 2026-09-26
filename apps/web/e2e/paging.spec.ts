import { expect, test } from '@playwright/test';

test('o catálogo abre com quinze episódios e o scroll carrega mais cinco', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /Pilot/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Arquivo 15/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Arquivo 16/ })).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Páginas' })).toHaveCount(0);
  await page.evaluate(() => new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined)));
  }));
  await page.locator('.scroll-sentinel').scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: /Arquivo 16/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Pilot/ })).toBeVisible();
});

test('a letra do elenco carrega as personagens até essa letra', async ({ page }) => {
  await page.goto('/episodes/4');
  await expect(page.getByRole('link', { name: /Alpha 0/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Zeta/ })).toHaveCount(0);
  await page.getByRole('link', { name: 'Z', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Z', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Zeta/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Alpha 0/ })).toBeVisible();
});
