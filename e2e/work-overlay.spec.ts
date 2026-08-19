import { expect, test } from "@playwright/test"

/**
 * The overlay is the centerpiece and the part that cannot be checked over
 * HTTP: interception, focus management, scroll locking and keyboard routes
 * all only exist in a real browser.
 */

const FIRST = "cognitive-playroom"
const SECOND = "dushi-platform"

test.describe("case study overlay", () => {
  test("opens over the index, keeping the index mounted behind it", async ({ page }) => {
    await page.goto("/en")

    await page.locator(`[data-work-row="${FIRST}"]`).click()

    await expect(page).toHaveURL(new RegExp(`/en/work/${FIRST}$`))
    await expect(page.getByRole("dialog")).toBeVisible()

    // The index is still there underneath — that is what preserves scroll.
    await expect(page.locator(`[data-work-row="${SECOND}"]`)).toBeAttached()
  })

  test("escape closes it and hands focus back to the row that opened it", async ({ page }) => {
    await page.goto("/en")
    await page.locator(`[data-work-row="${FIRST}"]`).click()
    await expect(page.getByRole("dialog")).toBeVisible()

    await page.keyboard.press("Escape")

    await expect(page.getByRole("dialog")).toBeHidden()
    await expect(page).toHaveURL(/\/en$/)
    await expect(page.locator(`[data-work-row="${FIRST}"]`)).toBeFocused()
  })

  test("the browser back button closes it", async ({ page }) => {
    await page.goto("/en")
    await page.locator(`[data-work-row="${FIRST}"]`).click()
    await expect(page.getByRole("dialog")).toBeVisible()

    await page.goBack()

    await expect(page.getByRole("dialog")).toBeHidden()
    await expect(page).toHaveURL(/\/en$/)
  })

  test("arrow keys move between projects without stacking history", async ({ page }) => {
    await page.goto("/en")
    await page.locator(`[data-work-row="${FIRST}"]`).click()
    await expect(page).toHaveURL(new RegExp(`/work/${FIRST}$`))

    await page.keyboard.press("ArrowRight")
    await expect(page).toHaveURL(new RegExp(`/work/${SECOND}$`))

    await page.keyboard.press("ArrowLeft")
    await expect(page).toHaveURL(new RegExp(`/work/${FIRST}$`))

    // replace(), not push(): one Back should reach the index, not retrace.
    await page.goBack()
    await expect(page).toHaveURL(/\/en$/)
  })

  test("locks body scroll without shifting the layout", async ({ page }) => {
    await page.goto("/en")

    const widthBefore = await page.evaluate(
      () => document.documentElement.getBoundingClientRect().width,
    )

    await page.locator(`[data-work-row="${FIRST}"]`).click()
    await expect(page.getByRole("dialog")).toBeVisible()

    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.body).overflow))
      .toBe("hidden")

    const widthAfter = await page.evaluate(
      () => document.documentElement.getBoundingClientRect().width,
    )
    expect(widthAfter).toBe(widthBefore)
  })

  test("traps focus inside while open", async ({ page }) => {
    await page.goto("/en")
    await page.locator(`[data-work-row="${FIRST}"]`).click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()

    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab")
      const inside = await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      )
      expect(inside).toBe(true)
    }
  })

  test("a direct visit renders the standalone page, not the overlay", async ({ page }) => {
    await page.goto(`/en/work/${FIRST}`)

    await expect(page.getByRole("dialog")).toHaveCount(0)
    // Assert the identity of the project by comparing headings, not by pinning
    // a name that lives in editable frontmatter.
    const first = await page.getByRole("heading", { level: 1 }).textContent()
    expect(first?.trim().length).toBeGreaterThan(0)
    await expect(page.locator('a[href="/en#work"]')).toBeVisible()

    await page.goto(`/en/work/${SECOND}`)
    const second = await page.getByRole("heading", { level: 1 }).textContent()
    expect(second).not.toEqual(first)
  })

  test("reloading with the overlay open falls through to the standalone page", async ({ page }) => {
    await page.goto("/en")
    await page.locator(`[data-work-row="${FIRST}"]`).click()
    await expect(page.getByRole("dialog")).toBeVisible()

    // Scoped to the dialog: the hero's h1 is still in the document behind it.
    // That is correct for a modal — aria-modal hides the rest from assistive
    // tech — but it means an unscoped lookup matches two elements.
    const inOverlay = await page
      .getByRole("dialog")
      .getByRole("heading", { level: 1 })
      .textContent()

    await page.reload()

    await expect(page.getByRole("dialog")).toHaveCount(0)
    // Same project, now as a standalone page rather than an overlay.
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(inOverlay ?? "")
  })
})
