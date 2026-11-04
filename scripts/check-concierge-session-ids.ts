/**
 * Verifies the concierge_sessions id logic WITHOUT touching the real
 * database: a tiny mock insert() enforces the same primary-key
 * uniqueness Postgres would (one row per id, per table), and this
 * script replays a realistic chat sequence against it.
 *
 * Usage: npx tsx scripts/check-concierge-session-ids.ts
 */

import {
  buildFinishedSessionRow,
  buildGuardrailSessionRow,
} from "../src/lib/concierge";

type Row = { id: string; [key: string]: unknown };

/** Mocks the one constraint that matters here: `id` is a primary key. */
function createMockTable(name: string) {
  const seenIds = new Set<string>();
  return {
    insert(row: Row): { error: { code: string; message: string } | null } {
      if (seenIds.has(row.id)) {
        return {
          error: {
            code: "23505",
            message: `duplicate key value violates unique constraint "${name}_pkey" (id=${row.id})`,
          },
        };
      }
      seenIds.add(row.id);
      return { error: null };
    },
  };
}

function runSequence(label: string, useFreshIdPerEvent: boolean) {
  console.log(`\n--- ${label} ---`);
  const sessions = createMockTable("concierge_sessions");
  const problems: string[] = [];

  // 1. User finishes the intake flow -> one "recommended" row, keyed by
  //    the chat's own session id.
  const sessionId = "11111111-1111-1111-1111-111111111111";
  const finishedRow = buildFinishedSessionRow({
    sessionId,
    craving: "Italian",
    occasion: "Date night",
    budget: "$$",
  });
  let result = sessions.insert(finishedRow);
  if (result.error) problems.push(`finished-session insert: ${result.error.message}`);

  // 2. User types a reservation request AFTER finishing.
  const event1Id = useFreshIdPerEvent
    ? "22222222-2222-2222-2222-222222222222"
    : sessionId; // the bug: reusing the session id
  const guardrailRow1 = buildGuardrailSessionRow({
    eventId: event1Id,
    category: "reservation",
    craving: "Italian",
    occasion: "Date night",
    budget: "$$",
    message: "can you book a table for me",
  });
  result = sessions.insert(guardrailRow1);
  if (result.error) problems.push(`guardrail event 1 insert: ${result.error.message}`);

  // 3. User immediately types a second, unrelated guardrail message.
  const event2Id = useFreshIdPerEvent
    ? "33333333-3333-3333-3333-333333333333"
    : sessionId; // the bug: reusing the session id again
  const guardrailRow2 = buildGuardrailSessionRow({
    eventId: event2Id,
    category: "unrecognized",
    craving: "Italian",
    occasion: "Date night",
    budget: "$$",
    message: "what's the weather like",
  });
  result = sessions.insert(guardrailRow2);
  if (result.error) problems.push(`guardrail event 2 insert: ${result.error.message}`);

  if (problems.length === 0) {
    console.log("No problem: every insert succeeded (every id was unique).");
  } else {
    console.log(`${problems.length} problem(s):`);
    for (const p of problems) console.log(`- ${p}`);
  }
  return problems.length;
}

const buggyProblems = runSequence(
  "Old behaviour (reusing the session id for every guardrail event)",
  false,
);
const fixedProblems = runSequence(
  "Fixed behaviour (fresh id per guardrail event)",
  true,
);

console.log("\n=== Summary ===");
console.log(
  `Old behaviour: ${buggyProblems} problem(s) ${buggyProblems > 0 ? "(confirms the bug)" : "(unexpected: bug not reproduced)"}`,
);
console.log(
  `Fixed behaviour: ${fixedProblems} problem(s) ${fixedProblems === 0 ? "(fix verified)" : "(fix NOT working)"}`,
);

if (buggyProblems === 0 || fixedProblems !== 0) {
  process.exitCode = 1;
}
