"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const PLUS_PRICE = 9;
const CONCIERGE_PRICE = 29;

type ScenarioType = "conservative" | "optimistic";

const SCENARIOS: Record<
  ScenarioType,
  { label: string; plusRate: number; conciergeRate: number }
> = {
  conservative: { label: "Conservative", plusRate: 0.1, conciergeRate: 0.05 },
  optimistic: { label: "Optimistic", plusRate: 0.2, conciergeRate: 0.1 },
};

const currency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function RevenueCalculator() {
  const router = useRouter();
  const [freeUsers, setFreeUsers] = useState(1000);
  const [scenarioType, setScenarioType] = useState<ScenarioType>("conservative");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const scenario = SCENARIOS[scenarioType];

  const { plusUsers, conciergeUsers, monthlyRevenue, annualRevenue } =
    useMemo(() => {
      const plus = freeUsers * scenario.plusRate;
      const concierge = freeUsers * scenario.conciergeRate;
      const monthly = plus * PLUS_PRICE + concierge * CONCIERGE_PRICE;
      return {
        plusUsers: plus,
        conciergeUsers: concierge,
        monthlyRevenue: monthly,
        annualRevenue: monthly * 12,
      };
    }, [freeUsers, scenario]);

  const handleSave = async () => {
    setSaveStatus("saving");
    const { error } = await supabase.from("pricing_scenarios").insert({
      user_count: freeUsers,
      scenario_type: scenario.label,
      monthly_revenue: monthlyRevenue,
    });
    setSaveStatus(error ? "error" : "saved");
    if (!error) {
      router.refresh();
    }
  };

  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Revenue calculator
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Estimate monthly and annual revenue from a pool of free users.
      </p>

      <div className="mt-6 rounded-lg border border-bordeaux/20 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-semibold tracking-wide text-bordeaux uppercase"
            htmlFor="free-users"
          >
            Number of free users
          </label>
          <input
            id="free-users"
            type="number"
            min={0}
            value={freeUsers}
            onChange={(e) => {
              setFreeUsers(Math.max(0, Number(e.target.value)));
              setSaveStatus("idle");
            }}
            className="w-full rounded-md border border-bordeaux/30 bg-cream px-4 py-2 font-serif text-ink focus:border-bordeaux focus:outline-none"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
            Scenario
          </span>
          <div className="inline-flex w-fit rounded-full border border-bordeaux/30 p-1">
            {(Object.keys(SCENARIOS) as ScenarioType[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setScenarioType(key);
                  setSaveStatus("idle");
                }}
                className={`rounded-full px-4 py-1.5 font-serif text-sm transition-colors ${
                  scenarioType === key
                    ? "bg-bordeaux text-cream"
                    : "text-bordeaux hover:bg-bordeaux/10"
                }`}
              >
                {SCENARIOS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
              Monthly revenue
            </p>
            <p className="mt-1 font-serif text-3xl font-bold text-ink">
              {currency(monthlyRevenue)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
              Annual revenue
            </p>
            <p className="mt-1 font-serif text-3xl font-bold text-ink">
              {currency(annualRevenue)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 border-t border-bordeaux/10 pt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === "saving" || saveStatus === "saved"}
            className="rounded-full bg-bordeaux px-6 py-3 font-serif text-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saveStatus === "saving" ? "Saving…" : "Save scenario"}
          </button>
          {saveStatus === "saved" && (
            <span className="text-sm text-bordeaux">Saved.</span>
          )}
          {saveStatus === "error" && (
            <span className="text-sm text-bordeaux">
              Couldn&apos;t save, please try again.
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-bordeaux/20 bg-white">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="bg-bordeaux/10">
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Assumption
              </th>
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Free users", freeUsers.toLocaleString("en-US")],
              ["Izy Plus price", `${currency(PLUS_PRICE)}/month`],
              ["Izy Concierge price", `${currency(CONCIERGE_PRICE)}/month`],
              [
                "Conservative conversion",
                "10% to Plus, 5% to Concierge",
              ],
              [
                "Optimistic conversion",
                "20% to Plus, 10% to Concierge",
              ],
              ["Selected scenario", scenario.label],
              [
                "Plus users (selected scenario)",
                Math.round(plusUsers).toLocaleString("en-US"),
              ],
              [
                "Concierge users (selected scenario)",
                Math.round(conciergeUsers).toLocaleString("en-US"),
              ],
            ].map(([label, value]) => (
              <tr key={label} className="border-t border-bordeaux/10">
                <td className="px-4 py-3 text-ink">{label}</td>
                <td className="px-4 py-3 text-ink/70">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
