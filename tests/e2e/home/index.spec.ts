
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

  test('has main paragraph', async () => {
    await expect(page.locator('text=Experiments on the web platform.')).toBeVisible()
  })
})
