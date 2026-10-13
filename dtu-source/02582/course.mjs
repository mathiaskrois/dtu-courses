import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02582",
  title: "Computational Data Analysis",
  shortTitle: "Computational Data Analysis",
  term: "Spring 2026",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/296275",
  website:
    "https://learn.inside.dtu.dk/d2l/le/content/296275/viewContent/1174431/View",
  breakStart: "2026-03-30",
  breakEnd: "2026-04-05",
  periodStart: "2026-02-02",
  archived: true,
};

export const presentation = {
  warning: "Case 2: 5 May 2026, 23:59 in Learn; the course overview says 2 May.",
  subtitle: "Two cases · written exam",
  assessment:
    "Two applied cases, including a report and video poster for Case 2, plus a written examination. Learn also lists project-synopsis peer feedback. The overview gives a written-exam date of 20 May; confirm the archived time and room in the exam system. No grading split is inferred here.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "The course overview says Case 2 is due 2 May, but the checked Learn report and poster assignments both say 5 May 2026 at 23:59. The tracker follows Learn. Old 2025 peer-review events are excluded from this 2026 edition.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. The course overview says Case 2 is due 2 May, but the checked Learn report and poster assignments both say 5 May 2026 at 23:59. The tracker follows Learn. Old 2025 peer-review events are excluded from this 2026 edition.",
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
    "Regression, bias and variance",
    "Prediction error combines variation in data with error from estimating a model. Collinear features can make ordinary least-squares coefficients unstable; ridge regularization trades some bias for stability.",
    "Compare two nearly identical input features in a tiny regression example. Explain why several coefficient choices can give similar predictions and what ridge changes.",
  ],
  [
    "Model selection and resampling",
    "Validation estimates performance on unseen cases. Tune a model inside the training procedure and keep the final evaluation separate from selecting its complexity.",
    "Design a train/validation/test split for 12 fictional observations. Explain which split chooses k in nearest neighbors and which assesses the chosen model.",
  ],
  [
    "Sparse regression and multiple testing",
    "LASSO can set coefficients to zero, while elastic net combines sparsity with a quadratic penalty. Testing many hypotheses requires controlling false positives across the collection.",
    "Imagine 100 independent tests with no real effect and a 0.05 significance threshold. Estimate the expected false positives and explain why a correction is useful.",
  ],
  [
    "Linear classification and flexible boundaries",
    "Linear discriminant analysis and logistic regression model class separation differently. Their assumptions and the selected threshold affect classification errors.",
    "Sketch two classes with unequal spread. Compare an LDA boundary with a more flexible alternative and name an assumption that should be checked.",
  ],
  [
    "Trees and bagging",
    "A tree partitions feature space through successive decisions. Bagging averages models trained on resampled data, which can reduce the instability of an individual tree.",
    "Write a two-level decision tree for a fictional classification problem. Explain how a small change in training data could change its first split.",
  ],
  [
    "Boosting and random forests",
    "Boosting builds successive models to address remaining errors. Random forests reduce correlation between trees by combining bootstrap sampling with feature subsampling.",
    "Compare averaging three independent toy predictors with averaging three identical predictors. Explain why diversity matters to an ensemble.",
  ],
  [
    "Support vector machines",
    "The margin separates classes while a penalty allows violations. A kernel changes the representation used to compare observations without explicitly constructing every feature.",
    "Draw a separable two-dimensional dataset with one outlier. Explain the trade-off between a wider margin and penalizing the outlier.",
  ],
  [
    "Subspace methods",
    "PCA preserves variation in one dataset, while CCA and PLS relate information across variables or datasets. The chosen objective determines which directions matter.",
    "Sketch a dataset where the direction of greatest variation is unrelated to the target. Explain why PCA and a supervised projection may differ.",
  ],
  [
    "Unsupervised clustering",
    "Clusters depend on representation, distance and model assumptions. A grouping should be checked for stability and practical meaning rather than accepted because an algorithm returned labels.",
    "Create six two-dimensional points with an elongated group. Compare the assumptions of k-means and a Gaussian mixture.",
  ],
  [
    "Artificial neural networks",
    "Hidden layers compose nonlinear transformations. Capacity alone does not establish predictive usefulness; training, regularization and validation remain essential.",
    "Sketch a one-hidden-layer network. Count the parameters for two inputs, three hidden units and one output, including biases.",
  ],
  [
    "Unsupervised decompositions",
    "NMF, sparse coding, archetypal analysis and ICA impose different constraints on a decomposition. Interpret a component according to the objective and constraints that produced it.",
    "Compare a nonnegative component mixture with a signed linear combination. Explain how their interpretations and feasible reconstructions differ.",
  ],
  [
    "Multiway models",
    "Tensor models preserve interactions among several axes instead of flattening every observation into one matrix. Factor interpretation depends on how those axes are defined.",
    "Describe a small user-by-item-by-time tensor. Name each axis and explain one relationship that flattening could obscure.",
  ],
  [
    "Case 2 poster peer review",
    "A concise poster should connect the research question, computational method and evidence. Technical feedback should identify a concrete issue and a change that would improve the argument.",
    "Write a short review checklist for a fictional poster: problem, method, evaluation and uncertainty. Keep this practice separate from the official peer-review submission.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 999,
}).map((w) => ({
  ...w,
  learn:
    {
      1: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1160404",
      2: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1163565",
      3: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1166904",
      4: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1170295",
      5: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1174290",
      6: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1177869",
      7: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1180703",
      8: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1183032",
      9: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1186040",
      10: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1189334",
      11: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1192392",
      12: "https://learn.inside.dtu.dk/d2l/le/lessons/296275/units/1194388",
    }[w.number] || course.website,
}));

export const obligations = [
  {
    id: "learn-71102",
    title: "case 1 handin",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296275&db=71102",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296275&db=71102",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-03-28T23:59:59+01:00",
    date: "28 March",
    time: "23:59",
  },
  {
    id: "learn-72422",
    title: "Case 2 report (only!) handin",
    audience: "Group",
    description:
      "Submit the Case 2 report as a PDF through the report-only Learn assignment.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296275&db=72422",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296275&db=72422",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-05-05T23:59:59+02:00",
    date: "5 May",
    time: "23:59",
  },
  {
    id: "learn-72423",
    title: "Case 2 video poster (only!) handin",
    audience: "Group",
    description:
      "Submit the Case 2 video poster through its separate Learn space; this component is evaluated pass/fail.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296275&db=72423",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296275&db=72423",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-05-05T23:59:59+02:00",
    date: "5 May",
    time: "23:59",
  },
  {
    id: "calendar-380944",
    title: "Hand in as group - Peer-feedback for project synopsis",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/296275/event/421393/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/296275/event/421393/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-05-06T23:59:00+02:00",
    date: "6 May",
    time: "23:59",
  },
  {
    id: "calendar-380943",
    title: "Give feedback - Peer-feedback for project synopsis",
    audience: "Peer review",
    description:
      "A course-specific peer-review task recorded in the current edition’s Learn calendar. Read the linked activity for the audience, number of reviews and detailed criteria.",
    url: "https://learn.inside.dtu.dk/d2l/le/calendar/296275/event/421392/detailsview",
    source:
      "https://learn.inside.dtu.dk/d2l/le/calendar/296275/event/421392/detailsview",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2026-05-14T23:59:00+02:00",
    date: "14 May",
    time: "23:59",
  },
  {
    id: "exam",
    title: "Written exam",
    audience: "Individual",
    description:
      "The Spring 2026 course overview specifies 20 May. Confirm the archived time, room and aids in the official exam system.",
    url: "https://learn.inside.dtu.dk/d2l/home/296275",
    source:
      "https://learn.inside.dtu.dk/d2l/le/content/296275/viewContent/1174431/View",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    dateOnly: "2026-05-20",
    date: "20 May",
    time: "Time to confirm",
  },
];
