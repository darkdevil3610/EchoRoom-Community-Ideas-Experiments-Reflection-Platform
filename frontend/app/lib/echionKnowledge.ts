export type EchionIntent = {
  keywords: string[];
  response: string;
};

export const echionIntents: EchionIntent[] = [
  {
    keywords: ["what is echoroom", "about echoroom", "purpose", "what does this do"],
    response: `EchoRoom is a collaborative learning platform.

It helps communities:
• Share ideas
• Test them through experiments
• Record outcomes
• Reflect on what they learn

It focuses on learning loops, not just discussion or voting.`
  },

  {
    keywords: ["how to start", "where to start", "new here", "begin"],
    response: `If you're new:

• Click "Start Exploring" on the homepage
• Browse existing Ideas
• Create your own Idea
• Turn it into an Experiment
• Record the Outcome
• Write a Reflection

That’s the full learning loop.`
  },

  {
    keywords: ["create idea", "post idea", "add idea", "new idea"],
    response: `To create an Idea:

1. Go to the Ideas page
2. Click "Create Idea"
3. Add a title and description
4. Save as draft or publish publicly

Drafts let you refine before sharing.`
  },

  {
    keywords: ["draft", "save draft"],
    response: `You can save an Idea as a draft if you're not ready to publish it.

Drafts remain private until you publish them.`
  },

  {
    keywords: ["experiment", "create experiment", "new experiment"],
    response: `Experiments test ideas in real situations.

To create one:
1. Go to Experiments page
2. Click "New Experiment"
3. Add hypothesis and dates
4. Optionally link it to an Idea

Experiments turn ideas into action.`
  },

  {
    keywords: ["outcome", "results", "experiment result"],
    response: `Outcomes record the result of experiments.

They track:
• What worked
• What failed
• Whether it was success, failure, or mixed

Outcomes come before writing reflections.`
  },

  {
    keywords: ["reflection", "create reflection", "write reflection"],
    response: `Reflections document what you learned.

To create one:
1. Go to Reflection page
2. Link it to an Outcome
3. Write what you learned
4. Share improvements or insights

Reflection is where learning becomes meaningful.`
  },

  {
    keywords: ["difference", "idea vs experiment", "flow"],
    response: `EchoRoom follows a learning loop:

Idea → Experiment → Outcome → Reflection → Shared Learning

Ideas are thoughts.
Experiments test them.
Outcomes record results.
Reflections capture learning.`
  }
];

export const fallbackResponse = `
I’m here to guide you through EchoRoom.

You can ask me about:
• Ideas
• Experiments
• Outcomes
• Reflections
• How to get started

For other topics, please use a general search tool.
`;