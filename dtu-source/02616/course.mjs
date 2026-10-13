export const course={
  "id": "02616",
  "title": "Large-scale Modelling",
  "shortTitle": "Large-scale Modelling",
  "term": "Fall 2026",
  "verified": "13 October 2026",
  "learn": "https://learn.inside.dtu.dk/d2l/home/326362",
  "website": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
  "project": "https://learn.inside.dtu.dk/d2l/le/content/326362/viewContent/1266165/View",
  "breakStart": "2026-10-12",
  "breakEnd": "2026-10-18",
  "noExam": false
};
export const obligations=[
  {
    "id": "project-1",
    "title": "Submit Project 1 \u00b7 Mandelbrot",
    "audience": "Group \u00b7 3\u20134",
    "due": "2026-10-18T21:59:59.000Z",
    "date": "18 October",
    "time": "23:59",
    "url": "https://learn.inside.dtu.dk/d2l/common/dialogs/quickLink/quickLink.d2l?ou=326362&type=dropbox&rcode=dtu-921821",
    "source": "https://learn.inside.dtu.dk/d2l/home/326362",
    "description": "Submit the first group project report. Use MPI for the Mandelbrot calculation and explain the observed scaling behaviour.",
    "checklist": [
      "Work in your enrolled group of 3\u20134 students.",
      "Develop the MPI Mandelbrot implementation and experiments required by the project brief.",
      "Explain scaling, timings and implementation behaviour; one well-investigated approach is preferable to several unexplained ones.",
      "Submit the report and any required accompanying files through the Learn assignment. Check the brief for exact format, length and file requirements; these were not supplied in the folder metadata.",
      "If AI was used for hand-in material, declare its purpose and which content it generated or edited.",
      "Confirm the uploaded files and submission receipt before Sunday 18 October at 23:59."
    ]
  },
  {
    "id": "oral-exam",
    "title": "Present your work \u00b7 oral exam",
    "audience": "Presentation + questions",
    "due": "2026-12-11T00:00:00+01:00",
    "dateOnly": "2026-12-11",
    "date": "11 December",
    "time": "Individual time to confirm",
    "url": "https://learn.inside.dtu.dk/d2l/home/326362",
    "source": "https://learn.inside.dtu.dk/d2l/le/content/326362/viewContent/1266165/View",
    "description": "The course briefing schedules student presentations and questions on Friday 11 December, all day. Confirm your individual appointment.",
    "checklist": [
      "Check the final presentation schedule, location and allocated time in Learn.",
      "Be ready to explain both projects, your experiments and the reasons for their behaviour.",
      "Revisit MPI, multiprocessing, communication, scaling and parallel I/O as used in your work.",
      "11 December is confirmed in the intro slides; your individual time is not listed here."
    ]
  },
  {
    "id": "project-2",
    "title": "Submit Project 2 report",
    "audience": "Group \u00b7 3\u20134",
    "due": null,
    "date": "Not published",
    "time": "Check Learn",
    "url": "https://learn.inside.dtu.dk/d2l/home/326362",
    "source": "https://learn.inside.dtu.dk/d2l/le/content/326362/viewContent/1266165/View",
    "description": "A second project and report are required. Kick-off is 10 November; its brief and submission deadline were not visible in the checked Learn content.",
    "checklist": [
      "Attend or review the Project 2 kick-off on 10 November.",
      "Read the published brief and record the actual submission deadline when available.",
      "Complete the second project and group report according to that brief.",
      "Declare any AI use for submitted material.",
      "Do not assume the report deadline is the same as the 11 December oral exam."
    ]
  },
  {
    "id": "group",
    "title": "Enrol in a group of 3\u20134",
    "audience": "Group",
    "due": null,
    "date": "As soon as possible",
    "time": "No dated cutoff published",
    "url": "https://learn.inside.dtu.dk/d2l/lms/group/group_list.d2l?ou=326362",
    "source": "https://learn.inside.dtu.dk/d2l/home/326362",
    "description": "The course requires group work. The 22 and 28 September announcements ask anyone still without a group to enrol promptly.",
    "checklist": [
      "Choose a group of 3\u20134 students and enrol in Learn.",
      "Agree responsibilities and a shared place for code, results and reports.",
      "If you have already enrolled, mark this complete. No dated enrolment cutoff was published in the checked announcements."
    ]
  }
];
export const weeks=[
  {
    "number": 1,
    "start": "2026-08-31",
    "end": "2026-09-06",
    "date": "2026-09-01",
    "title": "Parallel architectures & MPI basics",
    "lead": "Understand what each rank owns, then run a small job.",
    "projectPhase": false,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/lessons/326362/units/1256749",
    "takeaways": [
      {
        "title": "Processes own separate data",
        "text": "MPI processes communicate explicitly. Launching four ranks starts four program instances; it does not automatically split a serial calculation."
      },
      {
        "title": "Shared and distributed memory differ",
        "text": "Threads can share an address space; processes usually have separate address spaces. Across nodes, communication must cross an interconnect."
      },
      {
        "title": "The scheduler allocates the resources",
        "text": "Match your MPI launch with the allocated cores and nodes. On DTU, use application or batch nodes for computation rather than running jobs on login nodes."
      }
    ],
    "practice": {
      "title": "Trace a four-rank run",
      "prompt": "A job runs with four MPI ranks. Each rank reports its rank number and the communicator size. List the expected rank/size pairs. Then draw how rank 0 would send a value to rank 1 and name the information both sides must agree on.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Rank and size pairs"
        },
        {
          "id": "answer-1",
          "label": "Matching send/receive plan"
        },
        {
          "id": "answer-2",
          "label": "Batch allocation notes"
        }
      ],
      "solution": "Pairs: (0,4),(1,4),(2,4),(3,4), in unspecified output order. Match communicator, source/destination, tag and compatible data buffers. A four-rank launch alone does not distribute serial work."
    }
  },
  {
    "number": 2,
    "start": "2026-09-07",
    "end": "2026-09-13",
    "date": "2026-09-08",
    "title": "Networks & multi-node MPI",
    "lead": "Distinguish message-startup cost from transfer cost.",
    "projectPhase": false,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/lessons/326362/units/1274641",
    "takeaways": [
      {
        "title": "Latency dominates small messages",
        "text": "The approximate transfer model T=\u03b1+n/\u03b2 separates startup latency from sustained bandwidth. Many small messages can cost more than one larger transfer."
      },
      {
        "title": "Units matter",
        "text": "Network rates often use bits per second, while measurements use bytes per second. Divide by eight before comparing them, and state whether units are decimal."
      },
      {
        "title": "Node placement changes performance",
        "text": "Ranks on one socket, multiple sockets or different nodes use different communication and memory paths. Record placement alongside timings."
      }
    ],
    "practice": {
      "title": "Estimate communication cost",
      "prompt": "Assume latency \u03b1=20 \u03bcs and sustained bandwidth \u03b2=1 GB/s using decimal units. Estimate the transfer time for 1 kB and 1 MB. Convert a theoretical 10 Gbit/s link rate to GB/s.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Time for 1 kB"
        },
        {
          "id": "answer-1",
          "label": "Time for 1 MB"
        },
        {
          "id": "answer-2",
          "label": "10 Gbit/s in GB/s"
        }
      ],
      "solution": "1 kB: 20 \u03bcs+1 \u03bcs=21 \u03bcs. 1 MB: 20 \u03bcs+1 ms=1.02 ms. 10 Gbit/s=1.25 GB/s before protocol overhead."
    }
  },
  {
    "number": 3,
    "start": "2026-09-14",
    "end": "2026-09-20",
    "date": "2026-09-15",
    "title": "Python multiprocessing",
    "lead": "Distribute CPU work while accounting for process overhead.",
    "projectPhase": false,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/lessons/326362/units/1274643",
    "takeaways": [
      {
        "title": "Processes avoid one shared interpreter bottleneck",
        "text": "Multiprocessing uses separate Python interpreters. Passing data, starting workers and collecting results still cost time; compiled numerical libraries can have their own threading."
      },
      {
        "title": "Chunk size trades overhead against balance",
        "text": "Small chunks improve flexibility but increase task-management costs. Large chunks reduce overhead but can leave some workers idle."
      },
      {
        "title": "Time the same work fairly",
        "text": "Record what is included: worker startup, input preparation, computation and collection. Compare matching workloads instead of mixing end-to-end and kernel-only timings."
      }
    ],
    "practice": {
      "title": "Check a simple speedup",
      "prompt": "A serial job takes 12 seconds. With four worker processes the computation takes 3 seconds, plus 2 seconds for startup and data transfer. Compute end-to-end speedup and efficiency. What would reporting only computation time hide?",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Total parallel time"
        },
        {
          "id": "answer-1",
          "label": "Speedup and efficiency"
        },
        {
          "id": "answer-2",
          "label": "What timing excludes"
        }
      ],
      "solution": "Parallel time=5 s; speedup=12/5=2.4; efficiency=2.4/4=0.60. Reporting only 3 s would hide startup and transfer costs."
    }
  },
  {
    "number": 4,
    "start": "2026-09-21",
    "end": "2026-09-27",
    "date": "2026-09-22",
    "title": "mpi4py communication",
    "lead": "Choose the right communication operation and check completion.",
    "projectPhase": false,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/lessons/326362/units/1279619",
    "takeaways": [
      {
        "title": "Objects and buffers have different paths",
        "text": "Lowercase mpi4py methods communicate Python objects; uppercase methods communicate data buffers such as NumPy arrays. Choose deliberately and check the buffer shape and type."
      },
      {
        "title": "Nonblocking calls need completion",
        "text": "An Isend or Irecv returns a request. Complete it with Wait/Test before reusing the relevant buffers or assuming the result is ready."
      },
      {
        "title": "Collectives have coordinated roles",
        "text": "Bcast, Gather and Reduce express different patterns. All participating ranks must call the matching collective on the same communicator in a compatible order."
      }
    ],
    "practice": {
      "title": "Trace three collective operations",
      "prompt": "Four ranks have local values [2,4,6,8]. Describe what root rank 0 obtains after Gather and after Reduce with SUM. Then say what each rank receives if rank 0 broadcasts [10,20].",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Gather result"
        },
        {
          "id": "answer-1",
          "label": "Reduce SUM result"
        },
        {
          "id": "answer-2",
          "label": "Broadcast result and call order"
        }
      ],
      "solution": "Gather on root: [2,4,6,8]. Reduce SUM on root: 20. Broadcast: every rank receives [10,20]. All four ranks must participate in each collective in a compatible order."
    }
  },
  {
    "number": 5,
    "start": "2026-09-28",
    "end": "2026-10-04",
    "date": "2026-09-29",
    "title": "Project 1 \u00b7 design the experiments",
    "lead": "Choose one implementation you can explain well.",
    "projectPhase": true,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
    "takeaways": [
      {
        "title": "Mandelbrot work is uneven",
        "text": "Different pixels may take different iteration counts. A decomposition with equal pixel counts can still distribute computational work unevenly."
      },
      {
        "title": "Plan measurements before variations",
        "text": "Fix the image domain, resolution, iteration limit and timing boundaries. These define a comparable experiment, not just a visually appealing output."
      },
      {
        "title": "Depth matters more than the number of variants",
        "text": "The Project 1 announcement values explaining behaviour over the fastest implementation or many shallow alternatives. Prioritise an investigated approach."
      }
    ],
    "practice": {
      "title": "Draft a minimal experiment plan",
      "prompt": "Using your own project, write one baseline, one parallel configuration, two problem sizes and the measurements needed to explain the difference. This is a planning exercise, not a new submission.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Baseline and correctness check"
        },
        {
          "id": "answer-1",
          "label": "Parallel decomposition"
        },
        {
          "id": "answer-2",
          "label": "Problem sizes and timing boundaries"
        },
        {
          "id": "answer-3",
          "label": "Expected bottleneck and evidence"
        }
      ],
      "solution": null
    }
  },
  {
    "number": 6,
    "start": "2026-10-05",
    "end": "2026-10-11",
    "date": "2026-10-06",
    "title": "Project 1 \u00b7 scaling & report",
    "lead": "Explain your timings and finish the first report.",
    "projectPhase": true,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
    "takeaways": [
      {
        "title": "Speedup requires a baseline",
        "text": "Use S=T\u2081/Tp and E=S/p with a comparable baseline. State whether you are holding the total problem size fixed or growing it with resources."
      },
      {
        "title": "Imbalance can limit speedup",
        "text": "The slowest rank can determine completion time. Compare per-rank work or time with communication costs before attributing every slowdown to the network."
      },
      {
        "title": "The deadline falls in the break",
        "text": "Project 1 is due Sunday 18 October at 23:59. The 6 October draft-page discussion was formative and does not influence grading."
      }
    ],
    "practice": {
      "title": "Interpret a small scaling table",
      "prompt": "A fixed problem takes 80 seconds with 1 rank, 44 with 2, 25 with 4 and 18 with 8. Compute speedup and efficiency for 4 and 8 ranks. Suggest one measurement that could distinguish imbalance from communication overhead.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "4-rank speedup and efficiency"
        },
        {
          "id": "answer-1",
          "label": "8-rank speedup and efficiency"
        },
        {
          "id": "answer-2",
          "label": "Diagnostic measurement"
        }
      ],
      "solution": "4 ranks: S=3.2,E=0.8. 8 ranks: S\u22484.44,E\u22480.556. Per-rank compute times and separate communication timings can help distinguish imbalance from communication cost."
    }
  },
  {
    "number": 7,
    "start": "2026-10-19",
    "end": "2026-10-25",
    "date": "2026-10-20",
    "title": "Project 1 \u00b7 recap",
    "lead": "Keep the explanations that will matter at the oral exam.",
    "projectPhase": false,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
    "takeaways": [
      {
        "title": "A result needs a reason",
        "text": "Connect the observed scaling curve to workload balance, communication and serial stages. Do not stop at stating which run was faster."
      },
      {
        "title": "Know your own implementation",
        "text": "Be able to trace task distribution, message exchange and result collection. The oral exam asks you to present work and answer questions."
      },
      {
        "title": "Carry a reusable experiment method forward",
        "text": "Preserve input settings, job scripts, module versions and plotting steps so Project 2 does not begin with an unreproducible workflow."
      }
    ],
    "practice": {
      "title": "Write a five-minute project recap",
      "prompt": "Using your actual Project 1 results, write the problem, decomposition, most informative plot and one limitation. The official calendar labels this week as the Project 1 recap.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Problem and decomposition"
        },
        {
          "id": "answer-1",
          "label": "Most informative result and explanation"
        },
        {
          "id": "answer-2",
          "label": "Limitation and next improvement"
        },
        {
          "id": "answer-3",
          "label": "Reproduction notes"
        }
      ],
      "solution": null
    }
  },
  {
    "number": 8,
    "start": "2026-10-26",
    "end": "2026-11-01",
    "date": "2026-10-27",
    "title": "Advanced mpi4py",
    "lead": "Coordinate communication and identify opportunities for overlap.",
    "projectPhase": false,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
    "takeaways": [
      {
        "title": "Request completion defines safe buffer use",
        "text": "Nonblocking communication lets you do independent work while a transfer progresses. It does not guarantee useful overlap on every implementation or workload."
      },
      {
        "title": "Communication structure matters",
        "text": "Separate local computation, messages and global synchronisation. Changing a primitive without changing the dependency pattern may not remove a bottleneck."
      },
      {
        "title": "Compare with a simple working version",
        "text": "Keep a correct blocking reference and use the same input and timing boundary. Verify results before claiming a performance improvement."
      }
    ],
    "practice": {
      "title": "Sketch an overlap timeline",
      "prompt": "Imagine a rank must exchange boundary data, compute interior cells and then compute boundary cells. Put these actions in a legal order with nonblocking communication. Mark where requests must complete.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Start communication"
        },
        {
          "id": "answer-1",
          "label": "Independent interior computation"
        },
        {
          "id": "answer-2",
          "label": "Completion and boundary computation"
        },
        {
          "id": "answer-3",
          "label": "What to measure"
        }
      ],
      "solution": "Post the required receives/sends, compute the independent interior, complete the requests, then compute the boundary using received data. Do not change send buffers until send completion. Measure actual overlap rather than assuming it."
    }
  },
  {
    "number": 9,
    "start": "2026-11-02",
    "end": "2026-11-08",
    "date": "2026-11-03",
    "title": "Parallel I/O",
    "lead": "Treat reading and writing as part of the performance story.",
    "projectPhase": false,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
    "takeaways": [
      {
        "title": "I/O can dominate the workflow",
        "text": "A faster compute kernel has limited value when input or output controls end-to-end time. Measure each stage and overall elapsed time."
      },
      {
        "title": "Each rank needs a clear data region",
        "text": "Concurrent writes require non-overlapping ownership or a coordinated I/O scheme. Record the file format and how output can be reconstructed."
      },
      {
        "title": "File-system behaviour matters",
        "text": "Many tiny files, metadata traffic and simultaneous access can change performance. Choose a scheme appropriate to the data and compare it on the target system."
      }
    ],
    "practice": {
      "title": "Plan a non-overlapping output layout",
      "prompt": "Four ranks each own 100 consecutive float64 values. Compute the byte offset and byte count for each rank in a raw file with no header. Name two additional details required to read the file correctly.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Byte offsets"
        },
        {
          "id": "answer-1",
          "label": "Byte counts and total size"
        },
        {
          "id": "answer-2",
          "label": "Format metadata"
        }
      ],
      "solution": "Offsets: 0,800,1600,2400 bytes. Each rank writes 800 bytes; total=3200 bytes. Readers need type/byte order and the data shape/order, plus any additional format conventions."
    }
  },
  {
    "number": 10,
    "start": "2026-11-09",
    "end": "2026-11-15",
    "date": "2026-11-10",
    "title": "Project 2 \u00b7 kick-off",
    "lead": "Read the new brief before choosing scope.",
    "projectPhase": true,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
    "takeaways": [
      {
        "title": "Requirements come before implementation",
        "text": "Project 2 is required, but its detailed brief and deadline were not visible in the checked Learn content. Capture those facts at the kick-off instead of inferring them from Project 1."
      },
      {
        "title": "Reuse the measurement workflow",
        "text": "Carry forward reproducible jobs, correctness checks and timing boundaries. Adapt them to the new workload rather than copying earlier conclusions."
      },
      {
        "title": "Choose a manageable investigation",
        "text": "Plan a small set of informative experiments and explain what each could reveal. Leave time for analysis and the second report."
      }
    ],
    "practice": {
      "title": "Turn the brief into a work plan",
      "prompt": "After the 10 November kick-off, record the problem, deliverables, actual deadline, baseline, experiments and team responsibilities from the published brief.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Problem and deliverables"
        },
        {
          "id": "answer-1",
          "label": "Confirmed deadline and source"
        },
        {
          "id": "answer-2",
          "label": "Baseline and correctness check"
        },
        {
          "id": "answer-3",
          "label": "Experiments and responsibilities"
        }
      ],
      "solution": null
    }
  },
  {
    "number": 11,
    "start": "2026-11-16",
    "end": "2026-11-22",
    "date": "2026-11-17",
    "title": "Communicators & Project 2",
    "lead": "Understand which ranks take part in each operation.",
    "projectPhase": false,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
    "takeaways": [
      {
        "title": "A communicator defines the participants",
        "text": "A subgroup can communicate independently of other ranks. Rank numbers are local to the communicator, so world and subgroup ranks can differ."
      },
      {
        "title": "Collectives use communicator membership",
        "text": "Every required member of that communicator must call compatible collectives. A subgroup collective is not automatically a world-wide operation."
      },
      {
        "title": "Separation can clarify program roles",
        "text": "Different rank groups may perform different stages. Explain why this organisation helps the application instead of adding groups without a purpose."
      }
    ],
    "practice": {
      "title": "Trace a communicator split",
      "prompt": "World ranks 0\u20135 split by colour=rank mod 2 and use the world rank as key. List the two groups and each member\u2019s new local rank. Which ranks participate in a collective on the odd group?",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Even-colour group and local ranks"
        },
        {
          "id": "answer-1",
          "label": "Odd-colour group and local ranks"
        },
        {
          "id": "answer-2",
          "label": "Odd-group collective participants"
        }
      ],
      "solution": "Even group: world 0\u2192local 0,2\u21921,4\u21922. Odd group: world 1\u2192local 0,3\u21921,5\u21922. Only world ranks 1,3,5 participate in the odd-group collective."
    }
  },
  {
    "number": 12,
    "start": "2026-11-23",
    "end": "2026-11-29",
    "date": "2026-11-24",
    "title": "Project 2 \u00b7 analyse & draft",
    "lead": "Convert experiment results into a supported explanation.",
    "projectPhase": true,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
    "takeaways": [
      {
        "title": "Keep comparisons controlled",
        "text": "Use the same problem definition and environment where appropriate. Record changed parameters so an apparent improvement is interpretable."
      },
      {
        "title": "Explain limitations honestly",
        "text": "Show when the method scales poorly and identify plausible reasons. Evidence for one workload or machine is not a universal performance claim."
      },
      {
        "title": "Draft while experiments are fresh",
        "text": "Write the method and result interpretation now. Preserve scripts and data that support the figures in the report."
      }
    ],
    "practice": {
      "title": "Audit one project result",
      "prompt": "Choose one real Project 2 claim. Record the comparison, evidence, possible confounder and one follow-up measurement. Add the report section where it belongs.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Claim and controlled comparison"
        },
        {
          "id": "answer-1",
          "label": "Evidence or plot"
        },
        {
          "id": "answer-2",
          "label": "Confounder and follow-up"
        },
        {
          "id": "answer-3",
          "label": "Report section and remaining work"
        }
      ],
      "solution": null
    }
  },
  {
    "number": 13,
    "start": "2026-11-30",
    "end": "2026-12-06",
    "date": "2026-12-01",
    "title": "Project 2 \u00b7 finish & prepare to present",
    "lead": "Package the second report and rehearse your explanations.",
    "projectPhase": true,
    "scheduleNote": "Project planning guidance follows the official calendar. It is not an extra graded submission.",
    "learn": "https://learn.inside.dtu.dk/d2l/le/calendar/326362",
    "takeaways": [
      {
        "title": "Submission and exam are separate obligations",
        "text": "The course requires two reports and a presentation exam. Project 2\u2019s report deadline is not confirmed here; check the brief and Learn rather than assuming 11 December."
      },
      {
        "title": "Reproducibility makes explanations credible",
        "text": "Check that someone can identify inputs, run settings, code version and measurements. A tidy figure alone is not enough to reconstruct the experiment."
      },
      {
        "title": "Rehearse the why, not just the output",
        "text": "Prepare to explain decomposition, MPI operations, scaling and trade-offs. Make sure every group member understands the submitted work."
      }
    ],
    "practice": {
      "title": "Run a final report and exam audit",
      "prompt": "Using the official Project 2 brief, record the actual deadline and submission status, check required files, and draft three questions an examiner could ask about your results.",
      "result": "A short worked explanation or useful notes for your actual project.",
      "fields": [
        {
          "id": "answer-0",
          "label": "Deadline source and submission status"
        },
        {
          "id": "answer-1",
          "label": "Required files and reproduction check"
        },
        {
          "id": "answer-2",
          "label": "Three likely questions with short answers"
        },
        {
          "id": "answer-3",
          "label": "Remaining fixes and responsibilities"
        }
      ],
      "solution": null
    }
  }
];
