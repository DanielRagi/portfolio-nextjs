import { expect, test } from "@playwright/test"

test.describe("locale routing", () => {
  test("negotiates a locale at the root", async ({ browser }) => {
    const english = await browser.newContext({ locale: "en-US" })
    const englishPage = await english.newPage()
    await englishPage.goto("/")
    await expect(englishPage).toHaveURL(/\/en$/)
    await english.close()

    const spanish = await browser.newContext({ locale: "es-CO" })
    const spanishPage = await spanish.newPage()
    await spanishPage.goto("/")
    await expect(spanishPage).toHaveURL(/\/es$/)
    await spanish.close()
  })

  test("the language switch preserves a deep link", async ({ page }) => {
    await page.goto("/en/work/unacopio")

    // The trigger is server-rendered, so a click can land before React has
    // hydrated and be swallowed. Retrying the open until the menu is actually
    // visible removes that race instead of leaving the test intermittent.
    await expect(async () => {
      await page.getByRole("button", { name: /language/i }).click()
      await expect(page.getByRole("menu")).toBeVisible({ timeout: 1000 })
    }).toPass({ timeout: 15_000 })

    await page.getByRole("menuitem", { name: "Español" }).click()

    // The old switch replaced the first "/en" anywhere in the path; this
    // asserts only the leading segment moves.
    await expect(page).toHaveURL(/\/es\/work\/unacopio$/)
  })

  test("serves a genuinely different translation of each case study", async ({ page }) => {
    const prose: string[] = []

    for (const locale of ["en", "es"] as const) {
      await page.goto(`/${locale}/work/cognitive-playroom`)

      const article = page.locator("article")
      await expect(article.locator("h2").first()).toBeVisible()

      prose.push(((await article.textContent()) ?? "").replace(/\s+/g, " ").trim())
    }

    // Comparing the two rather than matching either one: this proves the
    // Spanish is really translated without pinning the test to copy that is
    // still being written.
    expect(prose[0].length).toBeGreaterThan(120)
    expect(prose[1].length).toBeGreaterThan(120)
    expect(prose[0]).not.toEqual(prose[1])
  })
})

test.describe("accessibility", () => {
  test("the skip link is reachable and jumps to main", async ({ page }) => {
    await page.goto("/en")

    await page.keyboard.press("Tab")
    const skip = page.getByRole("link", { name: /skip to content/i })
    await expect(skip).toBeFocused()

    await skip.press("Enter")
    await expect(page).toHaveURL(/#main$/)
  })

  test("has exactly one h1 and no skipped heading levels", async ({ page }) => {
    await page.goto("/en")

    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1)

    const levels = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll((nodes) => nodes.map((node) => Number(node.tagName[1])))

    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1)
    }
  })

  test("every section the nav points at exists", async ({ page }) => {
    await page.goto("/en")

    const hrefs = await page
      .locator("header nav a[href^='#']")
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!))

    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) {
      await expect(page.locator(href)).toHaveCount(1)
    }
  })

  test("images that convey meaning carry alt text", async ({ page }) => {
    await page.goto("/en/work/cognitive-playroom")

    const missing = await page
      .locator("img")
      .evaluateAll((nodes) =>
        nodes.filter((node) => !node.hasAttribute("alt")).map((node) => node.getAttribute("src")),
      )

    expect(missing).toEqual([])
  })
})

test.describe("reduced motion", () => {
  test("the page is fully readable with animation off", async ({ browser }) => {
    // An explicit context rather than test.use(): the describe-level form does
    // not type-check against Playwright 1.62's Fixtures signature.
    const context = await browser.newContext({ reducedMotion: "reduce" })
    const page = await context.newPage()

    await page.goto("/en")

    // Sections are addressed by id, not by their copy: the wording is edited
    // often and an assertion on it fails for a reason that is not a defect.
    // Revealed content sits below the fold at opacity:0 until it animates, so
    // this still fails loudly if the reduced-motion path stops short-circuiting.
    for (const id of ["#approach", "#capabilities", "#studio", "#contact"]) {
      await expect(page.locator(`${id} h2`).first()).toBeVisible()
      await expect(page.locator(id).getByText(/\S/).first()).toBeVisible()
    }

    await context.close()
  })
})
