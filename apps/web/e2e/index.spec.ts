import { expect, test } from '@playwright/test';

test('salta para a letra do índice', async ({ page }) => {
  await page.goto('/episodes/2');
  await page.getByRole('link', { name: 'M', exact: true }).click();
  await expect(page).toHaveURL(/#letra-M/);
  await expect(page.getByRole('heading', { name: 'M', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'M', exact: true })).toHaveClass(/index-letter/);
});
