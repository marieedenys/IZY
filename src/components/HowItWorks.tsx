const STEPS = [
  {
    number: "01",
    title: "Tell us what you like",
    description: "Build your taste profile in minutes, not with another generic quiz.",
  },
  {
    number: "02",
    title: "Ask Izy",
    description: "Get an instant, personalized recommendation for any craving, mood, or budget.",
  },
  {
    number: "03",
    title: "Book with confidence",
    description: "Reserve the table that matches your taste, not just your search.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-3xl font-bold text-bordeaux sm:text-4xl">
          How it works
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center sm:text-left">
              <span className="font-serif text-sm text-bordeaux">
                {step.number}
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
