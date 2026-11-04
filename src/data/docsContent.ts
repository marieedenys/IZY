// Prompt library and build logs, reconstructed from the actual git history
// (`git log --oneline`). Modules 1-5's exact original prompt text was not
// kept anywhere retrievable, so those entries are reconstructed from commit
// messages and marked as such — never invented as if they were verbatim.
// Module 6's prompt is the one actually given for this module, so it is
// quoted close to verbatim and marked exact.

export type PromptEntry = {
  title: string;
  purpose: string;
  outcome: string;
  exact: boolean;
  text: string;
};

export type Module = {
  id: string;
  title: string;
  summary: string;
  commits: { hash: string; message: string }[];
  bugsFoundFixed: string[];
  prompts: PromptEntry[];
};

export const MODULES: Module[] = [
  {
    id: "module-1",
    title: "Module 1: Foundation",
    summary:
      "The initial Next.js + Tailwind + Supabase site: homepage, a shared navbar wired to 6 placeholder pages, and the docs page.",
    commits: [
      { hash: "eee5d1b", message: "Initial IZY site: Next.js + Tailwind homepage, docs page, Supabase client" },
      { hash: "881b7f6", message: "Wire navbar links to 6 new placeholder pages, translate site to English" },
    ],
    bugsFoundFixed: [],
    prompts: [
      {
        title: "Scaffold the site",
        purpose: "Stand up the Next.js/Tailwind/Supabase base and a docs placeholder.",
        outcome: "A deployed homepage with the Supabase client wired in.",
        exact: false,
        text: "Reconstructed from the commit message — the exact original prompt text for this module was not kept.",
      },
      {
        title: "Wire the navbar and translate to English",
        purpose: "Give every planned page a real route behind the navbar instead of dead links, and standardize on English copy.",
        outcome: "6 placeholder pages, each reachable from the navbar.",
        exact: false,
        text: "Reconstructed from the commit message — the exact original prompt text for this module was not kept.",
      },
    ],
  },
  {
    id: "module-2",
    title: "Module 2: Ask Izy",
    summary:
      "The /core page: a simple 3-criteria form (cuisine, atmosphere, budget) that generates a recommendation sentence, with a save-to-Supabase and a dashboard preview of saved entries.",
    commits: [
      { hash: "75d3c57", message: "Point navbar's ask izy tab to /core, redirect old /ask-izy route" },
      { hash: "d944c60", message: "Add /core page with cuisine/atmosphere/budget form" },
      { hash: "0e9efdc", message: "Wire Ask Izy to a simulated recommendation generator" },
      { hash: "5d328eb", message: "Add Save button to persist recommendations to core_outputs" },
      { hash: "2c27b2a", message: "Add Dashboard preview of saved core_outputs entries" },
    ],
    bugsFoundFixed: [],
    prompts: [
      {
        title: "Build the Ask Izy form and recommender",
        purpose: "A zero-AI, rule-based recommender: pick 3 things, get an instant sentence back.",
        outcome: "generateRecommendation() plus a form at /core, with results saved to core_outputs and previewed below the form.",
        exact: false,
        text: "Reconstructed from the commit messages — the exact original prompt text for this module was not kept.",
      },
    ],
  },
  {
    id: "module-3",
    title: "Module 3: Research",
    summary:
      "The /research page: competitor cards, a searchable competitors table, a 2x2 risk map, and a save/preview flow for research summaries.",
    commits: [
      { hash: "99b9490", message: "Add /research page with global + Mexico example cards" },
      { hash: "3eb62fd", message: "Add competitors table with live search to /research" },
      { hash: "6a3b427", message: "Add 2x2 risk map to /research" },
      { hash: "a45dbe5", message: "Add Save research summary button, persist to research_findings" },
      { hash: "e390fc6", message: "Add dashboard widget reading back saved research summaries" },
      { hash: "80749e6", message: "Replace placeholder competitors with real taste-matching research" },
      { hash: "f845d78", message: "Add shared Navbar to /core and /research" },
      { hash: "811e147", message: "Add Docs and Research links to the footer" },
    ],
    bugsFoundFixed: [],
    prompts: [
      {
        title: "Build the Research page",
        purpose: "Document real competitor and market research directly in the product, not just in a slide deck.",
        outcome: "A searchable competitors table, a risk map, and real (not placeholder) competitor write-ups, all reachable from the navbar and footer.",
        exact: false,
        text: "Reconstructed from the commit messages — the exact original prompt text for this module was not kept.",
      },
    ],
  },
  {
    id: "module-4",
    title: "Module 4: Product and Pricing",
    summary:
      "The /product and /pricing pages: a tier comparison table, a live revenue calculator with a save/preview flow, and the redesigned homepage CTAs.",
    commits: [
      { hash: "c3edc7f", message: "Add /product page with tier comparison table and segments" },
      { hash: "780c93b", message: "Add /pricing page with live revenue calculator" },
      { hash: "816c01e", message: "Add Save scenario button, persist to pricing_scenarios" },
      { hash: "ff233f7", message: "Add dashboard widget reading back saved pricing scenarios" },
      { hash: "398ef81", message: "Point premium access tab to /pricing, link /pricing to /product" },
      { hash: "e68e0ff", message: "Redirect old /premium-access route to /pricing" },
      { hash: "03513dc", message: "Upgrade homepage with value prop, how it works, pricing teaser, CTAs" },
    ],
    bugsFoundFixed: [],
    prompts: [
      {
        title: "Build Product, Pricing, and the new homepage",
        purpose: "Give the business side of IZY (tiers, a revenue model) the same real-product treatment as the recommender.",
        outcome: "A tier table, a working revenue calculator that saves scenarios, and a homepage that actually sells the product instead of a bare placeholder.",
        exact: false,
        text: "Reconstructed from the commit messages — the exact original prompt text for this module was not kept.",
      },
    ],
  },
  {
    id: "module-5",
    title: "Module 5: Marketing and Concierge",
    summary:
      "The /marketing launch kit with a live A/B headline test, and the full Concierge chat: a 3-question guided intake, a guardrail classifier with a human-review path, suggestion logic, and feedback/rating storage.",
    commits: [
      { hash: "b9ed27d", message: "Add /marketing page with the full written launch kit" },
      { hash: "9e4635f", message: "Add Marketing link to the footer" },
      { hash: "c93bec4", message: "Add Copy and Export buttons to every marketing content card" },
      { hash: "3b59a1d", message: "Add Save button to marketing cards, persist to marketing_assets" },
      { hash: "3b0caec", message: "Add A/B tester with live vote counts to /marketing" },
      { hash: "7662bd0", message: "concierge: page and UI" },
      { hash: "30a32c6", message: "concierge: intake flow" },
      { hash: "f7c1352", message: "concierge: response logic" },
      { hash: "6f52961", message: "concierge: guardrail and human review" },
      { hash: "6d7975c", message: "concierge: storage and rating" },
      { hash: "f25e5ae", message: "concierge: navigation" },
      { hash: "0a0cede", message: "fix: align concierge inserts with table schema" },
      { hash: "68e781c", message: "fix: match cuisine first and keep reason text truthful" },
      { hash: "69267a4", message: "fix: unique id per guardrail event and friendlier fallback reply" },
    ],
    bugsFoundFixed: [
      "concierge_sessions inserts didn't match the actual table schema — fixed in 0a0cede.",
      "Suggestion matching checked mood before cuisine, so a reason sentence could name the wrong cuisine — fixed in 68e781c to match cuisine first and keep the reason text truthful.",
      "Guardrail events logged in the same second could collide on id, and the fallback reply read as terse — fixed in 69267a4 with a unique id per event and a friendlier fallback.",
    ],
    prompts: [
      {
        title: "Build the Marketing launch kit and A/B test",
        purpose: "Give the marketing module a real, usable launch kit plus a live headline experiment, not just static copy.",
        outcome: "A launch kit with copy/export/save, and a two-variant A/B test with live vote counts.",
        exact: false,
        text: "Reconstructed from the commit messages — the exact original prompt text for this module was not kept.",
      },
      {
        title: "Build the Concierge guided chat",
        purpose: "A rule-based conversational alternative to Ask Izy: 3 questions, then 3 ranked suggestions, with guardrails on free text.",
        outcome: "ConciergeChat.tsx and src/lib/concierge.ts: intake flow, guardrail classifier routing allergy/medical and reservation messages to human review, suggestion logic, and session/feedback logging.",
        exact: false,
        text: "Reconstructed from the commit messages — the exact original prompt text for this module was not kept.",
      },
    ],
  },
  {
    id: "module-6",
    title: "Module 6: Integrated Venture",
    summary:
      "Turning the 5 separate modules into one integrated product: full navigation, a live Dashboard, a guided /demo walkthrough with agent map / impact check / testing summary / roadmap, this Docs rewrite, and 3 light localStorage-only pages.",
    commits: [
      { hash: "3fb1a1d", message: "nav: add /demo and /dashboard links, align Core with Concierge" },
      { hash: "1906c08", message: "dashboard: add /dashboard calling the dashboard_stats RPC" },
      { hash: "7c346c4", message: "demo: add /demo guided tour (step 1-5)" },
      { hash: "9136d92", message: "demo: add agent map section" },
      { hash: "e930feb", message: "demo: add practical impact check section" },
      { hash: "64bbbf9", message: "demo: add testing summary section" },
      { hash: "812e351", message: "demo: add version 2 roadmap section" },
    ],
    bugsFoundFixed: [],
    prompts: [
      {
        title: "Integrate every module into one product",
        purpose:
          "Make every page reachable, add a guided /demo and a live /dashboard, keep Ask Izy and the Concierge consistent, and document the whole build honestly in /demo and /docs.",
        outcome:
          "This module's own commits above, plus the /demo page you're reading from and this Docs rewrite.",
        exact: true,
        text: "Read the whole repo first (src/app, src/lib, navbar, footer, existing Supabase usage, scripts) before changing anything. Rules: Next.js + Tailwind + Supabase + Vercel free stack, no paid API, no new dependency unless essential. NEVER write test rows into the production Supabase (use scripts that do not insert, or mock). NEVER run destructive SQL. Make SMALL commits with clear messages, push to main, and deploy to Vercel at least twice. Keep the visual style consistent with the existing pages. Goal: turn Izy into one integrated product with a guided demo — navigation and consistency, a /dashboard reading dashboard_stats, a /demo guided tour plus agent map / impact check / testing summary / roadmap sections, a /docs rewrite with a prompt library and build logs, and three light localStorage-only pages (/about-us, /my-reviews, /my-taste-profile).",
      },
    ],
  },
];
