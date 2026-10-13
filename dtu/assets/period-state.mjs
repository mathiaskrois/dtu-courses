import { civilDate } from "./course-state.mjs?v=8";

export const periodId = (term) => term.toLowerCase().replace(/[^a-z0-9]/g, "");
const month = {
  Winter: 1,
  January: 1,
  Spring: 2,
  June: 6,
  Summer: 6,
  July: 7,
  August: 8,
  Fall: 9,
  Autumn: 9,
};

export function coursePeriods(courses) {
  const groups = new Map();
  for (const course of courses) {
    const term = course.period || course.term;
    const id = periodId(term);
    if (!groups.has(id)) {
      const [season, year] = term.split(" ");
      groups.set(id, {
        id,
        term,
        season,
        year,
        start:
          course.periodStart ||
          `${year}-${String(month[season] || 1).padStart(2, "0")}-01`,
        courses: [],
      });
    }
    const period = groups.get(id);
    if (course.periodStart && course.periodStart < period.start)
      period.start = course.periodStart;
    period.courses.push(course);
  }
  return [...groups.values()].sort((a, b) => b.start.localeCompare(a.start));
}

// The homepage always chooses from the Copenhagen date, never saved browsing state.
export function currentPeriod(periods, now = new Date()) {
  const day = civilDate(now);
  return (
    periods.find((period) => period.start <= day) || periods.at(-1) || null
  );
}
