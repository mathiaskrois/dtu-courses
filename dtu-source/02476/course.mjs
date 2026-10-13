import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02476",
  title: "Machine learning operations",
  shortTitle: "Machine learning operations",
  term: "Winter 2026",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/293879",
  website:
    "https://github.com/SkafteNicki/dtu_mlops/tree/3b1992997d89cf23bb85c74be0425798b2d0d4bd",
  breakStart: null,
  breakEnd: null,
  periodStart: "2026-01-05",
  archived: true,
  noExam: true,
};

export const presentation = {
  subtitle: "Three-week course · pass/fail project",
  assessment:
    "A practical three-week January course assessed through the project. Learn lists a group Project URL submission due 23 January 2026 at 23:59. Use the pinned January 2026 course repository for the original project and report instructions.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "Learn files this edition under its 2025 WINTER tab, but the course title, welcome announcement, timetable and submission date identify January 2026. No written exam is added.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. Learn files this edition under its 2025 WINTER tab, but the course title, welcome announcement, timetable and submission date identify January 2026. No written exam is added. External material is pinned to the last course-repository commit before 24 January 2026.",
};

const sessions = [
  {
    start: "2026-01-05",
    end: "2026-01-11",
    date: "2026-01-05",
  },
  {
    start: "2026-01-12",
    end: "2026-01-18",
    date: "2026-01-12",
  },
  {
    start: "2026-01-19",
    end: "2026-01-25",
    date: "2026-01-19",
  },
];

const topics = [
  [
    "Development, versioning and reproducibility",
    "An experiment is reproducible only when its code, data, environment and configuration can be identified together. Logging helps connect a result to the exact choices that produced it.",
    "Write a minimal experiment manifest for a fictional training run. Include code version, data version, environment, configuration and a result.",
  ],
  [
    "Automation, cloud and deployment",
    "Tests and automated checks catch failures before deployment. A served model also needs a clear input/output contract, controlled dependencies and a deployment procedure.",
    "Design three checks for a toy prediction API: input validation, prediction shape and repeatable setup. Explain where each belongs in development or deployment.",
  ],
  [
    "Monitoring, scaling and project delivery",
    "A model service can change behavior as traffic and data change. Monitoring should connect observable signals to an action, while final delivery must be reproducible by another person.",
    "Draft a small runbook for a prediction service with one drift signal, one reliability signal and a response for each. Add a reproduction checklist.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 999,
}).map((w) => ({ ...w, learn: {}[w.number] || course.website }));

export const obligations = [
  {
    id: "learn-69215",
    title: "Project URL",
    audience: "Group",
    description:
      "Submit the project URL for the January 2026 group project. Use the pinned course project and report instructions to check the repository deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=293879&db=69215",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=293879&db=69215",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-01-23T23:59:59+01:00",
    date: "23 January",
    time: "23:59",
  },
];
