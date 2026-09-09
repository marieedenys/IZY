"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateRecommendation } from "@/lib/generateRecommendation";
import { supabase } from "@/lib/supabase/client";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const CUISINE_OPTIONS = ["Italian", "Japanese", "French", "Mediterranean"];
const ATMOSPHERE_OPTIONS = ["Romantic", "Casual", "Festive", "Calm"];
const BUDGET_OPTIONS = ["€", "€€", "€€€", "€€€€"];

const selectClassName =
  "w-full rounded-md border border-bordeaux/30 bg-cream px-4 py-2 font-serif text-ink focus:border-bordeaux focus:outline-none";
const labelClassName =
  "text-xs font-semibold tracking-wide text-bordeaux uppercase";

export default function CoreForm() {
  const router = useRouter();
  const [cuisineType, setCuisineType] = useState("");
  const [atmosphere, setAtmosphere] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const isComplete = cuisineType !== "" && atmosphere !== "" && budget !== "";

  const handleAskIzy = () => {
    setResult(generateRecommendation(cuisineType, atmosphere, budget));
    setSaveStatus("idle");
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    const { error } = await supabase.from("core_outputs").insert({
      cuisine_type: cuisineType,
      atmosphere,
      budget,
      generated_output: result,
    });
    setSaveStatus(error ? "error" : "saved");
    if (!error) {
      router.refresh();
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <form className="flex flex-col gap-5 rounded-lg border border-bordeaux/20 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="cuisine-type">
            Cuisine type
          </label>
          <select
            id="cuisine-type"
            className={selectClassName}
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
          >
            <option value="" disabled>
              Select a cuisine
            </option>
            {CUISINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="atmosphere">
            Atmosphere
          </label>
          <select
            id="atmosphere"
            className={selectClassName}
            value={atmosphere}
            onChange={(e) => setAtmosphere(e.target.value)}
          >
            <option value="" disabled>
              Select an atmosphere
            </option>
            {ATMOSPHERE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="budget">
            Budget
          </label>
          <select
            id="budget"
            className={selectClassName}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="" disabled>
              Select a budget
            </option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          disabled={!isComplete}
          onClick={handleAskIzy}
          className="mt-2 rounded-full bg-bordeaux px-6 py-3 font-serif text-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ask Izy
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-lg border border-bordeaux/20 bg-white p-6 sm:p-8">
          <span className="inline-block rounded-full bg-bordeaux/10 px-3 py-1 text-xs font-semibold tracking-wide text-bordeaux uppercase">
            Simulated recommendation
          </span>
          <p className="mt-4 font-serif text-lg text-ink">{result}</p>

          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saveStatus === "saving" || saveStatus === "saved"}
              className="rounded-full border border-bordeaux px-5 py-2 font-serif text-sm text-bordeaux transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saveStatus === "saving" ? "Saving…" : "Save"}
            </button>
            {saveStatus === "saved" && (
              <span className="text-sm text-bordeaux">Saved.</span>
            )}
            {saveStatus === "error" && (
              <span className="text-sm text-bordeaux">
                Couldn&apos;t save, please try again.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
