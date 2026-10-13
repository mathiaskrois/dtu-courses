const {test, expect} = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('all six period directories expose their own courses and accessible palettes', async ({page}) => {
  const {courses} = await import('../dtu-source/courses.mjs');
  const {coursePeriods} = await import('../dtu/assets/period-state.mjs');
  for (const period of coursePeriods(courses)) {
    await page.goto(`/dtu/periods/${period.id}/`);
    await expect(page.locator('.course-card')).toHaveCount(period.courses.length);
    for (const course of period.courses) {
      const card = page.locator(`.course-card[data-course="${course.id}"]`);
      await expect(card).toContainText(course.name);
      await expect(card).toHaveAttribute('href', `/dtu/${course.id}/`);
      expect(await card.evaluate(el => getComputedStyle(el).getPropertyValue('--course-primary').trim())).toBe(course.palette.primary);
    }
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('reading expansion survives resizing and menus work with the keyboard', async ({page}) => {
  await page.goto('/dtu/12106/weeks/6/');
  const explanation = page.locator('.analysis-fold').first();
  await expect(explanation).not.toHaveAttribute('open');
  await explanation.locator('summary').click();
  await page.setViewportSize({width:390,height:844});
  await expect(explanation).toHaveAttribute('open');
  await page.setViewportSize({width:1440,height:900});
  await expect(explanation).toHaveAttribute('open');
  const menu = page.locator('.period-menu');
  await menu.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(menu.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open');
  await expect(menu.locator('summary')).toBeFocused();
});

test('intensive blocks retain exact ranges, saved answers and reduced-motion selection', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/dtu/42501/');
  const choose = async number => {
    if (await page.locator('#week-select').isVisible()) await page.locator('#week-select').selectOption(String(number));
    else await page.locator(`[data-select-week="${number}"]`).click();
  };
  for (const [number, range] of [[1,'4 Jun – 12 Jun'],[2,'13 Jun – 19 Jun'],[3,'20 Jun – 26 Jun']]) {
    await choose(number);
    await expect(page.locator(`[data-week-panel="${number}"] .eyebrow`)).toContainText(range);
  }
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await page.goto('/dtu/42501/weeks/2/');
  await expect(page.locator('.week-pagination')).toContainText('Block 2 of 3');
  await page.locator('[data-answer="example"]').fill('A test prototype');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('[data-download-answers]').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('42501-block-2-practice.txt');
  const text = await require('node:fs/promises').readFile(await download.path(),'utf8');
  expect(text).toContain('June 2025 · Block 2');
  expect(text).toContain('A test prototype');
});

test('course-specific caveats stay visible outside folded reference text', async ({page}) => {
  for (const [id, text] of [
    ['02582','the course overview says 2 May'],
    ['02506','Exam and group-enrollment dates are unconfirmed'],
    ['02450','Resubmissions apply only to unapproved reports'],
    ['02456','Weeks 1–8 have no mandatory hand-ins'],
    ['02616','Project 2: required, date unconfirmed'],
    ['02581','Oral exams start 8 December'],
  ]) {
    await page.goto(`/dtu/${id}/`);
    await expect(page.locator('.notice').filter({hasText:text})).toBeVisible();
  }
  await page.goto('/dtu/02807/');
  await expect(page.locator('.deadline-conflict summary')).toBeVisible();
  await page.locator('.deadline-conflict summary').click();
  await expect(page.locator('.deadline-conflict')).toContainText('6 December');
});
