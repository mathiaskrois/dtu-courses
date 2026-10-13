import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02460",
  title: "Advanced machine learning",
  shortTitle: "Advanced machine learning",
  term: "Spring 2026",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/296284",
  website: "https://learn.inside.dtu.dk/d2l/home/296284",
  breakStart: "2026-03-30",
  breakEnd: "2026-04-05",
  periodStart: "2026-02-02",
  archived: true,
};

export const presentation = {
  subtitle: "Three mini-projects · written exam",
  assessment:
    "Three modules each end with a mini-project in groups of 3–4. The course structure limits each project report to one page, excluding references and relevant code. The written exam lasts two hours and permits up to three single-sided pages of handwritten notes. The final grade uses both projects and exam; no weighting is inferred.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "Mini-project deadlines follow Learn, including Project 2 on 2 April during the Easter break. Shallow embedding and Graph classification are listed individual exercise submission spaces, not additional graded mini-projects. The archived exam date is unconfirmed.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. Mini-project deadlines follow Learn, including Project 2 on 2 April during the Easter break. Shallow embedding and Graph classification are listed individual exercise submission spaces, not additional graded mini-projects. The archived exam date is unconfirmed.",
};

const sessions = [
  {
    start: "2026-02-02",
    end: "2026-02-08",
    date: "2026-02-05",
  },
  {
    start: "2026-02-09",
    end: "2026-02-15",
    date: "2026-02-12",
  },
  {
    start: "2026-02-16",
    end: "2026-02-22",
    date: "2026-02-19",
  },
  {
    start: "2026-02-23",
    end: "2026-03-01",
    date: "2026-02-26",
  },
  {
    start: "2026-03-02",
    end: "2026-03-08",
    date: "2026-03-05",
  },
  {
    start: "2026-03-09",
    end: "2026-03-15",
    date: "2026-03-12",
  },
  {
    start: "2026-03-16",
    end: "2026-03-22",
    date: "2026-03-19",
  },
  {
    start: "2026-03-23",
    end: "2026-03-29",
    date: "2026-03-26",
  },
  {
    start: "2026-04-06",
    end: "2026-04-12",
    date: "2026-04-09",
  },
  {
    start: "2026-04-13",
    end: "2026-04-19",
    date: "2026-04-16",
  },
  {
    start: "2026-04-20",
    end: "2026-04-26",
    date: "2026-04-23",
  },
  {
    start: "2026-04-27",
    end: "2026-05-03",
    date: "2026-04-30",
  },
  {
    start: "2026-05-04",
    end: "2026-05-10",
    date: "2026-05-07",
  },
];

const topics = [
  [
    "Deep latent variable models",
    "A latent-variable model describes observations through unobserved variables. Approximate inference and the generative model have distinct roles, which should remain clear when interpreting a variational objective.",
    "Draw a model with one latent and one observed variable. Explain the difference between sampling observations and inferring a latent state.",
  ],
  [
    "Normalizing flows",
    "An invertible transformation changes a probability density through its Jacobian determinant. Expressive transformations still need tractable inversion and density evaluation.",
    "Transform a scalar variable using y=2x. Explain how interval width and probability density change while total probability stays the same.",
  ],
  [
    "Diffusion models",
    "Diffusion training relates noisy observations to a denoising prediction problem. The forward noise process and the learned reverse process serve different purposes.",
    "Describe two noise levels applied to the same toy signal. Explain why recovering the original signal becomes more ambiguous at the higher level.",
  ],
  [
    "Mini-project 1",
    "A generative-model comparison needs a consistent dataset, evaluation procedure and implementation assumptions. The official project brief determines what must be submitted.",
    "Draft a small comparison protocol for two toy generative models. State one quantitative check and one qualitative failure mode.",
  ],
  [
    "Representation invariance",
    "Different latent coordinates can represent the same observations. Interpretation should distinguish a change in coordinates from a meaningful change in the underlying model.",
    "Describe a rotation of a two-dimensional latent representation. Explain which observable quantities should remain unchanged.",
  ],
  [
    "Geodesics",
    "A pull-back metric measures latent movements through their effect on observations. A straight line in latent coordinates need not be the shortest path under that metric.",
    "Sketch a curved surface and two routes between points. Explain why coordinate distance and intrinsic path length differ.",
  ],
  [
    "Information geometry",
    "A parameter change can be measured by its effect on a probability distribution. Geometry based on that effect differs from treating every coordinate direction equally.",
    "Compare a parameter change that strongly affects predictions with one that barely affects them. Explain why equal coordinate steps need not have equal statistical size.",
  ],
  [
    "Mini-project 2",
    "Geometry-based claims need a precise metric, numerical procedure and a comparison that checks the claimed invariance or path behavior.",
    "Write a toy experiment that compares two coordinate systems representing the same object. Specify the result that would support invariance.",
  ],
  [
    "Graphs and node embeddings",
    "An embedding compresses relationships in a graph into vector representations. What it preserves depends on the learning objective and the definition of neighbors.",
    "Draw a five-node graph with two communities. Propose a similarity objective and identify one feature an embedding might lose.",
  ],
  [
    "Graph neural networks",
    "Message passing updates node representations from their neighbors. Invariance to node indexing is essential when the labels of nodes have no semantic order.",
    "Relabel the nodes of a small graph. Explain which predictions should stay the same and how a neighborhood aggregation can respect that.",
  ],
  [
    "Theory and graph generative models",
    "A graph-learning model has limits on which structures it can distinguish or generate. Evaluation should probe structural properties as well as aggregate predictive scores.",
    "Propose two different graph structures with similar local degree statistics. Explain why a local statistic alone cannot establish structural equivalence.",
  ],
  [
    "Mini-project 3",
    "A graph experiment should match its split and evaluation to the prediction task. Avoid information leakage through shared graph structure or duplicated observations.",
    "Design a train/test split for a toy graph-classification dataset. State one leakage risk and one check.",
  ],
  [
    "Recap and exam preparation",
    "Connect the three modules through representation, probability and evaluation. Explaining assumptions clearly is more useful than memorizing isolated model names.",
    "Write one question linking generative models to geometric representations and one linking representations to graphs. Outline how you would answer each.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 999,
}).map((w) => ({
  ...w,
  learn:
    {
      1: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148815",
      2: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148816",
      3: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148817",
      4: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148818",
      5: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148819",
      6: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148820",
      7: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148821",
      8: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148822",
      9: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148824",
      10: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148825",
      11: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148826",
      12: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148827",
      13: "https://learn.inside.dtu.dk/d2l/le/lessons/296284/units/1148823",
    }[w.number] || course.website,
}));

export const obligations = [
  {
    id: "learn-70317",
    title: "Mini project 1",
    audience: "Group",
    description:
      "Group mini-project: submit a report of at most one page, excluding references and relevant code, using the template linked in the project module.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=70317",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=70317",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-03-05T12:00:00+01:00",
    date: "5 March",
    time: "12:00",
  },
  {
    id: "learn-70321",
    title: "Mini-project 2",
    audience: "Group",
    description:
      "Group mini-project: submit a report of at most one page, excluding references and relevant code, using the template linked in the project module.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=70321",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=70321",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-04-02T23:59:59+02:00",
    date: "2 April",
    time: "23:59",
  },
  {
    id: "learn-72124",
    title: "Shallow embedding",
    audience: "Individual · exercise",
    description:
      "A dated exercise submission space in Learn. It is separate from the three assessed group mini-projects; confirm its role in the original exercise instructions.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=72124",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=72124",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-04-15T17:00:00+02:00",
    date: "15 April",
    time: "17:00",
  },
  {
    id: "learn-72125",
    title: "Graph classification",
    audience: "Individual · exercise",
    description:
      "A dated exercise submission space in Learn. It is separate from the three assessed group mini-projects; confirm its role in the original exercise instructions.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=72125",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=72125",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-04-29T17:00:00+02:00",
    date: "29 April",
    time: "17:00",
  },
  {
    id: "learn-70320",
    title: "Mini project 3",
    audience: "Group",
    description:
      "Group mini-project: submit a report of at most one page, excluding references and relevant code, using the template linked in the project module.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=70320",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296284&db=70320",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-05-07T12:00:00+02:00",
    date: "7 May",
    time: "12:00",
  },
  {
    id: "exam",
    title: "Written exam",
    audience: "Individual",
    description:
      "Three modules each end with a mini-project in groups of 3–4. The course structure limits each project report to one page, excluding references and relevant code. The written exam lasts two hours and permits up to three single-sided pages of handwritten notes. The final grade uses both projects and exam; no weighting is inferred.",
    url: "https://learn.inside.dtu.dk/d2l/home/296284",
    source: "https://learn.inside.dtu.dk/d2l/home/296284",
    checklist: [
      "Check the course-specific exam rules and syllabus.",
      "Confirm the archived date, time and placement in the official exam system.",
    ],
    date: "Date unconfirmed",
    time: "Check official instructions",
  },
];
