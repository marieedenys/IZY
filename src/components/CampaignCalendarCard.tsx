import MarketingCard from "@/components/MarketingCard";
import {
  CAMPAIGN_CALENDAR,
  formatCampaignCalendar,
} from "@/lib/marketingContent";

export default function CampaignCalendarCard() {
  return (
    <MarketingCard
      title="14-day campaign calendar"
      content={formatCampaignCalendar()}
    >
      <div className="overflow-x-auto rounded-md border border-bordeaux/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="bg-bordeaux/10">
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Day
              </th>
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Channel
              </th>
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Content
              </th>
              <th className="px-4 py-3 font-serif font-semibold text-bordeaux">
                Goal
              </th>
            </tr>
          </thead>
          <tbody>
            {CAMPAIGN_CALENDAR.map((row) => (
              <tr key={row.day} className="border-t border-bordeaux/10">
                <td className="px-4 py-3 font-serif font-medium text-ink">
                  {row.day}
                </td>
                <td className="px-4 py-3 text-ink/70">{row.channel}</td>
                <td className="px-4 py-3 text-ink/70">{row.content}</td>
                <td className="px-4 py-3 text-ink/70">{row.goal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingCard>
  );
}
