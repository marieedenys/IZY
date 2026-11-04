import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us — IZY",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-2xl flex-col gap-8 text-center">
          <div>
            <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
              About Us
            </h1>
            <p className="mt-3 font-serif text-lg text-ink/70">
              IZY is a restaurant taste-recommendation product: tell it what
              you&apos;re craving, or answer three quick questions in a
              guided chat, and it matches you to a table.
            </p>
          </div>

          <div className="rounded-lg border border-bordeaux/20 bg-white p-6 text-left sm:p-8">
            <h2 className="font-serif text-lg font-bold text-ink">
              What this is
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              IZY was built module by module as a course project for an
              AI-101 class: a rule-based recommender, a guided concierge
              chat, a marketing and A/B-testing module, and the dashboard
              and docs that tie them together — each one built, tested, and
              shipped in its own step.
            </p>
          </div>

          <div className="rounded-lg border border-bordeaux/20 bg-white p-6 text-left sm:p-8">
            <h2 className="font-serif text-lg font-bold text-ink">
              Who built it
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              A single student builder, working with Claude Code, built and
              deployed every module. The full prompt-by-prompt, commit-by-
              commit record is on the{" "}
              <a href="/docs" className="text-bordeaux underline">
                Docs
              </a>{" "}
              page, and an honest look at what this project does and
              doesn&apos;t cover is on the{" "}
              <a href="/demo" className="text-bordeaux underline">
                Demo
              </a>{" "}
              page.
            </p>
          </div>

          <div className="rounded-lg border border-bordeaux/20 bg-white p-6 text-left sm:p-8">
            <h2 className="font-serif text-lg font-bold text-ink">
              About the data
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              The restaurants you see throughout IZY are sample data for this
              demo, not real, current listings. Usage counts on the
              Dashboard are real, live numbers from this project&apos;s own
              database — but the restaurants themselves are illustrative.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
