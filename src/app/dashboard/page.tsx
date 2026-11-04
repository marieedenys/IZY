import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardStatsView, {
  type DashboardStats,
} from "@/components/DashboardStatsView";
import { supabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard — IZY",
};

const PAUSED_MESSAGE =
  "We couldn't load live stats right now. If the free Supabase project has been inactive, it may be waking up — try reloading in a minute.";

export default async function DashboardPage() {
  let stats: DashboardStats | null = null;
  let errorMessage: string | null = null;

  try {
    const { data, error } = await supabase.rpc("dashboard_stats");
    if (error) {
      errorMessage = PAUSED_MESSAGE;
    } else {
      stats = data as DashboardStats;
    }
  } catch {
    errorMessage = PAUSED_MESSAGE;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            Dashboard
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            Live usage across every IZY module, read straight from Supabase.
          </p>
        </div>

        <div className="mx-auto mt-12 w-full max-w-4xl">
          <DashboardStatsView stats={stats} errorMessage={errorMessage} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
