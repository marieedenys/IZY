export type RoadmapHorizon = "Now" | "Next" | "Later";

export type RoadmapItem = {
  horizon: RoadmapHorizon;
  title: string;
  description: string;
};

export const ROADMAP: RoadmapItem[] = [
  {
    horizon: "Now",
    title: "Real restaurant data and its own domain",
    description:
      "Replace DEMO_RESTAURANTS with a real, sourced dataset (with permission to use it), and move off the izy-six.vercel.app subdomain onto a real domain.",
  },
  {
    horizon: "Next",
    title: "User accounts with a DB-stored taste profile",
    description:
      "Replace the localStorage-only /my-reviews and /my-taste-profile with real accounts, so reviews and taste history persist across devices instead of one browser.",
  },
  {
    horizon: "Next",
    title: "Legal and GDPR review for France",
    description:
      "A real privacy policy, documented legal basis for any personal data, and a data-subject access/deletion flow — not just the guardrail classifier.",
  },
  {
    horizon: "Later",
    title: "Move off Vercel's free Hobby plan",
    description:
      "Required before any commercial use, per Vercel's own terms — along with a paid Supabase tier so the project stops pausing from inactivity.",
  },
  {
    horizon: "Later",
    title: "Mobile polish",
    description:
      "A dedicated pass on small screens across every module — the layouts work today but haven't been tuned for mobile specifically.",
  },
];
