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

export type DemoRestaurant = {
  name: string;
  cuisine: Craving | "Any";
  occasions: Occasion[];
  budget: Budget;
  description: string;
  /** Marks this record as placeholder demo data, not a real venue. */
  isDemoData: true;
};

// 12 demo restaurants — placeholder data for the Concierge, not real venues.
export const DEMO_RESTAURANTS: DemoRestaurant[] = [
  {
    name: "Nina's Trattoria",
    cuisine: "Italian",
    occasions: ["Date night", "Friends"],
    budget: "$$",
    description:
      "A candlelit neighborhood trattoria known for handmade pasta and an easy, unhurried pace.",
    isDemoData: true,
  },
  {
    name: "Forno Bellini",
    cuisine: "Italian",
    occasions: ["Business dinner", "Friends"],
    budget: "$$$",
    description:
      "An upscale Italian room with a wood-fired oven, popular for client dinners that still feel warm.",
    isDemoData: true,
  },
  {
    name: "Umi Izakaya",
    cuisine: "Japanese",
    occasions: ["Friends", "Solo and quiet"],
    budget: "$$",
    description:
      "A lively izakaya with small plates and sake, equally good solo at the bar or with a group.",
    isDemoData: true,
  },
  {
    name: "Sakura Omakase",
    cuisine: "Japanese",
    occasions: ["Date night", "Business dinner"],
    budget: "$$$",
    description:
      "A quiet omakase counter where the chef guides every course, ideal for a special occasion.",
    isDemoData: true,
  },
  {
    name: "Casa Elote",
    cuisine: "Mexican",
    occasions: ["Family", "Friends"],
    budget: "$",
    description:
      "A bright, family-run spot for tacos and elote, loud enough for kids and cheap enough for seconds.",
    isDemoData: true,
  },
  {
    name: "Mezcal y Fuego",
    cuisine: "Mexican",
    occasions: ["Date night", "Friends"],
    budget: "$$",
    description: "A moody mezcal bar with a short, bold menu built for sharing.",
    isDemoData: true,
  },
  {
    name: "The Green Table",
    cuisine: "Light and healthy",
    occasions: ["Solo and quiet", "Business dinner"],
    budget: "$$",
    description:
      "Seasonal, vegetable-forward plates in a calm room, easy to eat light before an afternoon of meetings.",
    isDemoData: true,
  },
  {
    name: "Citrus & Grain",
    cuisine: "Light and healthy",
    occasions: ["Family", "Friends"],
    budget: "$",
    description:
      "A fast-casual grain-bowl spot that keeps everyone, including picky eaters, happy.",
    isDemoData: true,
  },
  {
    name: "Mama's Kitchen",
    cuisine: "Comfort food",
    occasions: ["Family", "Solo and quiet"],
    budget: "$",
    description:
      "Home-style stews and roast chicken, the kind of place you go when you want to feel looked after.",
    isDemoData: true,
  },
  {
    name: "The Firehouse Grill",
    cuisine: "Comfort food",
    occasions: ["Friends", "Family"],
    budget: "$$",
    description:
      "A hearty grill-and-sides menu built for big appetites and bigger tables.",
    isDemoData: true,
  },
  {
    name: "Table for Two",
    cuisine: "Any",
    occasions: ["Date night", "Solo and quiet"],
    budget: "$$$",
    description:
      "A small, quiet dining room with a short seasonal menu, built for real conversation.",
    isDemoData: true,
  },
  {
    name: "The Common Room",
    cuisine: "Any",
    occasions: ["Friends", "Business dinner", "Family"],
    budget: "$$",
    description:
      "An all-day, globally-inspired menu with something for every seat at the table.",
    isDemoData: true,
  },
];

export type Suggestion = {
  name: string;
  reason: string;
};

function scoreRestaurant(
  restaurant: DemoRestaurant,
  craving: Craving,
  occasion: Occasion,
  budget: Budget,
): number {
  let score = 0;
  if (
    craving === "Surprise me" ||
    restaurant.cuisine === craving ||
    restaurant.cuisine === "Any"
  ) {
    score += 2;
  }
  if (restaurant.occasions.includes(occasion)) {
    score += 2;
  }
  if (restaurant.budget === budget) {
    score += 1;
  }
  return score;
}

/**
 * Pure recommendation function — no AI API, no paid service. Ranks the
 * demo restaurant list by fit and always returns exactly 3 suggestions.
 */
export function getSuggestions(
  craving: Craving,
  occasion: Occasion,
  budget: Budget,
): Suggestion[] {
  const ranked = [...DEMO_RESTAURANTS].sort((a, b) => {
    const diff =
      scoreRestaurant(b, craving, occasion, budget) -
      scoreRestaurant(a, craving, occasion, budget);
    return diff !== 0 ? diff : a.name.localeCompare(b.name);
  });

  return ranked.slice(0, 3).map((restaurant) => ({
    name: restaurant.name,
    reason: `${restaurant.name} fits a ${craving.toLowerCase()} craving, a ${occasion.toLowerCase()} occasion, and a ${budget} budget: ${restaurant.description}`,
  }));
}
