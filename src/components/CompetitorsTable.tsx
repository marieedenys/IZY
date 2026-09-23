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
    name: "OpenTable",
    type: "Reservations",
    region: "Global",
    gap: "No taste-profile personalization or AI assistant",
  },
  {
    name: "Resy",
    type: "Reservations",
    region: "Global (US-led)",
    gap: "Reservation-first, lacks a personalized taste engine",
  },
  {
    name: "TheFork",
    type: "Reservations & reviews",
    region: "Europe / LatAm",
    gap: "Broad coverage but shallow personalization",
  },
  {
    name: "Michelin Guide",
    type: "Curated guide",
    region: "Global",
    gap: "Editorial curation only, no community reviews or AI assistant",
  },
  {
    name: "Yelp",
    type: "Reviews & discovery",
    region: "Global",
    gap: "Generic across all business types, not fine-dining specialized",
  },
  {
    name: "Toctoc",
    type: "Reservations",
    region: "Mexico",
    gap: "Local reach but no taste-profile or premium curation layer",
  },
  {
    name: "The Infatuation",
    type: "Editorial reviews & guides",
    region: "US / UK",
    gap: "Strong editorial voice, no booking or AI assistant",
  },
  {
    name: "Google Maps / Zomato",
    type: "Reviews & discovery",
    region: "Global",
    gap: "Review volume over quality, not fine-dining focused",
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
