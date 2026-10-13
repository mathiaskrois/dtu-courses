# DTU course companion

Independent source repository for https://krois.dk/dtu/. Covers 15 enrolled DTU courses across six teaching periods in 2025 and 2026, with weekly plans, official material links, fill-in practice and submission checklists. The top navigation groups courses by period; the homepage automatically opens the current period using Copenhagen time. Answers and completion stay in the visitor's browser. Raw Learn exports, videos, credentials and personal answers are not part of this repository.

## Add courses and change the shared layout

Follow [the course playbook](docs/course-playbook.md) for the starter command, content schemas, shared layout map, verification and publishing. New courses start with `npm run course:new -- 12345 "Course title" "Fall 2027"`; register them once in `dtu-source/courses.mjs`.

Every course uses `scripts/lib/course-layout.mjs` and the assets under `dtu/assets/`. Edit common layout there, then build once to update every page. Generated HTML is build output.

## Build and preview

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:8080/dtu/12106/. The dependency-free generator updates the committed HTML under `dtu/`; the final public output is `dist/`, mounted at `/dtu/`.

Edit `dtu-source/course.mjs` for teaching weeks and obligations, `dtu-source/exercises.mjs` for practice tasks, and `dtu-source/resources.json` for the material index. Source snapshot: 8 October 2026. The live tracker uses Europe/Copenhagen time and treats calendar week 42 as autumn break. Exam time remains unconfirmed in the source snapshot.

## Checks

Use `npm run test:dates` for date/eligibility behavior and `npm test` for browser checks when UI or interaction changes justify them. Install the required browsers with `npx playwright install chromium webkit` if needed.

## Publishing

Push the source commit and wait for Verify website. In sibling `krois-site`, update only the `dtu-courses.commit` field in `releases.json`, then push that repository. Its Pages workflow builds the pinned commit and mounts `dist/` at `/dtu/`. Reverting the pin rolls back this website independently.

The extracted history preserves earlier course changes; hashes changed during repository extraction. The original shared history remains in `mathiaskrois/krois-site`. Future courses belong here, rather than in the publishing repository.

## 02807 Computational Tools for Data Science

Source content is in `dtu-source/02807/`, rendered by `scripts/build-02807.mjs`. Its official 2026 homepage and project brief were reviewed on 12 October 2026. Teaching weeks 1–7 cover course topics; weeks 8–13 are project work with explicitly suggested pacing milestones. The source PDF conflicts on the final deadline (4 December on its cover, 6 December in the body), so the website shows 4 December as the earlier planning date and flags confirmation in Learn. No exam or extra weekly submission requirements are invented.

Shared browser code derives the course ID from body metadata or the URL. Existing 12106 storage keys are preserved; 02807 answers and completion have their own course-specific keys. Python fields are saved drafts, not a Python execution environment. Static source links and original small exercises are kept separate from official project requirements.

02581 Geometric Data Analysis and Processing is available at `/dtu/02581/`: 13 corrected weekly plans, saved on-page practice, all Learn topic/chapter links, 11 dated group assignments and the oral-exam period. Source checked against authenticated Learn on 13 October 2026. Raw exports stay outside this repository. Course 02807 now includes Learn-confirmed group registration and lecture-time changes; its project PDF deadline conflict remains flagged.

02616 Large-scale Modelling is available at `/dtu/02616/`: 13 calendar-based weekly plans, saved practice, all currently visible Learn files and HPC reference links, two required reports and the 11 December presentation exam. Project 1 is due 18 October 23:59 during autumn break; Project 2 is explicitly undated until Learn publishes its deadline. Source checked on 13 October 2026; raw files remain outside this repository.

## Course periods and archive

| Period | Courses |
| --- | --- |
| Fall 2026 | 12106, 02616, 02581, 02807 |
| Spring 2026 | 02582, 02506, 02460 |
| Winter 2026 (January) | 02476 |
| Fall 2025 | 02810, 02456, 02805 |
| June 2025 | 42501 |
| Spring 2025 | 02806, 02613, 02450 |

The 11 archived additions use `scripts/lib/build-course.mjs` with their own `dtu-source/<id>/course.mjs` and `resources.json`. Enrollment, topics, assignment spaces and teaching dates were checked in authenticated Learn on 14 October 2026. Public notebook links use the matching 2025 course repositories; MLOps material is pinned to the January 2026 repository snapshot. Each archived course has original study prompts, not solutions to assessed assignments.

Learn's **2025 WINTER** tab contains **02476 Winter 2026**. The website groups it under its actual January 2026 teaching dates. Copied calendar events from earlier years are excluded. Course 02582's Case 2 dates conflict between the overview (2 May) and Learn assignments (5 May); the tracker follows Learn and shows the discrepancy. Course 02506's copied exam weekday/date is unresolved, so the exam remains undated. Course 02456's FAQ explicitly excludes mandatory weekly hand-ins; copied 2024 peer-review events and the assessment-feedback output are excluded. Conditional 02450 resubmissions retain their conditional audience.

`/dtu/periods/<period-id>/` provides direct links and works without JavaScript. Returning to `/dtu/` selects the current period again; it does not remember the last archive period visited. If the date is outside the available archive, the nearest available period is shown. Period order and selection are shared in `dtu/assets/period-state.mjs`.
