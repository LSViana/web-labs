import { expect, Page, test } from '@playwright/test'

test.describe('Home page', () => {
  let page: Page

  test.describe.configure({ mode: 'serial' })

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/')
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('has title', async () => {
    await expect(page).toHaveTitle('Web Labs')
  })

  test('has groups', async () => {
    await expect(page.locator('text="Forms & Input"')).toBeVisible()
    await expect(page.locator('text=Micro-interactions')).toBeVisible()

    // This list is not exhaustive, the snapshot checks for all groups.
  })

  test('has footer', async () => {
    await expect(page.locator('text=Created by Lucas Viana.')).toBeVisible()
  })

  test('matches screenshot', async () => {
    await expect(await page.screenshot()).toMatchSnapshot()
  })
})
