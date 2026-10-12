import MarketingCard from "@/components/MarketingCard";
import { PERSONA } from "@/lib/marketingContent";

export default function PersonaCard() {
  return (
    <MarketingCard title="Target persona">
      <div className="flex flex-col gap-1">
        <span className="font-serif text-2xl font-semibold text-ink">
          {PERSONA.name}, {PERSONA.age}
        </span>
        <span className="text-sm text-ink/60">
          {PERSONA.role} · {PERSONA.location}
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink/70">
        {PERSONA.summary}
      </p>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <h4 className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
            Pain points
          </h4>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-ink/70">
            {PERSONA.painPoints.map((point) => (
              <li key={point}>· {point}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
            What she wants
          </h4>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-ink/70">
            {PERSONA.wants.map((want) => (
              <li key={want}>· {want}</li>
            ))}
          </ul>
        </div>
      </div>
    </MarketingCard>
  );
}
