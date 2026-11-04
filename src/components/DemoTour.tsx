import Link from "next/link";

type TourStep = {
  number: number;
  title: string;
  sentence: string;
  href: string;
  cta: string;
};

const TOUR_STEPS: TourStep[] = [
  {
    number: 1,
    title: "Ask Izy",
    sentence: "Pick a cuisine, mood, and budget and get an instant match, no questions asked.",
    href: "/core",
    cta: "Try Ask Izy",
  },
  {
    number: 2,
    title: "Marketing assets and A/B test",
    sentence: "Browse the launch kit, then vote on a headline and watch the live counts move.",
    href: "/marketing",
    cta: "Open Marketing",
  },
  {
    number: 3,
    title: "Concierge",
    sentence: "Undecided? Answer three quick questions in a guided chat and get three suggestions.",
    href: "/chat",
    cta: "Talk to the Concierge",
  },
  {
    number: 4,
    title: "Dashboard",
    sentence: "See live counts and outcomes across every module, pulled straight from Supabase.",
    href: "/dashboard",
    cta: "View the Dashboard",
  },
  {
    number: 5,
    title: "Docs",
    sentence: "Read how each module was actually built, prompt by prompt, commit by commit.",
    href: "/docs",
    cta: "Read the Docs",
  },
];

export default function DemoTour() {
  return (
    <section>
      <div className="flex flex-col gap-6">
        {TOUR_STEPS.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-start gap-4 rounded-lg border border-bordeaux/20 bg-white p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <span className="font-serif text-4xl font-black text-bordeaux/20">
              {step.number}
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-ink/70">{step.sentence}</p>
            </div>
            <Link
              href={step.href}
              className="shrink-0 rounded-full bg-bordeaux px-5 py-2 font-serif text-sm text-cream transition-opacity hover:opacity-90"
            >
              {step.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
