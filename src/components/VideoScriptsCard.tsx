import MarketingCard from "@/components/MarketingCard";
import { VIDEO_SCRIPTS, formatVideoScripts } from "@/lib/marketingContent";

export default function VideoScriptsCard() {
  return (
    <MarketingCard
      title="Video scripts (3, ~30s each)"
      content={formatVideoScripts()}
    >
      <div className="flex flex-col gap-6">
        {VIDEO_SCRIPTS.map((script) => (
          <div key={script.title}>
            <h4 className="font-serif text-lg font-semibold text-ink">
              {script.title}{" "}
              <span className="text-sm font-normal text-ink/50">
                ({script.duration})
              </span>
            </h4>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-bordeaux uppercase">
                    <th className="py-1 pr-4">Time</th>
                    <th className="py-1 pr-4">Action</th>
                    <th className="py-1">Voiceover</th>
                  </tr>
                </thead>
                <tbody>
                  {script.beats.map((beat) => (
                    <tr
                      key={beat.time}
                      className="border-t border-bordeaux/10 align-top"
                    >
                      <td className="py-2 pr-4 whitespace-nowrap text-ink/50">
                        {beat.time}
                      </td>
                      <td className="py-2 pr-4 text-ink/70">{beat.action}</td>
                      <td className="py-2 text-ink italic">
                        &ldquo;{beat.voiceover}&rdquo;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </MarketingCard>
  );
}
