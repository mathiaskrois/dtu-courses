import { currentPeriod } from "./period-state.mjs?v=1";
const root = document.querySelector("[data-period-directory]");
if (root?.dataset.periodDirectory === "automatic") {
  const periods = [...document.querySelectorAll("[data-period-panel]")].map(
    (panel) => ({
      id: panel.dataset.periodPanel,
      start: panel.dataset.periodStart,
      panel,
    }),
  );
  const current = currentPeriod(periods);
  if (current) {
    for (const period of periods)
      period.panel.hidden = period.id !== current.id;
    for (const link of document.querySelectorAll("[data-period-link]")) {
      if (link.dataset.periodLink === current.id)
        link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
  }
}
