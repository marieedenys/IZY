import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MODULES } from "@/data/docsContent";

export const metadata: Metadata = {
  title: "Documentation — IZY",
};

export default function DocsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            Docs
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            How each module was actually built: the prompts behind it and a
            log of what shipped, bugs included.
          </p>
        </div>

        <div className="mx-auto mt-16 w-full max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-bordeaux">
            Prompt library
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Reconstructed from the git history (git log) for modules 1-5,
            since the exact original prompt text for those wasn&apos;t kept
            anywhere retrievable — marked &quot;Reconstructed&quot; rather
            than presented as verbatim. Module 6&apos;s prompt is the actual
            one given for this module.
          </p>

          <div className="mt-6 flex flex-col gap-10">
            {MODULES.map((module) => (
              <div key={module.id}>
                <h3 className="font-serif text-lg font-bold text-ink">
                  {module.title}
                </h3>
                <div className="mt-3 flex flex-col gap-4">
                  {module.prompts.map((prompt) => (
                    <div
                      key={prompt.title}
                      className="rounded-lg border border-bordeaux/20 bg-white p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-serif font-bold text-ink">
                          {prompt.title}
                        </p>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            prompt.exact
                              ? "bg-green-100 text-green-800"
                              : "bg-ink/10 text-ink/60"
                          }`}
                        >
                          {prompt.exact ? "Exact" : "Reconstructed"}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-ink/70 italic">
                        &quot;{prompt.text}&quot;
                      </p>
                      <dl className="mt-3 flex flex-col gap-2 text-sm">
                        <div>
                          <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
                            Purpose
                          </dt>
                          <dd className="text-ink/70">{prompt.purpose}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
                            Outcome
                          </dt>
                          <dd className="text-ink/70">{prompt.outcome}</dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 w-full max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-bordeaux">
            Build logs
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            One entry per module: what was built, the commits behind it, and
            any bugs found and fixed.
          </p>

          <div className="mt-6 flex flex-col gap-6">
            {MODULES.map((module) => (
              <div
                key={module.id}
                className="rounded-lg border border-bordeaux/20 bg-white p-5"
              >
                <p className="font-serif font-bold text-ink">
                  {module.title}
                </p>
                <p className="mt-1 text-sm text-ink/70">{module.summary}</p>

                <p className="mt-3 text-xs font-semibold tracking-wide text-bordeaux uppercase">
                  Commits
                </p>
                <ul className="mt-1 flex flex-col gap-1 text-sm text-ink/70">
                  {module.commits.map((commit) => (
                    <li key={commit.hash}>
                      <code className="text-xs text-bordeaux">
                        {commit.hash}
                      </code>{" "}
                      {commit.message}
                    </li>
                  ))}
                </ul>

                {module.bugsFoundFixed.length > 0 && (
                  <>
                    <p className="mt-3 text-xs font-semibold tracking-wide text-bordeaux uppercase">
                      Bugs found and fixed
                    </p>
                    <ul className="mt-1 flex list-disc flex-col gap-1 pl-5 text-sm text-ink/70">
                      {module.bugsFoundFixed.map((bug) => (
                        <li key={bug}>{bug}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
