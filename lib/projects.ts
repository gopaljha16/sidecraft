export const categories = [
  "All",
  "SaaS & Technology",
  "Founder Branding",
  "Education",
  "Marketing",
  "Business & Case Studies",
] as const;

export type Category = (typeof categories)[number];
export type ProjectTheme = "saas" | "founder" | "education" | "marketing" | "strategy" | "business";
export type Slide = {
  kicker: string;
  title: string;
  body: string;
  layout: "cover" | "statement" | "framework" | "split" | "checklist" | "closing";
  points?: readonly string[];
  note: string;
};
export type Project = {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  theme: ProjectTheme;
  brief: string;
  objective: string;
  audience: string;
  angle: string;
  strategy: string;
  palette: readonly { name: string; hex: string }[];
  slides: readonly [Slide, Slide, Slide, Slide, Slide, Slide, Slide];
};

export const projects: readonly Project[] = [
  {
    slug: "saas-growth-playbook",
    title: "SaaS Growth Playbook",
    category: "SaaS & Technology",
    theme: "saas",
    brief: "A product-led growth story about creating momentum through a better first experience.",
    objective:
      "Turn an abstract growth conversation into a practical sequence a SaaS founder can use to examine their onboarding.",
    audience: "Early-stage SaaS founders and product marketers.",
    angle:
      "Follow one user from a specific problem to a first useful outcome, then identify the next bottleneck.",
    strategy:
      "Deep navy establishes focus. Blue creates a visual sequence, while lime marks the useful action. Diagrams represent a framework, not measured business results.",
    palette: [
      { name: "Navy", hex: "#162544" },
      { name: "Electric blue", hex: "#5365F8" },
      { name: "Lime", hex: "#C8EF78" },
    ],
    slides: [
      {
        kicker: "The SaaS growth playbook",
        title: "Great products. Better growth.",
        body: "Build a system. Not another growth hack.",
        layout: "cover",
        note: "Less friction. More momentum.",
      },
      {
        kicker: "01 / Start with someone",
        title: "A user is not a funnel.",
        body: "Choose a specific person and a job they need to finish. A signup matters less if they never get to the useful part.",
        layout: "statement",
        note: "Name the job before the metric.",
      },
      {
        kicker: "02 / Define the first win",
        title: "Make value visible.",
        body: "Write down the smallest meaningful outcome a new user can reach. Design the first session around getting there.",
        points: ["Arrive with a problem", "Complete one useful task", "Recognise the value"],
        layout: "framework",
        note: "An illustrative activation path.",
      },
      {
        kicker: "03 / Remove the detour",
        title: "Less setup. More doing.",
        body: "Audit every step before that first outcome. Ask whether the user needs it now, can skip it, or can come back to it later.",
        points: ["Before: configure everything", "After: complete one real task"],
        layout: "split",
        note: "Example onboarding decision.",
      },
      {
        kicker: "04 / Learn from friction",
        title: "Watch where momentum stops.",
        body: "Pair a simple completion measure with conversations. A number can show where people stop; their words can help explain why.",
        points: ["Observe one journey", "Ask what felt unclear", "Change one obstacle"],
        layout: "checklist",
        note: "A question, then an experiment.",
      },
      {
        kicker: "05 / Make it repeatable",
        title: "Build a learning loop.",
        body: "Keep the audience and outcome steady while testing one improvement. Record what changed and what remains uncertain.",
        points: ["Observe", "Form a hypothesis", "Improve", "Review"],
        layout: "framework",
        note: "No guaranteed growth outcomes.",
      },
      {
        kicker: "The next useful question",
        title: "What is your user’s first win?",
        body: "Map the path to it. Remove one unnecessary step. Learn from what happens next.",
        layout: "closing",
        note: "Save the framework. Start with one journey.",
      },
    ],
  },
  {
    slug: "founder-lessons",
    title: "Founder Lessons",
    category: "Founder Branding",
    theme: "founder",
    brief: "An editorial reflection on focus, trade-offs, and choosing the work that matters.",
    objective:
      "Express a founder perspective without inventing a founder biography or claiming personal business results.",
    audience: "Independent founders and small teams deciding what to build next.",
    angle: "A practical set of prompts for separating useful progress from a busy roadmap.",
    strategy:
      "Warm paper, rust accents, generous margins, and serif emphasis create the feeling of considered notebook entries.",
    palette: [
      { name: "Paper", hex: "#EFE9DE" },
      { name: "Ink", hex: "#302A26" },
      { name: "Rust", hex: "#9B452B" },
    ],
    slides: [
      {
        kicker: "Notes from the journey",
        title: "Build less. Mean more.",
        body: "A founder’s guide to finding the essential.",
        layout: "cover",
        note: "Founder lessons / Vol. 01",
      },
      {
        kicker: "Note 01 / The cost of yes",
        title: "Every yes spends attention.",
        body: "A new feature carries more than a build cost. Someone must explain it, maintain it, and decide what happens when it conflicts with everything else.",
        layout: "statement",
        note: "Consider the ongoing commitment.",
      },
      {
        kicker: "Note 02 / The useful constraint",
        title: "Write the problem in one sentence.",
        body: "Before discussing a solution, agree on who has the problem, when it appears, and why it matters enough to solve.",
        points: ["Who is struggling?", "What are they trying to do?", "What gets in the way?"],
        layout: "checklist",
        note: "Clarity is a team decision.",
      },
      {
        kicker: "Note 03 / Activity or progress?",
        title: "A full week can still miss the point.",
        body: "Check whether the work made a real task easier. A long release note is not, by itself, an answer to that question.",
        points: ["Activity: another feature shipped", "Progress: a specific obstacle removed"],
        layout: "split",
        note: "A distinction for planning, not a metric claim.",
      },
      {
        kicker: "Note 04 / Make a small bet",
        title: "Learn before you commit.",
        body: "A conversation, sketch, or limited prototype can expose a weak assumption. Choose the smallest useful way to test what you believe.",
        points: ["Name the assumption", "Make it testable", "Decide what you will learn"],
        layout: "framework",
        note: "The test should inform a decision.",
      },
      {
        kicker: "Note 05 / Protect the essential",
        title: "Keep a not-now list.",
        body: "Give good ideas somewhere to live without turning them into promises. Revisit them when the current problem is understood.",
        points: ["Do now", "Learn next", "Revisit later"],
        layout: "framework",
        note: "Focus is a deliberate trade-off.",
      },
      {
        kicker: "A question for your next planning session",
        title: "What can you choose not to build?",
        body: "Create room for the work that makes your product more useful to the people it serves.",
        layout: "closing",
        note: "Fewer promises. Clearer intent.",
      },
    ],
  },
  {
    slug: "the-future-of-ai",
    title: "The Future of AI",
    category: "Education",
    theme: "education",
    brief:
      "A practical framework for evaluating AI-assisted work with human judgment at the centre.",
    objective:
      "Make an AI adoption discussion concrete without speculative predictions or unsupported performance claims.",
    audience: "Business owners and marketers exploring a first AI-assisted workflow.",
    angle: "Begin with a useful task and define the review process before adding a tool.",
    strategy:
      "A lime canvas and modular diagrams frame the topic as a practical field guide. Explicit checkpoints keep human review visible.",
    palette: [
      { name: "Lime", hex: "#C8EF78" },
      { name: "Forest", hex: "#22351B" },
      { name: "Olive", hex: "#526B33" },
    ],
    slides: [
      {
        kicker: "A field guide to what’s next",
        title: "The future isn’t artificial. It’s useful.",
        body: "A practical perspective on AI.",
        layout: "cover",
        note: "The future of AI / Vol. 01",
      },
      {
        kicker: "01 / Begin with the work",
        title: "Pick a task. Not a trend.",
        body: "Look for a repeated task with a clear input and a result someone can check. Start where errors can be caught before they affect anyone.",
        layout: "statement",
        note: "Define useful before choosing a tool.",
      },
      {
        kicker: "02 / Draw the boundary",
        title: "What goes in? What stays out?",
        body: "Agree on the information the task needs. Review the tool’s handling of that information before sharing sensitive material.",
        points: ["Necessary context", "Permission to use it", "Clear limits"],
        layout: "checklist",
        note: "A workflow planning prompt.",
      },
      {
        kicker: "03 / Keep a person in the loop",
        title: "A draft still needs judgment.",
        body: "Treat generated work as something to inspect. Assign a reviewer who knows the subject and can check important claims against reliable sources.",
        points: ["AI: propose a draft", "Human: verify, edit, decide"],
        layout: "split",
        note: "Responsibility stays with the publisher.",
      },
      {
        kicker: "04 / Test on real examples",
        title: "Useful is something you can check.",
        body: "Choose representative examples, including awkward ones. Compare the result with what good work already looks like for your team.",
        points: ["Accuracy", "Usefulness", "Review effort"],
        layout: "framework",
        note: "Keep notes on failures as well as wins.",
      },
      {
        kicker: "05 / Design the handoff",
        title: "Make uncertainty visible.",
        body: "Decide when the workflow should stop and ask for help. An unclear input should not silently become a confident published answer.",
        points: ["Recognise uncertainty", "Ask a person", "Resolve before publishing"],
        layout: "framework",
        note: "A safe exit is part of the process.",
      },
      {
        kicker: "Your first experiment",
        title: "One task. A clear review. Then learn.",
        body: "Start small enough to understand the result. Expand only when the workflow is useful and its limits are clear.",
        layout: "closing",
        note: "Human potential, thoughtfully supported.",
      },
    ],
  },
  {
    slug: "marketing-mistakes",
    title: "Marketing Mistakes",
    category: "Marketing",
    theme: "marketing",
    brief:
      "A correction-led carousel that replaces vague marketing habits with specific communication choices.",
    objective:
      "Demonstrate how a strong visual contrast can make a useful content lesson easy to follow.",
    audience: "B2B marketers and founders reviewing their content direction.",
    angle: "Each common habit is paired with a concrete, more useful alternative.",
    strategy:
      "Coral panels, oversized type, and before/after contrasts create a direct editorial voice. The emphasis is on decisions, not unverified engagement claims.",
    palette: [
      { name: "Coral", hex: "#F2A491" },
      { name: "Oxblood", hex: "#522B2A" },
      { name: "Cream", hex: "#FFF4E9" },
    ],
    slides: [
      {
        kicker: "The content reset",
        title: "More content. Same confusion?",
        body: "Five communication habits worth rethinking before you publish again.",
        layout: "cover",
        note: "Marketing mistakes / A practical reset",
      },
      {
        kicker: "01 / Too many readers",
        title: "Everyone is a blurry audience.",
        body: "Choose the person this piece is for. The language, examples, and next step become easier to decide when that person is specific.",
        points: ["Vague: for every business", "Specific: for a founder briefing a designer"],
        layout: "split",
        note: "Specificity gives your story a direction.",
      },
      {
        kicker: "02 / No clear promise",
        title: "Give the reader a reason to stay.",
        body: "The opening should say what the reader can understand or do by the end. Curiosity works better when there is a worthwhile answer behind it.",
        points: ["Name a real problem", "Offer a clear takeaway", "Deliver on the promise"],
        layout: "checklist",
        note: "A hook is the beginning of a commitment.",
      },
      {
        kicker: "03 / Everything at once",
        title: "One carousel. One useful idea.",
        body: "A crowded slide often signals an undecided story. Keep the core message and give supporting points their own place in the sequence.",
        points: ["One central idea", "A logical sequence", "A clear finish"],
        layout: "framework",
        note: "Edit the story before shrinking the type.",
      },
      {
        kicker: "04 / All claims, no context",
        title: "Make the example do some work.",
        body: "Show the decision you mean. A small, clearly labelled example can explain more than another adjective about your service.",
        points: ["Claim: premium design", "Example: show the brief and visual decision"],
        layout: "split",
        note: "Use real proof or clearly labelled concepts.",
      },
      {
        kicker: "05 / An unrelated next step",
        title: "Close the loop you opened.",
        body: "Make the final action fit the story. Ask the reader to try the framework, examine a relevant example, or discuss the problem you just explored.",
        layout: "statement",
        note: "A relevant next step feels like a continuation.",
      },
      {
        kicker: "Before your next post",
        title: "Clearer beats louder.",
        body: "Choose a reader, make a useful promise, develop one idea, show an example, and finish with a relevant next step.",
        layout: "closing",
        note: "Save this as an editorial checklist.",
      },
    ],
  },
  {
    slug: "startup-product-strategy",
    title: "Startup Product Strategy",
    category: "SaaS & Technology",
    theme: "strategy",
    brief:
      "A compact product strategy framework, from understanding the problem to deciding what comes first.",
    objective:
      "Show how a complex planning topic can become a clear visual narrative without stripping away its trade-offs.",
    audience: "Early-stage product teams and founders preparing a focused roadmap.",
    angle: "Connect evidence, positioning, and priorities through one explicit decision chain.",
    strategy:
      "Electric blue, paper-white type, and lime decision nodes create a clean strategic diagram language.",
    palette: [
      { name: "Blue", hex: "#394BC8" },
      { name: "Paper", hex: "#F7F7F2" },
      { name: "Lime", hex: "#C8EF78" },
    ],
    slides: [
      {
        kicker: "The product strategy notebook",
        title: "A roadmap needs a reason.",
        body: "Connect the problem, the promise, and what you choose to build next.",
        layout: "cover",
        note: "Startup product strategy / A working framework",
      },
      {
        kicker: "01 / Start before the feature",
        title: "Understand the current workaround.",
        body: "Ask how people handle the problem today. Pay attention to what they tolerate, what they avoid, and what they have already tried.",
        points: ["Current task", "Existing workaround", "Unresolved friction"],
        layout: "framework",
        note: "Observation before prioritisation.",
      },
      {
        kicker: "02 / Separate evidence from belief",
        title: "What do you know? What do you assume?",
        body: "Keep observations and interpretations distinct. An enthusiastic conversation is useful context, not proof that every proposed feature is needed.",
        points: ["Observed: what actually happened", "Assumed: why you think it happened"],
        layout: "split",
        note: "Make the uncertain parts discussable.",
      },
      {
        kicker: "03 / Make a specific promise",
        title: "Position around the useful difference.",
        body: "Describe who the product helps, the job it supports, and why its approach fits that situation. Avoid a promise so broad it cannot guide a decision.",
        points: ["For this person", "Facing this problem", "With this useful difference"],
        layout: "checklist",
        note: "A working positioning statement.",
      },
      {
        kicker: "04 / Choose a coherent first move",
        title: "Priorities should explain each other.",
        body: "Group the work around one outcome. Ask whether each proposed feature supports that outcome or adds a different, untested promise.",
        points: ["Desired outcome", "Essential capabilities", "Deliberate exclusions"],
        layout: "framework",
        note: "A roadmap is also a set of trade-offs.",
      },
      {
        kicker: "05 / Define the review",
        title: "Decide what would change your mind.",
        body: "Before building, name the evidence that would support, challenge, or reshape the plan. Put the review on the roadmap too.",
        layout: "statement",
        note: "Keep the strategy open to learning.",
      },
      {
        kicker: "For your next roadmap session",
        title: "Can every priority point to a problem?",
        body: "Trace the chain from evidence to promise to work. If the link is missing, start a conversation before another ticket.",
        layout: "closing",
        note: "Problem → promise → priorities.",
      },
    ],
  },
  {
    slug: "business-case-study",
    title: "Business Case Study",
    category: "Business & Case Studies",
    theme: "business",
    brief:
      "A fictional operations studio makes a broad service offer easier to understand and enquire about.",
    objective:
      "Demonstrate a case-study narrative through an explicitly hypothetical brief, with no claimed clients or measured results.",
    audience: "Service-business founders considering how to explain their offer.",
    angle:
      "Follow a fictional studio from a confusing offer to a clearer service page and a proposed way to evaluate it.",
    strategy:
      "Lavender, charcoal, annotated comparisons, and a problem-to-decision sequence make the reasoning visible. The outcome is an illustrative proposal, not a reported result.",
    palette: [
      { name: "Lavender", hex: "#DED9F0" },
      { name: "Charcoal", hex: "#302840" },
      { name: "Purple", hex: "#6A539A" },
    ],
    slides: [
      {
        kicker: "A hypothetical business case",
        title: "A clearer offer. A better starting point.",
        body: "How a fictional operations studio could explain its work with more focus.",
        layout: "cover",
        note: "Fictional scenario. No client results claimed.",
      },
      {
        kicker: "01 / The fictional brief",
        title: "Useful work. A vague introduction.",
        body: "Imagine an operations studio whose homepage lists many capabilities but never explains which customer problem it takes on first.",
        layout: "statement",
        note: "An invented scenario for design exploration.",
      },
      {
        kicker: "02 / The communication problem",
        title: "The visitor has to join the dots.",
        body: "A buyer must infer the audience, the scope, and the next step. The design brief is to make those decisions easier to understand.",
        points: ["Who is this for?", "What can we start with?", "What happens next?"],
        layout: "checklist",
        note: "Questions in the fictional brief.",
      },
      {
        kicker: "03 / The proposed shift",
        title: "From a list to a starting offer.",
        body: "Organise the page around one defined engagement. Explain the input, the work, and the deliverable before introducing optional services.",
        points: ["Before: everything we can do", "Proposed: a focused operations review"],
        layout: "split",
        note: "An illustrative positioning decision.",
      },
      {
        kicker: "04 / The story structure",
        title: "Make the engagement legible.",
        body: "Show the problem the review addresses, what the buyer provides, and the document they receive. Keep exclusions visible alongside the scope.",
        points: ["The situation", "The engagement", "The deliverable", "The next step"],
        layout: "framework",
        note: "Proposed page structure, not a live service.",
      },
      {
        kicker: "05 / The illustrative outcome",
        title: "Clarity you can evaluate.",
        body: "The proposed page gives a buyer a defined starting point. To test it, ask representative readers to explain the offer back and identify anything still unclear.",
        layout: "statement",
        note: "No traffic, revenue, or conversion results claimed.",
      },
      {
        kicker: "Bring it back to your business",
        title: "Can a buyer explain your offer back?",
        body: "Ask someone unfamiliar with your work. Listen for the audience, the scope, and the next step. Their uncertainty is a useful place to start.",
        layout: "closing",
        note: "Hypothetical case. Practical question.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
