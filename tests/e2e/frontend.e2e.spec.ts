import { expect, test } from '@playwright/test'

test.describe('Frontend', () => {
  test('homepage loads with a title and a heading', async ({ page }) => {
    const response = await page.goto('http://localhost:3000')
    expect(response?.ok(), 'homepage should respond with 2xx').toBeTruthy()

    // Title is content-driven (Payload "Pages.title"), so we only assert it's non-empty.
    await expect(page).toHaveTitle(/.+/)

    // The first <h1> must exist and have non-empty text — the actual copy is
    // intentionally not asserted because the homepage content is editable.
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
    await expect(heading).not.toHaveText('')
  })
})
