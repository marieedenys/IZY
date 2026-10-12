import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="bg-bordeaux px-6 py-16 text-center sm:py-24">
      <h2 className="font-serif text-3xl font-bold text-cream sm:text-4xl">
        Ready to eat better tonight?
      </h2>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/core"
          className="rounded-full bg-cream px-6 py-3 font-serif text-bordeaux transition-opacity hover:opacity-90"
        >
          Ask Izy now
        </Link>
        <Link
          href="/pricing"
          className="rounded-full border border-cream px-6 py-3 font-serif text-cream transition-opacity hover:opacity-90"
        >
          View pricing
        </Link>
      </div>
    </section>
  );
}
