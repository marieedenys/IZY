"use client";

import { useState } from "react";

const CUISINE_OPTIONS = ["Italian", "Japanese", "French", "Mediterranean"];
const ATMOSPHERE_OPTIONS = ["Romantic", "Casual", "Festive", "Calm"];
const BUDGET_OPTIONS = ["€", "€€", "€€€", "€€€€"];

const selectClassName =
  "w-full rounded-md border border-bordeaux/30 bg-cream px-4 py-2 font-serif text-ink focus:border-bordeaux focus:outline-none";
const labelClassName =
  "text-xs font-semibold tracking-wide text-bordeaux uppercase";

export default function CoreForm() {
  const [cuisineType, setCuisineType] = useState("");
  const [atmosphere, setAtmosphere] = useState("");
  const [budget, setBudget] = useState("");

  const isComplete = cuisineType !== "" && atmosphere !== "" && budget !== "";

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
          className="mt-2 rounded-full bg-bordeaux px-6 py-3 font-serif text-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ask Izy
        </button>
      </form>
    </div>
  );
}
