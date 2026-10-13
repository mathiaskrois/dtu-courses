import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02806",
  title: "Social Data Analysis and Visualization",
  shortTitle: "Social Data Analysis and Visualization",
  term: "Spring 2025",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/242129",
  website: "https://github.com/suneman/socialdata2025/wiki",
  breakStart: "2025-04-14",
  breakEnd: "2025-04-20",
  periodStart: "2025-02-03",
  archived: true,
};

export const presentation = {
  subtitle: "Two assignments · final data-story project",
  assessment:
    "Learn lists two assignments and two final-project submissions. The official 2025 repository supplies notebooks, assignment briefs and final-project instructions. Assignment 2 and the final project use separate published websites; check each original brief for its complete requirements.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "The official weekly notebooks cover Weeks 1–8. Later pages suggest project pacing rather than extra assessed submissions. The video-review session was on 22 April at 08:30 according to the Learn announcement. Project B is due 13 May, after the final teaching week.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. The official weekly notebooks cover Weeks 1–8. Later pages suggest project pacing rather than extra assessed submissions. The video-review session was on 22 April at 08:30 according to the Learn announcement. Project B is due 13 May, after the final teaching week.",
};

const sessions = [
  {
    start: "2025-02-03",
    end: "2025-02-09",
    date: "2025-02-04",
  },
  {
    start: "2025-02-10",
    end: "2025-02-16",
    date: "2025-02-11",
  },
  {
    start: "2025-02-17",
    end: "2025-02-23",
    date: "2025-02-18",
  },
  {
    start: "2025-02-24",
    end: "2025-03-02",
    date: "2025-02-25",
  },
  {
    start: "2025-03-03",
    end: "2025-03-09",
    date: "2025-03-04",
  },
  {
    start: "2025-03-10",
    end: "2025-03-16",
    date: "2025-03-11",
  },
  {
    start: "2025-03-17",
    end: "2025-03-23",
    date: "2025-03-18",
  },
  {
    start: "2025-03-24",
    end: "2025-03-30",
    date: "2025-03-25",
  },
  {
    start: "2025-03-31",
    end: "2025-04-06",
    date: "2025-04-01",
  },
  {
    start: "2025-04-07",
    end: "2025-04-13",
    date: "2025-04-08",
  },
  {
    start: "2025-04-21",
    end: "2025-04-27",
    date: "2025-04-22",
  },
  {
    start: "2025-04-28",
    end: "2025-05-04",
    date: "2025-04-29",
  },
  {
    start: "2025-05-05",
    end: "2025-05-11",
    date: "2025-05-06",
  },
];

const topics = [
  [
    "Social data and responsible questions",
    "A social dataset records selected events through a collection process. Treat coverage, missingness and the incentives behind collection as part of the analysis.",
    "Invent a small incident dataset. Explain one selection bias and why a predictive score would not by itself justify a real-world decision.",
  ],
  [
    "Temporal patterns and plotting",
    "Counts across time need a clear denominator and a consistent time scale. A visible pattern can reflect reporting changes or exposure rather than a change in underlying risk.",
    "Create a toy time series with unequal observation periods. Compare raw counts with a rate and explain the difference.",
  ],
  [
    "Visual encoding and perception",
    "A visual encoding should match the comparison the reader needs to make. Position, length and color support different judgments and can introduce ambiguity.",
    "Sketch two ways to compare four categories. Explain which makes a small difference easier to judge and why.",
  ],
  [
    "Geographic visualization",
    "A map combines spatial units with a measurement. Region area and population can dominate interpretation unless counts, rates and boundaries are chosen deliberately.",
    "Describe two regions with different populations and incident counts. Compare a count map with a rate map and state a limitation.",
  ],
  [
    "Two-variable exploration and regression",
    "Association does not establish causation. Inspect the structure of a relationship, influential observations and uncertainty before interpreting a fitted line.",
    "Draw a scatter plot with one influential point. Explain how it could change a fitted trend without changing the underlying process.",
  ],
  [
    "Interactive and narrative visualization",
    "Interaction can reveal detail while narrative provides a path through the evidence. Each interaction should serve a reader question rather than merely add controls.",
    "Design a filter and tooltip for a fictional chart. Explain the question each interaction answers.",
  ],
  [
    "Publishing a data-story website",
    "A published analysis needs working links, readable charts and a traceable connection to its data and methods. Check the actual deployed page on different screen sizes.",
    "Draft a structure for a small data-story website. Include a main finding, a methods note and one accessibility check.",
  ],
  [
    "A concise data story",
    "A data story should connect an initial question to carefully selected evidence. A strong narrative can acknowledge uncertainty without overwhelming the reader.",
    "Outline a three-chart story using a fictional dataset. State the claim and the evidence each chart contributes.",
  ],
  [
    "Project question and dataset",
    "A feasible project starts with a question that the available data can address. Verify access, coverage and ethical constraints before building the final visualization.",
    "Draft a project question, list the minimum data fields and identify one question the data cannot answer.",
  ],
  [
    "Project prototype and narrative",
    "A prototype tests whether the story and interactions help a reader understand the evidence. Use early feedback to refine both the question and the presentation.",
    "Sketch a first-page prototype and two reader tasks. Define how you would tell whether the prototype supports those tasks.",
  ],
  [
    "Video pitch and peer feedback",
    "A short pitch should communicate the question, evidence and planned contribution. Feedback is most useful when it identifies a specific uncertainty or improvement.",
    "Draft a one-minute fictional project pitch and three feedback questions. Keep it separate from the official project submission.",
  ],
  [
    "Validation and refinement",
    "Check whether visual conclusions survive changes in aggregation, filters and plausible data-cleaning choices. Document meaningful design changes and their reasons.",
    "Name two alternative aggregations for a toy analysis. Explain a conclusion that might change and how you would communicate it.",
  ],
  [
    "Final data-story delivery",
    "A final website should make the central argument easy to follow and the methods possible to inspect. Verify its published state, links and reproduction instructions.",
    "Write a final-review checklist for a fictional website covering the claim, charts, data, methods and mobile reading.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 9,
}).map((w) => ({ ...w, learn: {}[w.number] || course.website }));

export const obligations = [
  {
    id: "learn-62587",
    title: "Assignment 1",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242129&db=62587",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242129&db=62587",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-03-03T23:59:59+01:00",
    date: "3 March",
    time: "23:59",
  },
  {
    id: "learn-63169",
    title: "Assignment 2",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242129&db=63169",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242129&db=63169",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-03-31T23:59:59+02:00",
    date: "31 March",
    time: "23:59",
  },
  {
    id: "learn-63612",
    title: "Project Assignment A",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242129&db=63612",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242129&db=63612",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-04-21T23:59:59+02:00",
    date: "21 April",
    time: "23:59",
  },
  {
    id: "learn-63990",
    title: "Project Assignment B",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242129&db=63990",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242129&db=63990",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-05-13T23:59:59+02:00",
    date: "13 May",
    time: "23:59",
  },
];
