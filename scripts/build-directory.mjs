import { mkdir, writeFile } from "node:fs/promises";
import { courses } from "../dtu-source/courses.mjs";
import { coursePeriods, currentPeriod } from "../dtu/assets/period-state.mjs";
import {
  esc,
  createLayout,
  pageHeading,
  courseDirectory,
} from "./lib/course-layout.mjs";
const periods = coursePeriods(courses);
const current = currentPeriod(periods);
const root = new URL("../dtu/", import.meta.url);

async function page(selected, automatic = false) {
  const layout = createLayout({
    course: {
      id: "directory",
      term: selected.term,
      learn: "https://learn.inside.dtu.dk/",
    },
    weeks: [],
    catalog: courses,
    directoryTerm: selected.term,
  });
  const visiblePeriods = automatic ? periods : [selected];
  const body =
    pageHeading(
      "DTU / COURSE COLLECTION",
      "COURSE<br>INDEX.",
    ) +
    `<div data-period-directory="${automatic ? "automatic" : "selected"}">${visiblePeriods.map((p) => `<section data-period-panel="${p.id}" data-period-start="${p.start}"${p.id !== selected.id ? " hidden" : ""}><div class="period-heading"><h2>${esc(p.term)}</h2><span>${p.courses.length} courses</span></div>${courseDirectory(p.courses)}</section>`).join("")}</div>`;
  const directory = automatic ? root : new URL(`periods/${selected.id}/`, root);
  await mkdir(directory, { recursive: true });
  let html = layout("DTU courses", body, "overview", null, true);
  if (!automatic)
    html = html.replace(
      'href="https://krois.dk/dtu/"',
      `href="https://krois.dk/dtu/periods/${selected.id}/"`,
    );
  await writeFile(new URL("index.html", directory), html);
}
if (current) await page(current, true);
for (const period of periods) await page(period);
console.log(
  `Built DTU directory: ${courses.length} courses in ${periods.length} periods.`,
);
