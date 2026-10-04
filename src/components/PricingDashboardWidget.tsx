export type PricingScenario = {
  id: string;
  user_count: number;
  scenario_type: string;
  monthly_revenue: number;
  created_at: string;
};

const currency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function PricingDashboardWidget({
  scenarios,
}: {
  scenarios: PricingScenario[];
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Dashboard preview
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Saved pricing scenarios, read from Supabase on each page load.
      </p>

      {scenarios.length === 0 ? (
        <p className="mt-4 font-serif text-ink/60">
          No saved scenarios yet.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {scenarios.map((scenario) => (
            <li
              key={scenario.id}
              className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-bordeaux/20 bg-white px-4 py-3 text-sm"
            >
              <span className="text-ink/50">
                {new Date(scenario.created_at).toLocaleDateString()}
              </span>
              <span className="text-ink">
                <span className="font-semibold text-bordeaux">
                  {scenario.user_count.toLocaleString("en-US")}
                </span>{" "}
                free users · {scenario.scenario_type}
              </span>
              <span className="font-semibold text-ink">
                {currency(scenario.monthly_revenue)}/month
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
