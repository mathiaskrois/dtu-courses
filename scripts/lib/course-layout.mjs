import { coursePeriods, periodId } from "../../dtu/assets/period-state.mjs";
// Shared HTML structure for every course. Course adapters supply content and links.
export const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
export const external = (url, label, className = "") =>
  `<a class="${esc(className)}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span><span class="sr-only"> (opens a new tab)</span></a>`;

export function createLayout({
  course,
  weeks,
  description,
  railTitle,
  railSubtitle,
  weekHint,
  railBottom,
  weekTitle = (w) => w.title,
  directory,
  catalog = [],
  directoryTerm = null,
}) {
  const base = `/dtu/${course.id}/`;
  return function layout(
    title,
    body,
    active = "overview",
    week = null,
    hub = false,
  ) {
    const canonical = hub
      ? "/dtu/"
      : active === "week"
        ? `${base}weeks/${week}/`
        : active === "overview"
          ? base
          : `${base}${active}/`;
    const links = hub
      ? ""
      : `<nav aria-label="Course navigation">${[
          ["overview", "Overview", "◷"],
          ["deadlines", "Mandatory & deadlines", "✓"],
          ["materials", "Course materials", "▤"],
        ]
          .map(
            ([id, label, icon]) =>
              `<a ${active === id ? 'aria-current="page"' : ""} href="${id === "overview" ? base : base + id + "/"}"><span aria-hidden="true">${icon}</span> ${label}</a>`,
          )
          .join(
            "",
          )}</nav><details class="rail-weeks" open><summary><span>Weekly plans</span><span class="week-menu-count">${weeks.length}</span></summary><p class="week-menu-hint">${esc(weekHint)}</p><nav aria-label="Teaching weeks">${weeks.map((w) => `<a ${week === w.number ? 'aria-current="page"' : ""} data-week-nav="${w.number}" aria-label="Week ${w.number}: ${esc(weekTitle(w))}" href="${base}weeks/${w.number}/"><span class="week-no">${String(w.number).padStart(2, "0")}</span><span class="week-name">${esc(weekTitle(w))}</span></a>`).join("")}</nav></details>${railBottom}`;
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="description" content="${esc(hub ? "DTU courses: weekly essentials, practice, materials and deadlines." : description)}"><title>${esc(title)} · DTU Course Companion</title><link rel="canonical" href="https://krois.dk${canonical}"><link rel="icon" href="/dtu/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/dtu/assets/course.css?v=9"><script type="module" src="/dtu/assets/course.js?v=7"></script>${hub ? '<script type="module" src="/dtu/assets/directory.mjs?v=1"></script>' : ""}</head><body class="page-${hub ? "directory" : active}"${hub ? "" : ` data-course="${esc(course.id)}" data-storage-term="${esc(course.term.toLowerCase().replace(/[^a-z0-9]/g, ""))}" data-course-term="${esc(course.term)}"`}><a class="skip" href="#main">Skip to content</a><aside class="rail"><a class="brand" href="/dtu/"><span class="brand-mark" aria-hidden="true">k.</span><span>course<br>companion</span></a><a class="back-link" href="/dtu/">← DTU courses</a>${periodNavigation(catalog, hub ? directoryTerm : course.period || course.term, hub)}<div class="rail-course">${hub ? directory : `<span class="eyebrow">${esc(course.id)} · ${esc(course.term.toUpperCase())}</span><strong>${railTitle}</strong><span>${esc(railSubtitle)}</span>`}</div>${links}</aside><div class="workspace"><header class="topbar"><span>DTU / <strong>${hub ? "Courses" : esc(course.id)}</strong></span><span class="date-live desktop-copy" data-date>Copenhagen time</span><span class="date-live phone-copy" data-date-phone title="Copenhagen time">Copenhagen time</span></header><main id="main" tabindex="-1">${body}</main><footer><a href="/dtu/">Krøis · Course Companion</a><span>Independent student overview · ${course.website || course.learn ? external(course.website || course.learn, course.website ? "Official course" : "DTU Learn") : "Official links to confirm"}</span></footer></div></body></html>`;
  };
}

export function pageHeading(
  eyebrow,
  title,
  description = "",
  actions = "",
  className = "page-heading",
) {
  return `<div class="${className}"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1>${description}</div>${actions}</div>`;
}
export function analysisList(takeaways) {
  return `<div class="analysis-list">${takeaways.map((t, i) => `<article><details class="analysis-fold" open data-phone-fold><summary><span class="analysis-index">${String(i + 1).padStart(2, "0")}</span><h3>${esc(t.title)}</h3></summary><p>${esc(t.text)}</p></details></article>`).join("")}</div>`;
}
export function weekPagination(weeks, number, base, lastLabel) {
  const index = weeks.findIndex((w) => w.number === number);
  return `<div class="week-pagination">${index > 0 ? `<a href="${base}weeks/${weeks[index - 1].number}/">← Week ${weeks[index - 1].number}</a>` : "<span></span>"}<span>Week ${number} of ${weeks.length}</span>${index < weeks.length - 1 ? `<a href="${base}weeks/${weeks[index + 1].number}/">Week ${weeks[index + 1].number} →</a>` : `<a href="${base}deadlines/">${esc(lastLabel)} →</a>`}</div>`;
}
export function taskCard(
  o,
  {
    year,
    compact = false,
    actionLabel = "Open DTU Learn",
    sourceLinks = external(o.source, "Official requirements"),
  } = {},
) {
  return `<article class="obligation${compact ? " compact" : ""}" id="${esc(o.id)}" data-obligation="${esc(o.id)}"><div class="obligation-top"><span class="pill">${esc(o.audience)}</span><span class="status" data-status>Scheduled</span></div><div class="obligation-body"><div><h3>${esc(o.title)}</h3><p>${esc(o.description)}</p></div><div class="due"><strong>${esc(o.date)}</strong><span>${esc(o.time)} · ${year}${o.due ? " · Copenhagen" : ""}</span></div></div><div class="obligation-actions"><label class="completion"><input type="checkbox" data-complete="${esc(o.id)}" disabled> Mark complete</label>${external(o.url, actionLabel, "text-link")}</div>${compact ? "" : `<details class="checklist"><summary>Requirements & checklist</summary><p class="phone-copy">${esc(o.description)}</p><ul>${o.checklist.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>${sourceLinks}</details>`}</article>`;
}
export function compactTasks(obligations, base) {
  return `<div class="deadline-table">${obligations.map((o) => `<article class="deadline-row" data-obligation="${esc(o.id)}"><label class="row-check"><input type="checkbox" data-complete="${esc(o.id)}" disabled><span class="sr-only">Mark ${esc(o.title)} complete</span></label><a class="deadline-row-title" href="${base}deadlines/#${esc(o.id)}">${esc(o.title)}<span>${esc(o.audience)}</span></a><span class="row-date">${esc(o.date)}<small>${esc(o.time)}</small></span><span class="status" data-status>Scheduled</span><a class="row-arrow" href="${base}deadlines/#${esc(o.id)}" aria-label="Requirements for ${esc(o.title)}">↗</a></article>`).join("")}</div>`;
}

export function weeklyBrowser(
  course,
  weeks,
  panels,
  weekTitle = (w) => w.title,
) {
  return `<section class="current-focus"><div class="week-browser-heading"><h2>Your weekly plan</h2><label class="phone-week-picker">Week <select id="week-select" aria-label="Weekly overview">${weeks.map((w) => `<option value="${w.number}">${w.number} · ${esc(weekTitle(w))}</option>`).join("")}</select></label><button class="text-button" type="button" data-return-current>Back to this week ↩</button></div><div class="week-browser" role="group" aria-label="Choose a teaching week">${weeks.map((w) => `<button class="week-tab" type="button" data-select-week="${w.number}" aria-pressed="false" title="Week ${w.number}: ${esc(weekTitle(w))}"><span>WEEK</span><strong>${String(w.number).padStart(2, "0")}</strong><i data-current-marker="${w.number}"></i></button>${w.end < course.breakStart && weeks[weeks.indexOf(w) + 1]?.start > course.breakEnd ? '<div class="break-marker" title="Teaching break"><span>Ⅱ</span><small>BREAK</small></div>' : ""}`).join("")}</div><noscript><p class="notice">All weekly plans are shown below. Enable JavaScript for week selection and live dates.</p></noscript>${panels}</section>`;
}

export function materialsLibrary(resources, placeholder) {
  const groups = [...new Set(resources.map((r) => r.filterGroup || r.group))];
  return `<div class="filters"><div><label for="resource-search">Search</label><input id="resource-search" type="search" placeholder="${esc(placeholder)}"></div><div><label for="resource-group">Week or group</label><select id="resource-group"><option value="">All content</option>${groups.map((g) => `<option>${esc(g)}</option>`).join("")}</select></div><div><label for="resource-type">Type</label><select id="resource-type"><option value="">All types</option>${[
    ...new Set(resources.map((r) => r.kind)),
  ]
    .sort()
    .map((g) => `<option>${g}</option>`)
    .join(
      "",
    )}</select></div></div><div class="library-heading"><p aria-live="polite" data-resource-count>${resources.length} materials</p><button class="text-button" data-clear-filters>Clear filters</button></div><div class="resource-list">${resources.map((r) => `<article class="resource" data-resource data-group="${esc(r.filterGroup || r.group)}" data-kind="${esc(r.kind)}" data-search="${esc((r.title + " " + r.group + " " + r.kind).toLowerCase())}"><span class="resource-type">${esc(r.kind)}</span><div><h2>${external(r.unavailable ? r.fallback : r.url, r.title)}</h2><p>${esc(r.group)}</p>${r.unavailable ? '<span class="unavailable">Unavailable in snapshot · open parent module</span>' : ""}</div></article>`).join("")}</div><p class="empty" data-empty hidden>No matches. Clear filters or try another term.</p>`;
}

export function exerciseWorkspace(
  w,
  e,
  {
    title = "Work through it here",
    intro = "Fill in the fields below. Your answers save automatically on this device. This is personal practice; it does not submit anything to DTU.",
  } = {},
) {
  return `<div class="exercise-workspace" data-exercise-week="${w.number}" data-calculator="${e.kind || ""}"><div class="workspace-heading"><div><span class="eyebrow">YOUR WORKSPACE</span><h3>${esc(title)}</h3></div><span class="save-status" role="status" data-exercise-save>Answers stay in this browser</span></div><p class="exercise-intro">${esc(intro)}</p>${e.assumptions ? `<details class="exercise-context" open data-phone-fold><summary>Illustrative inputs · assumptions</summary><p class="exercise-assumptions">${esc(e.assumptions)}</p></details>` : ""}<div class="exercise-fields">${e.fields.map((f, i) => `${e.kind && f.type !== "number" && (i === 0 || e.fields[i - 1].type === "number") ? `</div><section class="exercise-results" aria-label="Calculation results"><span class="eyebrow">LIVE RESULTS</span><div data-exercise-results role="status">Enable JavaScript to calculate results.</div><p class="formula">${esc(e.formula)}</p></section><div class="exercise-fields">` : ""}<div class="exercise-field ${f.type === "number" ? "numeric-field" : "written-field"}"><label for="ex-${w.number}-${f.id}">${esc(f.label)}</label>${f.hint ? `<p id="hint-${f.id}">${esc(f.hint)}</p>` : ""}${f.type === "number" ? `<div class="number-field"><input id="ex-${w.number}-${f.id}" data-answer="${f.id}" type="number" inputmode="decimal" min="${f.min}" step="any" value="${f.value}" aria-describedby="unit-${f.id}"><span id="unit-${f.id}">${esc(f.unit)}</span></div>` : `<textarea id="ex-${w.number}-${f.id}" data-answer="${f.id}" rows="3" ${f.hint ? `aria-describedby="hint-${f.id}"` : ""}></textarea>`}</div>`).join("")}</div>${e.solution ? `<details class="practice-solution"><summary>Check your answer after trying</summary><p>${esc(e.solution)}</p></details>` : ""}<div class="exercise-toolbar"><label><input type="checkbox" data-practice-complete> <span class="desktop-copy">I have completed this practice</span><span class="phone-copy">Practice complete</span></label><button type="button" class="button" data-download-answers>Download answers ↓</button></div><noscript><p class="notice">You can write in the fields, but saving, calculation and answer downloads require JavaScript.</p></noscript></div>`;
}
export function practiceWorkspace(w) {
  return exerciseWorkspace(w, w.practice, {
    title: w.projectPhase
      ? "Plan your next project step"
      : "Work through it here",
    intro: `Answers save on this device. These are ${w.projectPhase ? "personal project notes" : "original small practice examples"}; they do not submit work to DTU. Code fields store drafts and do not run Python.`,
  });
}

export function deadlineSpotlight(base) {
  return `<section class="deadline-spotlight next-card"><div class="deadline-symbol" aria-hidden="true">↗</div><div class="spotlight-copy"><span class="eyebrow"><span class="desktop-copy">NEXT MANDATORY DEADLINE</span><span class="phone-copy">NEXT DEADLINE</span><span class="pill amber" data-countdown>All dates below</span></span><h2 data-next-title>Your next obligation</h2><p data-next-date>See all deadlines</p></div><a class="button dark" data-next-link href="${base}deadlines/">View requirements →</a></section><p class="past-notice"><span class="desktop-copy" data-past-count></span><span class="phone-copy" data-past-compact></span> <a href="${base}deadlines/">Review checklist ↗</a></p>`;
}

export function weekPanel({
  w,
  base,
  due,
  next,
  dateLabel,
  lead,
  takeaways,
  prompt,
  noDeadline,
  after = "",
  mandatoryLabel = "Official obligations",
  showAudience = false,
}) {
  return `<div class="week-panel" data-week-panel="${w.number}"><div class="focus-title"><div><span class="eyebrow">WEEK ${String(w.number).padStart(2, "0")} / ${dateLabel}</span><h2>${esc(w.title)}</h2><p>${esc(lead)}</p></div><a class="text-link" href="${base}weeks/${w.number}/"><span class="desktop-copy">Open week ${w.number} page ↗</span><span class="phone-copy">Week page ↗</span></a></div><div class="action-grid"><section class="action-card understand"><div class="action-label"><span class="action-number">01</span><div><h3>Understand</h3><span>${w.projectPhase ? "Project essentials" : "The essential ideas"}</span></div></div><ol class="essential-list">${takeaways.map((t) => `<li><strong>${esc(t.title)}</strong><p>${esc(t.summary)}</p></li>`).join("")}</ol><a class="card-link" href="${base}weeks/${w.number}/">Read the analysis ↗</a></section><section class="action-card practise"><div class="action-label"><span class="action-number">02</span><div><h3>${w.projectPhase ? "Build" : "Practise"}</h3><span>${w.projectPhase ? "Suggested milestone" : "30–60 min · Suggested"}</span></div></div><h4>${esc(w.practice.title)}</h4><details class="practice-preview" open data-phone-fold><summary>Task details</summary><p>${esc(prompt)}</p><div class="finish-with"><span class="eyebrow">YOUR OUTPUT</span><p>${esc(w.practice.result)}</p></div></details><a class="card-link" href="${base}weeks/${w.number}/#practice">Do the task here ↗</a></section><section class="action-card must-do"><div class="action-label"><span class="action-number">03</span><div><h3>Must do</h3><span>${esc(mandatoryLabel)}</span></div></div>${due.length ? due.map((o) => `<div class="week-obligation" data-obligation="${o.id}"><span class="status" data-status>Scheduled</span><h4>${esc(o.title)}</h4><p class="mandatory-date">${o.date} · ${o.time}</p>${showAudience ? `<p>${esc(o.audience)} work</p>` : ""}<a class="card-link" href="${base}deadlines/#${o.id}">Requirements & checklist ↗</a></div>`).join("") : noDeadline}${next ? `<details class="next-week-task" open data-phone-fold><summary>Coming up</summary><span class="eyebrow">COMING UP</span><a href="${base}deadlines/#${next.id}">${esc(next.title)}</a><span>${next.date} · ${next.time}</span></details>` : ""}</section></div>${after}</div>`;
}

export function understandSection(body) {
  return `<section class="section"><span class="section-number">01 / UNDERSTAND</span><h2>What matters this week</h2>${body}</section>`;
}
export function practiceSection(title, label, prompt, workspace, details) {
  return `<section class="card practice full-practice" id="practice"><span class="section-number">02 / ${label === "Suggested milestone" ? "BUILD" : "PRACTISE"}</span><div class="section-heading"><h2>${title}</h2><span class="pill teal">${label}</span></div><p>${prompt}</p>${workspace}${details}</section>`;
}
export function mandatorySection(body) {
  return `<section class="section"><span class="section-number">03 / COMPLETE</span><h2>Mandatory work & deadlines</h2>${body}</section>`;
}
export function overviewDeadlines(title, base, table, note) {
  return `<section class="section all-deadlines"><div class="section-heading"><div><span class="eyebrow">THE BIG PICTURE</span><h2>${title}</h2></div><a class="text-link" href="${base}deadlines/">All requirements ↗</a></div>${table}<p class="source-note">${note}</p></section>`;
}
export function deadlineBanner(semester, calendar, note) {
  return `<div class="deadline-banner"><div><strong data-semester>${semester}</strong><span data-calendar>${calendar}</span></div><p data-deadline-summary>${note}</p></div>`;
}
export function deadlineChecklist(title, description, count, cards) {
  return `<div class="section-heading"><div><h2>${title}</h2>${description}</div><span class="pill" data-completed-count>0 of ${count} complete</span></div><div class="obligation-list">${cards}</div>`;
}
export function assessmentSection(eyebrow, title, description, link, grades) {
  return `<section class="assessment"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2><p>${description}</p>${link}</div>${grades.map((g) => `<div class="grade"><strong>${g.value}</strong><span>${g.label}</span></div>`).join("")}</section>`;
}
export function courseDirectory(courses) {
  return `<section class="course-directory">${courses.map((x) => `<a class="course-card" data-course="${esc(x.id)}" href="/dtu/${x.id}/"><div class="course-card-top"><span class="pill teal">${esc(x.term)}</span><span>${esc(x.label)}</span></div>${x.art ? `<div class="course-art"><img src="/dtu/assets/course-art/${x.id}.svg" alt="${esc(x.art)}" width="600" height="240"></div>` : ""}<span class="course-code">${esc(x.id)}</span><h2>${esc(x.name)}</h2><p>${esc(x.detail)}</p><div class="course-card-bottom"><span>Open course</span><span aria-hidden="true">↗</span></div></a>`).join("")}</section>`;
}

export function periodNavigation(courses, activeTerm, directory = false) {
  const periods = coursePeriods(courses);
  if (!periods.length) return "";
  const years = [...new Set(periods.map((p) => p.year))];
  return `<details class="rail-periods"${directory ? " open" : ""}><summary>Course periods</summary><nav aria-label="Course periods">${years
    .map(
      (year) =>
        `<div class="period-year"><span class="eyebrow">${esc(year)}</span>${periods
          .filter((p) => p.year === year)
          .map(
            (p) =>
              `<a data-period-link="${p.id}" ${p.id === periodId(activeTerm || "") ? 'aria-current="page"' : ""} href="/dtu/periods/${p.id}/"><span>${esc(p.season === "Winter" ? "Winter · January" : p.season)}</span><span class="period-count">${p.courses.length}</span></a>`,
          )
          .join("")}</div>`,
    )
    .join("")}</nav></details>`;
}
