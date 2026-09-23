"use client";

import { useMemo, useState } from "react";

export type Competitor = {
  name: string;
  type: string;
  region: string;
  gap: string;
};

export const COMPETITORS: Competitor[] = [
  {
    name: "Zest Maps",
    type: "Taste-profile discovery",
    region: "Global",
    gap: "Infers taste passively from spending and social data, with no AI assistant or curated fine-dining community",
  },
  {
    name: "Paire",
    type: "Taste-profile app",
    region: "Global",
    gap: "Builds the profile from a one-time quiz rather than continuously learning from ongoing reviews",
  },
  {
    name: "Rarify",
    type: "Menu-level matching",
    region: "Global",
    gap: "Matches at the dish level from a single quiz, with no reviews, community, or booking layer",
  },
  {
    name: "Umamii",
    type: "Social taste-matching",
    region: "Global",
    gap: "Match quality depends on the size of the user's trusted circle, which is weak for new users with no network yet",
  },
  {
    name: "Taste Match",
    type: "Reservations & taste-matching",
    region: "Switzerland",
    gap: "Limited to the Swiss market, with no AI assistant or community reviews",
  },
  {
    name: "UffDeli",
    type: "AI concierge",
    region: "Mexico",
    gap: "Hyper-local to a few Mexico City neighborhoods, curated by humans rather than a scalable taste-matching algorithm",
  },
  {
    name: "Zesty",
    type: "Reviews & concierge",
    region: "Mexico",
    gap: "Relies on photos and a human phone concierge rather than automated, personalized taste-matching",
  },
  {
    name: "Google Reviews / TripAdvisor / asking friends",
    type: "Substitute",
    region: "Global",
    gap: "Generic ratings, no personalization to individual taste",
  },
];

export default function CompetitorsTable() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMPETITORS;
    return COMPETITORS.filter((c) =>
      [c.name, c.type, c.region, c.gap].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Competitors &amp; substitutes
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        8 competitors and substitutes, and how IZY differs from each.
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, type, region, or gap…"
        className="mt-6 w-full rounded-md border border-bordeaux/30 bg-white px-4 py-2 font-serif text-ink placeholder:text-ink/40 focus:border-bordeaux focus:outline-none"
      />

      <div className="mt-4 overflow-x-auto rounded-lg border border-bordeaux/20 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="bg-bordeaux/10">
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Name
              </th>
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Type
              </th>
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Region
              </th>
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Gap vs Izy
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.name} className="border-t border-bordeaux/10">
                <td className="px-4 py-3 font-serif font-medium text-ink">
                  {c.name}
                </td>
                <td className="px-4 py-3 text-ink/70">{c.type}</td>
                <td className="px-4 py-3 text-ink/70">{c.region}</td>
                <td className="px-4 py-3 text-ink/70">{c.gap}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-ink/50">
                  No competitors match &ldquo;{query}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
