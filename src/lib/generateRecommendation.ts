const CUISINE_VENUE: Record<string, string> = {
  Italian: "trattoria",
  Japanese: "izakaya",
  French: "bistro",
  Mediterranean: "taverna",
};

const ATMOSPHERE_DESCRIPTOR: Record<string, string> = {
  Romantic: "an intimate",
  Casual: "a relaxed",
  Festive: "a lively",
  Calm: "a quiet",
};

/**
 * Simulated recommendation generator — no external AI API call.
 * Combines the three form inputs into a single, coherent sentence.
 */
export function generateRecommendation(
  cuisineType: string,
  atmosphere: string,
  budget: string,
): string {
  const venue = CUISINE_VENUE[cuisineType] ?? "restaurant";
  const descriptor = ATMOSPHERE_DESCRIPTOR[atmosphere] ?? "a great";

  return `For a ${atmosphere.toLowerCase()} evening built around ${cuisineType} cuisine, look for ${descriptor} ${venue} with a ${budget} budget.`;
}
