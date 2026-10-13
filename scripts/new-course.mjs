import { mkdir, writeFile, access } from "node:fs/promises";
import { courses } from "../dtu-source/courses.mjs";
const [id, title, term] = process.argv.slice(2);
if (
  !/^\d{5}$/.test(id || "") ||
  !title ||
  !/^(Fall|Spring|Winter|January|June|July|August|Summer) \d{4}$/.test(
    term || "",
  )
) {
  console.error(
    'Usage: npm run course:new -- 12345 "Course title" "Fall 2026"',
  );
  process.exit(1);
}
if (courses.some((course) => course.id === id)) {
  console.error(
    `Course ${id} is already registered; refusing to overwrite it.`,
  );
  process.exit(1);
}
const root = new URL("../", import.meta.url);
const directory = new URL(`dtu-source/${id}/`, root);
try {
  await access(directory);
  console.error(`dtu-source/${id}/ already exists; refusing to overwrite it.`);
  process.exit(1);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
await mkdir(directory, { recursive: true });
const course = {
  id,
  title,
  shortTitle: title,
  term,
  verified: null,
  periodStart: null,
  learn: "",
  website: "",
  breakStart: null,
  breakEnd: null,
};
const presentation = {
  subtitle: "Assessment to confirm",
  assessment: "Assessment requirements have not been verified.",
  deadlineIntro: "Add only confirmed official obligations.",
  dateNote: "Dates and individual exam slots require official confirmation.",
  materialIntro: "Official course links will appear here once verified.",
  sourceNote: "Draft course: official sources have not been checked yet.",
};
await writeFile(
  new URL("course.mjs", directory),
  `// Fill these from official sources; see docs/course-playbook.md.\nexport const course = ${JSON.stringify(course, null, 2)};\nexport const presentation = ${JSON.stringify(presentation, null, 2)};\nexport const weeks = [];\nexport const obligations = [];\n`,
);
await writeFile(new URL("resources.json", directory), "[]\n");
console.log(
  `Created dtu-source/${id}/. After checking the sources, add this entry to dtu-source/courses.mjs:\n${JSON.stringify({ id, name: title, term, label: "Assessment to confirm", detail: "Weekly plans, practice & deadlines", source: `dtu-source/${id}`, art: null }, null, 2)}\nThen run npm run build. See docs/course-playbook.md for the content schema.`,
);
