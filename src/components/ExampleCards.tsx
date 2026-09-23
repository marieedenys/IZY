type Example = {
  name: string;
  region: string;
  description: string;
};

const EXAMPLES: Example[] = [
  {
    name: "Zest Maps",
    region: "Global",
    description: "Builds a taste profile from dining payment history and social signals like TikTok, Instagram, and Reddit.",
  },
  {
    name: "Paire",
    region: "Global",
    description: "Builds a personal taste profile through quizzes, then recommends restaurants with machine learning.",
  },
  {
    name: "Rarify",
    region: "Global",
    description: "A 2-minute quiz builds a taste profile, then matches menu items across nearby restaurants.",
  },
  {
    name: "Umamii",
    region: "Global",
    description: "Calculates a personalized match score per venue from the user's palate and their trusted circle.",
  },
  {
    name: "Taste Match",
    region: "Switzerland",
    description: "An algorithm surfaces only restaurants matching the user's taste, with direct booking.",
  },
  {
    name: "UffDeli",
    region: "Mexico",
    description: "An AI concierge for Mexico City, focused on Roma Norte, Roma Sur, Condesa, and Juárez, with 1,000+ hand-picked spots.",
  },
  {
    name: "Zesty",
    region: "Mexico",
    description: "A Mexican dining app built around real customer photos and a phone concierge.",
  },
];

export default function ExampleCards() {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Examples
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        5 global examples and 2 examples localized for Mexico.
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
