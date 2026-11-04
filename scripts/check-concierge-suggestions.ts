/**
 * Exhaustive sanity check for the Concierge's recommendation logic.
 *
 * Runs all 90 combinations of craving x occasion x budget through
 * getSuggestions() and verifies, for each one, that:
 *   1. every suggestion's restaurant matches the requested cuisine
 *      (or the craving was "Surprise me"),
 *   2. exactly 3 suggestions are returned,
 *   3. no two suggestions are the same restaurant.
 *
 * Usage: npx tsx scripts/check-concierge-suggestions.ts
 */

import {
  DEMO_RESTAURANTS,
  getSuggestions,
  INTAKE_QUESTIONS,
  type Budget,
  type Craving,
  type Occasion,
} from "../src/lib/concierge";

const cravings = INTAKE_QUESTIONS[0].options as Craving[];
const occasions = INTAKE_QUESTIONS[1].options as Occasion[];
const budgets = INTAKE_QUESTIONS[2].options as Budget[];

const restaurantByName = new Map(
  DEMO_RESTAURANTS.map((restaurant) => [restaurant.name, restaurant]),
);

let combinations = 0;
const problems: string[] = [];

for (const craving of cravings) {
  for (const occasion of occasions) {
    for (const budget of budgets) {
      combinations += 1;
      const label = `${craving} / ${occasion} / ${budget}`;
      const suggestions = getSuggestions(craving, occasion, budget);

      if (suggestions.length !== 3) {
        problems.push(
          `${label}: expected 3 suggestions, got ${suggestions.length}`,
        );
        continue;
      }

      const names = suggestions.map((s) => s.name);
      const uniqueNames = new Set(names);
      if (uniqueNames.size !== names.length) {
        problems.push(`${label}: duplicate suggestion among ${names.join(", ")}`);
      }

      if (craving !== "Surprise me") {
        for (const suggestion of suggestions) {
          const restaurant = restaurantByName.get(suggestion.name);
          if (!restaurant) {
            problems.push(
              `${label}: suggestion "${suggestion.name}" is not a known restaurant`,
            );
          } else if (restaurant.cuisine !== craving) {
            problems.push(
              `${label}: suggestion "${suggestion.name}" is ${restaurant.cuisine}, not ${craving}`,
            );
          }
        }
      }
    }
  }
}

console.log(`Checked ${combinations} combinations.`);

if (problems.length === 0) {
  console.log("No problem.");
} else {
  console.log(`${problems.length} problem(s) found:`);
  for (const problem of problems) {
    console.log(`- ${problem}`);
  }
  process.exitCode = 1;
}
