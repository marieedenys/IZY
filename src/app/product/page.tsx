import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TierComparisonTable from "@/components/TierComparisonTable";

export const metadata: Metadata = {
  title: "Product — IZY",
};

export default function ProductPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            Product
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            Three ways to experience IZY, from a first taste to full concierge.
          </p>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col gap-16">
          <TierComparisonTable />

          <section>
            <h2 className="font-serif text-2xl font-bold text-bordeaux">
              Who it&apos;s for
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-bordeaux/20 bg-white p-5">
                <h3 className="font-serif text-lg font-semibold text-ink">
                  Casual diners
                </h3>
                <p className="mt-2 text-sm text-ink/70">
                  People exploring new restaurants in their own city, happy to
                  get great recommendations on Free or Plus before deciding
                  they want more.
                </p>
              </div>
              <div className="rounded-lg border border-bordeaux/20 bg-white p-5">
                <h3 className="font-serif text-lg font-semibold text-ink">
                  Frequent travelers &amp; fine-dining regulars
                </h3>
                <p className="mt-2 text-sm text-ink/70">
                  People who eat out often, in new cities or at hard-to-book
                  tables, who want Concierge&apos;s exclusive spots and
                  reservation assistance.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
