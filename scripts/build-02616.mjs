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
} from "../dtu-source/02616/course.mjs";
const root = fileURLToPath(new URL("../", import.meta.url)),
  base = "/dtu/02616/";
const resources = JSON.parse(
  await readFile(root + "dtu-source/02616/resources.json", "utf8"),
);
const href = (n) => base + "weeks/" + n + "/";
const stamp = `<p class="source-note">Checked ${c.verified}. Dates come from Learn assignments and the live course calendar, plus course briefings and announcements. Weekly explanations and mini-exercises are original study guidance. Learn materials require DTU login.</p>`;
const sources = `<div class="source-links">${external(c.website, "Live course calendar")}${external(c.project, "Intro & assessment")}${external(c.learn, "DTU Learn")}</div>${stamp}`;
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
    "DTU 02616 Large-scale Modelling: weekly essentials, on-page practice, assignments and oral exam dates.",
  railTitle: "Large-scale<br>Modelling",
  railSubtitle: "Two projects · Oral exam",
  weekHint: "Essentials, practice & projects",
  railBottom: `<div class="rail-bottom"><span class="eyebrow">YOUR EXERCISES</span><strong>Group of 3–4</strong>${external(c.project, "Course & assessment briefing")}<p>Essential practice: 30–60 min/week.<br>Project implementation is additional.</p></div>`,
});

const taskCard = (o) => renderTaskCard(o, { year: c.term.match(/\d{4}/)[0] });

const projectInfo = `${assessmentSection(
  `ASSESSMENT`,
  `Two reports + a presentation exam.`,
  `Work in groups of 3–4. Submit two project reports, then present your work and answer questions on 11 December. The checked briefing does not state grading weights, report lengths or Project 2’s deadline.`,
  `${external(c.project, "Official course briefing")}`,
  [
    {
      value: `18 Oct`,
      label: `Project 1 report<br>23:59 · during autumn break`,
    },
    {
      value: `11 Dec`,
      label: `Presentation exam<br>Individual time to confirm`,
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
    lead: w.lead,
    takeaways: w.takeaways.map((t) => ({
      ...t,
      summary: t.text.split(". ")[0] + ".",
    })),
    prompt: w.practice.prompt,
    noDeadline: `<div class="no-deadline"><h4>No dated deadline this week</h4><p>Continue the required project work and check Learn for updates. The on-page task is optional.</p></div>`,
  });
}

function overview() {
  return `${pageHeading(`02616 / FALL 2026 / HPC`, `${c.shortTitle}`, `<div class="course-meta"><span class="desktop-copy" data-semester>13 teaching weeks</span><span class="phone-copy" data-semester-phone>13 weeks</span><span class="meta-dot">·</span><span data-calendar>Break in calendar week 42</span></div>`, `<a class="button" href="${base}materials/">Browse materials ↗</a>`, "page-heading overview-heading")}${deadlineSpotlight(base)}${weeklyBrowser(c, weeks, weeks.map(panel).join(""))}${overviewDeadlines(`Two reports. One oral exam.`, base, compactTasks(obligations, base), `Saved completion is personal; confirm registration and submission in Learn.`)}<details class="pass-details"><summary>How assessment works</summary>${projectInfo}</details><details class="source-details"><summary>Course logistics & sources</summary><p>Tuesdays 08:30–12:00, building 324 room 040. Autumn break: 12–18 October, with Project 1 due at its end. The calendar confirms all 13 weekly topics; Learn’s content list currently supplies files for weeks 1–4. Later pages combine confirmed calendar topics with suggested original practice. Project 2’s brief and report deadline are not yet visible. The 6 October one-page draft and five-minute discussion were formative, not graded.</p><p>For HPC work, the Useful Documents module corrects the matplotlib module to 3.10.6-numpy-2.3.1-python-3.12.11; use mpi4py/4.0.3-python-3.12.11-openmpi-5.0.8 alongside it. Computation belongs on application or batch nodes. The September announcement reported a GitLab outage; check current availability in Learn.</p>${sources}</details>`;
}

function weekly(w) {
  const due = obligations.filter(
      (o) => o.due?.slice(0, 10) >= w.start && o.due?.slice(0, 10) <= w.end,
    ),
    next = obligations.find((o) => o.due?.slice(0, 10) > w.end);
  return `<div class="breadcrumbs"><a href="${base}">Course overview</a> / Week ${w.number}</div>${pageHeading(`WEEK ${String(w.number).padStart(2, "0")} / ${date(w.date).toUpperCase()} / ${w.projectPhase ? "PROJECT WORK" : "TEACHING"}`, `${esc(w.title)}`, `<p>${esc(w.lead)}</p>`, `<div class="week-page-actions"><a class="button dark" href="#practice">Do the task ↓</a>${external(w.learn, "Open this week in Learn", "button")}</div>`, "page-heading")}${weekPagination(weeks, w.number, base, "Exam & final deadlines")}${w.projectPhase ? '<p class="notice">Project planning tasks here are suggestions based on the official calendar, not extra graded submissions.</p>' : ""}${understandSection(`${analysisList(w.takeaways)}`)}${practiceSection(
    `${esc(w.practice.title)}`,
    `${w.projectPhase ? "Suggested milestone" : "30–60 min · Suggested"}`,
    `${esc(w.practice.prompt)}`,
    practiceWorkspace(w),
    `<details class="practice-check" open data-phone-fold><summary>Expected output</summary><p>${esc(w.practice.result)}</p></details><details class="practice-resources" open data-phone-fold><summary>Related official resources</summary><div class="source-links">${resources
      .filter((r) => r.weeks?.includes(w.number))
      .map((r) => external(r.url, r.title))
      .join("")}</div></details>`,
  )}${mandatorySection(`<p class="source-note">${w.number <= 6 ? "Project 1: due 18 October at 23:59, even though that is autumn break." : "Project 2 report: required; deadline not published. Check Learn for the brief and date."}</p>${due.length ? due.map(taskCard).join("") : '<p class="notice">No official deadline falls inside this week.</p>'}${next ? `<div class="coming-next"><span class="eyebrow">COMING UP</span><h3>${esc(next.title)} · ${next.date}</h3><p>${next.time}</p><a class="text-link" href="${base}deadlines/#${next.id}">View checklist ↗</a></div>` : ""}`)}<details class="source-details"><summary>Sources & date notes</summary>${sources}</details>`;
}
function deadlines() {
  return `${pageHeading(`02616 / OFFICIAL OBLIGATIONS`, `Mandatory & deadlines`, `<p>Two project reports, group enrolment and a presentation exam.</p>`, `<a class="button" href="${base}">Course overview →</a>`, "page-heading")}${deadlineBanner(`13 teaching weeks`, `Break in calendar week 42`, `Dates use Copenhagen time.`)}<p class="notice"><strong>Project 1 is due during the autumn break: 18 October, 23:59.</strong> Project 2 is required, but its report deadline is not published in the checked Learn content. The oral exam is 11 December; confirm your individual time.</p>${deadlineChecklist(`Your submission checklist`, ``, obligations.length, `${obligations.map(taskCard).join("")}`)}<details class="pass-details"><summary>Assessment & working requirements</summary>${projectInfo}<p>The course briefing requires a declaration if AI was used for hand-in material: explain what it was used for and what it generated or edited. These optional practice tasks do not submit anything to DTU.</p></details>${sources}`;
}
function materials() {
  return `${pageHeading(`02616 / COURSE LIBRARY`, `Course materials`, `<p>All currently listed Learn files and linked HPC guides. Later weekly topics are published in the calendar; additional files and Project 2’s brief are not yet visible.</p>`, `${external(c.learn, "DTU Learn", "button")}`, "page-heading")}${materialsLibrary(resources, "Try: MPI, labs, network…")}${sources}`;
}
async function page(path, body, title, active, week) {
  await mkdir(root + path, { recursive: true });
  await writeFile(
    root + path + "/index.html",
    layout(title, body, active, week),
  );
}
await page("dtu/02616", overview(), c.title, "overview");
await page(
  "dtu/02616/deadlines",
  deadlines(),
  "Mandatory & deadlines",
  "deadlines",
);
await page("dtu/02616/materials", materials(), "Course materials", "materials");
for (const w of weeks)
  await page(
    `dtu/02616/weeks/${w.number}`,
    weekly(w),
    `Week ${w.number} · ${w.title}`,
    "week",
    w.number,
  );
await writeFile(
  root + "dtu/02616/runtime.json",
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
  "Built 02616: 13 weekly plans, projects and oral exam and " +
    resources.length +
    " material links.",
);
