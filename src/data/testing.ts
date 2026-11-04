// Real testing status, updated as checks are actually run — never marked
// Pass ahead of being verified. "Not run" is honest, not a placeholder.

export type TestResult = "Pass" | "Fail" | "Not run";

export type TestEntry = {
  id: string;
  area: string;
  whatWasTested: string;
  result: TestResult;
  note: string;
};

export const TESTS: TestEntry[] = [
  {
    id: "concierge-suggestions",
    area: "Concierge logic",
    whatWasTested:
      "scripts/check-concierge-suggestions.ts runs getSuggestions() across all 90 combinations of the 3 intake questions.",
    result: "Pass",
    note: "Every combination returns exactly 3 suggestions with no crash; a local script, no Supabase call.",
  },
  {
    id: "concierge-session-ids",
    area: "Concierge logging",
    whatWasTested:
      "scripts/check-concierge-session-ids.ts mocks the session-row builders to check every logged guardrail/finished session gets a unique id.",
    result: "Pass",
    note: "No duplicate ids across the mocked runs; the script never calls Supabase.",
  },
  {
    id: "rls-insert-policy",
    area: "Database security",
    whatWasTested:
      "Confirmed the anon role's INSERT policies exist on the tables the app writes to, via a read-only REST check — no row was written.",
    result: "Pass",
    note: "Verified with Prefer: return=minimal so no SELECT policy is needed either.",
  },
  {
    id: "dashboard-stats-rpc",
    area: "Dashboard data",
    whatWasTested:
      "Called the dashboard_stats RPC directly (read-only) to confirm its exact response shape before building the Dashboard page around it.",
    result: "Pass",
    note: "Confirmed it never returns user_message or any other free text.",
  },
  {
    id: "core-concierge-vocabulary",
    area: "Ask Izy / Concierge consistency",
    whatWasTested:
      "Checked that Ask Izy's dropdowns now share the same cuisine/mood/budget options as the Concierge, and that a previously saved Ask Izy result still renders correctly.",
    result: "Pass",
    note: "Checked visually in the browser, without clicking Save, so no new row was written.",
  },
  {
    id: "demo-sections-render",
    area: "/demo page",
    whatWasTested:
      "Visually checked the guided tour, agent map, and practical impact check sections render correctly and match the site's style.",
    result: "Pass",
    note: "Checked in the browser against the local dev server.",
  },
  {
    id: "routes-200",
    area: "All routes",
    whatWasTested:
      "Every route (/, /core, /chat, /marketing, /pricing, /research, /docs, /demo, /dashboard, /my-reviews, /my-taste-profile, /about-us) returns 200.",
    result: "Pass",
    note: "Checked with curl against every route; all 12 returned HTTP 200.",
  },
  {
    id: "localstorage-pages",
    area: "/my-reviews, /my-taste-profile",
    whatWasTested:
      "The localStorage-only review form and taste-profile page actually save, list, and persist across a reload.",
    result: "Pass",
    note: "Submitted a test review and confirmed it listed and survived a reload; set an Ask Izy choice and confirmed it appeared on /my-taste-profile.",
  },
  {
    id: "full-build",
    area: "Whole app",
    whatWasTested: "A full production build (npm run build) with no errors, after every page in this module is added.",
    result: "Pass",
    note: "npm run build completed clean, including TypeScript checks, with all 12 required routes present in the output.",
  },
];
