import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02450",
  title: "Introduction to Machine Learning and Data Mining",
  shortTitle: "Introduction to Machine Learning and Data Mining",
  term: "Spring 2025",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/242056",
  website: "https://learn.inside.dtu.dk/d2l/home/242056",
  breakStart: "2025-04-14",
  breakEnd: "2025-04-20",
  periodStart: "2025-02-03",
  archived: true,
};

export const presentation = {
  subtitle: "Two approved reports · four-hour exam",
  assessment:
    "Two group reports must be approved to pass the course. Approval is not a prerequisite for attending the exam. Groups normally contain three students. The Spring 2025 handbook describes a four-hour paper multiple-choice exam with negative marking, two A4 sheets of handwritten notes on both sides, and a calculator. Reports and exam contribute approximately 10 and 90 percent to the overall assessment.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "Resubmission spaces apply only when the corresponding main report was not approved. Learn stores their separate dates; they are shown as conditional tasks rather than extra requirements for everyone. The archived exam time and date are unconfirmed.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. Resubmission spaces apply only when the corresponding main report was not approved. Learn stores their separate dates; they are shown as conditional tasks rather than extra requirements for everyone. The archived exam time and date are unconfirmed.",
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
    "Introduction and feature extraction",
    "A learning problem starts with a question, an observation unit and a useful representation. Feature choices determine which information the model can use.",
    "Describe a fictional prediction task and three features. Identify a feature that would leak the answer into the model.",
  ],
  [
    "Summary statistics and similarity",
    "A summary preserves selected aspects of data while hiding others. Similarity depends on scale, units and the representation used to compare observations.",
    "Compare two small datasets with the same mean but different spreads. Explain why the mean alone cannot describe them.",
  ],
  [
    "Linear algebra and PCA",
    "PCA finds orthogonal directions of variation. Centering, scaling and the choice of dimensions affect what the resulting components represent.",
    "Sketch a two-dimensional dataset concentrated along a diagonal. Explain its first principal component and what a one-dimensional projection loses.",
  ],
  [
    "Probability and densities",
    "A probability density is not itself the probability of an exact observation. Events receive probabilities by integrating or summing over possible outcomes.",
    "Draw a simple density over an interval. Explain the probability of an interval and why a density value can exceed one.",
  ],
  [
    "Decision trees and linear regression",
    "A tree uses piecewise decisions, while linear regression relates a target to a weighted feature combination. Compare each model using held-out predictions and task-relevant error.",
    "Sketch a nonlinear target pattern. Explain one strength and one limitation of a straight-line model and a small tree.",
  ],
  [
    "Overfitting, cross-validation and neighbors",
    "A model can fit training variation that does not generalize. Cross-validation supports choosing complexity, but the final evaluation must remain independent of that choice.",
    "Compare nearest-neighbor predictions for k=1 and a larger k on a noisy toy dataset. Explain the bias/variance trade-off.",
  ],
  [
    "Evaluation and Naive Bayes",
    "Performance depends on the cost of different errors. Naive Bayes uses a conditional-independence approximation that can remain useful even when not literally true.",
    "Write a toy confusion matrix for an imbalanced classification problem. Compare accuracy with recall for the rare class.",
  ],
  [
    "Neural networks and bias/variance",
    "Nonlinear hidden units expand the functions a model can represent. More capacity can reduce underfitting while increasing the need for regularization and reliable evaluation.",
    "Count parameters in a tiny neural network and compare it with a linear model. Explain one consequence for overfitting.",
  ],
  [
    "AUC and ensemble methods",
    "Threshold-independent rankings and threshold-specific decisions answer different questions. Ensembles can improve prediction when their members make different errors.",
    "Give two classifiers with the same accuracy but different rankings. Explain why a ranking metric could distinguish them.",
  ],
  [
    "K-means and hierarchical clustering",
    "Clustering groups data according to a selected geometry and objective. Scaling and the chosen number of groups can materially change the result.",
    "Create four two-dimensional points with differently scaled axes. Predict how standardizing an axis could change their clustering.",
  ],
  [
    "Mixture models and density estimation",
    "A mixture combines component distributions with weighted contributions. Soft assignments express uncertainty that a hard cluster label hides.",
    "Draw two overlapping Gaussian components. Explain why a point in the overlap can have substantial membership in both.",
  ],
  [
    "Association mining and wrap-up",
    "Association rules describe co-occurrence patterns. High confidence can result from a common consequent, so compare it with the consequent's baseline frequency.",
    "Create a tiny basket table and compute support, confidence and lift for one rule. Explain what lift adds to confidence.",
  ],
  [
    "Recap and exam discussion",
    "Connect representation, modeling and evaluation rather than treating each method in isolation. State assumptions clearly when explaining why a model is appropriate.",
    "Build a comparison table for one classifier, one regression model and one clustering method. Include objective, assumptions and a failure case.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 999,
}).map((w) => ({ ...w, learn: {}[w.number] || course.website }));

export const obligations = [
  {
    id: "learn-61809",
    title: "Project 1 (main)",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242056&db=61809",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242056&db=61809",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-03-06T17:00:00+01:00",
    date: "6 March",
    time: "17:00",
  },
  {
    id: "learn-61810",
    title: "Project 1 (resubmissions) [IGNORE if your report 1 was approved]",
    audience: "Conditional · only if not approved",
    description:
      "This resubmission applies only if the main report was not approved. Students with an approved report should not resubmit.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242056&db=61810",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242056&db=61810",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-03-27T17:00:00+01:00",
    date: "27 March",
    time: "17:00",
  },
  {
    id: "learn-61811",
    title: "Project 2 (main)",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242056&db=61811",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242056&db=61811",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-04-10T17:00:00+02:00",
    date: "10 April",
    time: "17:00",
  },
  {
    id: "learn-61812",
    title: "Project 2 (resubmissions) [IGNORE if your report 2 was approved]",
    audience: "Conditional · only if not approved",
    description:
      "This resubmission applies only if the main report was not approved. Students with an approved report should not resubmit.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242056&db=61812",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242056&db=61812",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-05-01T17:00:00+02:00",
    date: "1 May",
    time: "17:00",
  },
  {
    id: "exam",
    title: "Written exam",
    audience: "Individual",
    description:
      "Two group reports must be approved to pass the course. Approval is not a prerequisite for attending the exam. Groups normally contain three students. The Spring 2025 handbook describes a four-hour paper multiple-choice exam with negative marking, two A4 sheets of handwritten notes on both sides, and a calculator. Reports and exam contribute approximately 10 and 90 percent to the overall assessment.",
    url: "https://learn.inside.dtu.dk/d2l/home/242056",
    source: "https://learn.inside.dtu.dk/d2l/home/242056",
    checklist: [
      "Check the course-specific exam rules and syllabus.",
      "Confirm the archived date, time and placement in the official exam system.",
    ],
    date: "Date unconfirmed",
    time: "Check official instructions",
  },
];
