export type ResearchFinding = {
  id: string;
  competitor_count: number;
  main_risk: string;
  created_at: string;
};

export default function ResearchDashboardWidget({
  entries,
}: {
  entries: ResearchFinding[];
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Dashboard preview
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Saved research summaries, read from Supabase on each page load.
      </p>

      {entries.length === 0 ? (
        <p className="mt-4 font-serif text-ink/60">
          No saved research summaries yet.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-bordeaux/20 bg-white px-4 py-3 text-sm"
            >
              <span className="text-ink/50">
                {new Date(entry.created_at).toLocaleDateString()}
              </span>
              <span className="text-ink">
                <span className="font-semibold text-bordeaux">
                  {entry.competitor_count}
                </span>{" "}
                competitors found
              </span>
              <span className="text-ink/70">{entry.main_risk}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
