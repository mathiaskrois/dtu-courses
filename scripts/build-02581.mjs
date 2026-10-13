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
} from "../dtu-source/02581/course.mjs";
const root = fileURLToPath(new URL("../", import.meta.url)),
  base = "/dtu/02581/";
const resources = JSON.parse(
  await readFile(root + "dtu-source/02581/resources.json", "utf8"),
);
const href = (n) => base + "weeks/" + n + "/";
const stamp = `<p class="source-note">Checked ${c.verified}. Dates come from Learn assignments and the live course calendar, including the September schedule change. Weekly explanations and mini-exercises are original study guidance. Learn materials require DTU login.</p>`;
const sourceContent = `<div class="source-links">${external(c.website, "Live course calendar")}${external(c.project, "Intro & assessment")}${external(c.learn, "DTU Learn")}</div>${stamp}`;
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
    "DTU 02581 Geometric Data Analysis and Processing: weekly essentials, on-page practice, assignments and oral exam dates.",
});

const taskCard = (o) => renderTaskCard(o, { year: c.term.match(/\d{4}/)[0] });

const projectInfo = `${assessmentSection(
  `ASSESSMENT`,
  `Assignments + an oral exam.`,
  `Work on the official notebooks in groups of 2–4 and submit completed work in Learn, normally as HTML. The grade uses both assignments and oral exam performance; no percentage split is stated in the intro slides.`,
  `${external(c.project, "Assessment briefing")}`,
  [
    {
      value: `11`,
      label: `Dated group assignments<br>Last deadline: 9 December`,
    },
    {
      value: `8 Dec`,
      label: `Oral exam period starts<br>Individual slot to confirm`,
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
  return `${pageHeading(`02581 / FALL 2026 / GEOMETRY`, `${c.shortTitle}`, `<div class="course-meta"><span class="desktop-copy" data-semester>13 teaching weeks</span><span class="phone-copy" data-semester-phone>13 weeks</span><span class="meta-dot">·</span><span data-calendar>Break in calendar week 42</span></div>`, `<a class="button" href="${base}materials/">Browse materials ↗</a>`, "page-heading overview-heading")}${deadlineSpotlight(base)}<p class="notice">FEA: date and requirement to confirm. Oral exams start 8 December; confirm your individual slot.</p>${weeklyBrowser(c, weeks, weeks.map(panel).join(""))}${overviewDeadlines(`Assignments & oral exam.`, base, compactTasks(obligations, base), `Saved completion is personal; confirm registration and submission in Learn.`)}<details class="pass-details"><summary>How assessment works</summary>${projectInfo}</details><details class="source-details"><summary>Course logistics & sources</summary><p>Thursdays 13:00–17:00, building 307 room 001. Lectures last 1–2 hours, then exercises. Autumn break: 12–18 October. The live calendar puts Delaunay on 17 September, interpolation on 24 September and registration on 1 October; older intro slides retain the original order. The FEA Toy Problem folder has no due date and is not in the current weekly schedule: confirm its status before treating it as mandatory. The Exam reading-list filename says 2025. Oral exams start 8 December plus one or two days; confirm your own slot.</p>${sourceContent}</details>`;
}

function weekly(w) {
  const due = obligations.filter(
      (o) => o.due.slice(0, 10) >= w.start && o.due.slice(0, 10) <= w.end,
    ),
    next = obligations.find((o) => o.due.slice(0, 10) > w.end);
  return `<div class="breadcrumbs"><a href="${base}">Course overview</a> / Week ${w.number}</div>${pageHeading(`WEEK ${String(w.number).padStart(2, "0")} / ${date(w.date).toUpperCase()} / ${w.projectPhase ? "PROJECT WORK" : "TEACHING"}`, `${esc(w.title)}`, ``, `<div class="week-page-actions"><a class="button dark" href="#practice">Do the task ↓</a>${external(w.learn, "Open this week in Learn", "button")}</div>`, "page-heading")}${weekPagination(weeks, w.number, base, "Exam & final deadlines")}${w.projectPhase ? '<p class="notice">The official schedule labels weeks 8–13 as project work. This page suggests a pacing milestone; it is not an extra mandatory submission.</p>' : ""}${understandSection(`${analysisList(w.takeaways)}`)}${practiceSection(
    `${esc(w.practice.title)}`,
    `${w.projectPhase ? "Suggested milestone" : "30–60 min · Suggested"}`,
    `${esc(w.practice.prompt)}`,
    practiceWorkspace(w),
    `<details class="practice-check"><summary>Expected output</summary><p>${esc(w.practice.result)}</p></details><details class="practice-resources"><summary>Related official resources</summary><div class="source-links">${resources
      .filter((r) => r.weeks?.includes(w.number))
      .map((r) => external(r.url, r.title))
      .join("")}</div></details>`,
  )}${mandatorySection(`${due.length ? due.map(taskCard).join("") : '<p class="notice">No official deadline falls inside this week.</p>'}${next ? `<div class="coming-next"><span class="eyebrow">COMING UP</span><h3>${esc(next.title)} · ${next.date}</h3><p>${next.time}</p><a class="text-link" href="${base}deadlines/#${next.id}">View checklist ↗</a></div>` : ""}${w.number === 13 ? `<p class="notice">${deadlineNote}</p>` : ""}`)}<details class="source-details"><summary>Sources & date notes</summary>${sourceContent}</details>`;
}
function deadlines() {
  return `${pageHeading(`02581 / OFFICIAL OBLIGATIONS`, `Deadlines`, ``, `<a class="button" href="${base}">Course overview →</a>`, "page-heading")}${deadlineBanner(`13 teaching weeks`, `Break in calendar week 42`, `Dates use Copenhagen time.`)}<p class="notice">The oral exam starts on 8 December and may run for another one or two days. Confirm your own appointment. The final mesh assignment is due 9 December. FEA Toy Problem has no due date or scheduled week; ask the teaching team whether it is required.</p>${deadlineChecklist(`Your submission checklist`, ``, obligations.length, `${obligations.map(taskCard).join("")}`)}<details class="pass-details"><summary>Assessment & working requirements</summary>${projectInfo}<p>The course asks you to write the missing assignment code yourself. AI may help with understanding, debugging, syntax and API calls; the intro slides say not to generate the assessed code. These optional on-page activities are separate small reasoning exercises, not solutions to the official notebooks.</p></details>${sources}`;
}
function materials() {
  return `${pageHeading(`02581 / COURSE LIBRARY`, `Materials`, ``, `${external(c.learn, "DTU Learn", "button")}`, "page-heading")}${materialsLibrary(resources, "Try: curvature, spectral, notebook…")}${sources}`;
}
async function page(path, body, title, active, week) {
  await mkdir(root + path, { recursive: true });
  await writeFile(
    root + path + "/index.html",
    layout(title, body, active, week),
  );
}
await page("dtu/02581", overview(), c.title, "overview");
await page(
  "dtu/02581/deadlines",
  deadlines(),
  "Mandatory & deadlines",
  "deadlines",
);
await page("dtu/02581/materials", materials(), "Course materials", "materials");
for (const w of weeks)
  await page(
    `dtu/02581/weeks/${w.number}`,
    weekly(w),
    `Week ${w.number} · ${w.title}`,
    "week",
    w.number,
  );
await writeFile(
  root + "dtu/02581/runtime.json",
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
  "Built 02581: 13 weekly plans, assignments and oral exam and " +
    resources.length +
    " material links.",
);
