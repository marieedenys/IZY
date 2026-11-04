// Pure logic for the Izy Concierge: intake questions, demo restaurant data,
// recommendation scoring, and the guardrail classifier. No AI API, no paid
// service — everything here is deterministic and runs entirely client-side.

export type Craving =
  | "Italian"
  | "Japanese"
  | "Mexican"
  | "Light and healthy"
  | "Comfort food"
  | "Surprise me";

export type Occasion =
  | "Date night"
  | "Friends"
  | "Family"
  | "Business dinner"
  | "Solo and quiet";

export type Budget = "$" | "$$" | "$$$";

export type IntakeQuestionId = "craving" | "occasion" | "budget";

export type IntakeQuestion = {
  id: IntakeQuestionId;
  prompt: string;
  options: string[];
};

export const INTAKE_QUESTIONS: IntakeQuestion[] = [
  {
    id: "craving",
    prompt: "What are you craving tonight?",
    options: [
      "Italian",
      "Japanese",
      "Mexican",
      "Light and healthy",
      "Comfort food",
      "Surprise me",
    ],
  },
  {
    id: "occasion",
    prompt: "What's the occasion?",
    options: [
      "Date night",
      "Friends",
      "Family",
      "Business dinner",
      "Solo and quiet",
    ],
  },
  {
    id: "budget",
    prompt: "What's your budget?",
    options: ["$", "$$", "$$$"],
  },
];
