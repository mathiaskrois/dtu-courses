# DTU course companion

Independent source repository for https://krois.dk/dtu/. Includes Fall 2026 courses 12106 (Quantitative Sustainability) and 02807 (Computational Tools for Data Science), with weekly plans, official material links, fill-in exercises and mandatory-work checklists. Answers and completion are stored only in the visitor’s browser. Raw scraped materials, videos and login data are not part of this repository.

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
