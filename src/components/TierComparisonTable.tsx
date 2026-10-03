type Tier = {
  name: string;
  price: string;
};

type Row = {
  feature: string;
  free: string;
  plus: string;
  concierge: string;
};

const TIERS: Tier[] = [
  { name: "Free", price: "$0" },
  { name: "Izy Plus", price: "$9/month" },
  { name: "Izy Concierge", price: "$29/month" },
];

const ROWS: Row[] = [
  {
    feature: "Taste profile",
    free: "Basic",
    plus: "Full",
    concierge: "Full",
  },
  {
    feature: "Recommendations",
    free: "Limited",
    plus: "Unlimited",
    concierge: "Unlimited",
  },
  {
    feature: "Community access",
    free: "—",
    plus: "Full",
    concierge: "Full",
  },
  {
    feature: "Exclusive spots",
    free: "—",
    plus: "—",
    concierge: "Included",
  },
  {
    feature: "Reservation assistance",
    free: "—",
    plus: "—",
    concierge: "Included",
  },
];

export default function TierComparisonTable() {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Compare plans
      </h2>

      <div className="mt-6 overflow-x-auto rounded-lg border border-bordeaux/20 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="bg-bordeaux/10">
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Feature
              </th>
              {TIERS.map((tier) => (
                <th
                  key={tier.name}
                  className="px-4 py-3 font-serif font-semibold text-bordeaux"
                >
                  <div>{tier.name}</div>
                  <div className="text-xs font-normal text-bordeaux/70">
                    {tier.price}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature} className="border-t border-bordeaux/10">
                <td className="px-4 py-3 font-serif font-medium text-ink">
                  {row.feature}
                </td>
                <td className="px-4 py-3 text-ink/70">{row.free}</td>
                <td className="px-4 py-3 text-ink/70">{row.plus}</td>
                <td className="px-4 py-3 text-ink/70">{row.concierge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
