export type ABTest = {
  testName: string;
  label: string;
  variants: [string, string];
};

export const AB_TESTS: ABTest[] = [
  {
    testName: "homepage_headline",
    label: "Test 1 — Homepage headline",
    variants: [
      "Fine dining has never been easier.",
      "The table that fits your taste, found in seconds.",
    ],
  },
  {
    testName: "social_post_headline",
    label: "Test 2 — Social post headline",
    variants: [
      "Stop scrolling through reviews. Start tasting.",
      "Your taste, your table, no guesswork.",
    ],
  },
];

export type ABTestCounts = Record<string, Record<string, number>>;

export function countVotes(
  rows: { test_name: string; variant: string }[],
): ABTestCounts {
  const counts: ABTestCounts = {};
  for (const row of rows) {
    counts[row.test_name] ??= {};
    counts[row.test_name][row.variant] =
      (counts[row.test_name][row.variant] ?? 0) + 1;
  }
  return counts;
}
