import { TESTS, type TestResult } from "@/data/testing";

const RESULT_STYLE: Record<TestResult, string> = {
  Pass: "bg-green-100 text-green-800",
  Fail: "bg-red-100 text-red-800",
  "Not run": "bg-ink/10 text-ink/60",
};

export default function TestingSummarySection() {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Testing summary
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        What has actually been checked so far, and what is still marked
        &quot;Not run&quot; because it genuinely hasn&apos;t been yet.
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-bordeaux/20 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-bordeaux/20">
              <th className="px-4 py-3 font-serif text-bordeaux">Area</th>
              <th className="px-4 py-3 font-serif text-bordeaux">
                What was tested
              </th>
              <th className="px-4 py-3 font-serif text-bordeaux">Result</th>
              <th className="px-4 py-3 font-serif text-bordeaux">Note</th>
            </tr>
          </thead>
          <tbody>
            {TESTS.map((test) => (
              <tr key={test.id} className="border-b border-bordeaux/10 last:border-0">
                <td className="px-4 py-3 align-top font-semibold text-ink">
                  {test.area}
                </td>
                <td className="px-4 py-3 align-top text-ink/70">
                  {test.whatWasTested}
                </td>
                <td className="px-4 py-3 align-top">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${RESULT_STYLE[test.result]}`}
                  >
                    {test.result}
                  </span>
                </td>
                <td className="px-4 py-3 align-top text-ink/70">{test.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
