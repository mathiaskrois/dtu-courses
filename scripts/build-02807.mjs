import { courses } from "../dtu-source/courses.mjs";
import {
  esc,
  external,
  createLayout,
  pageHeading,
  analysisList,
  weekPagination,
  taskCard as renderTaskCard,
  compactTasks,
  weeklyBrowser,
  materialsLibrary,
  practiceWorkspace,
  deadlineSpotlight,
  weekPanel as renderWeekPanel,
  understandSection,
  practiceSection,
  mandatorySection,
  overviewDeadlines,
  deadlineBanner,
  deadlineChecklist,
  assessmentSection,
} from "./lib/course-layout.mjs";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  course as c,
  weeks,
  obligations,
  deadlineNote,
} from "../dtu-source/02807/course.mjs";
const root = fileURLToPath(new URL("../", import.meta.url)),
  base = "/dtu/02807/";
const resources = JSON.parse(
  await readFile(root + "dtu-source/02807/resources.json", "utf8"),
);
const href = (n) => base + "weeks/" + n + "/";
const stamp = `<p class="source-note">Checked ${c.verified}. The official schedule is tentative. Teaching dates follow the 2026 homepage; some linked exercise sheets retain older dates. Summaries, small practice examples and project milestones are original guidance.</p>`;
const sourceContent = `<div class="source-links">${external(c.website, "Official course site")}${external(c.project, "Project requirements")}${external(c.learn, "DTU Learn")}</div>${stamp}`;
const sources = `<details class="source-details"><summary>Sources & verification</summary>${sourceContent}</details>`;
const date = (s) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Copenhagen",
  }).format(new Date(s + "T12:00Z"));
const layout = createLayout({
  catalog: courses,
  course: c,
  weeks,
  description:
    "DTU 02807 Computational Tools for Data Science: weekly essentials, on-page practice, project requirements and deadlines.",
});

const taskCard = (o) => renderTaskCard(o, { year: c.term.match(/\d{4}/)[0] });

const projectInfo = `${assessmentSection(
  `ASSESSMENT`,
  `Project assessment`,
  `Use at least one qualifying course topic—two are preferred—and at least one method not directly taught. Your report and documented notebook must show a relevant, technically challenging solution and evaluate its results.`,
  `${external(c.project, "Official project requirements")}`,
  [
    { value: `4–5`, label: `Students per group<br>Register by 23 October` },
    {
      value: `11k`,
      label: `Report characters, excluding whitespace<br>12,500 for five-person groups`,
    },
  ],
)}`;

function panel(w) {
  const due = obligations.filter(
      (o) => o.due?.slice(0, 10) >= w.start && o.due?.slice(0, 10) <= w.end,
    ),
    next = obligations.find((o) => o.due?.slice(0, 10) > w.end);
  return renderWeekPanel({
    w,
    base,
    due,
    next,
    dateLabel: w.projectPhase ? "PROJECT WORK" : date(w.date).toUpperCase(),
    takeaways: w.takeaways,
    prompt: w.practice.prompt,
  });
}

function overview() {
  return `${pageHeading(`02807 / FALL 2026 / PROJECT-BASED`, `${c.shortTitle}`, `<div class="course-meta"><span class="desktop-copy" data-semester>13 teaching weeks</span><span class="phone-copy" data-semester-phone>13 weeks</span><span class="meta-dot">·</span><span data-calendar>Break in calendar week 42</span></div>`, `<a class="button" href="${base}materials/">Browse materials ↗</a>`, "page-heading overview-heading")}${deadlineSpotlight(base)}<details class="deadline-conflict"><summary>Project deadline needs confirmation: plan for 4 December</summary><p>${deadlineNote}</p>${external(c.project, "See both dates in the brief")}</details>${weeklyBrowser(c, weeks, weeks.map(panel).join(""))}${overviewDeadlines(`Two obligations. No exam.`, base, compactTasks(obligations, base), `Saved completion is personal; confirm registration and submission in Learn.`)}<details class="pass-details"><summary>What your project must include</summary>${projectInfo}</details><details class="source-details"><summary>Course logistics & sources</summary><p>Lectures: Tuesdays 18:00–19:45, building 306 auditorium 32. Exercise sessions: 20:00–22:00 in building 302. Week 2 is Python practice with no lecture. Weeks 8–13 are project work; TA coverage is stated for exercise weeks. Learn announces an 18:15 lecture start on 29 September, 6 October and 20 October. Consult Learn and the official site for further schedule changes.</p>${sourceContent}</details>`;
}

function weekly(w) {
  const due = obligations.filter(
      (o) => o.due.slice(0, 10) >= w.start && o.due.slice(0, 10) <= w.end,
    ),
    next = obligations.find((o) => o.due.slice(0, 10) > w.end);
  return `<div class="breadcrumbs"><a href="${base}">Course overview</a> / Week ${w.number}</div>${pageHeading(`WEEK ${String(w.number).padStart(2, "0")} / ${date(w.date).toUpperCase()} / ${w.projectPhase ? "PROJECT WORK" : w.number === 2 ? "NO LECTURE" : "TEACHING"}`, `${esc(w.title)}`, ``, `<div class="week-page-actions"><a class="button dark" href="#practice">Do the task ↓</a>${external(c.website, "Official weekplan", "button")}</div>`, "page-heading")}${weekPagination(weeks, w.number, base, "Project & final deadlines")}${w.projectPhase ? '<p class="notice">The official schedule labels weeks 8–13 as project work. This page suggests a pacing milestone; it is not an extra mandatory submission.</p>' : ""}${understandSection(`${analysisList(w.takeaways)}`)}${practiceSection(
    `${esc(w.practice.title)}`,
    `${w.projectPhase ? "Suggested milestone" : "30–60 min · Suggested"}`,
    `${esc(w.practice.prompt)}`,
    practiceWorkspace(w),
    `<details class="practice-check"><summary>Expected output</summary><p>${esc(w.practice.result)}</p></details><details class="practice-resources"><summary>Related official resources</summary><div class="source-links">${resources
      .filter(
        (r) =>
          r.week === w.number ||
          (w.projectPhase && !r.week && r.title.includes("project")),
      )
      .map((r) => external(r.url, r.title))
      .join("")}${external(c.project, "Project brief")}</div></details>`,
  )}${mandatorySection(`${due.length ? due.map(taskCard).join("") : '<p class="notice">No official deadline falls inside this week.</p>'}${next ? `<div class="coming-next"><span class="eyebrow">COMING UP</span><h3>${esc(next.title)} · ${next.date}</h3><p>${next.time}</p><a class="text-link" href="${base}deadlines/#${next.id}">View checklist ↗</a></div>` : ""}${w.number === 13 ? `<p class="notice">${deadlineNote}</p>` : ""}`)}<details class="source-details"><summary>Sources & date notes</summary>${sourceContent}</details>`;
}
function deadlines() {
  return `${pageHeading(`02807 / OFFICIAL OBLIGATIONS`, `Deadlines`, ``, `<a class="button" href="${base}">Course overview →</a>`, "page-heading")}${deadlineBanner(`13 teaching weeks`, `Break in calendar week 42`, `Dates use Copenhagen time.`)}<div class="notice deadline-warning"><strong>Conflicting project dates</strong><p>${deadlineNote}</p>${external(c.project, "Check the project brief")} · ${external(c.learn, "Confirm in Learn")}</div>${deadlineChecklist(`Your project checklist`, ``, obligations.length, `${obligations.map(taskCard).join("")}`)}<details class="pass-details"><summary>Qualifying topics & evaluation</summary>${projectInfo}<p>Qualifying topics are MapReduce, similar items/LSH, frequent itemsets, general clustering and graph clustering. Introductory tools such as TF.IDF alone do not count. The report is the primary grading basis, and the notebook is also evaluated; no percentage split is specified here.</p></details>${sources}`;
}
function materials() {
  return `${pageHeading(`02807 / COURSE LIBRARY`, `Materials`, ``, `${external(c.website, "Official website", "button")}`, "page-heading")}${materialsLibrary(resources, "Try: slides, solutions, project…")}${sources}`;
}
async function page(path, body, title, active, week) {
  await mkdir(root + path, { recursive: true });
  await writeFile(
    root + path + "/index.html",
    layout(title, body, active, week),
  );
}
await page("dtu/02807", overview(), c.title, "overview");
await page(
  "dtu/02807/deadlines",
  deadlines(),
  "Mandatory & deadlines",
  "deadlines",
);
await page("dtu/02807/materials", materials(), "Course materials", "materials");
for (const w of weeks)
  await page(
    `dtu/02807/weeks/${w.number}`,
    weekly(w),
    `Week ${w.number} · ${w.title}`,
    "week",
    w.number,
  );
await writeFile(
  root + "dtu/02807/runtime.json",
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
  "Built 02807: 13 weekly plans, project checklist and " +
    resources.length +
    " material links.",
);
