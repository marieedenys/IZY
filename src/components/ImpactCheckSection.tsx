import { BENEFICIARIES, RISKS } from "@/data/impactCheck";

export default function ImpactCheckSection() {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Practical impact check
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Who this actually helps, and an honest look at the real risks — what
        was done about each, and what is still genuinely open.
      </p>

      <h3 className="mt-6 font-serif text-lg font-bold text-ink">
        Who benefits
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {BENEFICIARIES.map((item) => (
          <div
            key={item.who}
            className="rounded-lg border border-bordeaux/20 bg-white p-5"
          >
            <p className="font-serif font-bold text-ink">{item.who}</p>
            <p className="mt-1 text-sm text-ink/70">{item.how}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 font-serif text-lg font-bold text-ink">Risks</h3>
      <div className="mt-3 flex flex-col gap-4">
        {RISKS.map((item) => (
          <div
            key={item.risk}
            className="rounded-lg border border-bordeaux/20 bg-white p-5"
          >
            <p className="font-serif font-bold text-ink">{item.risk}</p>
            <dl className="mt-3 flex flex-col gap-2 text-sm">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
                  What we did
                </dt>
                <dd className="text-ink/70">{item.whatWeDid}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
                  What remains
                </dt>
                <dd className="text-ink/70">{item.whatRemains}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
