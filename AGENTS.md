# Repository map

This is the independent dtu-courses website repository, grouped locally under Git/krois/. Shared publishing is owned by sibling krois-site.

- Check git status and preserve existing work before editing.
- Public source is under dtu/; course data is under dtu-source/ and the build entrypoint is scripts/build-all.mjs.
- npm run build produces dist/; source changes must preserve the public /dtu/ URL prefix.
- Run focused checks; do not repeat the full browser suite without a relevant change or failure.
- Publish by recording the verified source SHA in krois-site/releases.json, then deploy that repo.
- Do not add app code, credentials, scraped private materials or browser answers.

## Courses

- 12106: dtu-source/course.mjs and dtu-source/exercises.mjs, rendered by scripts/build-dtu.mjs.
- 02807: dtu-source/02807/course.mjs and resources.json, rendered by scripts/build-02807.mjs.
- 02581: dtu-source/02581/course.mjs and resources.json, rendered by scripts/build-02581.mjs. Dates follow Learn calendar and assignment metadata. FEA is undated; exam starts 8 December, individual slots unconfirmed.
- 02616: dtu-source/02616/course.mjs and resources.json, rendered by scripts/build-02616.mjs. Project 1 due 18 October; Project 2 is required but undated. Oral presentation exam 11 December, individual time unconfirmed.
- npm run build renders all registered courses and the period directory, then exports the complete public dtu/ tree.
- Browser storage must remain scoped by course ID and semester. Preserve existing 12106 keys.
- Flag the contradictory 02807 project deadline (4 vs 6 December) until official confirmation. Do not import 12106 exam or peer-feedback requirements into other courses.

## Future courses and shared layout

- Follow `docs/course-playbook.md`. Scaffold with `npm run course:new -- <id> "<title>" "<term>"`; register once in `dtu-source/courses.mjs`.
- Shared HTML belongs in `scripts/lib/course-layout.mjs`; new courses use `scripts/lib/build-course.mjs`. Existing course adapters supply course-specific content and use the shared components.
- Edit shared components and `dtu/assets/` for site-wide changes. Do not duplicate common markup or edit generated HTML directly.
- Keep obligation and practice-field IDs stable, and preserve storage namespaces by course and semester.

## 2025–2026 archive

- Registry: `dtu-source/courses.mjs`; 15 courses in six periods. The 11 archived courses use `scripts/lib/build-course.mjs` and `dtu-source/<id>/`.
- Group by actual teaching period. Learn's 2025 WINTER tab contains 02476 Winter 2026; keep it in January 2026.
- Keep course-specific assessment caveats: 02582 Case 2 uses Learn's 5 May date with its overview conflict noted; 02506 exam remains undated; 02450 resubmissions are conditional; 02456 has no mandatory weekly exercise hand-ins.
- Exclude copied calendar events from other years, feedback-output spaces and personal submission/group metadata.
- Intensive courses have three study plans. 42501 uses confirmed five-day blocks within 4–26 June 2025, rather than ordinary calendar weeks.
- Keep `/dtu/` automatic and explicit `/dtu/periods/<id>/` pages stable. The current period comes from Copenhagen time and registered start dates, not saved browsing state.
