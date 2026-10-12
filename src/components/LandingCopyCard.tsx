import MarketingCard from "@/components/MarketingCard";
import { LANDING_COPY, formatLandingCopy } from "@/lib/marketingContent";

export default function LandingCopyCard() {
  return (
    <MarketingCard title="Landing page copy" content={formatLandingCopy()}>
      <h4 className="font-serif text-2xl font-bold text-ink">
        {LANDING_COPY.headline}
      </h4>
      <p className="mt-2 font-serif text-lg text-ink/70">
        {LANDING_COPY.subheadline}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {LANDING_COPY.benefits.map((benefit) => (
          <li key={benefit.title}>
            <span className="font-serif font-semibold text-ink">
              {benefit.title}.
            </span>{" "}
            <span className="text-sm text-ink/70">{benefit.description}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 inline-block rounded-full bg-bordeaux px-5 py-2 font-serif text-sm text-cream">
        {LANDING_COPY.cta}
      </p>
    </MarketingCard>
  );
}
