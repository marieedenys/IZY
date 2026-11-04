import { AGENT_MAP } from "@/data/agentMap";

export default function AgentMapSection() {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Agent map
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Who or what does each job in IZY, and who is accountable for it.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {AGENT_MAP.map((entry) => (
          <div
            key={entry.name}
            className="flex flex-col gap-3 rounded-lg border border-bordeaux/20 bg-white p-5"
          >
            <h3 className="font-serif text-lg font-bold text-ink">
              {entry.name}
            </h3>
            <p className="text-sm text-ink/70">{entry.role}</p>
            <dl className="flex flex-col gap-2 text-sm">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
                  Input
                </dt>
                <dd className="text-ink/70">{entry.input}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
                  Output
                </dt>
                <dd className="text-ink/70">{entry.output}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
                  Guardrail
                </dt>
                <dd className="text-ink/70">{entry.guardrail}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
                  Accountable
                </dt>
                <dd className="text-ink/70">{entry.accountable}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
