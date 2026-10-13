import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02805",
  title: "Social graphs and interactions",
  shortTitle: "Social graphs and interactions",
  term: "Fall 2025",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/270843",
  website: "https://github.com/suneman/socialgraphs2025/wiki",
  breakStart: "2025-10-13",
  breakEnd: "2025-10-19",
  periodStart: "2025-09-01",
  archived: true,
};

export const presentation = {
  subtitle: "Two assignments · two project submissions",
  assessment:
    "Learn lists Assignment 1, Assignment 2 and Project Assignments A and B. Use the official 2025 repository and wiki for the complete project and submission requirements. No separate written exam is introduced here.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "The first eight official notebooks cover network science and text analysis. Weeks 9–13 below suggest project pacing. The confirmed video-review session was 19 November at 09:00; the final project submission is due 10 December, after teaching ends.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. The first eight official notebooks cover network science and text analysis. Weeks 9–13 below suggest project pacing. The confirmed video-review session was 19 November at 09:00; the final project submission is due 10 December, after teaching ends.",
};

const sessions = [
  {
    start: "2025-09-01",
    end: "2025-09-07",
    date: "2025-09-03",
  },
  {
    start: "2025-09-08",
    end: "2025-09-14",
    date: "2025-09-10",
  },
  {
    start: "2025-09-15",
    end: "2025-09-21",
    date: "2025-09-17",
  },
  {
    start: "2025-09-22",
    end: "2025-09-28",
    date: "2025-09-24",
  },
  {
    start: "2025-09-29",
    end: "2025-10-05",
    date: "2025-10-01",
  },
  {
    start: "2025-10-06",
    end: "2025-10-12",
    date: "2025-10-08",
  },
  {
    start: "2025-10-20",
    end: "2025-10-26",
    date: "2025-10-22",
  },
  {
    start: "2025-10-27",
    end: "2025-11-02",
    date: "2025-10-29",
  },
  {
    start: "2025-11-03",
    end: "2025-11-09",
    date: "2025-11-05",
  },
  {
    start: "2025-11-10",
    end: "2025-11-16",
    date: "2025-11-12",
  },
  {
    start: "2025-11-17",
    end: "2025-11-23",
    date: "2025-11-19",
  },
  {
    start: "2025-11-24",
    end: "2025-11-30",
    date: "2025-11-26",
  },
  {
    start: "2025-12-01",
    end: "2025-12-07",
    date: "2025-12-03",
  },
];

const topics = [
  [
    "APIs and network representations",
    "A graph represents relationships through explicit nodes and edges. Before analyzing it, decide what each relation means and what the collection process may omit.",
    "Draw a five-node social graph. Define an edge and explain one relationship the graph does not capture.",
  ],
  [
    "Degree distributions and random networks",
    "Degree summarizes local connectivity, while a degree distribution describes how connectivity varies across nodes. Compare a network with an appropriate null model before claiming a distinctive pattern.",
    "Compute degrees in a small undirected graph and check that their sum is twice the number of edges. Explain why this check works.",
  ],
  [
    "Small-world and scale-free networks",
    "Short paths, clustering and highly variable degree are different structural properties. A network can share one of these features with a model without sharing all of them.",
    "Compare a ring graph with a star graph. Describe their path lengths, clustering and degree variation.",
  ],
  [
    "Constructing and visualizing networks",
    "Graph construction translates source data into relationships through explicit rules. A visualization should help inspect that construction rather than serve as evidence by appearance alone.",
    "Specify a rule that converts a fictional set of linked pages into a graph. Explain how changing the rule would change the graph.",
  ],
  [
    "Network visualization and backbones",
    "A layout and filtering rule influence what a reader sees. A backbone may reveal structure while also removing weak but meaningful relationships.",
    "Design a threshold for displaying weighted edges in a toy network. Identify one relationship your threshold could hide.",
  ],
  [
    "Text processing and NLTK",
    "Tokenization and normalization define which textual differences remain visible. Choices about punctuation, casing and stop words should match the analytical question.",
    "Tokenize two short fictional sentences using two different rules. Explain a comparison that would change because of the rules.",
  ],
  [
    "Communities, text and TF.IDF",
    "Community structure and characteristic vocabulary can describe different aspects of the same collection. TF.IDF emphasizes terms that are common locally but uncommon across documents.",
    "Create three short fictional documents and identify one common and one distinctive term. Explain which should have the higher inverse-document-frequency weight.",
  ],
  [
    "Sentiment analysis",
    "A sentiment score depends on representation, context and the reference model. Sarcasm, negation and domain-specific usage can invalidate a literal word-based interpretation.",
    "Write three fictional sentences that challenge a word-based sentiment scorer. Explain the failure mode of each.",
  ],
  [
    "Project question and network data",
    "A feasible graph project needs a meaningful relation, a collection strategy and a question that graph methods can address. Check data coverage and constraints early.",
    "Draft a fictional graph-project question and its node/edge definitions. Name one collection bias.",
  ],
  [
    "Network and text baseline",
    "Establish a reproducible baseline before combining several techniques. Keep the distinction between graph structure and text-derived evidence clear.",
    "Propose a baseline graph measure and a baseline text measure for a fictional project. Explain what each can and cannot establish.",
  ],
  [
    "Video pitch and peer review",
    "A short pitch should communicate the question, data and planned evidence. Use peer feedback to identify a gap in feasibility or interpretation.",
    "Outline a one-minute fictional project pitch and three targeted questions for reviewers.",
  ],
  [
    "Validation and explanation",
    "Test whether a finding survives alternative graph-construction and text-processing choices. Communicate the effect of those choices alongside the result.",
    "Change one edge rule and one text normalization in a toy analysis. Explain a result that might be sensitive to each.",
  ],
  [
    "Final project delivery",
    "A final analysis should support its claims with readable figures, explicit methods and reproducible artifacts. Verify the final submission against the original project brief.",
    "Write a final-review checklist for a fictional network analysis with a methods note, labeled figure and reproduction instructions.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 9,
}).map((w) => ({ ...w, learn: {}[w.number] || course.website }));

export const obligations = [
  {
    id: "learn-66995",
    title: "Assignment 1",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270843&db=66995",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270843&db=66995",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-09-30T23:59:59+02:00",
    date: "30 September",
    time: "23:59",
  },
  {
    id: "learn-67839",
    title: "Assignment 2",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270843&db=67839",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270843&db=67839",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-11-04T23:59:59+01:00",
    date: "4 November",
    time: "23:59",
  },
  {
    id: "learn-68178",
    title: "Project Assignment A",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270843&db=68178",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270843&db=68178",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-11-18T23:59:59+01:00",
    date: "18 November",
    time: "23:59",
  },
  {
    id: "learn-68635",
    title: "Project Assignment B",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270843&db=68635",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270843&db=68635",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-12-10T23:59:59+01:00",
    date: "10 December",
    time: "23:59",
  },
];
