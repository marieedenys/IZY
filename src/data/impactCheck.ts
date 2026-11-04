// Honest look at who this actually helps and what real risks it carries.
// "What remains" is not a TODO wishlist — it's what is still genuinely open.

export type Beneficiary = {
  who: string;
  how: string;
};

export type Risk = {
  risk: string;
  whatWeDid: string;
  whatRemains: string;
};

export const BENEFICIARIES: Beneficiary[] = [
  {
    who: "A diner who doesn't want to scroll through reviews",
    how: "Ask Izy and the Concierge turn 3 quick picks or 3 quick questions into one suggestion, instead of an open-ended search.",
  },
  {
    who: "A restaurant or marketing team evaluating a launch headline",
    how: "The Marketing module gives ready-made assets and a live A/B test on two headline variants, with real vote counts.",
  },
  {
    who: "The student builder",
    how: "A working, deployed, multi-module product to show for an AI-101 course, with guardrails and a paper trail (docs, dashboard) rather than just a demo video.",
  },
  {
    who: "Anyone evaluating the course project",
    how: "The Dashboard and Docs pages make the system's actual behaviour (counts, outcomes, prompts, commits) checkable instead of taken on faith.",
  },
];

export const RISKS: Risk[] = [
  {
    risk: "A user asks about an allergy or medical restriction and could receive advice that isn't medically reviewed.",
    whatWeDid:
      "The guardrail classifier detects allergy/medical language before any reply is generated. It never answers the question — it tells the user it can't guarantee safety and logs the message as pending_human_review instead.",
    whatRemains:
      "Nobody is actually staffed to read those pending_human_review rows in this course project, so the handoff is a logged intent, not a real safety net yet.",
  },
  {
    risk: "A French user could type personal data (a name, phone number, email) into the Concierge's free-text box, which GDPR governs.",
    whatWeDid:
      "The guardrail classifier detects likely personal-data patterns and routes them to a fixed reply; shouldSaveMessageText() decides when the raw typed text is safe to store at all, rather than always saving it.",
    whatRemains:
      "There is no privacy policy, no documented legal basis, and no data-subject access/deletion flow. This is a classroom prototype, not a GDPR-compliant service.",
  },
  {
    risk: "The restaurants shown on Ask Izy, Concierge, and Marketing are sample data, but nothing on those pages tells a visitor that.",
    whatWeDid: "Nothing yet — this is a known, unaddressed gap, listed here rather than hidden.",
    whatRemains:
      "Add a visible note on /core, /chat, and /marketing that the restaurants are illustrative demo data, not real, current listings.",
  },
  {
    risk: "Suggestion logic could end up favoring pricier cuisines or venues if budget isn't treated as a real constraint.",
    whatWeDid:
      "Budget is one of 3 equally-weighted intake criteria in both Ask Izy and the Concierge, and the demo restaurant data spans all 4 budget symbols.",
    whatRemains:
      "No audit has actually been run to check whether suggestions distribute evenly across budgets — this is true by design, not measured. See the Testing Summary below.",
  },
  {
    risk: "Vercel's free Hobby plan is for non-commercial use, but a restaurant-recommendation product could read as a real commercial launch.",
    whatWeDid: "Deployed only on the free Hobby tier, as a course project, with no payments and no commercial use anywhere.",
    whatRemains:
      "Before any real or commercial use, this needs to move to a paid Vercel plan per Vercel's own terms.",
  },
  {
    risk: "Supabase's free tier pauses a project after a period of inactivity, which would break any page that reads or writes live data.",
    whatWeDid:
      "/dashboard catches the failure and shows a friendly \"may be waking up\" message instead of crashing. The Concierge and Ask Izy saves already catch errors so the chat or form never crashes — Ask Izy shows a \"couldn't save\" message.",
    whatRemains:
      "Only /dashboard has a message that specifically explains a paused free-tier project; the other pages just show a generic save failure.",
  },
];
