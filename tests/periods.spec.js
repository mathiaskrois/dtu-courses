const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("homepage defaults to the current period and the rail opens past periods", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-10-13T12:00:00Z") });
  await page.goto("/dtu/");
  await expect(page.locator('[data-period-panel="fall2026"]')).toBeVisible();
  await expect(page.locator(".course-card:visible")).toHaveCount(4);
  const periods = page.getByRole("navigation", { name: "Course periods" });
  await expect(periods.locator("a")).toHaveCount(6);
  await periods.locator('[data-period-link="spring2025"]').click();
  await expect(page).toHaveURL(/\/dtu\/periods\/spring2025\/$/);
  await expect(page.locator(".course-card:visible")).toHaveCount(3);
  await expect(page.locator(".period-heading")).toContainText("Spring 2025");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.goto("/dtu/");
  await expect(page.locator('[data-period-panel="fall2026"]')).toBeVisible();
  await expect(page.locator(".course-card:visible")).toHaveCount(4);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("automatic homepage uses the visitor date rather than the build date", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-12T12:00:00Z") });
  await page.goto("/dtu/");
  await expect(page.locator('[data-period-panel="winter2026"]')).toBeVisible();
  await expect(page.locator(".course-card:visible")).toHaveCount(1);
  await expect(page.locator(".course-card:visible")).toContainText("02476");
  await expect(page.locator('[data-period-link="winter2026"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
  await page.goto("/dtu/periods/fall2025/");
  await expect(page.locator('[data-period-panel="fall2025"]')).toBeVisible();
  await expect(page.locator(".course-card:visible")).toHaveCount(3);
});

for (const [id, count, term] of [
  ["02450", 13, "Spring 2025"],
  ["02456", 13, "Fall 2025"],
  ["02476", 3, "Winter 2026"],
  ["42501", 3, "June 2025"],
  ["02506", 13, "Spring 2026"],
]) {
  test(`${id} archived edition keeps the shared layout and its own calendar`, async ({
    page,
    request,
  }) => {
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const runtime = await (await request.get(`/dtu/${id}/runtime.json`)).json();
    expect(runtime.course.term).toBe(term);
    expect(runtime.weeks).toHaveLength(count);
    await page.goto(`/dtu/${id}/`);
    await expect(page.locator("[data-semester]")).toHaveText(
      "Teaching complete",
    );
    await page.goto(`/dtu/${id}/weeks/1/`);
    await expect(page.locator(".week-pagination")).toContainText(
      `Week 1 of ${count}`,
    );
    const field = page.locator('[data-answer="example"]');
    await field.fill(`Practice for ${term}`);
    await page.reload();
    await expect(field).toHaveValue(`Practice for ${term}`);
    await page.goto(`/dtu/${id}/deadlines/`);
    await expect(page.locator(".obligation")).toHaveCount(
      runtime.obligations.length,
    );
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("all course and period pages remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:8080/dtu/periods/june2025/");
  await expect(page.locator(".course-card")).toHaveCount(1);
  await page.locator(".course-card").click();
  await expect(page.locator("h1")).toHaveText("Innovation in engineering");
  await page
    .getByRole("navigation", { name: "Teaching weeks" })
    .getByRole("link")
    .first()
    .click();
  await expect(page.locator("#practice textarea")).toHaveCount(3);
  await context.close();
});
