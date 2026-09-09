export type CoreOutput = {
  id: string;
  cuisine_type: string;
  atmosphere: string;
  budget: string;
  generated_output: string;
  created_at: string;
};

export default function CoreDashboard({ entries }: { entries: CoreOutput[] }) {
  return (
    <div className="mx-auto mt-16 max-w-2xl">
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Dashboard preview
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Every recommendation saved so far, read from Supabase on each page load.
      </p>

      {entries.length === 0 ? (
        <p className="mt-6 font-serif text-ink/60">
          No saved recommendations yet.
        </p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-lg border border-bordeaux/20 bg-white p-5"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-bordeaux uppercase">
                <span>{entry.cuisine_type}</span>
                <span aria-hidden="true">·</span>
                <span>{entry.atmosphere}</span>
                <span aria-hidden="true">·</span>
                <span>{entry.budget}</span>
              </div>
              <p className="mt-2 font-serif text-ink">
                {entry.generated_output}
              </p>
              <p className="mt-2 text-xs text-ink/50">
                {new Date(entry.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
