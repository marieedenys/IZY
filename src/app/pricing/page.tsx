import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevenueCalculator from "@/components/RevenueCalculator";

export const metadata: Metadata = {
  title: "Pricing — IZY",
};

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            Pricing
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            Model how IZY&apos;s revenue grows with its free user base.
          </p>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-3xl flex-col gap-16">
          <RevenueCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
}
