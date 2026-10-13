import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, cp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

test("course starter refuses overwrites and builds a new semester through the shared renderer", async () => {
  const root = await mkdtemp(join(tmpdir(), "dtu-course-"));
  try {
    await mkdir(join(root, "scripts"), { recursive: true });
    await mkdir(join(root, "dtu-source"), { recursive: true });
    await cp(
      new URL("../dtu-source/courses.mjs", import.meta.url),
      join(root, "dtu-source/courses.mjs"),
    );
    await mkdir(join(root, "dtu/assets"), { recursive: true });
    await cp(
      new URL("../dtu/assets/period-state.mjs", import.meta.url),
      join(root, "dtu/assets/period-state.mjs"),
    );
    await cp(
      new URL("../dtu/assets/course-state.mjs", import.meta.url),
      join(root, "dtu/assets/course-state.mjs"),
    );
    await cp(
      new URL("../scripts/lib/", import.meta.url),
      join(root, "scripts/lib"),
      { recursive: true },
    );
    await cp(
      new URL("../scripts/new-course.mjs", import.meta.url),
      join(root, "scripts/new-course.mjs"),
    );
    const run = () =>
      spawnSync(
        process.execPath,
        [
          join(root, "scripts/new-course.mjs"),
          "01234",
          "Future course",
          "Fall 2027",
        ],
        { encoding: "utf8" },
      );
    assert.equal(run().status, 0);
    const contentPath = join(root, "dtu-source/01234/course.mjs");
    const original = await readFile(contentPath, "utf8");
    const second = run();
    assert.equal(second.status, 1);
    assert.match(second.stderr, /refusing to overwrite/);
    assert.equal(await readFile(contentPath, "utf8"), original);
    const { buildCourse } = await import(
      pathToFileURL(join(root, "scripts/lib/build-course.mjs"))
    );
    await buildCourse("dtu-source/01234");
    assert.match(
      await readFile(join(root, "dtu/01234/index.html"), "utf8"),
      /Weekly plans await source verification/,
    );
    const weeks = [
      {
        number: 1,
        start: "2027-08-30",
        end: "2027-09-05",
        date: "2027-09-02",
        title: "Future topic",
        lead: "Future essentials",
        takeaways: [{ title: "Reasoning", text: "Original explanation." }],
        practice: {
          title: "Try it",
          prompt: "Explain your reasoning.",
          result: "A short argument.",
          fields: [{ id: "reasoning", label: "Your reasoning" }],
        },
      },
    ];
    const obligations = [
      {
        id: "required",
        title: "Required work",
        audience: "Individual",
        date: "Date unconfirmed",
        time: "Check Learn",
        description: "Required work without a fabricated date.",
        url: "https://example.com/submit",
        source: "https://example.com/brief",
        checklist: ["Check the official brief."],
      },
    ];
    await writeFile(
      contentPath,
      original
        .replace(
          "export const weeks = [];",
          `export const weeks = ${JSON.stringify(weeks)};`,
        )
        .replace(
          "export const obligations = [];",
          `export const obligations = ${JSON.stringify(obligations)};`,
        ),
    );
    // A second import needs a fresh process to pick up the newly populated source.
    const result = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `import {buildCourse} from ${JSON.stringify(pathToFileURL(join(root, "scripts/lib/build-course.mjs")).href)}; await buildCourse('dtu-source/01234');`,
      ],
      { encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stderr);
    const html = await readFile(
      join(root, "dtu/01234/weeks/1/index.html"),
      "utf8",
    );
    assert.match(html, /data-storage-term="fall2027"/);
    assert.match(html, /Week 1 of 1/);
    assert.match(html, /data-answer="reasoning"/);
    assert.match(html, /href="\/dtu\/01234\/deadlines\/"/);
    const runtime = JSON.parse(
      await readFile(join(root, "dtu/01234/runtime.json"), "utf8"),
    );
    assert.equal(runtime.course.id, "01234");
    assert.deepEqual(
      runtime.weeks,
      weeks.map(({ number, start, end, title }) => ({
        number,
        start,
        end,
        title,
      })),
    );
    assert.equal(runtime.obligations[0].due, undefined);
    assert.equal(runtime.obligations[0].dateOnly, undefined);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("every registered course has complete routes, a matching calendar and safe material metadata", async () => {
  const { courses } = await import("../dtu-source/courses.mjs");
  assert.ok(courses.length >= 15);
  assert.equal(new Set(courses.map((c) => c.id)).size, courses.length);
  for (const entry of courses) {
    const prefix = new URL(`../dtu/${entry.id}/`, import.meta.url);
    const runtime = JSON.parse(
      await readFile(new URL("runtime.json", prefix), "utf8"),
    );
    assert.equal(runtime.course.id, entry.id);
    assert.equal(runtime.course.term, entry.term);
    for (const [index, week] of runtime.weeks.entries()) {
      assert.equal(week.number, index + 1);
      assert.ok(week.start <= week.end);
      assert.equal(week.start.slice(0, 4), entry.term.match(/\d{4}/)[0]);
      const html = await readFile(
        new URL(`weeks/${week.number}/index.html`, prefix),
        "utf8",
      );
      assert.match(html, /id="practice"/);
      assert.match(html, /data-download-answers/);
    }
    for (const path of [
      "index.html",
      "deadlines/index.html",
      "materials/index.html",
    ]) {
      const html = await readFile(new URL(path, prefix), "utf8");
      assert.match(html, /aria-label="Course periods"/);
      assert.match(
        html,
        new RegExp(
          `data-storage-term="${entry.term.toLowerCase().replace(/[^a-z0-9]/g, "")}"`,
        ),
      );
    }
    for (const task of runtime.obligations) {
      assert.ok(!("checklist" in task));
      assert.ok(!/[?&]grpid=/.test(task.url));
      if (task.due) assert.ok(Number.isFinite(Date.parse(task.due)));
    }
  }
});

test("archived assessment requirements do not inherit another course or a copied calendar year", async () => {
  const load = async (id) =>
    JSON.parse(
      await readFile(
        new URL(`../dtu/${id}/runtime.json`, import.meta.url),
        "utf8",
      ),
    );
  const deep = await load("02456");
  assert.equal(
    deep.obligations.filter((o) => /peer review/i.test(o.title)).length,
    0,
  );
  assert.equal(
    deep.obligations.filter((o) => /summary.*feedback/i.test(o.title)).length,
    0,
  );
  const ml = await load("02450");
  assert.equal(
    ml.obligations.filter((o) => o.audience.startsWith("Conditional")).length,
    2,
  );
  const image = await load("02506");
  assert.equal(image.obligations.find((o) => o.id === "exam").due, undefined);
  assert.equal(
    image.obligations.find((o) => o.id === "exam").dateOnly,
    undefined,
  );
  const cda = await load("02582");
  assert.equal(
    cda.obligations.find((o) => o.id === "learn-72422").due.slice(0, 10),
    "2026-05-05",
  );
  assert.ok(cda.obligations.every((o) => !o.due || o.due.startsWith("2026")));
  const intensive = await load("02476");
  assert.equal(intensive.course.term, "Winter 2026");
  assert.equal(intensive.weeks.length, 3);
  assert.equal(intensive.obligations.length, 1);
});
