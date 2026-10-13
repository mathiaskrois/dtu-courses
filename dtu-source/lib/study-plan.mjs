// Original study prompts shared by the archived course editions.
// Topic explanations and dates are supplied by each course's verified sources.
export function studyPlan(
  sessions,
  topics,
  { source, projectFrom = Infinity } = {},
) {
  return sessions.map((session, index) => {
    const [title, focus, prompt] = topics[index];
    const projectPhase = index + 1 >= projectFrom;
    return {
      number: index + 1,
      ...session,
      title,
      lead: focus,
      learn: source,
      projectPhase,
      takeaways: [{ title, text: focus }],
      practice: {
        title,
        prompt,
        result: "Example, result and check.",
        fields: [
          {
            id: "example",
            label: "Your small example",
            hint: "Use an original toy example rather than an assessed assignment.",
          },
          {
            id: "reasoning",
            label: "Your reasoning and result",
            hint: "State assumptions and show the main steps.",
          },
          {
            id: "check",
            label: "How would you check it?",
            hint: "Give an expected outcome, comparison or failure case.",
          },
        ],
      },
    };
  });
}
