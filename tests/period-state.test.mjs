import test from "node:test";
import assert from "node:assert/strict";
import { coursePeriods, currentPeriod } from "../dtu/assets/period-state.mjs";
import { courses } from "../dtu-source/courses.mjs";

const archiveIds = new Set(['12106','02616','02581','02807','02582','02506','02460','02476','02810','02456','02805','42501','02806','02613','02450']);
const archive = courses.filter(course => archiveIds.has(course.id));

test("periods sort by teaching date and use the actual January 2026 course edition", () => {
  const periods = coursePeriods(archive);
  assert.deepEqual(
    periods.map((p) => p.id),
    [
      "fall2026",
      "spring2026",
      "winter2026",
      "fall2025",
      "june2025",
      "spring2025",
    ],
  );
  assert.deepEqual(
    periods.map((p) => p.courses.length),
    [4, 3, 1, 3, 1, 3],
  );
  assert.equal(
    currentPeriod(periods, new Date("2026-10-13T12:00Z")).id,
    "fall2026",
  );
  assert.equal(
    currentPeriod(periods, new Date("2026-01-12T12:00Z")).id,
    "winter2026",
  );
});

test("default period switches at Copenhagen midnight and handles dates outside the archive", () => {
  const periods = coursePeriods(archive);
  assert.equal(
    currentPeriod(periods, new Date("2026-08-30T21:59:59Z")).id,
    "spring2026",
  );
  assert.equal(
    currentPeriod(periods, new Date("2026-08-30T22:00:00Z")).id,
    "fall2026",
  );
  assert.equal(
    currentPeriod(periods, new Date("2024-01-01T12:00Z")).id,
    "spring2025",
  );
  assert.equal(currentPeriod([], new Date()), null);
});
