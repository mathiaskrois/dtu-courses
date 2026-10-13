import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02810",
  title: "UX design prototyping",
  shortTitle: "UX design prototyping",
  term: "Fall 2025",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/270849",
  website: "https://learn.inside.dtu.dk/d2l/home/270849",
  breakStart: "2025-10-13",
  breakEnd: "2025-10-19",
  periodStart: "2025-09-01",
  archived: true,
  noExam: true,
};

export const presentation = {
  subtitle: "UX project · individual reflection · DINK quiz",
  assessment:
    "The final assessment uses a group project and each student's contribution and individual reflection. Passing the DINK quiz is required; its stated deadline is 8 December. Weekly hand-ins and peer feedback have their own instructions. There is no separately described written exam.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "Final group and individual reports are due 8 December 2025 at 23:59 in Learn. The DINK quiz is limited to one hour with one further attempt if failed; no precise deadline time is inferred for it. Archived material sometimes has E24 filenames, so current E25 instructions take precedence.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. Final group and individual reports are due 8 December 2025 at 23:59 in Learn. The DINK quiz is limited to one hour with one further attempt if failed; no precise deadline time is inferred for it. Archived material sometimes has E24 filenames, so current E25 instructions take precedence.",
};

const sessions = [
  {
    start: "2025-09-01",
    end: "2025-09-07",
    date: "2025-09-01",
  },
  {
    start: "2025-09-08",
    end: "2025-09-14",
    date: "2025-09-08",
  },
  {
    start: "2025-09-15",
    end: "2025-09-21",
    date: "2025-09-15",
  },
  {
    start: "2025-09-22",
    end: "2025-09-28",
    date: "2025-09-22",
  },
  {
    start: "2025-09-29",
    end: "2025-10-05",
    date: "2025-09-29",
  },
  {
    start: "2025-10-06",
    end: "2025-10-12",
    date: "2025-10-06",
  },
  {
    start: "2025-10-20",
    end: "2025-10-26",
    date: "2025-10-20",
  },
  {
    start: "2025-10-27",
    end: "2025-11-02",
    date: "2025-10-27",
  },
  {
    start: "2025-11-03",
    end: "2025-11-09",
    date: "2025-11-03",
  },
  {
    start: "2025-11-10",
    end: "2025-11-16",
    date: "2025-11-10",
  },
  {
    start: "2025-11-17",
    end: "2025-11-23",
    date: "2025-11-17",
  },
  {
    start: "2025-11-24",
    end: "2025-11-30",
    date: "2025-11-24",
  },
  {
    start: "2025-12-01",
    end: "2025-12-07",
    date: "2025-12-01",
  },
];

const topics = [
  [
    "Modeling needs and solutions",
    "A prototype should connect a specific user need to an interaction that addresses it. Prioritize the task and context before refining the interface's appearance.",
    "For a fictional charging app, write one user goal, one pain point and a three-step interaction. Explain how you would test the proposed improvement.",
  ],
  [
    "Data-driven design",
    "Interaction data can support design decisions only when the measurement is linked to a meaningful user outcome. Avoid treating every collected event as useful evidence.",
    "Choose two metrics for a fictional app. Explain one behavior each metric captures and one important outcome it misses.",
  ],
  [
    "Internet of Things",
    "A connected service joins a user's interaction with sensing, devices and backend behavior. Failure and privacy conditions belong in the design, not only the happy path.",
    "Sketch a fictional connected-campus service. Trace one user action through device, data and backend steps, including a failure case.",
  ],
  [
    "Gestalt principles and validation",
    "Visual grouping affects how users understand an interface. Validate a design with a concrete task and evidence rather than relying on preference alone.",
    "Sketch two groupings of the same controls. Propose a user task that could reveal which grouping is easier to understand.",
  ],
  [
    "Multidevice design",
    "A service used across devices must preserve a coherent task while adapting to context and input constraints. A smaller screen is not merely a scaled desktop interface.",
    "Split a fictional task between a phone and a watch. Explain which information and actions belong on each device.",
  ],
  [
    "UX and visualizations",
    "A visualization supports a user's decision when its encodings, context and interactions match that decision. Dense information needs a clear hierarchy and a route to detail.",
    "Sketch a fictional clinical dashboard with one overview and one detail view. Explain which question each view answers without interpreting real patient data.",
  ],
  [
    "Button-less interfaces",
    "Voice and other indirect controls need clear feedback, recoverable errors and appropriate handling of ambiguity. Users should understand what the system heard and what it will do.",
    "Write a short fictional voice interaction with an ambiguous request. Add a clarification and a safe recovery path.",
  ],
  [
    "Wearables and ethics",
    "Contextual interfaces can be helpful while also creating privacy, persuasion and accessibility concerns. Make their effects visible and preserve user control.",
    "Describe one beneficial and one potentially manipulative wearable interaction. Propose a design change that gives the user meaningful control.",
  ],
  [
    "Project kick-off",
    "A project idea needs a clear user, problem and value proposition. An early prototype should make the risky assumptions testable.",
    "Draft a fictional project's user, need, value proposition and one testable assumption. This is practice, not the official poster.",
  ],
  [
    "Project idea presentations",
    "A presentation should connect the proposed solution to evidence about the problem. Use feedback to improve the underlying reasoning as well as the interface.",
    "Outline a short project pitch and three questions you want reviewers to answer.",
  ],
  [
    "Final lecture and peer review",
    "A review identifies gaps between the proposed experience and the stated user needs. Make feedback concrete enough to inform an iteration.",
    "Review a fictional prototype using task success, comprehension and recovery from error. Suggest one improvement per category.",
  ],
  [
    "Final presentation and group work",
    "Document changes and their evidence so the final design can be assessed as a process. A convincing presentation makes both outcomes and limitations inspectable.",
    "Create an iteration log for a fictional prototype: initial assumption, test, observation and design change.",
  ],
  [
    "Final delivery and individual reflection",
    "An individual reflection explains the contribution and connects design decisions to course concepts. Distinguish the team's result from what you personally learned or changed.",
    "Draft a reflection outline for a fictional contribution. Connect a design concept to an observed result and one improvement.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 9,
}).map((w) => ({
  ...w,
  learn:
    {
      1: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045751",
      2: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045752",
      3: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045753",
      4: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045754",
      5: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045755",
      6: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045756",
      7: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045758",
      8: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045757",
      9: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045759",
      10: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045760",
      11: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045761",
      12: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045762",
      13: "https://learn.inside.dtu.dk/d2l/le/lessons/270849/units/1045763",
    }[w.number] || course.website,
}));

export const obligations = [
  {
    id: "learn-65724",
    title: "Wk1 EV Charging",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65724",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65724",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-09-07T16:00:00+02:00",
    date: "7 September",
    time: "16:00",
  },
  {
    id: "calendar-343645",
    title: "Hand in as group - Week 2 Peer Feedback",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/381824/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/381824/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-09-11T23:59:00+02:00",
    date: "11 September",
    time: "23:59",
  },
  {
    id: "calendar-343646",
    title: "Give feedback - Week 2 Peer Feedback",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/381825/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/381825/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-09-14T23:59:00+02:00",
    date: "14 September",
    time: "23:59",
  },
  {
    id: "learn-65725",
    title: "Wk3 LINC 2.0 (First Version)",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65725",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65725",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-09-21T16:00:00+02:00",
    date: "21 September",
    time: "16:00",
  },
  {
    id: "calendar-345199",
    title: "Hand in as group - Week 4 Peer Feedback",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/383728/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/383728/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-09-25T23:59:00+02:00",
    date: "25 September",
    time: "23:59",
  },
  {
    id: "calendar-345198",
    title: "Give feedback - Week 4 Peer Feedback",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/383727/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/383727/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-09-28T16:00:00+02:00",
    date: "28 September",
    time: "16:00",
  },
  {
    id: "learn-65726",
    title: "Wk 5 LINC 2.0 (3rd week)",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65726",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65726",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-10-05T16:00:00+02:00",
    date: "5 October",
    time: "16:00",
  },
  {
    id: "learn-65727",
    title: "Wk 6 REAFEL HCP Interface",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65727",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65727",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-10-12T23:59:59+02:00",
    date: "12 October",
    time: "23:59",
  },
  {
    id: "learn-65728",
    title: "Wk7 REAFEL HCP Interface and initial Patient Interface ideas",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65728",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65728",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-10-26T16:00:00+01:00",
    date: "26 October",
    time: "16:00",
  },
  {
    id: "calendar-347005",
    title: "Hand in as group - Week 8 Peer Feedback",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/385408/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/385408/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-11-02T16:00:00+01:00",
    date: "2 November",
    time: "16:00",
  },
  {
    id: "calendar-347006",
    title: "Give feedback - Week 8 Peer Feedback",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/385409/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/270849/event/385409/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-11-06T23:59:00+01:00",
    date: "6 November",
    time: "23:59",
  },
  {
    id: "learn-65718",
    title: "Wk9 Poster",
    audience: "Individual",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65718",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65718",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-11-09T16:00:00+01:00",
    date: "9 November",
    time: "16:00",
  },
  {
    id: "learn-65719",
    title: "Wk10 Update",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65719",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65719",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-11-16T19:00:00+01:00",
    date: "16 November",
    time: "19:00",
  },
  {
    id: "learn-65723",
    title: "Wk11 Hand-In (Presentations for Wk12) (Group Hand-In)",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65723",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65723",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-11-23T16:00:00+01:00",
    date: "23 November",
    time: "16:00",
  },
  {
    id: "learn-65720",
    title: "Wk12 Hand-In (Presentations for Wk13) (Group Hand-In)",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65720",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65720",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-11-30T19:00:00+01:00",
    date: "30 November",
    time: "19:00",
  },
  {
    id: "dink",
    title: "Pass the DINK quiz",
    audience: "Individual",
    description:
      "Pass the Digital Innovation Canon quiz by 8 December. It has a one-hour limit, with one additional attempt if failed. No exact deadline time is inferred.",
    url: "https://learn.inside.dtu.dk/d2l/common/dialogs/quickLink/quickLink.d2l?ou=270849&type=content&rcode=dtu-395769",
    source:
      "https://learn.inside.dtu.dk/d2l/common/dialogs/quickLink/quickLink.d2l?ou=270849&type=content&rcode=dtu-395769",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    dateOnly: "2025-12-08",
    date: "8 December",
    time: "Time to confirm",
  },
  {
    id: "learn-65721",
    title: "Final Group Report",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65721",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65721",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-12-08T23:59:59+01:00",
    date: "8 December",
    time: "23:59",
  },
  {
    id: "learn-65722",
    title: "Final Individual Reflection Report",
    audience: "Individual",
    description:
      "Individual reflection: choose a permitted topic that no other group member uses, connect its concepts to the project and reflect on your contribution.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65722",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270849&db=65722",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-12-08T23:59:59+01:00",
    date: "8 December",
    time: "23:59",
  },
];
