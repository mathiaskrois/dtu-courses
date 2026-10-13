import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02456",
  title: "Deep learning",
  shortTitle: "Deep learning",
  term: "Fall 2025",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/270871",
  website: "https://learn.inside.dtu.dk/d2l/home/270871",
  breakStart: "2025-10-13",
  breakEnd: "2025-10-19",
  periodStart: "2025-09-01",
  archived: true,
};

export const presentation = {
  subtitle: "Group project · two-hour written exam",
  assessment:
    "Weeks 1–8 contain learning activities with no mandatory exercise hand-ins. The project is completed in groups of 3–4, with project selection, an ungraded synopsis and a final report. The report is at most four pages excluding references and the AI declaration, uses the course template and links a repository with reproducible results. A two-hour paper multiple-choice exam permits printed material only. Project and exam jointly determine the grade.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "Copied 2024 peer-review calendar events are excluded; the course FAQ explicitly says Weeks 1–8 have no mandatory hand-ins. The Assessment summary & feedback assignment is an output/feedback space, not a student submission requirement. The archived written-exam date remains unconfirmed.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. Copied 2024 peer-review calendar events are excluded; the course FAQ explicitly says Weeks 1–8 have no mandatory hand-ins. The Assessment summary & feedback assignment is an output/feedback space, not a student submission requirement. The archived written-exam date remains unconfirmed.",
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
    "Shallow and deep networks",
    "A neural network composes transformations of its input. Nonlinear activations allow depth to represent relationships that a composition of linear maps cannot add.",
    "Compare two affine layers with and without an intervening nonlinearity. Explain when the two-layer network can be reduced to one affine map.",
  ],
  [
    "Losses, backpropagation and initialization",
    "The loss defines what training optimizes, while backpropagation applies the chain rule to compute derivatives. Initialization affects the signals and gradients that pass through the network.",
    "Trace the derivative through a two-operation scalar computation. Explain one consequence of initializing every hidden unit identically.",
  ],
  [
    "Performance, regularization and residual networks",
    "Reliable evaluation separates model selection from final testing. Regularization and residual connections address different problems in learning and optimization.",
    "Sketch a training/validation curve that suggests overfitting. Propose one check before changing the network architecture.",
  ],
  [
    "Convolutional networks",
    "Shared filters detect local patterns across positions. Their output dimensions depend on kernel size, stride and padding, which should be stated explicitly.",
    "Compute the output size of a 3-by-3 stride-one convolution on a 5-by-5 input with no padding. Explain what padding would change.",
  ],
  [
    "Recurrent networks",
    "A recurrent state summarizes a sequence through repeated updates. Long-range information can be difficult to preserve during learning or inference.",
    "Describe a sequence task where an early symbol matters much later. Explain why a fixed-size recurrent state could lose relevant information.",
  ],
  [
    "Transformers",
    "Attention combines information from several positions using learned relevance. Positional information is needed when the order of tokens changes the task.",
    "Compare a bag of words with an ordered sentence. Explain what positional information adds to an attention-based representation.",
  ],
  [
    "Unsupervised learning",
    "Autoencoders, variational models and adversarial models have different training objectives. Compare them through reconstruction, representation or generation according to the intended use.",
    "For a fictional image dataset, distinguish a reconstruction objective from a generative objective. Propose one check for each.",
  ],
  [
    "Mini-project and project selection",
    "The Week 8 mini-project is a learning activity without a required hand-in. The separate project-selection deadline determines the group project that follows.",
    "Draft a small baseline experiment with a validation split and a measurable goal. Keep it separate from the official project choice.",
  ],
  [
    "Project scope and baseline",
    "A project needs a question, a feasible dataset and a baseline before further model complexity. Agree on scope and responsibilities within the team.",
    "Draft a fictional project plan with a minimum experiment and one stretch goal. Explain which result would answer the question.",
  ],
  [
    "Synopsis and experimental design",
    "A synopsis should make the project concrete enough to start and realistic enough to finish. A useful experiment varies one consequential choice while controlling the comparison.",
    "Write a fictional experiment table with two model choices and a shared evaluation protocol. Identify a confound to avoid.",
  ],
  [
    "Evaluation and ablations",
    "An ablation tests whether a proposed component is responsible for the observed improvement. Match training and evaluation conditions when comparing variants.",
    "Design a toy ablation with and without a model component. State the evidence that would support retaining it.",
  ],
  [
    "Reproducibility and interpretation",
    "Keep configurations, seeds, environments and results together. Interpret patterns across runs and failure cases instead of selecting only the best observed score.",
    "Draft a reproduction checklist and a results table with three fictional runs. Explain the uncertainty the table reveals.",
  ],
  [
    "Report and exam preparation",
    "A concise report should connect the problem, method and evidence while making limitations explicit. Check template, page limit, repository link and AI declaration against the actual brief.",
    "Outline a fictional four-page report and list the artifacts needed to reproduce its central result.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 9,
}).map((w) => ({
  ...w,
  learn:
    {
      1: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1058712",
      2: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1059512",
      3: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1067080",
      4: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1071401",
      5: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1075497",
      6: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1078215",
      7: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1081377",
      8: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1087332",
    }[w.number] || course.website,
}));

export const obligations = [
  {
    id: "project-selection",
    title: "Register project preferences",
    audience: "Group",
    description:
      "Prioritize three project choices by Monday of teaching Week 8, as specified in the Fall 2025 project module.",
    url: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1058713",
    source: "https://learn.inside.dtu.dk/d2l/le/lessons/270871/units/1058713",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-10-27T23:59:00+01:00",
    date: "27 October",
    time: "23:59",
  },
  {
    id: "learn-66212",
    title: "Project synopsis",
    audience: "Group",
    description:
      "Ungraded planning synopsis: half a page to one page with the proposed topic, motivation, background, milestones and references; also send it to the supervisor.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270871&db=66212",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270871&db=66212",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-11-10T23:59:59+01:00",
    date: "10 November",
    time: "23:59",
  },
  {
    id: "learn-66211",
    title: "Final report",
    audience: "Group",
    description:
      "Group report: at most four pages excluding references and AI declaration, using the provided template, with a repository link and reproducible notebook.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270871&db=66211",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=270871&db=66211",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-12-05T23:59:59+01:00",
    date: "5 December",
    time: "23:59",
  },
  {
    id: "exam",
    title: "Written exam",
    audience: "Individual",
    description:
      "Weeks 1–8 contain learning activities with no mandatory exercise hand-ins. The project is completed in groups of 3–4, with project selection, an ungraded synopsis and a final report. The report is at most four pages excluding references and the AI declaration, uses the course template and links a repository with reproducible results. A two-hour paper multiple-choice exam permits printed material only. Project and exam jointly determine the grade.",
    url: "https://learn.inside.dtu.dk/d2l/home/270871",
    source: "https://learn.inside.dtu.dk/d2l/home/270871",
    checklist: [
      "Check the course-specific exam rules and syllabus.",
      "Confirm the archived date, time and placement in the official exam system.",
    ],
    date: "Date unconfirmed",
    time: "Check official instructions",
  },
];
