# Repository map

This is the independent dtu-courses website repository, grouped locally under Git/krois/. Shared publishing is owned by sibling krois-site.

- Check git status and preserve existing work before editing.
- Public source is under dtu/; course data is under dtu-source/ and the generator is scripts/build-dtu.mjs.
- npm run build produces dist/; source changes must preserve the public /dtu/ URL prefix.
- Run focused checks; do not repeat the full browser suite without a relevant change or failure.
- Publish by recording the verified source SHA in krois-site/releases.json, then deploy that repo.
- Do not add app code, credentials, scraped private materials or browser answers.

## Courses

- 12106: dtu-source/course.mjs and dtu-source/exercises.mjs, rendered by scripts/build-dtu.mjs.
- 02807: dtu-source/02807/course.mjs and resources.json, rendered by scripts/build-02807.mjs.
- npm run build renders both courses and the directory, then exports the complete public dtu/ tree.
- Browser storage must remain scoped by course ID and semester. Preserve existing 12106 keys.
- Flag the contradictory 02807 project deadline (4 vs 6 December) until official confirmation. Do not import 12106 exam or peer-feedback requirements into other courses.
