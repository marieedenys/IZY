"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  readCoreChoice,
  readConciergeChoice,
  type CoreChoice,
  type ConciergeChoice,
} from "@/lib/localTasteProfile";

type Loaded = {
  core: CoreChoice | null;
  concierge: ConciergeChoice | null;
};

export default function TasteProfileView() {
  const [state, setState] = useState<Loaded | null>(null);

  useEffect(() => {
    // One-time sync from localStorage, a browser-only external system —
    // this is exactly the "synchronize with an external system" case
    // effects are for, not state derived from props/other state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ core: readCoreChoice(), concierge: readConciergeChoice() });
  }, []);

  if (!state) {
    return null;
  }

  const coreChoice = state.core;
  const conciergeChoice = state.concierge;

  if (!coreChoice && !conciergeChoice) {
    return (
      <div className="rounded-lg border border-bordeaux/20 bg-white p-8 text-center">
        <p className="font-serif text-lg text-ink">
          No taste profile yet — it builds itself from your last choices.
        </p>
        <p className="mt-2 text-sm text-ink/70">
          Try Ask Izy or the Concierge once, and this page will fill in.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link
            href="/core"
            className="rounded-full bg-bordeaux px-5 py-2 font-serif text-sm text-cream transition-opacity hover:opacity-90"
          >
            Try Ask Izy
          </Link>
          <Link
            href="/chat"
            className="rounded-full border border-bordeaux px-5 py-2 font-serif text-sm text-bordeaux transition-opacity hover:opacity-90"
          >
            Talk to the Concierge
          </Link>
        </div>
      </div>
    );
  }

  const latest =
    coreChoice && conciergeChoice
      ? coreChoice.savedAt > conciergeChoice.savedAt
        ? coreChoice
        : conciergeChoice
      : (coreChoice ?? conciergeChoice)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-bordeaux/20 bg-white p-6 sm:p-8">
        <span className="inline-block rounded-full bg-bordeaux/10 px-3 py-1 text-xs font-semibold tracking-wide text-bordeaux uppercase">
          Most recent
        </span>
        {latest.source === "core" ? (
          <>
            <p className="mt-4 font-serif text-lg text-ink">
              You last asked Izy for{" "}
              <span className="font-semibold">{latest.cuisineType}</span>, a{" "}
              {latest.atmosphere.toLowerCase()} mood, and a{" "}
              {latest.budget} budget.
            </p>
            <p className="mt-2 text-sm text-ink/70">{latest.result}</p>
          </>
        ) : (
          <p className="mt-4 font-serif text-lg text-ink">
            In the Concierge, you last chose{" "}
            <span className="font-semibold">{latest.craving}</span> for a{" "}
            {latest.occasion.toLowerCase()} occasion with a {latest.budget}{" "}
            budget.
          </p>
        )}
        <p className="mt-3 text-xs text-ink/50">
          Saved {new Date(latest.savedAt).toLocaleString()}
        </p>
      </div>

      {coreChoice && conciergeChoice && (
        <p className="text-center text-sm text-ink/60">
          Showing your single most recent choice between Ask Izy and the
          Concierge — not a combined history.
        </p>
      )}
    </div>
  );
}
