import { studyPlan } from "../lib/study-plan.mjs";

export const course = {
  id: "02613",
  title: "Python and high-performance computing",
  shortTitle: "Python and high-performance computing",
  term: "Spring 2025",
  verified: "14 October 2026",
  learn: "https://learn.inside.dtu.dk/d2l/home/242101",
  website: "https://learn.inside.dtu.dk/d2l/home/242101",
  breakStart: "2025-04-14",
  breakEnd: "2025-04-20",
  periodStart: "2025-02-03",
  archived: true,
};

export const presentation = {
  subtitle: "Autolab eligibility · mini-project · exam",
  assessment:
    "Exam eligibility requires an approved mini-project in a group of 3–4 and at least 20 Autolab exercises scored at 100 correctness, including at least one from every exercise week except Week 2. The mini-project is due 4 May at 23:55; the Autolab requirement is due 12 May. The archived exam format is multiple choice with aids but no internet.",
  deadlineIntro:
    "Dates and tasks from this course edition’s Learn assignments and calendar. Check the assessment note for which tasks are graded, conditional or formative.",
  dateNote:
    "Old 2024 calendar entries are excluded. Current dates come from the Spring 2025 teaching calendar and assignment metadata. The Autolab deadline has a confirmed date but no checked time, and the exam date remains unconfirmed.",
  materialIntro:
    "Official course topics, files and linked resources. Learn links require DTU login. Original explanations and optional practice remain separate from official assessed work.",
  sourceNote:
    "Archived edition checked in authenticated DTU Learn on 14 October 2026. Dates follow the correct course period; copied events from earlier years are excluded. The on-page explanations and study prompts are original guidance. Old 2024 calendar entries are excluded. Current dates come from the Spring 2025 teaching calendar and assignment metadata. The Autolab deadline has a confirmed date but no checked time, and the exam date remains unconfirmed.",
};

const sessions = [
  {
    start: "2025-02-03",
    end: "2025-02-09",
    date: "2025-02-05",
  },
  {
    start: "2025-02-10",
    end: "2025-02-16",
    date: "2025-02-12",
  },
  {
    start: "2025-02-17",
    end: "2025-02-23",
    date: "2025-02-19",
  },
  {
    start: "2025-02-24",
    end: "2025-03-02",
    date: "2025-02-26",
  },
  {
    start: "2025-03-03",
    end: "2025-03-09",
    date: "2025-03-05",
  },
  {
    start: "2025-03-10",
    end: "2025-03-16",
    date: "2025-03-12",
  },
  {
    start: "2025-03-17",
    end: "2025-03-23",
    date: "2025-03-19",
  },
  {
    start: "2025-03-24",
    end: "2025-03-30",
    date: "2025-03-26",
  },
  {
    start: "2025-03-31",
    end: "2025-04-06",
    date: "2025-04-02",
  },
  {
    start: "2025-04-07",
    end: "2025-04-13",
    date: "2025-04-09",
  },
  {
    start: "2025-04-21",
    end: "2025-04-27",
    date: "2025-04-23",
  },
  {
    start: "2025-04-28",
    end: "2025-05-04",
    date: "2025-04-30",
  },
  {
    start: "2025-05-05",
    end: "2025-05-11",
    date: "2025-05-07",
  },
];

const topics = [
  [
    "Introduction to Python and HPC",
    "High-performance work starts with a correct computation and an understanding of its bottleneck. Faster hardware cannot repair a wrong algorithm or an invalid comparison.",
    "Describe a small numerical task. Give a correctness check and a measurement that could identify its bottleneck.",
  ],
  [
    "Python bootcamp",
    "Array shapes, types and indexing are part of a program's meaning. Make them explicit when translating a mathematical operation into Python.",
    "Trace the shape of a small matrix product. Explain one indexing mistake that would still produce a plausible-looking result.",
  ],
  [
    "The memory hierarchy",
    "Moving data can cost more than arithmetic. Locality and reuse determine whether a program benefits from caches and contiguous storage.",
    "Compare row-wise and column-wise traversal of a row-major matrix. Explain how their memory access patterns differ.",
  ],
  [
    "Profiling and high-performance NumPy",
    "Profile representative work before optimizing it. Vectorization helps when it reduces overhead without creating excessive intermediate arrays.",
    "Design a timing comparison for a loop and a vectorized operation. State how you would avoid measuring only startup overhead.",
  ],
  [
    "Parallelism: decomposition",
    "Parallel speedup depends on how work is divided and how much serial work remains. Communication and synchronization can dominate small tasks.",
    "Apply Amdahl's law to a toy program with a 25 percent serial portion. Explain the maximum possible speedup.",
  ],
  [
    "Parallelism: coordination",
    "Shared data and concurrent updates introduce coordination requirements. A parallel program needs a clear account of ownership and synchronization.",
    "Describe a race condition in a shared counter and one way to avoid it. Explain a cost introduced by the fix.",
  ],
  [
    "Pandas and Apache Arrow",
    "Column types, memory layout and conversion costs affect data-processing performance. Choose representations that support the operations and scale of the workload.",
    "Compare a numeric column stored as numbers with the same values stored as strings. Explain one memory and one computation consequence.",
  ],
  [
    "Storing big data",
    "A storage format shapes how efficiently data can be read, filtered and exchanged. Chunking and compression should match the access pattern.",
    "Design chunks for reading a small subset of columns from a large table. Explain a workload for which your choice would be poor.",
  ],
  [
    "Numba and GPU computing",
    "Compilation and acceleration help workloads with enough repeated computation to amortize setup and transfer costs. Verify numerical behavior as well as timing.",
    "Describe when copying data to a GPU could take longer than the computation it accelerates. Propose a fair timing boundary.",
  ],
  [
    "CuPy and GPU profiling",
    "GPU operations can be asynchronous, so naive timing may measure only launch overhead. Synchronize deliberately when evaluating performance.",
    "Outline a GPU timing experiment with warm-up and synchronization. Explain what each step prevents.",
  ],
  [
    "HPC workflows",
    "A batch job needs explicit resources, environment and outputs. Keep experimental provenance with the job so a result can be reproduced or diagnosed.",
    "Draft a fictional batch-job checklist covering memory, runtime, environment, input data and output logs.",
  ],
  [
    "Project work",
    "A performance claim needs a correct baseline, a representative workload and a reproducible comparison. Explain trade-offs instead of reporting a speedup alone.",
    "Design a toy performance comparison with a correctness check, workload description and timing summary.",
  ],
  [
    "Common pitfalls and exam preparation",
    "Check units, synchronization, memory costs and numerical assumptions before drawing a performance conclusion. Be able to explain why an optimization helps a particular workload.",
    "List three ways a benchmark could mislead and a concrete check for each.",
  ],
];

export const weeks = studyPlan(sessions, topics, {
  source: course.learn,
  projectFrom: 999,
}).map((w) => ({
  ...w,
  learn:
    {
      1: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920696",
      2: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920697",
      3: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920698",
      4: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920699",
      5: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920700",
      6: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920701",
      7: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920702",
      8: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920703",
      9: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920704",
      10: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920705",
      11: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920706",
      12: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920707",
      13: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920708",
    }[w.number] || course.website,
}));

export const obligations = [
  {
    id: "learn-62650",
    title: "Mini-project",
    audience: "Group",
    description:
      "Use the original Learn assignment and its brief for the required deliverables.",
    url: "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242101&db=62650",
    source:
      "https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=242101&db=62650",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    due: "2025-05-04T23:55:00+02:00",
    date: "4 May",
    time: "23:55",
  },
  {
    id: "autolab",
    title: "Complete the Autolab eligibility requirement",
    audience: "Individual",
    description:
      "Complete at least 20 exercises with 100 correctness and at least one exercise from every exercise week except Week 2. This and approval of the group mini-project are exam-eligibility requirements.",
    url: "https://autolab.compute.dtu.dk/",
    source: "https://learn.inside.dtu.dk/d2l/le/lessons/242101/units/920695",
    checklist: [
      "Read the original instructions and check whether this submission applies to you.",
      "Confirm the required format and submit through the official course system.",
      "Keep the submission receipt; this personal tracker does not establish submission status.",
    ],
    dateOnly: "2025-05-12",
    date: "12 May",
    time: "Time to confirm",
  },
  {
    id: "exam",
    title: "Written exam",
    audience: "Individual",
    description:
      "Exam eligibility requires an approved mini-project in a group of 3–4 and at least 20 Autolab exercises scored at 100 correctness, including at least one from every exercise week except Week 2. The mini-project is due 4 May at 23:55; the Autolab requirement is due 12 May. The archived exam format is multiple choice with aids but no internet.",
    url: "https://learn.inside.dtu.dk/d2l/home/242101",
    source: "https://learn.inside.dtu.dk/d2l/home/242101",
    checklist: [
      "Check the course-specific exam rules and syllabus.",
      "Confirm the archived date, time and placement in the official exam system.",
    ],
    date: "Date unconfirmed",
    time: "Check official instructions",
  },
];
