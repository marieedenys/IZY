import MarketingCard from "@/components/MarketingCard";
import { BRAND_SYSTEM } from "@/lib/marketingContent";

export default function BrandSystemCard() {
  return (
    <MarketingCard title="Brand system">
      <div className="flex flex-wrap gap-4">
        {BRAND_SYSTEM.colors.map((color) => (
          <div key={color.hex} className="flex flex-col items-center gap-2">
            <span
              className="h-12 w-12 rounded-full border border-bordeaux/20"
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
            <span className="text-xs text-ink/70">
              {color.name} {color.hex}
            </span>
          </div>
        ))}
      </div>
      <dl className="mt-5 flex flex-col gap-3 text-sm">
        <div>
          <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
            Typography
          </dt>
          <dd className="mt-1 text-ink/70">{BRAND_SYSTEM.typography}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
            Tone
          </dt>
          <dd className="mt-1 text-ink/70">{BRAND_SYSTEM.tone}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
            Tagline
          </dt>
          <dd className="mt-1 font-serif text-lg text-ink">
            &ldquo;{BRAND_SYSTEM.tagline}&rdquo;
          </dd>
        </div>
      </dl>
    </MarketingCard>
  );
}
