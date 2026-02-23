export type EchionIntent = {
  keywords: string[];
  response: string;
};

export const echionIntents: EchionIntent[] = [

  // ===============================
  // PLATFORM PURPOSE & PHILOSOPHY
  // ===============================
  {
  keywords: [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening"
  ],
  response: `Hey 👋 I’m Echion — your EchoRoom guide.

EchoRoom runs on a structured learning cycle:

Idea → Experiment → Outcome → Reflection

You can ask me things like:
• What should I do after creating an Idea?
• How does experiment lifecycle work?
• Why is my completed experiment locked?
• What comes after recording an Outcome?

If you're new, I recommend starting with an Idea and turning it into an Experiment.

How can I help you today?`
},
{
  keywords: ["thanks", "thank you", "ty"],
  response: `You're welcome 😊

If you have more questions about EchoRoom, I’m here to help.`
},
  {
    keywords: [
      "what is echoroom",
      "about echoroom",
      "what does this platform do",
      "explain echoroom",
      "purpose",
      "why echoroom",
      "what is this site",
      "what is this platform"
    ],
    response: `EchoRoom is a collaborative learning platform.

Communities:
• Share ideas
• Test them through experiments
• Record real outcomes
• Reflect on what they learned

It focuses on learning loops — not just discussion or voting.

The goal is not to win ideas.
The goal is to learn from trying them.`
  },

  {
    keywords: [
      "how is this different",
      "difference from other platforms",
      "why not just discuss",
      "why not just vote"
    ],
    response: `Unlike traditional idea platforms, EchoRoom does not stop at discussion.

It encourages:
Idea → Experiment → Outcome → Reflection → Shared Learning

The emphasis is on action and documented learning, not popularity.`
  },

  // ===============================
  // HOMEPAGE CONFUSION
  // ===============================

  {
    keywords: [
      "start exploring",
      "learn more button",
      "what happens if i click",
      "homepage buttons"
    ],
    response: `On the homepage:

• "Start Exploring" takes you to the Ideas page.
• "Learn More" explains the EchoRoom project in detail.

Most users begin by exploring Ideas.`
  },

  // ===============================
  // GETTING STARTED
  // ===============================

  {
    keywords: [
      "how to start",
      "where do i begin",
      "i am new",
      "new here",
      "what should i do first"
    ],
    response: `If you're new:

1. Browse Ideas
2. Create your own Idea
3. Turn it into an Experiment
4. Record the Outcome
5. Write a Reflection

That’s the EchoRoom learning loop.`
  },

  // ===============================
  // IDEAS
  // ===============================

  {
    keywords: [
      "create idea",
      "post idea",
      "add idea",
      "new idea",
      "submit idea",
      "how to create idea"
    ],
    response: `To create an Idea:

1. Go to the Ideas page
2. Click "Create Idea"
3. Add title and description
4. Save as Draft or Publish publicly

Publishing makes it visible to the community.`
  },

  {
    keywords: [
      "draft",
      "save draft",
      "what is draft",
      "difference draft publish",
      "private idea"
    ],
    response: `Draft Ideas are private.

• Draft = saved privately
• Publish = visible to community

You can edit drafts anytime before publishing.`
  },

  {
    keywords: [
      "no ideas",
      "empty ideas",
      "why nothing here"
    ],
    response: `There are no Ideas yet.

You can start the learning loop by creating the first Idea.`
  },

  // ===============================
  // EXPERIMENTS
  // ===============================

  {
    keywords: [
      "experiment",
      "create experiment",
      "run experiment",
      "new experiment"
    ],
    response: `Experiments test Ideas in real conditions.

To create:
1. Go to Experiments page
2. Click "New Experiment"
3. Add hypothesis and duration
4. Optionally link it to an Idea

Experiments move thinking into action.`
  },

  {
    keywords: [
      "link idea",
      "connect idea",
      "attach idea",
      "associate idea"
    ],
    response: `When creating an Experiment, you can link it to an Idea.

This keeps the learning structure connected.`
  },

  {
    keywords: [
      "no experiments",
      "empty experiments"
    ],
    response: `No Experiments yet.

Create one to test an Idea and move forward in the learning loop.`
  },

  // ===============================
  // OUTCOMES
  // ===============================

  {
    keywords: [
      "outcome",
      "results",
      "experiment result",
      "what happened"
    ],
    response: `Outcomes record the result of Experiments.

They classify:
• Success
• Failure
• Mixed result

Outcomes lead into Reflections.`
  },

  {
    keywords: [
      "no outcomes",
      "empty outcomes"
    ],
    response: `Outcomes are created after completing an Experiment.

Finish an Experiment first, then record the outcome.`
  },

  // ===============================
  // REFLECTIONS
  // ===============================

  {
    keywords: [
      "reflection",
      "write reflection",
      "create reflection",
      "lessons learned"
    ],
    response: `Reflections document learning.

To create:
1. Go to Reflections page
2. Link to an Outcome
3. Write insights and improvements

Reflections turn experience into shared knowledge.`
  },

  {
    keywords: [
      "no reflections",
      "empty reflections"
    ],
    response: `Reflections require an Outcome first.

Complete an Experiment and record its Outcome before reflecting.`
  },

  // ===============================
  // FLOW CONFUSION
  // ===============================

  {
    keywords: [
      "flow",
      "process",
      "how does it connect",
      "learning loop",
      "idea experiment outcome reflection"
    ],
    response: `EchoRoom Learning Loop:

Idea → Experiment → Outcome → Reflection → Shared Learning

Each step builds on the previous one.`
  },

  // ===============================
  // PERMISSIONS / VISIBILITY
  // ===============================

  {
    keywords: [
      "public",
      "private",
      "who can see",
      "visibility",
      "is this public"
    ],
    response: `Published Ideas are public.

Draft Ideas remain private.

Experiments and Reflections are connected to Ideas and Outcomes within the learning structure.`
  },

  // ===============================
  // CONTRIBUTOR / PROJECT INFO
  // ===============================

  {
    keywords: [
      "open source",
      "contribute",
      "osq",
      "project info"
    ],
    response: `EchoRoom is part of Open Source Quest (OSQ).

It is designed to support contributors from diverse skill backgrounds and encourage structured collaborative learning.`
  },
  // ===============================
  // ACCOUNT & AUTHENTICATION
  // ===============================

  {
    keywords: [
      "sign up",
      "register",
      "create account",
      "join",
      "how to join"
    ],
    response: `To join EchoRoom:

1. Click "Sign Up" or "Login" in the navigation bar
2. Authenticate using your preferred method
3. Set up your profile

Once logged in, you can start creating Ideas and Experiments.`
  },

  {
    keywords: [
      "login",
      "sign in",
      "cant log in",
      "log out",
      "sign out"
    ],
    response: `You can log in or log out using the button in the main navigation menu.

If you are having trouble logging in, ensure you are using the same authentication method you used to sign up.`
  },

  // ===============================
  // EDITING & DELETING CONTENT
  // ===============================

  {
    keywords: [
      "edit idea",
      "update idea",
      "change idea",
      "edit experiment",
      "modify"
    ],
    response: `You can edit your content if you are the creator.

• Drafts can be edited freely.
• Published Ideas and Experiments can be updated to reflect new information.

Look for the "Edit" button on the specific Idea or Experiment page.`
  },

  {
    keywords: [
      "delete",
      "remove",
      "delete idea",
      "delete experiment",
      "undo"
    ],
    response: `To delete content:

1. Go to the item you want to delete
2. Click the "Edit" or "Options" menu
3. Select "Delete"

Warning: Deleting an Idea may affect linked Experiments and Outcomes.`
  },

  // ===============================
  // COLLABORATION & INTERACTION
  // ===============================

  {
    keywords: [
      "comment",
      "discuss",
      "reply",
      "feedback on idea"
    ],
    response: `EchoRoom encourages collaborative learning.

You can leave comments on published Ideas, Experiments, and Reflections to offer feedback, ask questions, or suggest improvements.`
  },

  {
    keywords: [
      "collaborate",
      "join experiment",
      "team",
      "work together"
    ],
    response: `While Ideas are created by individuals, the learning is shared.

You can collaborate by:
• Commenting on Ideas
• Running parallel Experiments based on someone else's Idea
• Sharing your own Reflections on community Outcomes`
  },

  // ===============================
  // SEARCH & DISCOVERY
  // ===============================

  {
    keywords: [
      "search",
      "find",
      "filter",
      "discover",
      "explore"
    ],
    response: `To find specific content:

Use the search bar or filters on the Ideas and Experiments pages.
You can filter by:
• Tags/Categories
• Status (Active, Completed)
• Most recent`
  },

  // ===============================
  // TROUBLESHOOTING & FEEDBACK
  // ===============================

  {
    keywords: [
      "bug",
      "error",
      "broken",
      "not working",
      "report issue",
      "feedback"
    ],
    response: `Found a bug or have a suggestion? 

Since EchoRoom is part of Open Source Quest (OSQ), you can report issues or contribute directly via our GitHub repository. 

Your feedback helps improve the platform for everyone!`
  },

  // ===============================
  // BOT IDENTITY 
  // ===============================

  {
    keywords: [
      "who are you",
      "what are you",
      "are you ai",
      "are you human",
      "bot"
    ],
    response: `I am Echion, the AI guide for EchoRoom. 

I am here to help you navigate the platform, understand the learning loop, and answer any questions you have about using the site.`
  },
  // ===============================
// EXPERIMENT LIFECYCLE AWARENESS
// ===============================

{
  keywords: [
    "why can't i edit completed experiment",
    "why is experiment locked",
    "cannot change completed experiment",
    "completed experiment not editable",
    "why can't i change status after completion"
  ],
  response: `Once an Experiment is marked as Completed, it becomes locked.

This ensures:
• The learning record remains accurate
• The experiment history cannot be altered
• Outcomes reflect final results

You can still:
• View the Outcome
• Write a Reflection

But the experiment state itself is final.`
},

{
  keywords: [
    "experiment status meaning",
    "what does planned mean",
    "what does in progress mean",
    "what does completed mean in experiment"
  ],
  response: `Experiment Status Definitions:

• Planned – The experiment is defined but not yet started.
• In Progress – The experiment is actively being tested.
• Completed – The experiment has finished and is permanently locked.

Completion is a one-way transition to preserve structured learning.`
},

// ===============================
// FULL APP FLOW EXPLANATION
// ===============================

{
  keywords: [
    "complete flow of app",
    "full app flow",
    "how does this app work completely",
    "end to end flow",
    "explain entire process",
    "how everything connects"
  ],
  response: `EchoRoom follows a structured learning cycle:

1️⃣ Idea  
   - Create and publish a concept.

2️⃣ Experiment  
   - Test the idea in real conditions.
   - Status progresses: Planned → In Progress → Completed.
   - Once completed, the experiment becomes locked.

3️⃣ Outcome  
   - Record the result (Success, Failure, or Mixed).
   - Each experiment supports one outcome to maintain clarity.

4️⃣ Reflection  
   - Document lessons learned.
   - Share improvements and insights.

The goal is not just discussion.
It is documented, repeatable learning through action.`
},

// ===============================
// GUIDED NEXT STEP INTELLIGENCE
// ===============================

{
  keywords: [
    "what should i do next",
    "what next after experiment",
    "next step after completion",
    "what now after outcome"
  ],
  response: `Here’s how to continue:

If your Experiment is Planned:
→ Start it and move to In Progress.

If it’s In Progress:
→ Complete it when testing is done.

If it’s Completed:
→ Record the Outcome.
→ Write a Reflection.
→ Share insights.

EchoRoom is about finishing the learning loop, not stopping halfway.`
},

// ===============================
// OUTCOME STRUCTURE RULE
// ===============================

{
  keywords: [
    "why only one outcome",
    "multiple outcomes for experiment",
    "create second outcome",
    "duplicate outcome not allowed"
  ],
  response: `Each Experiment supports one Outcome.

This keeps:
• Results clear
• Records structured
• Learning traceable

If you want to test variations, create a new Experiment instead of adding multiple outcomes.`
},

// ===============================
// STATUS TRANSITION CLARITY
// ===============================

{
  keywords: [
    "can i change completed to in progress",
    "can i reopen completed experiment",
    "reverse completed status",
    "undo completion"
  ],
  response: `Completed Experiments cannot be reopened.

Completion is a final state to preserve learning integrity.

If you need to test something new:
Create a new Experiment instead.`
},
// ===============================
// AFTER IDEA PROGRESSION
// ===============================

{
  keywords: [
    "what to do after creating idea",
    "after creating idea",
    "next step after idea",
    "after publishing idea",
    "what comes after idea"
  ],
  response: `After creating an Idea, the next step is to test it through an Experiment.

Flow:

1️⃣ Go to the Experiments page  
2️⃣ Click "New Experiment"  
3️⃣ Link it to your Idea  
4️⃣ Define hypothesis and plan  
5️⃣ Start testing  

Ideas are starting points.  
Experiments turn them into action.`
},

// ===============================
// AFTER EXPERIMENT PROGRESSION
// ===============================

{
  keywords: [
    "what to do after creating experiment",
    "after creating experiment",
    "next step after experiment",
    "what after experiment",
    "after finishing experiment",
    "after running experiment"
  ],
  response: `What to do after creating an Experiment depends on its status:

If status is **Planned**:
→ Move it to "In Progress" when testing begins.

If status is **In Progress**:
→ Continue testing.
→ Mark as Completed when finished.

If status is **Completed**:
→ Go to the Outcomes page.
→ Record the result (Success / Failure / Mixed).
→ Then write a Reflection.

Experiments must be completed before creating an Outcome.`
},

// ===============================
// AFTER COMPLETING EXPERIMENT
// ===============================

{
  keywords: [
    "what to do after completing experiment",
    "after completing experiment",
    "experiment completed what next",
    "completed experiment next step"
  ],
  response: `After completing an Experiment:

1️⃣ Go to the Outcomes page  
2️⃣ Create an Outcome linked to that Experiment  
3️⃣ Record the result  
4️⃣ Then write a Reflection  

Completed experiments are locked to preserve learning integrity.

Now the focus shifts from testing to documenting results.`
},

// ===============================
// AFTER OUTCOME PROGRESSION
// ===============================

{
  keywords: [
    "what to do after outcome",
    "after creating outcome",
    "next after outcome",
    "what after recording outcome"
  ],
  response: `After recording an Outcome:

1️⃣ Go to the Reflections page  
2️⃣ Create a Reflection linked to the Outcome  
3️⃣ Document:
   • What worked
   • What failed
   • What you'd improve

Outcomes capture results.
Reflections capture learning.`
},

// ===============================
// AFTER REFLECTION PROGRESSION
// ===============================

{
  keywords: [
    "what to do after reflection",
    "after writing reflection",
    "next step after reflection",
    "what after reflection"
  ],
  response: `After writing a Reflection:

You have completed one full learning cycle.

Next, you can:
• Improve the original Idea
• Start a new Experiment
• Share insights with the community
• Explore other Ideas

Reflection closes the loop — and opens the next one.`
},

];

export const fallbackResponse = `
I’m Echion, your EchoRoom guide.

I can help with:
• Navigating the Learning Loop (Ideas, Experiments, Outcomes, Reflections)
• Draft vs Publish settings
• Account and profile questions
• Finding and editing content
• Getting started

For unrelated topics, please use a general search tool.
`;