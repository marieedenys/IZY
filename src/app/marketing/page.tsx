import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersonaCard from "@/components/PersonaCard";
import BrandSystemCard from "@/components/BrandSystemCard";
import LandingCopyCard from "@/components/LandingCopyCard";
import SocialPostsCard from "@/components/SocialPostsCard";
import VideoScriptsCard from "@/components/VideoScriptsCard";
import CampaignCalendarCard from "@/components/CampaignCalendarCard";
import ABTester from "@/components/ABTester";
import SavedAssetsList, {
  type MarketingAsset,
} from "@/components/SavedAssetsList";
import { countVotes } from "@/lib/abTests";
import { supabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Marketing — IZY",
};

export default async function MarketingPage() {
  const [{ data: assetsData }, { data: votesData }] = await Promise.all([
    supabase
      .from("marketing_assets")
      .select("id, asset_type, title, content, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("ab_test_results").select("test_name, variant"),
  ]);

  const assets: MarketingAsset[] = assetsData ?? [];
  const voteCounts = countVotes(votesData ?? []);

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            Marketing
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            The launch kit: persona, brand system, copy, and campaign plan.
          </p>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col gap-8">
          <PersonaCard />
          <BrandSystemCard />
          <LandingCopyCard />
          <SocialPostsCard />
          <VideoScriptsCard />
          <CampaignCalendarCard />
        </div>

        <div className="mx-auto mt-16 w-full max-w-4xl">
          <ABTester counts={voteCounts} />
        </div>

        <div className="mx-auto mt-16 w-full max-w-4xl">
          <SavedAssetsList assets={assets} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
