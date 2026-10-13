import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02506",
  title: "Advanced Image Analysis",
  shortTitle: "Advanced Image Analysis",
  term: "Spring 2026",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/296294",
  website: "https://learn.inside.dtu.dk/d2l/home/296294",
  breakStart: "2026-03-30",
  breakEnd: "2026-04-05",
  periodStart: "2026-02-02",
  archived: true,
};

export const presentation = {
  warning: "Exam and group-enrollment dates are unconfirmed.",
  subtitle: "Poster · written exam",
  assessment:
    "The Learn grading note combines up to 5 points for poster participation with up to 20 points for the written exam; the stated passing threshold is 12 out of 25. Groups must enroll to see the competition and poster assignments. Confirm the actual 2026 exam date and individual placement.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "The Exam module says Monday 2 June, a weekday/date combination from 2025 rather than 2026. Its calendar exam event has no date. The exam therefore remains undated here. Group-enrollment spaces are also undated. Weekly quiz-question resources are not automatically treated as graded requirements.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. The Exam module says Monday 2 June, a weekday/date combination from 2025 rather than 2026. Its calendar exam event has no date. The exam therefore remains undated here. Group-enrollment spaces are also undated. Weekly quiz-question resources are not automatically treated as graded requirements.",
};

const sessions = [
  {
    start: "2026-02-02",
    end: "2026-02-08",
    date: "2026-02-04",
  },
  {
    start: "2026-02-09",
    end: "2026-02-15",
    date: "2026-02-11",
  },
  {
    start: "2026-02-16",
    end: "2026-02-22",
    date: "2026-02-18",
  },
  {
    start: "2026-02-23",
    end: "2026-03-01",
    date: "2026-02-25",
  },
  {
    start: "2026-03-02",
    end: "2026-03-08",
    date: "2026-03-04",
  },
  {
    start: "2026-03-09",
    end: "2026-03-15",
    date: "2026-03-11",
  },
  {
    start: "2026-03-16",
    end: "2026-03-22",
    date: "2026-03-18",
  },
  {
    start: "2026-03-23",
    end: "2026-03-29",
    date: "2026-03-25",
  },
  {
    start: "2026-04-06",
    end: "2026-04-12",
    date: "2026-04-08",
  },
  {
    start: "2026-04-13",
    end: "2026-04-19",
    date: "2026-04-15",
  },
  {
    start: "2026-04-20",
    end: "2026-04-26",
    date: "2026-04-22",
  },
  {
    start: "2026-04-27",
    end: "2026-05-03",
    date: "2026-04-29",
  },
  {
    start: "2026-05-04",
    end: "2026-05-10",
    date: "2026-05-06",
  },
];

const topics = [
  [
    "Introduction to image analysis",
    "An image-analysis pipeline connects measurements, representation and a task. Evaluate an algorithm using the error that matters to the intended application, not only the appearance of its output.",
    "Describe a tiny image-classification task and one segmentation task. State the input, output and a useful error measure for each.",
  ],
  [
    "Scale-space",
    "Smoothing exposes structure at different spatial scales. A feature that survives changes in scale is different from a local fluctuation that disappears after slight smoothing.",
    "Sketch a one-dimensional intensity profile with a narrow and a broad peak. Predict how increasing Gaussian smoothing changes each peak.",
  ],
  [
    "Feature-based registration",
    "Registration estimates a transformation from corresponding image features. Outliers and poorly distributed matches can make the estimate unreliable.",
    "Give three matched point pairs for a simple translation. Recover the translation, then explain how you would detect one mismatched pair.",
  ],
  [
    "Feature-based segmentation",
    "Pixel features convert local appearance into a representation for classification. The feature neighborhood and decision rule affect whether nearby pixels receive consistent labels.",
    "Propose intensity and texture features for separating two fictional image regions. Identify one situation in which intensity alone fails.",
  ],
  [
    "Markov random fields",
    "Unary costs describe local evidence while pairwise terms favor compatible labels at neighboring sites. Their balance controls the trade-off between fit and spatial regularity.",
    "Write a two-pixel example with conflicting local label preferences. Explain how increasing a smoothness penalty could change the preferred labeling.",
  ],
  [
    "Deformable models",
    "An evolving contour balances agreement with image evidence against constraints on its shape. Initialization and the energy definition influence which boundary is found.",
    "Sketch a contour around a low-contrast object. Describe one image term and one regularization term that would help it evolve.",
  ],
  [
    "Layered surfaces",
    "Surface detection can be formulated with linked candidate positions and constraints between layers. The graph representation should encode which surfaces are feasible.",
    "Draw two ordered layers in a small column-wise image. Explain a constraint that prevents them from crossing.",
  ],
  [
    "Feed-forward neural networks",
    "A multilayer perceptron learns a composition of affine maps and nonlinearities. Training requires gradients of a loss that matches the prediction task.",
    "Count weights and biases in a network with two inputs, two hidden units and one output. Explain what changes if the activation is removed.",
  ],
  [
    "Image classification",
    "Generalization depends on the relationship between training images and evaluation images. Data augmentation and regularization are useful only when they respect the task's invariances.",
    "Design a split for images from three patients. Explain why randomly mixing images from the same patient can exaggerate performance.",
  ],
  [
    "Convolutional neural networks",
    "Convolutions reuse local filters across an image. The receptive field describes which input positions can influence a particular activation.",
    "Trace the receptive field of two successive 3-by-3 stride-one convolutions. State a boundary convention and explain why it matters.",
  ],
  [
    "Mini-project: choose and test",
    "A manageable image-analysis project needs a clear question, a baseline and an evaluation plan. Set the scope before adding a complicated method.",
    "Draft a fictional mini-project with one measurable objective and a simple baseline. This is a planning exercise, not the assessed project.",
  ],
  [
    "Mini-project: evaluate and explain",
    "Inspect both successful and failed cases. A mean score can hide a systematic weakness in a specific class, image quality or acquisition condition.",
    "Create a toy results table for two methods and three image conditions. Explain one pattern the overall mean would hide.",
  ],
  [
    "Poster session",
    "A poster should make the question, method, evidence and limitations easy to inspect. A visual result needs enough context for the audience to judge it.",
    "Draft four poster headings and a caption for one fictional result. Include the comparison and its main limitation.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 999,
}).map((w) => ({
  ...w,
  learn:
    {
      1: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137365",
      2: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137366",
      3: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137368",
      4: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137367",
      5: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137370",
      6: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137371",
      7: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137372",
      8: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137373",
      9: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137374",
      10: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137375",
      11: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137376",
      12: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137376",
      13: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137378",
    }[w.number] || course.website,
}));

export const obligations = [
  {
    id: "poster",
    title: "Poster session",
    audience: "Group",
    description:
      "Present the mini-project poster at the Week 13 session. Poster participation contributes up to five points under the checked grading note.",
    url: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137378",
    source: "https://learn.inside.dtu.dk/d2l/le/lessons/296294/units/1137378",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    dateOnly: "2026-05-06",
    date: "6 May",
    time: "Time to confirm",
  },
  {
    id: "learn-69867",
    title: "Group enrollment week 9",
    audience: "Individual registration",
    description:
      "Join the prepared Learn group to reveal the competition or poster assignment. Follow the corresponding week instructions; no date is published for this registration space.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296294&db=69867",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296294&db=69867",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    date: "Date unconfirmed",
    time: "Check official instructions",
  },
  {
    id: "learn-69868",
    title: "Group enrollment week 13",
    audience: "Individual registration",
    description:
      "Join the prepared Learn group to reveal the competition or poster assignment. Follow the corresponding week instructions; no date is published for this registration space.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296294&db=69868",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=296294&db=69868",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    date: "Date unconfirmed",
    time: "Check official instructions",
  },
  {
    id: "exam",
    title: "Written exam",
    audience: "Individual",
    description:
      "The Learn grading note combines up to 5 points for poster participation with up to 20 points for the written exam; the stated passing threshold is 12 out of 25. Groups must enroll to see the competition and poster assignments. Confirm the actual 2026 exam date and individual placement.",
    url: "https://learn.inside.dtu.dk/d2l/home/296294",
    source: "https://learn.inside.dtu.dk/d2l/home/296294",
    checklist: [
      "Check the course-specific exam rules and syllabus.",
      "Confirm the archived date, time and placement in the official exam system.",
    ],
    date: "Date unconfirmed",
    time: "Check official instructions",
  },
];
