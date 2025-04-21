import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

test.describe('Pomodoro App', () => {
  test.describe.configure({ mode: 'serial' });

  test.describe('guest', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto('/applications/pomodoro');
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('has title', async () => {
      await expect(page).toHaveTitle('Web Labs');
    });

    test('displays login prompt', async () => {
      await expect(page.locator('form')).toBeVisible();
      await expect(page.locator('form p')).toHaveText('Sign In');
      await expect(page.getByLabel('Email')).toHaveAttribute('placeholder', 'example@example.com');
      await expect(page.getByLabel('Password')).toHaveAttribute('placeholder', '••••••••');
      await expect(page.locator('form button[type="submit"]')).toHaveText('Login');
      await expect(page.locator('form a')).toHaveText('Try without an account');
    });

    test('displays login error message', async () => {
      await expect(page.locator('text=Invalid credentials')).not.toBeVisible();

      await page.fill('input[id="email"]', 'sample@email.com');
      await page.fill('input[id="password"]', 'samplepassword');
      await page.click('form button[type="submit"]');
      await expect(page.locator('text=Invalid credentials')).toBeVisible();
    });
  });

  test.describe('authenticated', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
      const email = process.env.USER1_EMAIL;
      const password = process.env.USER1_PASSWORD;

      if (email == null || password == null) {
        throw new Error('Please set USER1_EMAIL and USER1_PASSWORD environment variables.');
      }

      page = await browser.newPage();

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      await page.clock.install();
      await page.clock.pauseAt(tomorrow);

      await page.goto('/applications/pomodoro', { waitUntil: 'networkidle' });
      await page.fill('input[id="email"]', email);
      await page.fill('input[id="password"]', password);
      await page.click('text=Login');
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('has title', async () => {
      await expect(page).toHaveTitle('Pomodoro - Web Labs');
    });

    test('displays timer', async () => {
      await expect(page.locator('text=25:00')).toBeVisible();
      await expect(page.getByTitle('Start timer (P)')).toBeVisible();
      await expect(page.getByTitle('Next interval (N)')).toBeVisible();
    });

    test('starts timer on start button click', async () => {
      await expect(page.getByTitle('Pause timer (P)')).not.toBeVisible();

      await page.getByTitle('Start timer (P)').click();

      await expect(page.locator('text=25:00')).toBeVisible();
      await expect(page.getByTitle('Pause timer (P)')).toBeVisible();

      await page.clock.fastForward('15:00');

      await expect(page.locator('text=10:00')).toBeVisible();
      await expect(page.getByTitle('Pause timer (P)')).toBeVisible();
    });

    test('pauses timer on pause button click', async () => {
      await expect(page.locator('text=Work10:00')).toBeVisible();
      await expect(page.locator('text=Break00:00')).toBeVisible();
      await expect(page.locator('.absolute.outline-none')).toHaveCount(0);

      await page.clock.fastForward('01:03');
      await page.getByTitle('Pause timer (P)').click();

      await expect(page.locator('text=Work16:03')).toBeVisible();
      await expect(page.locator('text=Break00:00')).toBeVisible();
      await expect(page.locator('.absolute.outline-none')).toHaveCount(1);

      await expect(page.locator('.text-5xl', { hasText: '08:57' })).toBeVisible();
    });

    test('resets timer on reset button click', async () => {
      await page.getByTitle('Start timer (P)').click();

      await expect(page.getByTitle('Finish interval (P)')).not.toBeVisible();

      await page.clock.fastForward('09:57');

      await expect(page.locator('.text-5xl', { hasText: '01:00' })).toBeVisible();
      await expect(page.getByTitle('Finish interval (P)')).toBeVisible();

      await page.getByTitle('Finish interval (P)').click();

      await expect(page.locator('text=Work26:00')).toBeVisible();
      await expect(page.locator('text=Break00:00')).toBeVisible();
    });

    test('starts and records break', async () => {
      await expect(page.locator('text=05:00')).toBeVisible();

      await page.getByTitle('Start timer (P)').click();

      await page.clock.fastForward('04:00');

      await page.getByTitle('Pause timer (P)').click();

      await expect(page.locator('.absolute.outline-none')).toHaveCount(3);
      await expect(page.locator('text=Work26:00')).toBeVisible();
      await expect(page.locator('text=Break04:00')).toBeVisible();
    });

    test('removes intervals from the list', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Are you sure you want to delete this record?');

        await dialog.accept();
      });

      await page.locator('.absolute.outline-none:first-child').click();
      await page.getByTitle('Delete record (D)').click();

      await expect(page.locator('text=Work09:57')).toBeVisible();
      await expect(page.locator('text=Break04:00')).toBeVisible();

      await page.locator('.absolute.outline-none:first-child').click();
      await page.getByTitle('Delete record (D)').click();

      await expect(page.locator('text=Work00:00')).toBeVisible();
      await expect(page.locator('text=Break04:00')).toBeVisible();

      await page.locator('.absolute.outline-none:first-child').click();
      await page.getByTitle('Delete record (D)').click();

      await expect(page.locator('.text-5xl', { hasText: '01:00' })).toBeVisible();
      await expect(page.locator('text=Work00:00')).toBeVisible();
      await expect(page.locator('text=Break00:00')).toBeVisible();

      await page.reload();

      await expect(page.locator('.text-5xl', { hasText: '25:00' })).toBeVisible();
      await expect(page.locator('text=Work00:00')).toBeVisible();
      await expect(page.locator('text=Break00:00')).toBeVisible();
    });
  });
});
