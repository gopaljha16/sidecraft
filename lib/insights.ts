export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: string;
  intro: string;
  sections: {
    title: string;
    paragraphs: readonly string[];
    checklist?: readonly string[];
    example?: string;
  }[];
  relatedProject: string;
  sources?: { title: string; url: string }[];
};

export const insights: readonly Insight[] = [
  {
    slug: "brief-a-linkedin-carousel-designer",
    title: "How to brief a LinkedIn carousel designer for a B2B brand",
    description:
      "A practical brief for turning subject-matter expertise into a focused carousel: audience, useful takeaway, evidence, brand assets, and approval steps.",
    category: "Creative collaboration",
    intro:
      "A useful carousel brief does not need to be a finished script. It needs to help a designer understand the person reading, the idea being shared, and the decisions that matter. Use these prompts to turn a broad request into a story someone can actually design.",
    sections: [
      {
        title: "Choose one reader and one useful outcome",
        paragraphs: [
          "Start with a person in a specific situation. ‘B2B decision-makers’ leaves too many choices open. A SaaS founder reviewing a confusing onboarding flow gives the writer something concrete to work with.",
          "Then finish this sentence: after reading, this person should understand or be able to do what? Keep the outcome narrow enough to explore in one carousel. You can build a series around the larger topic later.",
        ],
        example:
          "Reader: an early-stage SaaS founder. Situation: new users sign up but struggle to reach a useful outcome. Takeaway: how to map the first useful task before adding another onboarding screen.",
      },
      {
        title: "Share the thinking behind the idea",
        paragraphs: [
          "Provide the raw material: notes, a recorded explanation, product context, examples, or questions your audience asks. Say which parts come from first-hand experience and which are still hypotheses.",
          "For any numbers, quotes, screenshots, or customer stories, include the source and permission to use them. If evidence is unavailable, a clearly labelled hypothetical example can demonstrate an idea without pretending to be a client result.",
        ],
        checklist: [
          "The core idea in a sentence",
          "A concrete example or relevant source",
          "Claims that require subject-matter review",
          "Anything confidential or out of scope",
        ],
      },
      {
        title: "Brief the narrative before the visual treatment",
        paragraphs: [
          "A carousel needs a progression, not just a stack of facts. A useful starting sequence is a hook, context, an insight, an example, a framework, a takeaway, and a relevant next step. It is a working outline, not a rule that every story must follow.",
          "Ask the designer to show the outline before polishing every slide. This gives you a chance to correct the logic while changes are still simple. The SaaS Growth Playbook concept in our portfolio shows one way that sequence can develop.",
        ],
        example:
          "Instead of ‘make seven slides about onboarding’, try ‘open with the first-win problem, show one setup detour, explain a review loop, and close by asking readers to map their own user’s first win’.",
      },
      {
        title: "Make your visual constraints explicit",
        paragraphs: [
          "Share a brand kit, available font licences, logo files, examples of past work, and any accessibility or readability concerns. References help most when you explain the decision you admire: the hierarchy, restrained palette, or diagram clarity.",
          "Also name the platform and the delivery format you need. LinkedIn supports sharing documents, but publishing requirements can change; confirm the current requirements in LinkedIn’s own help before final export. Do not assume the same asset should be posted unchanged everywhere.",
        ],
        checklist: [
          "Intended platform and agreed output format",
          "Brand assets and usage permissions",
          "A few references with specific reasons",
          "One person responsible for consolidated feedback",
        ],
      },
      {
        title: "Agree on the review and handoff",
        paragraphs: [
          "Decide who approves subject-matter accuracy, who signs off the design, and how feedback will be collected. Group feedback into a coherent round so the designer can understand the decision rather than reconcile conflicting comments.",
          "Before production, confirm revision scope, timing, final file formats, usage rights, and anything outside the package. Slidecraft’s monthly offer includes two revision rounds per carousel; the brief and scope boundaries are agreed before starting.",
          "The best brief leaves room for a designer’s judgment while being clear about the problem. If the reader, useful outcome, and review process are understood, the visual work has a stronger foundation.",
        ],
      },
    ],
    relatedProject: "saas-growth-playbook",
    sources: [
      {
        title: "LinkedIn Help: Upload and share documents",
        url: "https://www.linkedin.com/help/linkedin/answer/a518909",
      },
    ],
  },
  {
    slug: "eight-carousels-for-a-saas-founder",
    title: "What eight carousels per month can look like for a SaaS founder",
    description:
      "An illustrative monthly content plan that turns one SaaS theme into eight distinct stories, with clear inputs, review stages, and useful next steps.",
    category: "Content planning",
    intro:
      "Eight carousels should mean eight useful conversations, not eight versions of the same sales pitch. Here is an illustrative way a SaaS founder could develop one theme across a month. This is an editorial example, not a promise of reach, leads, or revenue.",
    sections: [
      {
        title: "Start with one theme you can explain well",
        paragraphs: [
          "For this example, the theme is helping a new user reach their first useful outcome. It is specific enough to connect the month, while leaving room for practical advice, product thinking, and a founder perspective.",
          "Begin with the expertise you already have: what you have observed, what customers ask, and what you can responsibly show. A small set of strong inputs is more useful than a long topic list built around claims no one can verify.",
        ],
      },
      {
        title: "Give each carousel a distinct job",
        paragraphs: [
          "The following eight prompts approach the same theme from different angles. Each should stand on its own. Adjust the order to your actual priorities rather than treating this example as a required posting schedule.",
        ],
        checklist: [
          "1. Define the first win: explain the smallest meaningful outcome a new user is trying to reach.",
          "2. Diagnose a detour: walk through a clearly labelled example of unnecessary setup.",
          "3. Share a founder lesson: discuss a real trade-off, or label the scenario as hypothetical.",
          "4. Offer a framework: show a simple observe, hypothesise, improve, and review loop.",
          "5. Answer a useful question: explain what to examine before redesigning an onboarding screen.",
          "6. Show the reasoning: break down a product decision using evidence you have permission to share.",
          "7. Provide a working checklist: help a reader audit one first-session journey.",
          "8. Connect it to the offer: explain who your product helps and the relevant next step, with clear scope.",
        ],
      },
      {
        title: "Use seven slides as a working narrative",
        paragraphs: [
          "A seven-slide structure can help you budget attention while drafting: opening, context, insight, example, framework, takeaway, and next step. Change it when the story needs a different sequence. Six to eight slides are included in Slidecraft’s monthly package.",
          "For the ‘diagnose a detour’ story, the opening might be ‘less setup, more doing’. Then describe the task, show the extra step, explain why it exists, examine an alternative, name the trade-off, and invite readers to inspect one flow in their own product.",
        ],
        example:
          "A hypothetical example can compare ‘configure everything before starting’ with ‘finish one real task, then add settings when needed’. Keep it labelled as an illustration unless you are describing a genuine, approved product example.",
      },
      {
        title: "Batch the decisions, not just the graphics",
        paragraphs: [
          "Review topics together before designing eight separate assets. Approve the role of each story, check that the same point is not repeated, and identify which examples require verification or permission.",
          "Next, review outlines and copy. Once the logic is sound, the design can establish a coherent visual language across the month without making every carousel look identical. A familiar palette and hierarchy can coexist with different diagrams and editorial layouts.",
        ],
        checklist: [
          "Founder input: expertise, accurate examples, and constraints",
          "Studio input: topic structure, writing, visual design, and captions",
          "Shared checkpoint: narrative approval before full design",
          "Final checkpoint: consolidated feedback and final asset approval",
        ],
      },
      {
        title: "Make the next month a response to what you learn",
        paragraphs: [
          "After publishing, review the questions people ask and the conversations that follow. If you can attribute an enquiry to a piece of content, record that connection without treating one event as proof that the entire plan works.",
          "For a small business, a useful content review can be qualitative: what was misunderstood, what prompted a relevant question, and which examples were worth developing. Pair that with whatever reliable channel and enquiry data you actually have.",
          "The monthly offer starts at ₹10,000 for eight carousels, with research, content structure, hooks and slide copywriting, premium design, captions, and two revision rounds each. Additional services and publishing are separately scoped. A plan becomes useful when the examples and decisions are genuinely yours.",
        ],
      },
    ],
    relatedProject: "startup-product-strategy",
  },
];

export function getInsight(slug: string) {
  return insights.find((article) => article.slug === slug);
}
export function readingMinutes(article: Insight) {
  const words = [
    article.intro,
    ...article.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.checklist || []),
      section.example || "",
    ]),
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
