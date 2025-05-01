import { expect, test } from '@playwright/test';

test.describe('Worklog Tracker App', () => {
  test('shows login form and invalid credentials error', async ({ page }) => {
    await page.goto('/applications/worklog-tracker', { waitUntil: 'networkidle' });

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

    await page.goto('/applications/worklog-tracker', { waitUntil: 'networkidle' });
    await page.fill('input[id="email"]', email);
    await page.fill('input[id="password"]', password);
    await page.click('text=Login');

    await expect(page.getByRole('heading', { name: 'Worklog Tracker' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();

    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.getByText('Sign In')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test.describe('authenticated', () => {
    test.use({ storageState: '.playwright/auth/user1.json' });
    test.describe.configure({ mode: 'serial' });

    test('adds and removes worklog items', async ({ page }) => {
      await page.goto('/applications/worklog-tracker', { waitUntil: 'networkidle' });

      await expect(page.getByText('No worklogs found.')).toBeVisible();
      await expect(page.locator('li')).toHaveCount(0);

      await page.getByRole('textbox', { name: 'DEV-XXX' }).fill('DEV-123');
      await page.getByRole('textbox', { name: 'Enter worklog here...' }).fill('Sample 1');
      await page.getByRole('textbox').nth(3).fill('10:00');
      await page.getByRole('textbox').nth(4).fill('10:05');
      await page.keyboard.press('Tab');

      await expect(page.locator('span.text-center').filter({ hasText: '5m' })).toBeVisible();

      await page.getByRole('button', { name: 'Save' }).click();

      await expect(page.locator('li')).toBeVisible();
      await expect(page.locator('li')).toHaveCount(1);

      await page.getByText('DEV-123').click();
      await page.getByRole('button', { name: 'Remove' }).click();

      await expect(page.getByText('No worklogs found.')).toBeVisible();
      await expect(page.locator('li')).toHaveCount(0);
    });

    test('redirects to the app when authenticated', async ({ page }) => {
      await page.goto('/applications/worklog-tracker/login', { waitUntil: 'networkidle' });

      await expect(page.url()).toMatch(/applications\/worklog-tracker$/);
    });
  });
});
