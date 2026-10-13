const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

for (const id of ["12106", "02807", "02581", "02616"]) {
  test(`${id} shared layout supports weekly navigation, saved practice and material search`, async ({
    page,
    request,
  }) => {
    await page.clock.install({ time: new Date("2026-10-08T12:00:00Z") });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/dtu/${id}/`);
    if (id === "02807") {
      await expect(page.locator(".deadline-conflict summary")).toContainText(
        "plan for 4 December",
      );
    }
    const runtime = await (await request.get(`/dtu/${id}/runtime.json`)).json();
    await expect(page.locator('[data-week-panel="6"]')).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Course navigation" }),
    ).toBeVisible();
    if (await page.locator("#week-select").isVisible())
      await page.locator("#week-select").selectOption("1");
    else await page.locator('[data-select-week="1"]').click();
    await expect(page.locator('[data-week-panel="1"]')).toBeVisible();
    await page.goto(`/dtu/${id}/weeks/1/`);
    await expect(page.locator("main > .page-heading")).toContainText(
      runtime.weeks[0].title,
    );
    const answer = page.locator("textarea[data-answer]").first();
    await answer.fill(`Saved practice for ${id}`);
    await page.reload();
    await expect(answer).toHaveValue(`Saved practice for ${id}`);
    await expect(page.locator(".week-pagination")).toContainText(
      "Week 1 of 13",
    );
    await page.goto(`/dtu/${id}/materials/`);
    const count = await page.locator("[data-resource]").count();
    expect(count).toBeGreaterThan(0);
    await page.locator("#resource-search").fill("no-such-resource-xyz");
    await expect(page.locator("[data-empty]")).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(page.locator("[data-resource]:visible")).toHaveCount(count);
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

test("completion stays isolated by course and semester while legacy 12106 keys still work", async ({
  page,
}) => {
  await page.goto("/dtu/12106/deadlines/");
  await page.locator("#task1 [data-complete]").check();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("krois.dtu.12106.fall2026.completed"))
            .task1,
      ),
    )
    .toBe(true);
  await page.goto("/dtu/02807/deadlines/");
  await page.locator("#group [data-complete]").check();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("krois.dtu.02807.fall2026.completed")),
    ),
  ).toEqual({ group: true });
  await page.route("**/dtu/02807/deadlines/", async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      'data-storage-term="fall2026"',
      'data-storage-term="fall2027"',
    );
    await route.fulfill({ response, body });
  });
  await page.goto("/dtu/02807/deadlines/");
  await expect(page.locator("#group [data-complete]")).not.toBeChecked();
  await page.locator("#group [data-complete]").check();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("krois.dtu.02807.fall2027.completed")),
    ),
  ).toEqual({ group: true });
});

test("shared numeric workspace calculates and exports the displayed semester", async ({
  page,
}) => {
  await page.route("**/dtu/12106/weeks/6/", async (route) => {
    const response = await route.fetch();
    const body = (await response.text())
      .replace('data-course-term="Fall 2026"', 'data-course-term="Fall 2027"')
      .replace('data-storage-term="fall2026"', 'data-storage-term="fall2027"');
    await route.fulfill({ response, body });
  });
  await page.goto("/dtu/12106/weeks/6/");
  await expect(page.locator(".result-cell")).toHaveCount(4);
  await page.locator('[data-answer="purchaseA"]').fill("0");
  await expect(page.locator(".result-cell strong").first()).toHaveText(
    "146,250",
  );
  const downloadPromise = page.waitForEvent("download");
  await page.locator("[data-download-answers]").click();
  const download = await downloadPromise;
  const text = await require("node:fs/promises").readFile(
    await download.path(),
    "utf8",
  );
  expect(text).toContain("DTU 12106 · Fall 2027 · Week 6");
  expect(text).toContain("146,250");
});
