import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

test.describe('Button experiments page', () => {
  let page: Page;

  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/experiments/forms-input/button');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('has primary button', async () => {
    await expect(page.locator('text=The variants of a button:')).toBeVisible();
    await expect(page.locator('text=Clicked 0 times.')).toBeVisible();

    await expect(page.locator('span[data-test=hydrated]')).toHaveCount(1);
    await page.waitForTimeout(100);

    await page.locator('text=Primary').click();
    await expect(page.locator('text=Clicked 1 times.')).toBeVisible();
  });

  test('has hold to confirm button', async () => {
    await expect(page.locator('text=The confirm button allows you to perform the main action with a confirmation step:')).toBeVisible();
    await expect(page.locator('text=Confirmed: false.')).toBeVisible();

    await expect(page.locator('span[data-test=hydrated]')).toHaveCount(1);
    await page.waitForTimeout(100);

    const button = page.locator('text=Hold to Delete').first();
    const boundingBox = await button.boundingBox();

    expect(boundingBox).toBeTruthy();

    await page.mouse.move(boundingBox!.x + boundingBox!.width / 2, boundingBox!.y + boundingBox!.height / 2);
    await page.mouse.down();

    await page.waitForTimeout(980);

    await page.mouse.up();
    await expect(page.locator('text=Confirmed: false.')).toBeVisible();

    await page.mouse.down();
    await page.waitForTimeout(20);
    await expect(page.locator('text=Confirmed: true.')).toBeVisible();
  });

  test('has button group', async () => {
    await expect(page.locator('text=The button group allows putting multiple actions together.')).toBeVisible();
    await expect(page.locator('text=Used to group actions.')).toBeVisible();

    await expect(page.locator('.wl-button-group').getByText('Cancel')).toBeVisible();
    await expect(page.locator('.wl-button-group').getByText('Hold to Delete')).toBeVisible();
  });

  test('has rating button', async () => {
    const rating4 = page.locator('.wl-rating-button button').nth(3);

    await expect(page.locator('text=The rating button allows the user to rate something.')).toBeVisible();
    await expect(page.locator('text=Used to evaluate aspects of something. Rating: 3.')).toBeVisible();
    await expect(rating4).toBeVisible();

    await rating4.click();

    await expect(page.locator('text=Used to evaluate aspects of something. Rating: 4.')).toBeVisible();
  });
});
