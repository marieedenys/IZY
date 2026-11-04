import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoTour from "@/components/DemoTour";
import AgentMapSection from "@/components/AgentMapSection";
import ImpactCheckSection from "@/components/ImpactCheckSection";
import TestingSummarySection from "@/components/TestingSummarySection";

export const metadata: Metadata = {
  title: "Demo — IZY",
};

export default function DemoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            Demo
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            IZY is a restaurant taste-recommendation product: tell it what
            you&apos;re craving, or let the Concierge ask you three quick
            questions, and it matches you to a table. This page is a guided
            tour of everything built so far.
          </p>
        </div>

        <div className="mx-auto mt-12 w-full max-w-3xl">
          <DemoTour />
        </div>

        <div className="mx-auto mt-16 w-full max-w-4xl">
          <AgentMapSection />
        </div>

        <div className="mx-auto mt-16 w-full max-w-4xl">
          <ImpactCheckSection />
        </div>

        <div className="mx-auto mt-16 w-full max-w-4xl">
          <TestingSummarySection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
