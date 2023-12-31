import { expect, test } from '@playwright/test'

import type { Page } from '@playwright/test'

test.describe('Button experiments page', () => {
  let page: Page

  test.describe.configure({ mode: 'serial' })

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/experiments/forms-input/button')
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('has primary button', async () => {
    await expect(page.locator('text=The primary button:')).toBeVisible()
    await expect(page.locator('text=Clicked 0 times.')).toBeVisible()

    await expect(page.locator('span[data-test=hydrated]')).toHaveCount(1)
    await page.waitForTimeout(100)

    await page.locator('text=Get Started').click()
    await expect(page.locator('text=Clicked 1 times.')).toBeVisible()
  })

  test('has hold to confirm button', async () => {
    await expect(page.locator('text=The confirm button allows you to perform the main action with a confirmation step:')).toBeVisible()
    await expect(page.locator('text=Confirmed: false.')).toBeVisible()

    await expect(page.locator('span[data-test=hydrated]')).toHaveCount(1)
    await page.waitForTimeout(100)

    const button = page.locator('text=Hold to Delete').first()
    const boundingBox = await button.boundingBox()

    expect(boundingBox).toBeTruthy()

    await page.mouse.move(boundingBox!.x + boundingBox!.width / 2, boundingBox!.y + boundingBox!.height / 2)
    await page.mouse.down()

    await page.waitForTimeout(980)

    await page.mouse.up()
    await expect(page.locator('text=Confirmed: false.')).toBeVisible()

    await page.mouse.down()
    await page.waitForTimeout(20)
    await expect(page.locator('text=Confirmed: true.')).toBeVisible()
  })

  test.skip('has button group', () => { })

  test.skip('has rating button', () => { })
})
