// Pure localStorage read/write for the last choice made on Ask Izy and the
// Concierge. Never touches Supabase or any network call — this is the sole
// data source for /my-taste-profile.

export type CoreChoice = {
  source: "core";
  cuisineType: string;
  atmosphere: string;
  budget: string;
  result: string;
  savedAt: string;
};

export type ConciergeChoice = {
  source: "concierge";
  craving: string;
  occasion: string;
  budget: string;
  savedAt: string;
};

const CORE_KEY = "izy:last-core-choice";
const CONCIERGE_KEY = "izy:last-concierge-choice";

export function saveCoreChoice(
  choice: Omit<CoreChoice, "source" | "savedAt">,
) {
  try {
    const value: CoreChoice = {
      source: "core",
      savedAt: new Date().toISOString(),
      ...choice,
    };
    window.localStorage.setItem(CORE_KEY, JSON.stringify(value));
  } catch {
    // localStorage can be unavailable (private mode, blocked site data) —
    // this is a nice-to-have, never something to break the page over.
  }
}

export function saveConciergeChoice(
  choice: Omit<ConciergeChoice, "source" | "savedAt">,
) {
  try {
    const value: ConciergeChoice = {
      source: "concierge",
      savedAt: new Date().toISOString(),
      ...choice,
    };
    window.localStorage.setItem(CONCIERGE_KEY, JSON.stringify(value));
  } catch {
    // Same as above — never throw.
  }
}

export function readCoreChoice(): CoreChoice | null {
  try {
    const raw = window.localStorage.getItem(CORE_KEY);
    return raw ? (JSON.parse(raw) as CoreChoice) : null;
  } catch {
    return null;
  }
}

export function readConciergeChoice(): ConciergeChoice | null {
  try {
    const raw = window.localStorage.getItem(CONCIERGE_KEY);
    return raw ? (JSON.parse(raw) as ConciergeChoice) : null;
  } catch {
    return null;
  }
}
