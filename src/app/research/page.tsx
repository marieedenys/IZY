import type { Metadata } from "next";
import ExampleCards from "@/components/ExampleCards";
import CompetitorsTable from "@/components/CompetitorsTable";
import RiskMap from "@/components/RiskMap";
import ResearchSummary from "@/components/ResearchSummary";
import ResearchDashboardWidget, {
  type ResearchFinding,
} from "@/components/ResearchDashboardWidget";
import { supabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Research — IZY",
};

export default async function ResearchPage() {
  const { data } = await supabase
    .from("research_findings")
    .select("id, competitor_count, main_risk, created_at")
    .order("created_at", { ascending: false });

  const entries: ResearchFinding[] = data ?? [];

  return (
    <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
          Research
        </h1>
        <p className="mt-3 font-serif text-lg text-ink/70">
          Market landscape, competitors, and risks for IZY.
        </p>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col gap-16">
        <ExampleCards />
        <CompetitorsTable />
        <RiskMap />
        <ResearchSummary />
        <ResearchDashboardWidget entries={entries} />
      </div>
    </div>
  );
}
