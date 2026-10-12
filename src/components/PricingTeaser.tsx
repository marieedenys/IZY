import Link from "next/link";

export default function PricingTeaser() {
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl font-bold text-bordeaux sm:text-4xl">
          Start free, upgrade when you want more.
        </h2>
        <p className="mt-4 font-serif text-lg text-ink/70">
          IZY is free to start. Plus unlocks unlimited recommendations and
          full community access. Concierge adds exclusive spots and
          reservation assistance.
        </p>
        <Link
          href="/pricing"
          className="mt-4 inline-block font-serif text-sm text-bordeaux underline underline-offset-4 hover:opacity-70"
        >
          See pricing →
        </Link>
      </div>
    </section>
  );
}
