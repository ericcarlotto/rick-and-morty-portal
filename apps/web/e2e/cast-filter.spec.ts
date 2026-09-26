import { expect, test } from '@playwright/test';

test('filtra o elenco pelo nome a cada letra', async ({ page }) => {
  await page.goto('/episodes/2');
  await page.getByLabel('Nome').pressSequentially('Mor');
  await expect(page.getByRole('link', { name: /Morty Smith/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Rick Sanchez/ })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Birdperson/ })).toHaveCount(0);
});
