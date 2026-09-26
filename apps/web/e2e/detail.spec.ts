import { expect, test } from '@playwright/test';

test('abre o detalhe da personagem', async ({ page }) => {
  await page.goto('/episodes/2');
  await page.getByRole('link', { name: /Morty Smith/ }).click();
  await expect(page.getByRole('heading', { name: 'Morty Smith' })).toBeVisible();
  await expect(page.getByText('Espécie: Human')).toBeVisible();
  await expect(page.getByText('Estado: Vivo')).toBeVisible();
  await expect(page.getByText('Origem: Earth')).toBeVisible();
});
