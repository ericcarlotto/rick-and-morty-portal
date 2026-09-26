import { expect, test } from '@playwright/test';

test('navega para o episódio anterior e o seguinte', async ({ page }) => {
  await page.goto('/episodes/2');
  await page.getByRole('link', { name: 'Anterior: Pilot' }).click();
  await expect(page.getByRole('heading', { name: 'Pilot' })).toBeVisible();
  await expect(page.getByText('Sem episódio anterior')).toBeVisible();
  await page.goto('/episodes/2');
  await page.getByRole('link', { name: 'Seguinte: Anatomy Park' }).click();
  await expect(page.getByRole('heading', { name: 'Anatomy Park' })).toBeVisible();
  await expect(page.getByText('Sem episódio seguinte')).toBeVisible();
});
