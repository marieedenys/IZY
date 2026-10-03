import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevenueCalculator from "@/components/RevenueCalculator";
import PricingDashboardWidget, {
  type PricingScenario,
} from "@/components/PricingDashboardWidget";
import { supabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing — IZY",
};

export default async function PricingPage() {
  const { data } = await supabase
    .from("pricing_scenarios")
    .select("id, user_count, scenario_type, monthly_revenue, created_at")
    .order("created_at", { ascending: false });

  const scenarios: PricingScenario[] = data ?? [];

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
          <PricingDashboardWidget scenarios={scenarios} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
