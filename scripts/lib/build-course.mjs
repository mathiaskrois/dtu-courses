import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  esc,
  external,
  createLayout,
  pageHeading,
  analysisList,
  weekPagination,
  taskCard,
  studyRange,
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
  const unit = c.studyUnit || "Week";
  const layout = createLayout({
    catalog,
    course: c,
    weeks,
    description: `DTU ${c.id} ${c.title}: weekly plans, practice, materials and deadlines.`,
  });
  const sources = `<details class="source-details"><summary>Sources & verification</summary><p>${esc(p.sourceNote.replace(p.dateNote, "").trim())}</p>${p.dateNote ? `<p>${esc(p.dateNote)}</p>` : ""}<div class="source-links">${c.learn ? external(c.learn, "DTU Learn") : ""}${c.website && c.website !== c.learn ? external(c.website, "Official course") : ""}</div></details>`;
  const importantCaveat = p.warning ? `<p class="notice">${esc(p.warning)}</p>` : "";
  const dueIn = (w) =>
    obligations.filter((o) => {
      const date = o.due?.slice(0, 10) || o.dateOnly;
      return date >= w.start && date <= w.end;
    });
  const nextAfter = (w) =>
    obligations.find((o) => (o.due?.slice(0, 10) || o.dateOnly) > w.end);
  const card = (o) => taskCard(o, { year, archived: c.archived });
  const meta = c.archived ? `<div class="course-meta"><span data-semester>${weeks.length} ${unit.toLowerCase()}s</span></div>` : `<div class="course-meta"><span class="desktop-copy" data-semester>${weeks.length} teaching weeks</span><span class="phone-copy" data-semester-phone>${weeks.length} weeks</span><span data-calendar></span></div>`;
  const panel = (w) =>
    weekPanel({
      w,
      unit,
      archived: c.archived,
      base,
      due: dueIn(w),
      next: nextAfter(w),
      dateLabel: unit === "Block" ? studyRange(w) : w.date,
      takeaways: w.takeaways,
      prompt: w.practice.prompt,
    });
  const overview =
    pageHeading(
      `${esc(c.id)} / ${esc(p.subtitle)}`,
      esc(c.title),
      meta,
      `<a class="button" href="${base}materials/">Browse materials ↗</a>`,
      "page-heading overview-heading",
    ) +
    (c.archived ? "" : obligations.length
      ? deadlineSpotlight(base)
      : '<p class="notice">No official obligations have been recorded yet.</p>') +
    importantCaveat +
    (weeks.length
      ? weeklyBrowser(c, weeks, weeks.map(panel).join(""))
      : '<p class="notice">Weekly plans await source verification.</p>') +
    overviewDeadlines(
      "Official obligations",
      base,
      compactTasks(obligations, base, c.archived),
      "Personal completion is saved in this browser. Confirm submissions in Learn.",
    ) +
    `<details class="pass-details"><summary>Assessment & requirements</summary><p>${esc(p.assessment)}</p></details>` +
    sources;
  const deadlines =
    pageHeading(
      `${esc(c.id)} / OFFICIAL OBLIGATIONS`,
      "Deadlines",
    ) +
    importantCaveat +
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
      "Materials",
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
      `<div class="breadcrumbs"><a href="${base}">Course overview</a> / ${unit} ${w.number}</div>` +
      pageHeading(
        `${unit.toUpperCase()} ${w.number} / ${esc(unit === "Block" ? studyRange(w) : w.date)}`,
        esc(w.title),
        "",
        `<a class="button dark" href="#practice">Do the task ↓</a>`,
      ) +
      weekPagination(weeks, w.number, base, "Deadlines", unit) +
      understandSection(analysisList(w.takeaways)) +
      practiceSection(
        esc(w.practice.title),
        w.projectPhase ? "Suggested milestone" : "30–60 min · Suggested",
        esc(w.practice.prompt),
        practiceWorkspace(w),
        `<details class="practice-check"><summary>Expected output</summary><p>${esc(w.practice.result)}</p></details><details class="practice-resources"><summary>Related official resources</summary><div class="source-links">${related.map((r) => external(r.url, r.title)).join("")}</div></details>`,
      ) +
      mandatorySection(
        dueIn(w).map(card).join("") ||
          '<p class="notice">No dated deadline in this study plan.</p>',
      ) +
      (next
        ? `<p class="notice">Coming up: ${esc(next.title)} · ${esc(next.date)}</p>`
        : "") +
      sources;
    await page(
      `weeks/${w.number}/`,
      body,
      `${unit} ${w.number} · ${w.title}`,
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
