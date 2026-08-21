const STEPS = [
  {
    week: "Week 1",
    title: "My Reviews",
    description: "Building the review system: rate, comment, and revisit past experiences.",
  },
  {
    week: "Week 2",
    title: "My Taste Profile",
    description: "Building the taste profile that learns from every review to refine recommendations.",
  },
  {
    week: "Week 3",
    title: "Ask Izy",
    description: "Developing the AI assistant able to answer questions and guide choices.",
  },
  {
    week: "Week 4",
    title: "Community",
    description: "Opening the community space to connect and follow other members' recommendations.",
  },
  {
    week: "Week 5",
    title: "Premium Access",
    description: "Integrating the features and perks reserved for premium members.",
  },
  {
    week: "Week 6",
    title: "Final Testing & Launch",
    description: "Final testing, fixes, and the official launch of the IZY platform.",
  },
];

export default function Roadmap() {
  return (
    <section className="bg-ink px-6 py-20 text-cream">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-3xl font-bold sm:text-4xl">
          Coming up next
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-cream/70 sm:text-base">
          Six weeks of building, one step at a time, to bring IZY to life.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.title} className="border-t border-bordeaux pt-5">
              <span className="font-serif text-sm text-bordeaux">
                {step.week}
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold text-cream">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
