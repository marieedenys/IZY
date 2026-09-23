"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { COMPETITORS } from "@/components/CompetitorsTable";
import { RISKS } from "@/components/RiskMap";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const mainRisk =
  RISKS.find((r) => r.impact === "High" && r.likelihood === "High")?.label ??
  RISKS[0].label;

export default function ResearchSummary() {
  const router = useRouter();
  const [status, setStatus] = useState<SaveStatus>("idle");

  const handleSave = async () => {
    setStatus("saving");
    const { error } = await supabase.from("research_findings").insert({
      competitor_count: COMPETITORS.length,
      main_risk: mainRisk,
    });
    setStatus(error ? "error" : "saved");
    if (!error) {
      router.refresh();
    }
  };

  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Save this research
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Stores today&apos;s date, the number of competitors found ({COMPETITORS.length}),
        and the main risk identified.
      </p>

      <div className="mt-4 rounded-lg border border-bordeaux/20 bg-white p-5">
        <p className="text-sm text-ink">
          <span className="font-semibold text-bordeaux">Main risk: </span>
          {mainRisk}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={status === "saving" || status === "saved"}
            className="rounded-full bg-bordeaux px-6 py-3 font-serif text-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "saving" ? "Saving…" : "Save research summary"}
          </button>
          {status === "saved" && (
            <span className="text-sm text-bordeaux">Saved.</span>
          )}
          {status === "error" && (
            <span className="text-sm text-bordeaux">
              Couldn&apos;t save, please try again.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
