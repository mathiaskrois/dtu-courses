# DTU course companion

Independent source repository for https://krois.dk/dtu/. Includes the Fall 2026 course 12106, Microfabrication guidance, 13 weekly plans, 362 DTU Learn links and fill-in exercises. Answers and completion are stored only in the visitor’s browser. Raw scraped materials, videos and login data are not part of this repository.

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
