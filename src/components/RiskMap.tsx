export type Risk = {
  label: string;
  impact: "High" | "Low";
  likelihood: "High" | "Low";
};

export const RISKS: Risk[] = [
  {
    label: "Direct taste-matching competitors (Paire, Rarify, Zest Maps) out-improve the algorithm or community first",
    impact: "High",
    likelihood: "High",
  },
  {
    label: "Data/security incident involving stored taste profiles",
    impact: "High",
    likelihood: "Low",
  },
  {
    label: "Slow restaurant partner onboarding in new markets",
    impact: "Low",
    likelihood: "High",
  },
  {
    label: "Localization friction expanding beyond core markets",
    impact: "Low",
    likelihood: "Low",
  },
];

function Quadrant({ impact, likelihood }: { impact: Risk["impact"]; likelihood: Risk["likelihood"] }) {
  const risks = RISKS.filter((r) => r.impact === impact && r.likelihood === likelihood);
  return (
    <div className="flex min-h-[140px] flex-col gap-2 border border-bordeaux/20 bg-white p-4">
      {risks.map((risk) => (
        <p key={risk.label} className="text-sm text-ink">
          {risk.label}
        </p>
      ))}
    </div>
  );
}

export default function RiskMap() {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Risk map
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Impact × likelihood for the main risks identified so far.
      </p>

      <div className="mt-6 flex">
        <div className="flex w-8 shrink-0 items-center justify-center">
          <span className="-rotate-90 text-xs font-semibold tracking-wide whitespace-nowrap text-bordeaux uppercase">
            Impact
          </span>
        </div>
        <div className="flex w-14 shrink-0 flex-col justify-around py-1 text-right text-xs font-semibold text-bordeaux/70 uppercase">
          <span>High</span>
          <span>Low</span>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-bordeaux/20 bg-bordeaux/20">
            <Quadrant impact="High" likelihood="Low" />
            <Quadrant impact="High" likelihood="High" />
            <Quadrant impact="Low" likelihood="Low" />
            <Quadrant impact="Low" likelihood="High" />
          </div>
          <div className="mt-2 grid grid-cols-2 text-center text-xs font-semibold tracking-wide text-bordeaux uppercase">
            <span>Likelihood: Low</span>
            <span>Likelihood: High</span>
          </div>
        </div>
      </div>
    </section>
  );
}
