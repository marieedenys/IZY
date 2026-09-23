type Example = {
  name: string;
  region: "Global" | "Mexico";
  description: string;
};

const EXAMPLES: Example[] = [
  {
    name: "OpenTable",
    region: "Global",
    description: "Wide-coverage reservations and reviews platform used across most major markets.",
  },
  {
    name: "Resy",
    region: "Global",
    description: "Curated reservations platform (owned by American Express) focused on hard-to-book restaurants.",
  },
  {
    name: "TheFork",
    region: "Global",
    description: "Reservations and reviews platform (a TripAdvisor company) with strong coverage across Europe.",
  },
  {
    name: "Michelin Guide",
    region: "Global",
    description: "Editorial fine-dining guide built around curated star ratings rather than crowd reviews.",
  },
  {
    name: "Yelp",
    region: "Global",
    description: "General-purpose local business reviews and discovery, not specialized in fine dining.",
  },
  {
    name: "Toctoc",
    region: "Mexico",
    description: "Mexico-based restaurant reservation platform built specifically for the local market.",
  },
];

export default function ExampleCards() {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Examples
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        5 global examples and 1 example localized for Mexico.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMPLES.map((example) => (
          <div
            key={example.name}
            className="rounded-lg border border-bordeaux/20 bg-white p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-lg font-semibold text-ink">
                {example.name}
              </h3>
              <span className="shrink-0 rounded-full bg-bordeaux/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-bordeaux uppercase">
                {example.region}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink/70">{example.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
