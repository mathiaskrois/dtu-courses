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
  deadlineSpotlight,
  weekPanel as renderWeekPanel,
  exerciseWorkspace as renderExerciseWorkspace,
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
import { course as c, weeks, obligations } from "../dtu-source/course.mjs";
import { exercises } from "../dtu-source/exercises.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
const resources = JSON.parse(
  await readFile(root + "dtu-source/resources.json", "utf8"),
);
const base = `/dtu/${c.id}/`;
const shortTitles = [
  "Why sustainability?",
  "Framework & function",
  "Case: define the problem",
  "Carbon footprint",
  "Health dimensions",
  "Economic dimensions",
  "Absolute sustainability",
  "Resources & criticality",
  "Case: apply methods",
  "Energy & decarbonisation",
  "Circular economy",
  "Sustainability transitions",
  "Case: integrate findings",
];
const weekHref = (n) => `${base}weeks/${n}/`;
const stamp = `<p class="source-note">Source snapshot checked ${c.verified}. Summaries and study tasks are original guidance; linked DTU instructions remain the authority.</p>`;
const sourceLinks = `<div class="source-links">${external(c.deadlineSource, "Official deadlines")}${external(c.schedule, "Teaching schedule")}${external(c.caseBrief, "Microfabrication brief")}${external(c.catalogue, "Assessment rules")}</div>`;
const layout = createLayout({
  catalog: courses,
  course: c,
  weeks,
  description:
    "A practical overview of DTU 12106: weekly essentials, Microfabrication tasks, mandatory submissions and deadlines.",
  railTitle: "Quantitative<br> Sustainability",
  railSubtitle: "Polytechnical Foundation · 5 ECTS",
  weekHint: "Essentials, exercises & deadlines",
  railBottom: `<div class="rail-bottom"><span class="eyebrow">YOUR CASE STUDY</span><strong>Microfabrication</strong>${external(c.caseUrl, "Open case in Learn")}<p>Essential study: 30–60 min/week<br>Assignment work is additional.</p></div>`,
  weekTitle: (w) => shortTitles[w.number - 1],
});

const deadlineCard = (o, compact = false) =>
  renderTaskCard(o, {
    year: c.term.match(/\d{4}/)[0],
    compact,
    actionLabel: o.id === "exam" ? "Check exam details" : "Open in DTU Learn",
    sourceLinks: `<div class="source-links">${external(o.source, "Official requirements")}${external(c.deadlineSource, "Deadline source")}${o.id.startsWith("task") ? external(c.caseBrief, "Case-specific requirements") : ""}</div>`,
  });

const assessment = `${assessmentSection(
  `WHAT COUNTS TOWARDS PASSING`,
  `Protect your exam eligibility.`,
  `Task 1 + Task 2 <strong>and both rounds of individual peer feedback</strong> are prerequisites. Each student reviews two groups per round; AI is not allowed in peer feedback.`,
  `${external(c.catalogue, "Official assessment rules")}`,
  [
    {
      value: `60<span>%</span>`,
      label: `Multiple-choice exam<br>At least 50% correct to pass`,
    },
    {
      value: `40<span>%</span>`,
      label: `Task 3<br>Integrated case assessment`,
    },
  ],
)}`;
const weekLeads = [
  "Connect sustainability challenges to a concrete engineering decision.",
  "Define a fair comparison before you start calculating.",
  "Turn your Microfabrication topic into a clear, manageable assessment.",
  "Calculate a footprint and understand what drives the result.",
  "Look beyond carbon: consider health burdens and benefits.",
  "Compare lifetime costs, test assumptions, and understand decision weights.",
  "Ask whether an option is sustainable, as well as whether it is better.",
  "Understand the resource risks behind your system.",
  "Turn your project data into transparent, defensible calculations.",
  "See how electricity supply and demand change your climate result.",
  "Test whether a circular strategy actually improves sustainability.",
  "Connect your results to wider systems, feedbacks and trade-offs.",
  "Bring your findings together into one balanced assessment.",
];
function weekPanel(w) {
  const due = obligations.filter((o) => {
    const d = o.due?.slice(0, 10) || o.dateOnly;
    return d >= w.start && d <= w.end;
  });
  const next = obligations.find(
    (o) => (o.due?.slice(0, 10) || o.dateOnly) > w.end,
  );
  return renderWeekPanel({
    w,
    base,
    due,
    next,
    dateLabel: `CLASS ${w.classDate.toUpperCase()}`,
    lead: weekLeads[w.number - 1],
    takeaways: w.takeaways.slice(0, 3).map((t) => ({
      ...t,
      summary: t.text.match(/^.*?[.!?](?:\s|$)/)?.[0] || t.text,
    })),
    prompt: w.practice.steps,
    mandatoryLabel: "Mandatory work",
    showAudience: true,
    after: `<details class="case-connection" open data-phone-fold><summary>For your Microfabrication project</summary><p>${esc(w.project)}</p>${external(c.caseUrl, "Open case")}</details>`,
    noDeadline: `<div class="no-deadline"><span aria-hidden="true">✓</span><h4>No deadline this week</h4><p>Use the time to prepare for what’s next.</p></div>`,
  });
}

function overview() {
  return `${pageHeading(`12106 <span class="label-divider">/</span> FALL 2026`, `Quantitative Sustainability`, `<div class="course-meta"><span class="desktop-copy" data-semester>13 teaching weeks</span><span class="phone-copy" data-semester-phone>13 weeks</span><span class="meta-dot">·</span><span data-calendar>Autumn break: 12–18 October</span></div>`, `<a href="${base}materials/" class="button">Browse materials ↗</a>`, "page-heading overview-heading")}${deadlineSpotlight(base)}${weeklyBrowser(c, weeks, weeks.map(weekPanel).join(""), (w) => shortTitles[w.number - 1])}${overviewDeadlines(`Every deadline, in one place.`, base, compactTasks(obligations, base), `Completion is saved in this browser. Check your actual submission status in DTU Learn.`)}<details class="pass-details"><summary><span>What it takes to pass</span><span class="pass-preview">60% exam <span>+ </span>40% Task 3</span></summary>${assessment}</details><details class="source-details"><summary>Sources & verification</summary>${sourceLinks}${stamp}</details>`;
}
const exerciseWorkspace = (w) =>
  renderExerciseWorkspace(w, exercises[w.number]);

function weekly(w) {
  const due = obligations.filter((o) => {
    const d = o.due?.slice(0, 10) || o.dateOnly;
    return d >= w.start && d <= w.end;
  });
  const next = obligations.find(
    (o) => (o.due?.slice(0, 10) || o.dateOnly) > w.end,
  );
  const practiceResources = resources
    .filter(
      (r) =>
        r.week === w.number &&
        ["Spreadsheet", "Practice"].includes(r.kind) &&
        !r.unavailable,
    )
    .slice(0, 5);
  return `<div class="breadcrumbs"><a href="${base}">Course overview</a> / Week ${w.number}</div>${pageHeading(`WEEK ${String(w.number).padStart(2, "0")} · CLASS ${w.classDate.toUpperCase()}`, `${esc(w.title)}`, `<p>${w.start} — ${w.end} · Suggested study: 30–60 minutes</p>`, `<div class="week-page-actions"><a class="button dark" href="#practice">Do the exercise ↓</a>${external(w.url, "Open week in Learn", "button")}</div>`, "page-heading")}${weekPagination(weeks, w.number, base, "December deadlines")}${understandSection(`<p class="section-intro">Essential takeaways, synthesised from the module and case instructions.</p>${analysisList(w.takeaways)}<div class="project-note"><span class="eyebrow">FOR YOUR MICROFABRICATION PROJECT</span><p>${esc(w.project)}</p></div>`)}${practiceSection(`${esc(w.practice.title)}`, `30–60 min · Suggested`, `${esc(w.practice.steps)}`, exerciseWorkspace(w), `<details class="practice-check" open data-phone-fold><summary>Self-check & expected output</summary><div class="practice-result"><div><span class="eyebrow">FINISH WITH</span><p>${esc(w.practice.result)}</p></div><div><span class="eyebrow">QUICK SELF-CHECK</span><p>${esc(exercises[w.number].check)}</p></div></div></details><p class="small practice-pace">Suggested pace: 10 minutes on the essentials, 20–40 minutes on the task, 5–10 minutes checking your result. Mandatory assignment work is additional.</p><details class="practice-resources" open data-phone-fold><summary>Related course resources</summary><div class="source-links">${practiceResources.map((r) => external(r.url, r.title)).join("")}${external(w.number === 3 || w.number === 9 || w.number === 13 ? c.caseUrl : w.url, "Browse source materials")}</div></details>`)}${mandatorySection(`${due.length ? due.map((o) => deadlineCard(o)).join("") : '<p class="notice">No listed mandatory deadline falls inside this teaching week.</p>'}${next ? `<div class="coming-next"><span class="eyebrow">NEXT AFTER THIS WEEK</span><h3>${esc(next.title)} · ${next.date}</h3><p>${next.time} · 2026 · ${next.audience}</p><a class="text-link" href="${base}deadlines/#${next.id}">Read the requirements →</a></div>` : ""}<a class="text-link" href="${base}deadlines/">View every mandatory obligation →</a>`)}${w.number === 9 ? '<p class="notice">Class preparation for 6 November: the Microfabrication agenda requests three progress slides per group, for a roughly three-minute pitch. This is separate from the graded submission deadlines.</p>' : ""}${w.number === 13 ? '<p class="notice">Teaching ends before the final submission: Task 3 is due 13 December and the exam is on 19 December.</p>' : ""}<div class="source-links">${external(w.source, "Module / case-session instructions")}${external(c.caseBrief, "Microfabrication case brief")}${external(c.deadlineSource, "Official deadlines")}</div><p class="source-note">The Microfabrication brief linked in Fall 2026 carries a Spring 2025 heading and a 7 November 2025 update. These case requirements follow that reused brief; deadline dates follow the current Fall 2026 Learn page.</p>${stamp}`;
}
function deadlines() {
  return `${pageHeading(`THE NON-NEGOTIABLES`, `Mandatory & deadlines`, `<p>Group submissions, individual feedback and the exam. Every obligation in one place.</p>`, `<a class="button" href="${base}">Back to overview →</a>`, "page-heading")}${deadlineBanner(`13 teaching weeks`, `Autumn break: 12–18 October`, `All dates use Europe/Copenhagen time. Exam time and room are not yet confirmed.`)}${deadlineChecklist(`Your submission checklist`, `<p class="small">Mark tasks only when you have completed them. Saved in this browser; no account or cross-device sync.</p>`, obligations.length, `${obligations.map((o) => deadlineCard(o)).join("")}`)}<details class="pass-details"><summary>What it takes to pass</summary>${assessment}</details><noscript><p class="notice">Enable JavaScript to mark completion and see live deadline statuses.</p></noscript><section class="section"><h2>Source notes</h2><p>The Task 1–3 content checklists follow the Microfabrication brief currently linked in the course. Its heading refers to Spring 2025; dates here come from the Fall 2026 deadline page. Check the linked instructions if the teachers issue updates.</p><p>The multiple-choice exam is two hours and allows aids without internet access. The published date is 19 December 2026; the central exam office announces time and room later. Task 3 counts for 40% and the quiz for 60%.</p>${sourceLinks}${external(c.examSource, "Official exam calendar")}${stamp}</section>`;
}
function materials() {
  return `${pageHeading(`THE COURSE LIBRARY`, `Course materials`, `<p>Browse all ${resources.length} content items. Links open the real DTU Learn course and require your DTU login.</p>`, `${external(c.caseUrl, "Microfabrication in Learn", "button")}`, "page-heading")}<div class="notice">Microfabrication guidance is tailored to your case. Other case materials remain browsable. Items marked unavailable were not retrievable in the source snapshot; their links open the parent module.</div>${materialsLibrary(
    [...resources]
      .sort(
        (a, b) =>
          (a.case === "Microfabrication" ? -1 : 0) -
          (b.case === "Microfabrication" ? -1 : 0),
      )
      .map((r) => ({
        ...r,
        filterGroup: r.week
          ? `Week ${r.week}`
          : r.case || "Course information & formalities",
      })),
    "Try: LCC, functional unit, coffee…",
  )}<noscript><p class="notice">All resources are listed below without filtering. Browser Find can search their titles.</p></noscript>${stamp}`;
}

async function page(path, html) {
  await mkdir(root + path, { recursive: true });
  await writeFile(root + path + "/index.html", html);
}
await page("dtu/12106", layout(c.title, overview()));
await page(
  "dtu/12106/deadlines",
  layout("Mandatory work & deadlines", deadlines(), "deadlines"),
);
await page(
  "dtu/12106/materials",
  layout("Course materials", materials(), "materials"),
);
for (const w of weeks)
  await page(
    `dtu/12106/weeks/${w.number}`,
    layout(`Week ${w.number} · ${w.title}`, weekly(w), "week", w.number),
  );
await writeFile(
  root + "dtu/12106/runtime.json",
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
  `Built 12106: 13 weekly plans, overview, deadlines and ${resources.length} linked materials.`,
);
