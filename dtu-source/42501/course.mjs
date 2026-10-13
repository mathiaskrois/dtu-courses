import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "42501",
  title: "Innovation in engineering",
  shortTitle: "Innovation in engineering",
  term: "June 2025",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/265608",
  website: "https://learn.inside.dtu.dk/d2l/home/265608",
  breakStart: null,
  breakEnd: null,
  periodStart: "2025-06-04",
  archived: true,
  studyUnit: "Block",
};

export const presentation = {
  subtitle: "Three-week innovation project · Challenge C",
  assessment:
    "The visible Learn assignments belong to Challenge C and include group deliverables, three individual progress reports and a pitch deck. Follow the Day 15 delivery and assessment instructions for the final presentation. The three plans here group the confirmed 15 course days into five-day study blocks.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "This June 2025 course contains calendars copied from other years and periods. Only the June 2025 assignment dates are used. The three study blocks are 4–12 June, 13–19 June and 20–26 June, rather than ordinary Monday-to-Sunday semester weeks. Other challenges can have different submission requirements.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. This June 2025 course contains calendars copied from other years and periods. Only the June 2025 assignment dates are used. The three study blocks are 4–12 June, 13–19 June and 20–26 June, rather than ordinary Monday-to-Sunday semester weeks. Other challenges can have different submission requirements.",
};

const sessions = [
  {
    start: "2025-06-04",
    end: "2025-06-12",
    date: "2025-06-04",
  },
  {
    start: "2025-06-13",
    end: "2025-06-19",
    date: "2025-06-13",
  },
  {
    start: "2025-06-20",
    end: "2025-06-26",
    date: "2025-06-20",
  },
];

const topics = [
  [
    "Challenge selection, teams and innovation foundations",
    "A useful innovation problem connects a stakeholder need with a plausible engineering contribution. Team formation and early exploration should make assumptions and responsibilities explicit.",
    "For a fictional campus problem, write a stakeholder map, one unmet need and a team agreement. Propose an observation that could challenge your initial assumption.",
  ],
  [
    "Research, synthesis and opportunity selection",
    "Separate observations from interpretations when synthesizing field data. An opportunity should be chosen using evidence and explicit criteria rather than enthusiasm alone.",
    "Create three fictional interview observations, cluster them into two themes and write an innovation question. Explain the evidence behind the selected direction.",
  ],
  [
    "Concepts, prototypes, testing and delivery",
    "A prototype is useful when it tests a consequential assumption. A final pitch should connect the proposed solution to evidence, feasibility and what still needs testing.",
    "Sketch a low-cost prototype test with a success criterion, then draft a short pitch linking the problem, evidence and proposed next step.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 999,
}).map((w) => ({ ...w, learn: {}[w.number] || course.website }));

export const obligations = [
  {
    id: "learn-63436",
    title: "Day 02 - Challenge C Progress Report 1 Individual hand-in",
    audience: "Individual · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63436",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63436",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-09T23:59:00+02:00",
    date: "9 June",
    time: "23:59",
  },
  {
    id: "learn-63440",
    title: "Day 04 - Challenge C hand-in",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63440",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63440",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-11T23:59:00+02:00",
    date: "11 June",
    time: "23:59",
  },
  {
    id: "learn-63444",
    title: "Day 06 - Challenge C hand-in",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63444",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63444",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-15T23:59:00+02:00",
    date: "15 June",
    time: "23:59",
  },
  {
    id: "learn-63448",
    title: "Day 07 - Challenge C Progress Report 2 Individual hand-in",
    audience: "Individual · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63448",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63448",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-16T23:59:00+02:00",
    date: "16 June",
    time: "23:59",
  },
  {
    id: "learn-63452",
    title: "Day 08 - Challenge C hand-in",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63452",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63452",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-17T23:59:00+02:00",
    date: "17 June",
    time: "23:59",
  },
  {
    id: "calendar-313702",
    title:
      "Hand in as group - FeedbackFruits: Day 9 - Innovation Brief Hand-in",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/265608/event/348811/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/265608/event/348811/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-18T14:00:00+02:00",
    date: "18 June",
    time: "14:00",
  },
  {
    id: "calendar-313703",
    title: "Give feedback - FeedbackFruits: Day 9 - Innovation Brief Hand-in",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/265608/event/348812/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/265608/event/348812/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-18T14:30:00+02:00",
    date: "18 June",
    time: "14:30",
  },
  {
    id: "learn-63456",
    title: "Day 09 - Challenge C hand-in",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63456",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63456",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-18T15:01:00+02:00",
    date: "18 June",
    time: "15:01",
  },
  {
    id: "learn-63460",
    title: "Day 10 - Challenge C hand-in",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63460",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63460",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-19T23:59:00+02:00",
    date: "19 June",
    time: "23:59",
  },
  {
    id: "calendar-313704",
    title: "Hand in as group - FeedbackFruits: Day 11 - Peer review",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/265608/event/348813/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/265608/event/348813/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-20T14:30:00+02:00",
    date: "20 June",
    time: "14:30",
  },
  {
    id: "calendar-313705",
    title: "Give feedback - FeedbackFruits: Day 11 - Peer review",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/265608/event/348814/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/265608/event/348814/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-20T15:50:00+02:00",
    date: "20 June",
    time: "15:50",
  },
  {
    id: "learn-63464",
    title: "Day 11 - Challenge C hand-in",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63464",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63464",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-22T23:59:00+02:00",
    date: "22 June",
    time: "23:59",
  },
  {
    id: "learn-63468",
    title: "Day 12 - Challenge C Progress Report 3 Individual hand-in",
    audience: "Individual · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63468",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63468",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-23T23:59:00+02:00",
    date: "23 June",
    time: "23:59",
  },
  {
    id: "learn-63472",
    title: "Day 12 - Challenge C hand-in",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63472",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63472",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-23T23:59:00+02:00",
    date: "23 June",
    time: "23:59",
  },
  {
    id: "learn-63476",
    title: "Day 13 - Challenge C hand-in",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63476",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63476",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-24T23:59:00+02:00",
    date: "24 June",
    time: "23:59",
  },
  {
    id: "learn-63480",
    title: "Day 14 - Challenge C hand-in",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63480",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63480",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-25T14:00:00+02:00",
    date: "25 June",
    time: "14:00",
  },
  {
    id: "learn-63484",
    title: "Day 14 - Challenge C Pitch Deck",
    audience: "Group · Challenge C",
    description:
      "Challenge C submission in the June 2025 course. Follow the matching day module and submission template; requirements for other challenges can differ.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63484",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=265608&db=63484",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-06-25T23:59:00+02:00",
    date: "25 June",
    time: "23:59",
  },
];
