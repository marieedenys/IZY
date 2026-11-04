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
  cuisine: Craving;
  occasions: Occasion[];
  budget: Budget;
  description: string;
  /** Marks this record as placeholder demo data, not a real venue. */
  isDemoData: true;
};

// 15 demo restaurants — placeholder data for the Concierge, not real venues.
// Exactly 3 per real cuisine (Italian, Japanese, Mexican, Light and healthy,
// Comfort food), one at each budget level, so cuisine can be a hard filter
// and every craving/occasion/budget combination still has 3 candidates to
// pick from after relaxing occasion/budget. "Surprise me" draws from all 15.
export const DEMO_RESTAURANTS: DemoRestaurant[] = [
  // Italian
  {
    name: "Via Napoli",
    cuisine: "Italian",
    occasions: ["Friends", "Family"],
    budget: "$",
    description:
      "A no-frills pizzeria slinging thin-crust pies and classic Italian sandwiches, quick enough for a weeknight with friends or family.",
    isDemoData: true,
  },
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
  // Japanese
  {
    name: "Ramen Doko",
    cuisine: "Japanese",
    occasions: ["Friends", "Solo and quiet"],
    budget: "$",
    description:
      "A counter-service ramen shop with a short menu and fast seats, equally easy solo or with friends.",
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
  // Mexican
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
    name: "Oaxaca Table",
    cuisine: "Mexican",
    occasions: ["Date night", "Business dinner"],
    budget: "$$$",
    description:
      "A refined take on Oaxacan classics with mole flights and a quiet dining room, suited to a date night or a client dinner.",
    isDemoData: true,
  },
  // Light and healthy
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
    name: "The Green Table",
    cuisine: "Light and healthy",
    occasions: ["Solo and quiet", "Business dinner"],
    budget: "$$",
    description:
      "Seasonal, vegetable-forward plates in a calm room, easy to eat light before an afternoon of meetings.",
    isDemoData: true,
  },
  {
    name: "Verde",
    cuisine: "Light and healthy",
    occasions: ["Date night", "Business dinner"],
    budget: "$$$",
    description:
      "A polished plant-forward restaurant with a tasting-menu feel, good for a date night or impressing a client.",
    isDemoData: true,
  },
  // Comfort food
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
    name: "The Oak Room",
    cuisine: "Comfort food",
    occasions: ["Date night", "Business dinner"],
    budget: "$$$",
    description:
      "An elevated comfort-food menu, think short rib and truffle mac, served in a room dressed up enough for a date night or a client dinner.",
    isDemoData: true,
  },
];

export type Suggestion = {
  name: string;
  reason: string;
};

function article(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function joinClauses(clauses: string[]): string {
  if (clauses.length === 0) return "";
  if (clauses.length === 1) return clauses[0];
  if (clauses.length === 2) return `${clauses[0]} and ${clauses[1]}`;
  return `${clauses.slice(0, -1).join(", ")}, and ${clauses[clauses.length - 1]}`;
}

function listWithOr(items: string[]): string {
  return items.join(" or ");
}

/**
 * Builds a reason sentence that only states facts true for this specific
 * restaurant (drawn from its own fields): it never claims an occasion or
 * budget match that didn't happen, and says so plainly when a suggestion
 * is only a close match on occasion or budget.
 */
function buildReason(
  restaurant: DemoRestaurant,
  craving: Craving,
  occasion: Occasion,
  budget: Budget,
): string {
  const occasionMatch = restaurant.occasions.includes(occasion);
  const budgetMatch = restaurant.budget === budget;

  const matchClauses: string[] = [];
  if (craving !== "Surprise me") {
    matchClauses.push(`${article(craving)} ${craving} craving`);
  }
  if (occasionMatch) matchClauses.push(`a ${occasion} occasion`);
  if (budgetMatch) matchClauses.push(`a ${budget} budget`);

  const caveats: string[] = [];
  if (!occasionMatch) {
    caveats.push(
      `it's usually picked for ${listWithOr(restaurant.occasions)} rather than ${occasion}`,
    );
  }
  if (!budgetMatch) {
    caveats.push(`it runs ${restaurant.budget} rather than ${budget}`);
  }

  let sentence: string;
  if (craving === "Surprise me") {
    sentence = `${restaurant.name} is a surprise pick, ${restaurant.cuisine} cuisine`;
    if (matchClauses.length > 0) {
      sentence += ` that fits ${joinClauses(matchClauses)}`;
    }
  } else {
    sentence = `${restaurant.name} fits ${joinClauses(matchClauses)}`;
  }

  if (caveats.length > 0) {
    sentence += `, though ${caveats.join(" and ")}`;
  }

  return `${sentence}: ${restaurant.description}`;
}

/**
 * Pure recommendation function — no AI API, no paid service. Cuisine is a
 * hard filter first (when craving isn't "Surprise me", only matching-
 * cuisine restaurants are eligible); within that eligible set it ranks by
 * occasion and budget fit, relaxing budget first and then occasion (while
 * always keeping the cuisine rule) until exactly 3 distinct suggestions
 * are found.
 */
export function getSuggestions(
  craving: Craving,
  occasion: Occasion,
  budget: Budget,
): Suggestion[] {
  const eligible = DEMO_RESTAURANTS.filter(
    (restaurant) => craving === "Surprise me" || restaurant.cuisine === craving,
  );

  const matchLevels: Array<(restaurant: DemoRestaurant) => boolean> = [
    (restaurant) =>
      restaurant.occasions.includes(occasion) && restaurant.budget === budget,
    (restaurant) => restaurant.occasions.includes(occasion),
    () => true,
  ];

  const picked: DemoRestaurant[] = [];
  const pickedNames = new Set<string>();

  for (const matchesLevel of matchLevels) {
    if (picked.length >= 3) break;

    const candidates = eligible
      .filter(
        (restaurant) =>
          !pickedNames.has(restaurant.name) && matchesLevel(restaurant),
      )
      .sort((a, b) => {
        const occasionA = a.occasions.includes(occasion) ? 1 : 0;
        const occasionB = b.occasions.includes(occasion) ? 1 : 0;
        if (occasionA !== occasionB) return occasionB - occasionA;

        const budgetA = a.budget === budget ? 1 : 0;
        const budgetB = b.budget === budget ? 1 : 0;
        if (budgetA !== budgetB) return budgetB - budgetA;

        return a.name.localeCompare(b.name);
      });

    for (const restaurant of candidates) {
      if (picked.length >= 3) break;
      picked.push(restaurant);
      pickedNames.add(restaurant.name);
    }
  }

  return picked.map((restaurant) => ({
    name: restaurant.name,
    reason: buildReason(restaurant, craving, occasion, budget),
  }));
}

// --- Guardrail -------------------------------------------------------
//
// Typed messages are never used to generate a recommendation. They are
// classified into exactly one of four categories; the Concierge always
// replies with a fixed, non-AI message and — for the two safety-critical
// categories — a human-review flag, then returns to the intake questions.

export type GuardrailCategory =
  | "allergy_or_health"
  | "reservation"
  | "personal_data"
  | "off_topic";

const ALLERGY_OR_HEALTH_PATTERN =
  /\b(allerg(y|ic|ies)|gluten|celiac|coeliac|lactose|nuts?|nut-free|diabet(es|ic)|medical|intoleran(t|ce))\b/i;

const RESERVATION_PATTERN = /\b(book(ing)?|reserve|reservation|table for)\b/i;

const PERSONAL_DATA_PATTERN =
  /\b(phone(\s*number)?|e-?mail|address|card number|credit card|password)\b/i;

/**
 * Pure classifier — no AI API, no paid service. Anything that doesn't
 * match a specific pattern defaults to "off_topic".
 */
export function classifyMessage(text: string): GuardrailCategory {
  if (ALLERGY_OR_HEALTH_PATTERN.test(text)) return "allergy_or_health";
  if (RESERVATION_PATTERN.test(text)) return "reservation";
  if (PERSONAL_DATA_PATTERN.test(text)) return "personal_data";
  return "off_topic";
}

export function guardrailReply(category: GuardrailCategory): string {
  switch (category) {
    case "allergy_or_health":
      return "I can't guarantee food safety for allergies or medical needs, so I've sent this to the Izy team for a human to review.";
    case "reservation":
      return "I can't make a reservation or guarantee a table myself, so I've sent this to the Izy team for a human to review.";
    case "personal_data":
      return "I can't take personal or payment details here. Let's get back to finding you a table.";
    case "off_topic":
      return "I'm just here to help you find somewhere to eat. Let's get back to the questions.";
  }
}

/**
 * Maps a guardrail category to the outcome values concierge_sessions
 * actually accepts: allergy_or_health and reservation need a human to
 * follow up ("pending_human_review"); personal_data and off_topic are
 * just refused and logged as "guardrail".
 */
export function guardrailOutcome(
  category: GuardrailCategory,
): "pending_human_review" | "guardrail" {
  return category === "allergy_or_health" || category === "reservation"
    ? "pending_human_review"
    : "guardrail";
}

/** Only allergy_or_health and reservation keep the original message text. */
export function shouldSaveMessageText(category: GuardrailCategory): boolean {
  return category === "allergy_or_health" || category === "reservation";
}
