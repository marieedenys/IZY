// Who/what does what in IZY, and who is accountable for it. Written by
// hand from the actual code, not generated.

export type AgentMapEntry = {
  name: string;
  role: string;
  input: string;
  output: string;
  guardrail: string;
  accountable: string;
};

export const AGENT_MAP: AgentMapEntry[] = [
  {
    name: "Claude Code",
    role: "Builder agent: writes and edits the Next.js/Supabase code for every module from natural-language instructions.",
    input: "Written prompts from the student builder, plus the existing repo.",
    output: "Committed, pushed, and deployed code changes.",
    guardrail:
      "Never writes test rows into the production database; never runs destructive SQL; small, reviewed commits.",
    accountable:
      "The student builder, who reviews and approves every change before it ships.",
  },
  {
    name: "Ask Izy (/core)",
    role: "Rule-based recommender: turns 3 picked criteria into one instant recommendation sentence.",
    input: "Cuisine, mood, and budget selected from dropdowns.",
    output: "One deterministic sentence naming a venue type and the 3 criteria.",
    guardrail:
      "Only the 3 dropdowns are accepted as input — no free text, so there is nothing to classify or refuse.",
    accountable: "The student builder.",
  },
  {
    name: "Concierge (/chat)",
    role: "Rule-based chat: asks 3 questions one at a time, then returns exactly 3 ranked suggestions.",
    input: "Tapped answers to the 3 intake questions, plus any freely typed message.",
    output:
      "3 suggestions with a truthful, fact-checked reason, or a guardrail reply if the typed message needs one.",
    guardrail:
      "Every typed message is classified before any reply; never shows a list before all 3 questions are answered.",
    accountable: "The student builder for the logic in this module.",
  },
  {
    name: "Guardrail classifier",
    role: "Pattern-based classifier that detects allergy/medical, reservation, personal-data, or unrecognized messages.",
    input: "Any text typed into the Concierge's message box.",
    output: "One of 4 categories, used to pick a fixed reply and whether the event is logged.",
    guardrail:
      "Plain regex matching, no AI call; defaults to the safest bucket (\"unrecognized\") when nothing specific matches.",
    accountable:
      "The student builder, who wrote the patterns; flagged cases are meant to reach the checkpoint below.",
  },
  {
    name: "Human review checkpoint",
    role: "Where allergy/medical and reservation messages land, logged with outcome \"pending_human_review\".",
    input: "Guardrail events classified as allergy_or_health or reservation.",
    output:
      "A row in concierge_sessions a human would need to read and act on; the chat itself never promises safety or a booking.",
    guardrail:
      "The app explicitly tells the user it can't guarantee safety or make a reservation, and that it was sent for review.",
    accountable:
      "Nobody is actually staffed to read these rows yet in this course project — see the impact check below.",
  },
  {
    name: "A/B test tracker",
    role: "Records each visitor's vote on 2 headline tests and shows live counts.",
    input: "A click on one of two variant buttons, once per test per browser.",
    output: "A row in ab_test_results, and an updated live percentage for each variant.",
    guardrail:
      "No personal data is collected; a visitor can't vote twice on the same test from the same browser (localStorage).",
    accountable: "The student builder.",
  },
];
