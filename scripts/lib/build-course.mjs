import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  esc,
  external,
  createLayout,
  pageHeading,
  analysisList,
  weekPagination,
  taskCard,
  compactTasks,
  weeklyBrowser,
  materialsLibrary,
  practiceWorkspace,
  deadlineSpotlight,
  weekPanel,
  understandSection,
  practiceSection,
  mandatorySection,
  overviewDeadlines,
  deadlineBanner,
  deadlineChecklist,
} from "./course-layout.mjs";

const root = new URL("../../", import.meta.url);

// New courses use this renderer; content lives entirely in dtu-source/<id>/.
export async function buildCourse(source, catalog = []) {
  const {
    course: c,
    weeks,
    obligations,
    presentation: p,
  } = await import(new URL(`${source}/course.mjs`, root));
  if (!/^\d{5}$/.test(c.id) || !/\d{4}/.test(c.term))
    throw new Error("Course needs a five-digit ID and a semester with a year.");
  const resources = JSON.parse(
    await readFile(new URL(`${source}/resources.json`, root), "utf8"),
  );
  const base = `/dtu/${c.id}/`;
  const year = c.term.match(/\d{4}/)[0];
  const layout = createLayout({
    catalog,
    course: c,
    weeks,
    description: `DTU ${c.id} ${c.title}: weekly plans, practice, materials and deadlines.`,
    railTitle: esc(c.title),
    railSubtitle: p.subtitle,
    weekHint: "Essentials, practice & deadlines",
    railBottom: "",
  });
  const sources = `<p class="source-note">${esc(p.sourceNote)}</p><div class="source-links">${c.learn ? external(c.learn, "DTU Learn") : ""}${c.website ? external(c.website, "Official course") : ""}</div>`;
  const dueIn = (w) =>
    obligations.filter((o) => {
      const date = o.due?.slice(0, 10) || o.dateOnly;
      return date >= w.start && date <= w.end;
    });
  const nextAfter = (w) =>
    obligations.find((o) => (o.due?.slice(0, 10) || o.dateOnly) > w.end);
  const card = (o) => taskCard(o, { year });
  const meta = `<div class="course-meta"><span class="desktop-copy" data-semester>${weeks.length} teaching weeks</span><span class="phone-copy" data-semester-phone>${weeks.length} weeks</span><span data-calendar></span></div>`;
  const panel = (w) =>
    weekPanel({
      w,
      base,
      due: dueIn(w),
      next: nextAfter(w),
      dateLabel: w.projectPhase ? "PROJECT WORK" : w.date,
      lead: w.lead,
      takeaways: w.takeaways.map((t) => ({ ...t, summary: t.text })),
      prompt: w.practice.prompt,
      noDeadline:
        '<div class="no-deadline"><h4>No confirmed deadline this week</h4><p>Check the official course sources for updates.</p></div>',
    });
  const overview =
    pageHeading(
      `${esc(c.id)} / ${esc(c.term.toUpperCase())}`,
      esc(c.title),
      meta,
      `<a class="button" href="${base}materials/">Browse materials ↗</a>`,
      "page-heading overview-heading",
    ) +
    (obligations.length
      ? deadlineSpotlight(base)
      : '<p class="notice">No official obligations have been recorded yet.</p>') +
    (weeks.length
      ? weeklyBrowser(c, weeks, weeks.map(panel).join(""))
      : '<p class="notice">Weekly plans await source verification.</p>') +
    overviewDeadlines(
      "Official obligations",
      base,
      compactTasks(obligations, base),
      "Personal completion is saved in this browser. Confirm submissions in Learn.",
    ) +
    `<details class="pass-details"><summary>Assessment & requirements</summary><p>${esc(p.assessment)}</p></details>` +
    sources;
  const deadlines =
    pageHeading(
      `${esc(c.id)} / OFFICIAL OBLIGATIONS`,
      "Mandatory & deadlines",
      `<p>${esc(p.deadlineIntro)}</p>`,
    ) +
    deadlineBanner(`${weeks.length} teaching weeks`, "", p.dateNote) +
    `<p class="notice">${esc(p.dateNote)}</p>` +
    deadlineChecklist(
      "Your checklist",
      "",
      obligations.length,
      obligations.map(card).join(""),
    ) +
    sources;
  const materials =
    pageHeading(
      `${esc(c.id)} / COURSE LIBRARY`,
      "Course materials",
      `<p>${esc(p.materialIntro)}</p>`,
    ) +
    materialsLibrary(resources, "Search course materials…") +
    sources;
  async function page(path, body, title, active = "overview", week = null) {
    const directory = new URL(`dtu/${c.id}/${path}`, root);
    await mkdir(directory, { recursive: true });
    await writeFile(
      new URL("index.html", directory),
      layout(title, body, active, week),
    );
  }
  await page("", overview, c.title);
  await page("deadlines/", deadlines, "Mandatory & deadlines", "deadlines");
  await page("materials/", materials, "Course materials", "materials");
  for (const w of weeks) {
    const next = nextAfter(w);
    const related = resources.filter(
      (r) => r.week === w.number || r.weeks?.includes(w.number),
    );
    const body =
      `<div class="breadcrumbs"><a href="${base}">Course overview</a> / Week ${w.number}</div>` +
      pageHeading(
        `WEEK ${w.number} / ${esc(w.date)}`,
        esc(w.title),
        `<p>${esc(w.lead)}</p>`,
        `<a class="button dark" href="#practice">Do the task ↓</a>`,
      ) +
      weekPagination(weeks, w.number, base, "Final deadlines") +
      understandSection(analysisList(w.takeaways)) +
      practiceSection(
        esc(w.practice.title),
        w.projectPhase ? "Suggested milestone" : "30–60 min · Suggested",
        esc(w.practice.prompt),
        practiceWorkspace(w),
        `<details class="practice-check" open data-phone-fold><summary>Expected output</summary><p>${esc(w.practice.result)}</p></details><details class="practice-resources" open data-phone-fold><summary>Related official resources</summary><div class="source-links">${related.map((r) => external(r.url, r.title)).join("")}</div></details>`,
      ) +
      mandatorySection(
        dueIn(w).map(card).join("") ||
          '<p class="notice">No confirmed deadline falls inside this week.</p>',
      ) +
      (next
        ? `<p class="notice">Coming up: ${esc(next.title)} · ${esc(next.date)}</p>`
        : "") +
      sources;
    await page(
      `weeks/${w.number}/`,
      body,
      `Week ${w.number} · ${w.title}`,
      "week",
      w.number,
    );
  }
  await writeFile(
    new URL(`dtu/${c.id}/runtime.json`, root),
    JSON.stringify(
      {
        course: c,
        weeks: weeks.map(({ number, start, end, title }) => ({
          number,
          start,
          end,
          title,
        })),
        obligations: obligations.map(({ checklist, ...o }) => o),
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    `Built ${c.id}: ${weeks.length} weekly plans and ${resources.length} materials.`,
  );
}
