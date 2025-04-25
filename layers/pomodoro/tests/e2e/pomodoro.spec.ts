import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

test.describe('Pomodoro App', () => {
  test('shows login form and invalid credentials error', async ({ page }) => {
    await page.goto('/applications/pomodoro', { waitUntil: 'networkidle' });

    await expect(page.getByText('Sign In')).toBeVisible();

    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid@email.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('invalidpassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('div').filter({ hasText: /^Invalid credentials$/ })).toBeVisible();
  });

  test('sign in and sign out', async ({ page }) => {
    const email = process.env.USER1_EMAIL;
    const password = process.env.USER1_PASSWORD;

    if (email == null || password == null) {
      throw new Error('Please set USER1_EMAIL and USER1_PASSWORD environment variables.');
    }

    await page.goto('/applications/pomodoro', { waitUntil: 'networkidle' });
    await page.fill('input[id="email"]', email);
    await page.fill('input[id="password"]', password);
    await page.click('text=Login');

    await expect(page.getByRole('heading', { name: 'Pomodoro' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Work' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();

    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.getByText('Sign In')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test.describe('authenticated', () => {
    let page: Page;

    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      page.on('dialog', dialog => dialog.accept());

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      await page.clock.install();
      await page.clock.pauseAt(tomorrow);

      await page.goto('/applications/pomodoro', { waitUntil: 'networkidle' });

      const email = process.env.USER1_EMAIL;
      const password = process.env.USER1_PASSWORD;

      if (email == null || password == null) {
        throw new Error('Please set USER1_EMAIL and USER1_PASSWORD environment variables.');
      }

      await page.goto('/applications/pomodoro', { waitUntil: 'networkidle' });
      await page.fill('input[id="email"]', email);
      await page.fill('input[id="password"]', password);
      await page.click('text=Login');

      await page.waitForLoadState('networkidle');
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('adds and removes intervals via the timer', async () => {
      await expect(page.getByText('25:00', { exact: true })).toBeVisible();

      await page.getByTitle('Start timer (P)').click();
      await page.clock.fastForward('00:01');

      await expect(page.getByText('24:59', { exact: true })).toBeVisible();

      await page.getByTitle('Pause timer (P)').click();

      await expect(page.locator('div').filter({ hasText: /^Work00:01$/ }).getByRole('paragraph')).toBeVisible();
      await expect(page.locator('.absolute.outline-none')).toHaveCount(1);

      await page.getByText(':01').click();
      await page.getByTitle('Next interval (N)').click();

      await expect(page.getByText('05:00', { exact: true })).toBeVisible();

      await page.getByTitle('Start timer (P)').click();
      await page.clock.fastForward('00:01');

      await expect(page.getByText('04:59', { exact: true })).toBeVisible();

      await page.getByTitle('Pause timer (P)').click();

      await expect(page.locator('div').filter({ hasText: /^Break00:01$/ }).getByRole('paragraph')).toBeVisible();
      await expect(page.locator('.absolute.outline-none')).toHaveCount(2);

      await page.locator('.absolute.outline-none').nth(0).click();
      await page.getByTitle('Delete record (D)').click();

      await page.locator('.absolute.outline-none').nth(0).click();
      await page.getByTitle('Delete record (D)').click();

      await page.getByRole('button', { name: 'Next interval (N)' }).click();

      await expect(page.getByText('Work', { exact: true })).toBeVisible();
      await expect(page.getByText('25:00', { exact: true })).toBeVisible();

      await page.reload();

      await expect(page.locator('div').filter({ hasText: /^Work00:00$/ }).getByRole('paragraph')).toBeVisible();
      await expect(page.locator('div').filter({ hasText: /^Break00:00$/ }).getByRole('paragraph')).toBeVisible();
    });

    test('adds and removes intervals via the editor', async () => {
      await page.getByRole('button', { name: 'Add Work' }).click();
      await page.getByRole('textbox', { name: 'Start' }).click();
      await page.getByRole('textbox', { name: 'Start' }).fill('15:00');
      await page.getByRole('textbox', { name: 'End' }).fill('15:05');
      await page.getByTitle('Save record (S)').click();

      await expect(page.getByText('Work05:00Break00:00')).toBeVisible();
      await expect(page.locator('.absolute.outline-none')).toHaveCount(1);

      await page.getByTitle('Close record (C)').click();
      await page.getByRole('button', { name: 'Add Break' }).click();
      await page.getByRole('textbox', { name: 'End' }).click();
      await page.getByRole('textbox', { name: 'End' }).fill('15:08');
      await page.getByTitle('Save record (S)').click();
      await page.getByText('Work05:00Break03:').click();

      await expect(page.getByText('Work05:00Break03:')).toBeVisible();
      await expect(page.locator('.absolute.outline-none')).toHaveCount(2);

      await page.locator('.absolute.outline-none').nth(0).click();
      await page.getByTitle('Delete record (D)').click();

      await page.locator('.absolute.outline-none').nth(0).click();
      await page.getByTitle('Delete record (D)').click();

      await page.reload();

      await expect(page.locator('div').filter({ hasText: /^Work00:00$/ }).getByRole('paragraph')).toBeVisible();
      await expect(page.locator('div').filter({ hasText: /^Break00:00$/ }).getByRole('paragraph')).toBeVisible();
    });

    test('redirects to the app when authenticated', async () => {
      await page.goto('/applications/pomodoro/login', { waitUntil: 'networkidle' });

      await expect(page.url()).toMatch(/applications\/pomodoro$/);
    });
  });
});
