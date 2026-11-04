import { ROADMAP, type RoadmapHorizon } from "@/data/roadmap";

const HORIZONS: RoadmapHorizon[] = ["Now", "Next", "Later"];

export default function RoadmapSection() {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Version 2 roadmap
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        What a real next version would need, roughly in order.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {HORIZONS.map((horizon) => (
          <div key={horizon}>
            <h3 className="font-serif text-lg font-bold text-ink">
              {horizon}
            </h3>
            <div className="mt-3 flex flex-col gap-4">
              {ROADMAP.filter((item) => item.horizon === horizon).map(
                (item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-bordeaux/20 bg-white p-5"
                  >
                    <p className="font-serif font-bold text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-ink/70">
                      {item.description}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
