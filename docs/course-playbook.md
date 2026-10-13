# Course companion playbook

All courses use the same design: compact top navigation, registry palettes, graphic directory covers, and optional explanations folded by default. Resizing must preserve expanded reading sections. Change shared markup in `scripts/lib/course-layout.mjs`, styling in `dtu/assets/course.css`, and behavior in `dtu/assets/course.js` or `practice.mjs`. Run `npm run build` to apply the change to the directory and every generated course page.

Generated `dtu/**/index.html` and `runtime.json` are committed build results. Never fix a layout by editing them directly: the next build will overwrite it.

## Start a course

```sh
git status --short
npm run course:new -- 12345 "Course title" "Fall 2027"
```

The command creates `dtu-source/12345/course.mjs` and `resources.json`, with empty weeks and obligations. It refuses to overwrite an existing course. The starter is explicitly unverified and does not assume an exam, group size, grading weights or submission requirements.

1. Review the official course calendar, Learn assignment metadata, assessment brief and announcements. Record the verification date and source URLs. Keep raw/private exports, credentials and personal answers outside this repository.
2. Fill in the course content using the schemas below. Keep official obligations separate from optional practice. Describe contradictions and missing information explicitly; use no guessed due dates.
3. Add the registry entry printed by the command to `dtu-source/courses.mjs`. Its `source` points to `dtu-source/12345`. The build and course directory discover it automatically; no new build script or package command is needed.
4. Set the registry's name, semester, assessment label and short detail. Give the entry a `palette` with six-digit hex `primary`, `accent` and `foreground` values. Keep the pairing distinct from existing courses and check text contrast. Optional artwork goes in `dtu/assets/course-art/12345.svg`; set `art` to its meaningful alt text. Leave `art: null` to omit the image.
5. Run the checks and preview below before committing the source and generated pages.

The generic renderer is `scripts/lib/build-course.mjs`. Existing courses retain small adapters for their particular case study, calculator or assessment content, and use the same shared layout components. For a new course, start with the generic renderer. Extend a shared component if the course needs a new kind of content; pass course-specific copy as data or a content slot.

## Content schema

`course.mjs` exports `course`, `presentation`, `weeks` and `obligations`. `resources.json` is an array. The starter already contains the course and presentation fields.

- `course.id`: a five-digit string, including leading zeroes. All public URLs remain `/dtu/<id>/`.
- `course.title`, `shortTitle`, `term`: displayed names and semester, e.g. `Fall 2027`.
- `course.verified`: actual source review date. Update `presentation.sourceNote` to explain what was checked and what remains uncertain.
- `course.learn`, `website`: official links. Avoid authenticated download URLs containing secrets.
- `course.breakStart`, `breakEnd`: ISO civil dates in Copenhagen, or `null` when no break is confirmed. Do not copy another semester's calendar.
- `course.periodStart`: first teaching date. Copy it into the registry so automatic period selection uses the actual start date. The registry groups by `period` when supplied, otherwise `term`.
- `course.noExam`: set `true` only when the official assessment confirms no exam.
- `presentation`: course-specific subtitle, assessment explanation, deadline intro, date note, material intro and source note. Optional `warning` is concise consequential information shown outside the folded date/source notes. These are plain text; the shared renderer escapes them.

An ordinary semester teaching week uses Monday-to-Sunday bounds. Intensive courses can use confirmed teaching blocks with their dates explained in `presentation.dateNote`. The class date is separate from the week range. Number teaching weeks consecutively, excluding confirmed breaks:

```js
export const weeks = [{
  number: 1,
  start: '2027-08-30',
  end: '2027-09-05',
  date: '2027-09-02',
  title: 'Example topic',
  lead: 'Explain the idea this week helps you understand.',
  projectPhase: false,
  takeaways: [
    {title: 'Key idea', text: 'An original explanation grounded in the official topic.'},
  ],
  practice: {
    title: 'Try a small example',
    prompt: 'An original optional task, separate from assessed work.',
    result: 'What the student should produce.',
    fields: [{id: 'reasoning', label: 'Your reasoning', hint: 'Show the main steps.'}],
    solution: 'Optional self-check after attempting the exercise.',
  },
}];
```

Field IDs and obligation IDs must be unique within their scope and stable after publication: they identify saved browser answers and completion. Use simple letters, digits and hyphens. Do not rename IDs for cosmetic changes. Original explanatory practice belongs here; do not add answers to official assessed work.

A confirmed deadline uses an ISO timestamp with the correct Copenhagen UTC offset. A date-only exam uses `dateOnly` instead of fabricating a start time. Required work without a published date uses neither:

```js
export const obligations = [{
  id: 'report-1',
  title: 'Submit report 1',
  audience: 'Group',
  due: '2027-10-18T23:59:00+02:00', // Example only: replace from official metadata.
  date: '18 October',
  time: '23:59',
  description: 'Describe the actual requirement.',
  url: 'https://learn.inside.dtu.dk/…',
  source: 'https://courses.compute.dtu.dk/…',
  checklist: ['Use the official brief to write the requirements.'],
}];
```

For a date-only event: `dateOnly: '2027-12-08'`, `time: 'Individual time to confirm'`. For undated work: `date: 'Date unconfirmed'`, `time: 'Check Learn'`, with no `due` or `dateOnly`. Sort dated obligations chronologically and put undated obligations last. Include important deadline conflicts in `presentation.dateNote` as well as the obligation description/checklist.

A resource entry:

```json
{
  "title": "Week 1 slides",
  "url": "https://learn.inside.dtu.dk/…",
  "group": "Week 1",
  "kind": "Slides",
  "weeks": [1]
}
```

`week: 1` also works for a single week. Use `weeks` when a resource spans several weeks. Keep material links and their grouping faithful to the source. A missing resource can use `unavailable: true` and `fallback` pointing to its parent module.

## Change a layout everywhere

| Change | Edit once |
| --- | --- |
| Page shell, top navigation, head assets and footer | `createLayout` in `scripts/lib/course-layout.mjs` |
| Page title and actions | `pageHeading` |
| Week picker and overview's Topics / Practice / Deadlines sections | `weeklyBrowser`, `weekPanel` |
| Weekly page sections and navigation | `understandSection`, `practiceSection`, `mandatorySection`, `weekPagination` |
| Practice fields, calculators, save status and toolbar | `exerciseWorkspace`, `practiceWorkspace` |
| Next deadline, checklist cards and overview deadline table | `deadlineSpotlight`, `taskCard`, `compactTasks`, `deadlineChecklist` |
| Deadline banner and assessment layout | `deadlineBanner`, `assessmentSection` |
| Material filters and resource cards | `materialsLibrary` |
| Course directory cards | `courseDirectory` |
| Period menus and default selection | `periodNavigation`, `dtu/assets/period-state.mjs`, `directory.mjs`, `scripts/build-directory.mjs` |
| Colors, spacing, type and responsive layout | `dtu/assets/course.css` |
| Live dates, navigation, filters and completion | `dtu/assets/course.js`, `course-state.mjs` |
| Saved answers, calculations and downloads | `dtu/assets/practice.mjs` |
| Official requirements, course-specific explanations and caveats | The relevant course's source data or existing adapter |

Keep common HTML structure in shared components. Existing adapters supply copy, links, assessment values and special notes; they must not grow another copy of navigation, forms, material lists or the weekly section layout. Preserve the shared CSS classes, labels, IDs and `data-*` hooks when changing markup, or update their browser behavior together.

The browser derives its storage semester from the shared shell's `data-storage-term`. `Fall 2026` stays `fall2026`, preserving every existing 12106 key. A different course or semester gets a different namespace. The live tracker derives week counts and break dates from that course's runtime data. `course.archived: true` selects archive presentation: the first study plan opens by default, historical dates are neutral, and countdowns and overdue-task nags are omitted. `course.studyUnit` defaults to `Week`; use `Block` for confirmed study blocks such as 42501 without changing `/weeks/<number>/` URLs or saved identifiers.

When changing cached browser assets, bump their query version in `createLayout` and relevant module imports together. Do not add per-course stylesheets or JavaScript copies.

## Verify and preview

```sh
npm run build
npm run test:dates
npm run test:build
npm run preview
```

Open `http://127.0.0.1:8080/dtu/`, then the affected course. Check overview, a week, deadlines and materials at desktop and phone widths. Confirm active navigation, week selection, search, saving and download behavior. The final exported site is `dist/`, mounted at `/dtu/` by publishing.

For shared markup or interaction changes, use the focused browser checks:

```sh
npx playwright test --project=desktop-chromium
npx playwright test tests/course-layout.spec.js --project=mobile-webkit
npx playwright test tests/periods.spec.js tests/redesign.spec.js --project=desktop-chromium --project=mobile-webkit
```

For copy/date-only edits, run the build and focused date/content checks. Do not repeat the full browser suite after successful focused checks unless a new change or failure warrants it. Review `git diff --stat` and source diffs; ensure `runtime.json` still represents the intended course data.

Before publishing, retain these known distinctions unless newer official evidence resolves them:

- 02807: project brief contradicts itself on 4 vs 6 December. Preserve the warning until confirmation; no exam is invented.
- 02581: FEA has no confirmed date; the exam period starts 8 December, with individual slots unconfirmed.
- 02616: Project 1 is due 18 October during autumn break; Project 2 is required but undated. Presentation exam is 11 December, individual time unconfirmed.
- 12106: its exam eligibility and peer-feedback requirements apply only to 12106.

## Publish when requested

Commit and push the verified source plus generated pages. Wait for Verify website. In sibling `krois-site`, update only `dtu-courses.commit` in `releases.json` to that verified source SHA, then deploy that repository. Reverting the pin rolls back the course site. Adding or redesigning a course does not require application code in `krois-site`.

## Periods and archived editions

Registry `term` values can be Fall, Spring, Winter, January, June, July, August or Summer plus a year. Use the actual teaching year, not a reused Learn tab label. Register `periodStart` from the calendar; the period menu sorts newest periods first and groups them under their years. Add only periods that contain enrolled courses.

The directory is built independently of any one course. Explicit `/dtu/periods/<id>/` pages preserve a selected archive period. `/dtu/` chooses the current registered period on every visit using Copenhagen time, with the nearest available period as a fallback outside the archive. No last-visited preference overrides that default.

For archived courses, retain the original edition's links and assessment rules. Do not apply a current catalogue rule retroactively. Filter calendar events by year and period; copied dates, feedback-output spaces and conditional resubmissions need explicit treatment. When an exam date cannot be established, retain an undated exam entry with the verified rules. A missing date must not become a guessed deadline.

The archive uses `dtu-source/lib/study-plan.mjs` to assemble original optional practice from course-specific topics and verified teaching dates. Shared prompts must remain distinct from official exercises and deliverables. Keep extracted source snapshots outside the repository and commit only reviewed course data, official links and original guidance.
