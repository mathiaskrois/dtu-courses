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
      takeaways: [
        { title: "The central idea", text: focus },
        {
          title: "Make the assumptions visible",
          text: "State what your example assumes, what information is available, and what would change the conclusion. Use the linked course material to check your reasoning.",
        },
        {
          title: "Keep evidence with the result",
          text: "Record a small example, its expected outcome and one limitation. A result is easier to trust when someone else can follow how you obtained it.",
        },
      ],
      practice: {
        title: `Try it: ${title}`,
        prompt,
        result:
          "A small worked example, a justified result and one check or limitation.",
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
