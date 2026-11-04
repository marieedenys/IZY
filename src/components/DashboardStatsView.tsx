export type RecentSession = {
  occasion: string | null;
  budget: string | null;
  outcome: string | null;
  category: string | null;
  created_at: string;
};

export type DashboardStats = {
  core_outputs: number;
  ab_test_results: number;
  marketing_assets: number;
  concierge_sessions: number;
  feedback_up: number;
  feedback_down: number;
  outcomes: Record<string, number>;
  recent_sessions: RecentSession[];
};

const STAT_LABELS: { key: keyof DashboardStats; label: string }[] = [
  { key: "core_outputs", label: "Ask Izy recommendations saved" },
  { key: "concierge_sessions", label: "Concierge sessions logged" },
  { key: "ab_test_results", label: "A/B test votes" },
  { key: "marketing_assets", label: "Marketing assets saved" },
  { key: "feedback_up", label: "👍 Helpful ratings" },
  { key: "feedback_down", label: "👎 Not-for-me ratings" },
];

export default function DashboardStatsView({
  stats,
  errorMessage,
}: {
  stats: DashboardStats | null;
  errorMessage: string | null;
}) {
  if (errorMessage) {
    return (
      <div className="rounded-lg border border-bordeaux/20 bg-white p-6 text-center">
        <p className="font-serif text-lg text-bordeaux">
          Live stats aren&apos;t available right now.
        </p>
        <p className="mt-2 text-sm text-ink/60">{errorMessage}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-lg border border-bordeaux/20 bg-white p-6 text-center">
        <p className="font-serif text-lg text-ink/60">No stats to show yet.</p>
      </div>
    );
  }

  const outcomeEntries = Object.entries(stats.outcomes ?? {});
  const outcomeTotal = outcomeEntries.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAT_LABELS.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-lg border border-bordeaux/20 bg-white p-5 text-center"
            >
              <p className="font-serif text-3xl font-bold text-bordeaux">
                {stats[key] as number}
              </p>
              <p className="mt-1 text-sm text-ink/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl font-bold text-bordeaux">
          Concierge outcomes
        </h2>
        {outcomeEntries.length === 0 ? (
          <p className="mt-3 text-sm text-ink/60">No Concierge sessions yet.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {outcomeEntries.map(([outcome, count]) => {
              const pct = outcomeTotal ? Math.round((count / outcomeTotal) * 100) : 0;
              return (
                <div key={outcome} className="flex items-center gap-3">
                  <span className="w-44 shrink-0 text-sm text-ink">
                    {outcome.replace(/_/g, " ")}
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-bordeaux/10">
                    <div
                      className="h-full rounded-full bg-bordeaux"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-16 shrink-0 text-right text-sm text-ink/70">
                    {count} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-serif text-xl font-bold text-bordeaux">
          10 latest Concierge sessions
        </h2>
        <p className="mt-1 text-sm text-ink/60">
          Occasion, budget, outcome, and guardrail category only — never the
          message text.
        </p>
        {stats.recent_sessions.length === 0 ? (
          <p className="mt-4 text-sm text-ink/60">No sessions yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-lg border border-bordeaux/20 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="bg-bordeaux/10">
                  <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                    Occasion
                  </th>
                  <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                    Budget
                  </th>
                  <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                    Outcome
                  </th>
                  <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                    Category
                  </th>
                  <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                    When
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_sessions.map((session, index) => (
                  <tr key={index} className="border-t border-bordeaux/10">
                    <td className="px-4 py-3 text-ink">
                      {session.occasion ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-ink/70">
                      {session.budget ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-ink/70">
                      {session.outcome ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-ink/70">
                      {session.category ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-ink/50">
                      {new Date(session.created_at).toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
