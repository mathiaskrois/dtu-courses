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

// Palette metadata is shared by directory tiles and every course route.
export function paletteStyle(entry) {
  const palette = entry?.palette || { primary: "#B9EF38", accent: "#8247E5", foreground: "#171B14" };
  for (const value of Object.values(palette)) {
    if (!/^#[a-f\d]{6}$/i.test(value)) throw new Error("Course palette must use six-digit hex colors.");
  }
  const channels = palette.accent.slice(1).match(/../g).map(value => {
    const s = parseInt(value, 16) / 255;
    return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
  });
  const luminance = channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  const accentForeground = luminance > .179 ? "#171B14" : "#FFFFFF";
  return `--course-primary:${palette.primary};--course-accent:${palette.accent};--course-foreground:${palette.foreground};--accent-foreground:${accentForeground}`;
}

export function studyRange(w) {
  const format = value => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Europe/Copenhagen" }).format(new Date(value + "T12:00:00Z"));
  return `${format(w.start)} – ${format(w.end)}`;
}

export function createLayout({ course, weeks, description, weekTitle = w => w.title, catalog = [], directoryTerm = null }) {
  const base = `/dtu/${course.id}/`;
  const unit = course.studyUnit || "Week";
  const entry = catalog.find(x => x.id === course.id);
  const term = directoryTerm || course.period || course.term;
  const periods = coursePeriods(catalog);
  return function layout(title, body, active = "overview", week = null, hub = false) {
    const canonical = hub ? "/dtu/" : active === "week" ? `${base}weeks/${week}/` : active === "overview" ? base : `${base}${active}/`;
    const courseMenus = `<details class="nav-menu course-menu"><summary>Courses <span aria-hidden="true">↓</span></summary><nav aria-label="Choose a course">${periods.map(p => `<div data-course-menu-period="${p.id}"${p.id !== periodId(term) ? " hidden" : ""}>${p.courses.map(x => `<a style="${paletteStyle(x)}" href="/dtu/${x.id}/"${x.id === course.id ? ' aria-current="page"' : ""}><span class="menu-swatch" aria-hidden="true"></span><span class="menu-code">${esc(x.id)}</span>${esc(x.name)}</a>`).join("")}</div>`).join("")}</nav></details>`;
    const tabs = hub ? "" : `<div class="course-tabs"><nav aria-label="Course navigation">${[["overview", "Overview"], ["deadlines", "Deadlines"], ["materials", "Materials"]].map(([id, label]) => `<a${active === id ? ' aria-current="page"' : ""} href="${id === "overview" ? base : base + id + "/"}">${label}</a>`).join("")}</nav>${weeks.length ? `<details class="nav-menu study-menu"><summary>${unit}s <span aria-hidden="true">↓</span></summary><nav aria-label="Teaching ${unit.toLowerCase()}s">${weeks.map(w => `<a${week === w.number ? ' aria-current="page"' : ""} data-week-nav="${w.number}" href="${base}weeks/${w.number}/"><span class="week-no">${String(w.number).padStart(2,"0")}</span><span>${esc(weekTitle(w))}</span>${unit === "Block" ? `<small>${studyRange(w)}</small>` : ""}</a>`).join("")}</nav></details>` : ""}</div>`;
    // The hero wraps only the overview heading, leaving page content in normal flow.
    if (!hub && active === "overview") {
      body = body.replace(/(<div class="page-heading overview-heading">[\s\S]*?)<!--page-heading-end-->/, `<section class="course-hero">$1</section>`);
    }
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="description" content="${esc(hub ? "DTU course collection." : description)}"><title>${esc(title)} · DTU Courses</title><link rel="canonical" href="https://krois.dk${canonical}"><link rel="icon" href="/dtu/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/dtu/assets/course.css?v=12"><script type="module" src="/dtu/assets/course.js?v=8"></script>${hub ? '<script type="module" src="/dtu/assets/directory.mjs?v=2"></script>' : ""}</head><body class="page-${hub ? "directory" : active}"${hub ? "" : ` data-course="${esc(course.id)}" data-storage-term="${esc(course.term.toLowerCase().replace(/[^a-z0-9]/g,""))}" data-course-term="${esc(course.term)}" data-archived="${course.archived === true}" data-study-unit="${esc(unit)}" style="${paletteStyle(entry)}"`}><a class="skip" href="#main">Skip to content</a><header class="site-header"><a class="brand" href="/dtu/"><span class="brand-mark" aria-hidden="true">k.</span><span>DTU<span class="brand-sub"> / courses</span></span></a><div class="header-navigation">${periodNavigation(catalog, term)}${courseMenus}</div>${hub ? "" : `<span class="edition">${course.archived ? "Archived · " : ""}${esc(course.term)}</span>`}<span class="date-live" data-date-phone title="Copenhagen time">Copenhagen</span></header>${tabs}<main id="main" tabindex="-1">${body}</main><footer><a href="/dtu/">Krøis / DTU</a><span>Independent student overview${course.website || course.learn ? ` · ${external(course.website || course.learn, "Official course")}` : ""}</span></footer></body></html>`;
  };
}

export function pageHeading(
  eyebrow,
  title,
  description = "",
  actions = "",
  className = "page-heading",
) {
  return `<div class="${className}"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1>${description}</div>${actions}</div><!--page-heading-end-->`;
}
export function analysisList(takeaways) {
  return `<div class="analysis-list">${takeaways.map((t, i) => `<article><details class="analysis-fold"><summary><h3>${esc(t.title)}</h3></summary><p>${esc(t.text)}</p></details></article>`).join("")}</div>`;
}
export function weekPagination(weeks, number, base, lastLabel, unit = "Week") {
  const index = weeks.findIndex((w) => w.number === number);
  return `<div class="week-pagination">${index > 0 ? `<a href="${base}weeks/${weeks[index - 1].number}/">← ${unit} ${weeks[index - 1].number}</a>` : "<span></span>"}<span>${unit} ${number} of ${weeks.length}</span>${index < weeks.length - 1 ? `<a href="${base}weeks/${weeks[index + 1].number}/">${unit} ${weeks[index + 1].number} →</a>` : `<a href="${base}deadlines/">${esc(lastLabel)} →</a>`}</div>`;
}
export function taskCard(
  o,
  {
    year,
    compact = false,
    archived = false,
    actionLabel = "Open DTU Learn",
    sourceLinks = external(o.source, "Official requirements"),
  } = {},
) {
  return `<article class="obligation${compact ? " compact" : ""}" id="${esc(o.id)}" data-obligation="${esc(o.id)}"><div class="obligation-top"><span class="pill">${esc(o.audience)}</span><span class="status" data-status>${archived ? o.due || o.dateOnly ? "Historical date" : "Date unconfirmed" : "Scheduled"}</span></div><div class="obligation-body"><div><h3>${esc(o.title)}</h3></div><div class="due"><strong>${esc(o.date)}</strong><span>${esc(o.time)} · ${year}${o.due ? " · Copenhagen" : ""}</span></div></div><div class="obligation-actions"><label class="completion"><input type="checkbox" data-complete="${esc(o.id)}" disabled> Mark complete</label>${external(o.url, actionLabel, "text-link")}</div>${compact ? "" : `<details class="checklist"><summary>Requirements & checklist</summary><p>${esc(o.description)}</p><ul>${o.checklist.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>${sourceLinks}</details>`}</article>`;
}
export function compactTasks(obligations, base, archived = false) {
  return `<div class="deadline-table">${obligations.map((o) => `<article class="deadline-row" data-obligation="${esc(o.id)}"><label class="row-check"><input type="checkbox" data-complete="${esc(o.id)}" disabled><span class="sr-only">Mark ${esc(o.title)} complete</span></label><a class="deadline-row-title" href="${base}deadlines/#${esc(o.id)}">${esc(o.title)}<span>${esc(o.audience)}</span></a><span class="row-date">${esc(o.date)}<small>${esc(o.time)}</small></span><span class="status" data-status>${archived ? o.due || o.dateOnly ? "Historical date" : "Date unconfirmed" : "Scheduled"}</span><a class="row-arrow" href="${base}deadlines/#${esc(o.id)}" aria-label="Requirements for ${esc(o.title)}">↗</a></article>`).join("")}</div>`;
}

export function weeklyBrowser(course, weeks, panels, weekTitle = w => w.title) {
  const unit = course.studyUnit || "Week";
  return `<section class="current-focus"><div class="week-browser-heading"><h2>${unit}s</h2><label class="phone-week-picker">${unit} <select id="week-select" aria-label="${unit} overview">${weeks.map(w => `<option value="${w.number}">${w.number} · ${esc(weekTitle(w))}</option>`).join("")}</select></label>${course.archived ? "" : '<button class="text-button" type="button" data-return-current>This week ↩</button>'}</div><div class="week-browser" role="group" aria-label="Choose a ${unit.toLowerCase()}">${weeks.map((w,i) => `<button class="week-tab" type="button" data-select-week="${w.number}" aria-pressed="false" title="${unit} ${w.number}: ${esc(weekTitle(w))}"><span>${unit}</span><strong>${String(w.number).padStart(2,"0")}</strong>${unit === "Block" ? `<small>${studyRange(w)}</small>` : ""}${course.archived ? "" : `<i data-current-marker="${w.number}"></i>`}</button>${course.breakStart && w.end < course.breakStart && weeks[i+1]?.start > course.breakEnd ? '<div class="break-marker" title="Teaching break">Break</div>' : ""}`).join("")}</div><noscript><p class="notice">All study plans are shown below.</p></noscript>${panels}</section>`;
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
    title = "Answers",
    intro = "Saved on this device. Practice does not submit work to DTU.",
  } = {},
) {
  return `<div class="exercise-workspace" data-exercise-week="${w.number}" data-calculator="${e.kind || ""}"><div class="workspace-heading"><div><h3>${esc(title)}</h3></div><span class="save-status" role="status" data-exercise-save>Answers stay in this browser</span></div><p class="exercise-intro">${esc(intro)}</p>${e.assumptions ? `<details class="exercise-context"><summary>Illustrative inputs · assumptions</summary><p class="exercise-assumptions">${esc(e.assumptions)}</p></details>` : ""}<div class="exercise-fields">${e.fields.map((f, i) => `${e.kind && f.type !== "number" && (i === 0 || e.fields[i - 1].type === "number") ? `</div><section class="exercise-results" aria-label="Calculation results"><span class="eyebrow">LIVE RESULTS</span><div data-exercise-results role="status">Enable JavaScript to calculate results.</div><p class="formula">${esc(e.formula)}</p></section><div class="exercise-fields">` : ""}<div class="exercise-field ${f.type === "number" ? "numeric-field" : "written-field"}"><label for="ex-${w.number}-${f.id}">${esc(f.label)}</label>${f.hint ? `<p id="hint-${f.id}">${esc(f.hint)}</p>` : ""}${f.type === "number" ? `<div class="number-field"><input id="ex-${w.number}-${f.id}" data-answer="${f.id}" type="number" inputmode="decimal" min="${f.min}" step="any" value="${f.value}" aria-describedby="unit-${f.id}"><span id="unit-${f.id}">${esc(f.unit)}</span></div>` : `<textarea id="ex-${w.number}-${f.id}" data-answer="${f.id}" rows="3" ${f.hint ? `aria-describedby="hint-${f.id}"` : ""}></textarea>`}</div>`).join("")}</div>${e.solution ? `<details class="practice-solution"><summary>Check your answer after trying</summary><p>${esc(e.solution)}</p></details>` : ""}<div class="exercise-toolbar"><label><input type="checkbox" data-practice-complete> Practice complete</label><button type="button" class="button" data-download-answers>Download answers ↓</button></div><noscript><p class="notice">You can write in the fields, but saving, calculation and answer downloads require JavaScript.</p></noscript></div>`;
}
export function practiceWorkspace(w) {
  return exerciseWorkspace(w, w.practice, {
    title: w.projectPhase ? "Project notes" : "Answers",
    intro: "Saved on this device. Optional practice; not a DTU submission. Code is not executed.",
  });
}

export function deadlineSpotlight(base) {
  return `<section class="deadline-spotlight next-card"><div class="deadline-symbol" aria-hidden="true">↗</div><div class="spotlight-copy"><span class="eyebrow"><span>Next deadline</span><span class="pill amber" data-countdown>All dates below</span></span><h2 data-next-title>Next deadline</h2><p data-next-date>See all deadlines</p></div><a class="button dark" data-next-link href="${base}deadlines/">View requirements →</a></section><p class="past-notice"><span class="desktop-copy" data-past-count></span><span class="phone-copy" data-past-compact></span> <a href="${base}deadlines/">Review checklist ↗</a></p>`;
}

export function weekPanel({ w, base, due, next, dateLabel, takeaways, prompt, after = "", showAudience = false, unit = "Week", archived = false }) {
  const instruction = prompt.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() || prompt;
  return `<div class="week-panel" data-week-panel="${w.number}"><div class="focus-title"><div><span class="eyebrow">${unit} ${String(w.number).padStart(2,"0")} / ${esc(unit === "Block" ? studyRange(w) : dateLabel)}</span><h2>${esc(w.title)}</h2></div><a class="text-link" href="${base}weeks/${w.number}/">Open ${unit.toLowerCase()} ↗</a></div><div class="action-grid"><section class="action-card understand"><h3>Topics</h3><ul class="essential-list">${takeaways.map(t => `<li>${esc(t.title)}</li>`).join("")}</ul><a class="card-link" href="${base}weeks/${w.number}/">Explanations ↗</a></section><section class="action-card practise"><h3>${w.projectPhase ? "Project practice" : "Practice"}</h3><h4>${esc(w.practice.title)}</h4><p>${esc(instruction)}</p><a class="card-link" href="${base}weeks/${w.number}/#practice">Start practice ↗</a></section><section class="action-card must-do"><h3>Deadlines</h3>${due.length ? due.map(o => `<div class="week-obligation" data-obligation="${esc(o.id)}"><span class="status" data-status>${archived ? "Historical date" : "Scheduled"}</span><h4><a href="${base}deadlines/#${esc(o.id)}">${esc(o.title)}</a></h4><p class="mandatory-date">${esc(o.date)} · ${esc(o.time)}</p>${showAudience ? `<p>${esc(o.audience)}</p>` : ""}</div>`).join("") : `<p class="no-deadline">No dated deadline this ${unit.toLowerCase()}.</p>`}${next ? `<div class="next-week-task"><span>Next</span><a href="${base}deadlines/#${esc(next.id)}">${esc(next.title)}</a><span>${esc(next.date)} · ${esc(next.time)}</span></div>` : ""}</section></div>${after}</div>`;
}

export function understandSection(body) {
  return `<section class="section"><h2>Topics</h2>${body}</section>`;
}
export function practiceSection(title, label, prompt, workspace, details) {
  return `<section class="card practice full-practice" id="practice"><div class="section-heading"><h2>${title}</h2><span class="pill teal">Optional practice</span></div><p>${prompt}</p>${workspace}${details}</section>`;
}
export function mandatorySection(body) {
  return `<section class="section"><h2>Deadlines</h2>${body}</section>`;
}
export function overviewDeadlines(title, base, table, note) {
  return `<section class="section all-deadlines"><div class="section-heading"><div><h2>Deadlines</h2></div><a class="text-link" href="${base}deadlines/">All requirements ↗</a></div>${table}<p class="source-note">${note}</p></section>`;
}
export function deadlineBanner(semester, calendar, note) {
  return `<div class="deadline-banner"><div><strong data-semester>${semester}</strong><span data-calendar>${calendar}</span></div><p data-deadline-summary>${note}</p></div>`;
}
export function deadlineChecklist(title, description, count, cards) {
  return `<div class="section-heading"><div><h2>Checklist</h2></div><span class="pill" data-completed-count>0 of ${count} complete</span></div><div class="obligation-list">${cards}</div>`;
}
export function assessmentSection(eyebrow, title, description, link, grades) {
  return `<section class="assessment"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2><p>${description}</p>${link}</div>${grades.map((g) => `<div class="grade"><strong>${g.value}</strong><span>${g.label}</span></div>`).join("")}</section>`;
}
export function courseDirectory(courses) {
  return `<section class="course-directory" aria-label="Courses">${courses.map(x => `<a class="course-card" data-course="${esc(x.id)}" style="${paletteStyle(x)}" href="/dtu/${x.id}/"><span class="course-code">${esc(x.id)}</span><div class="course-card-copy"><h2>${esc(x.name)}</h2><span class="course-card-detail">${esc(x.label)}</span></div><span class="tile-arrow" aria-hidden="true">↗</span></a>`).join("")}</section>`;
}

export function periodNavigation(courses, activeTerm) {
  const periods = coursePeriods(courses);
  if (!periods.length) return "";
  const years = [...new Set(periods.map(p => p.year))];
  return `<details class="nav-menu period-menu"><summary><span data-period-label>${esc(activeTerm)}</span> <span aria-hidden="true">↓</span></summary><nav aria-label="Course periods">${years.map(year => `<div class="period-year"><span class="eyebrow">${esc(year)}</span>${periods.filter(p => p.year === year).map(p => `<a data-period-link="${p.id}" data-period-term="${esc(p.term)}"${p.id === periodId(activeTerm || "") ? ' aria-current="page"' : ""} href="/dtu/periods/${p.id}/"><span>${esc(p.season === "Winter" ? "Winter · January" : p.season)}</span><span class="period-count">${p.courses.length}</span></a>`).join("")}</div>`).join("")}</nav></details>`;
}
