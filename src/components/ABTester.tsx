"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { AB_TESTS, type ABTestCounts } from "@/lib/abTests";

export default function ABTester({ counts }: { counts: ABTestCounts }) {
  const router = useRouter();
  const [votedTests, setVotedTests] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored: Record<string, string> = {};
    for (const test of AB_TESTS) {
      const vote = window.localStorage.getItem(`ab-vote-${test.testName}`);
      if (vote) stored[test.testName] = vote;
    }
    // Reading localStorage must happen client-only, after mount, so the
    // initial render still matches the server-rendered HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVotedTests(stored);
  }, []);

  const handleVote = async (testName: string, variant: string) => {
    setError(null);
    const { error } = await supabase
      .from("ab_test_results")
      .insert({ test_name: testName, variant });

    if (error) {
      setError("Couldn't record your vote, please try again.");
      return;
    }

    window.localStorage.setItem(`ab-vote-${testName}`, variant);
    setVotedTests((prev) => ({ ...prev, [testName]: variant }));
    router.refresh();
  };

  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        A/B tester
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Vote for the variant you prefer. Votes are stored live in Supabase.
      </p>

      <div className="mt-6 flex flex-col gap-10">
        {AB_TESTS.map((test) => {
          const testCounts = counts[test.testName] ?? {};
          const total = Object.values(testCounts).reduce(
            (sum, n) => sum + n,
            0,
          );
          const voted = votedTests[test.testName];

          return (
            <div key={test.testName}>
              <h3 className="font-serif text-lg font-semibold text-ink">
                {test.label}
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {test.variants.map((variant) => {
                  const count = testCounts[variant] ?? 0;
                  const pct = total
                    ? Math.round((count / total) * 100)
                    : 0;
                  const isVoted = voted === variant;

                  return (
                    <button
                      key={variant}
                      type="button"
                      disabled={!!voted}
                      onClick={() => handleVote(test.testName, variant)}
                      className={`rounded-lg border p-4 text-left transition-opacity disabled:cursor-not-allowed ${
                        isVoted
                          ? "border-bordeaux bg-bordeaux/10"
                          : "border-bordeaux/20 bg-white hover:opacity-80"
                      }`}
                    >
                      <p className="font-serif text-ink">
                        &ldquo;{variant}&rdquo;
                      </p>
                      <p className="mt-2 text-xs font-semibold tracking-wide text-bordeaux uppercase">
                        {count} vote{count === 1 ? "" : "s"} ({pct}%)
                        {isVoted ? " · your vote" : ""}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {error && <p className="mt-4 text-sm text-bordeaux">{error}</p>}
    </section>
  );
}
