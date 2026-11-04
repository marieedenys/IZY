import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CoreForm from "@/components/CoreForm";
import CoreDashboard, { type CoreOutput } from "@/components/CoreDashboard";
import DemoDataNotice from "@/components/DemoDataNotice";
import { supabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Core — IZY",
};

export default async function CorePage() {
  const { data } = await supabase
    .from("core_outputs")
    .select("id, cuisine_type, atmosphere, budget, generated_output, created_at")
    .order("created_at", { ascending: false });

  const entries: CoreOutput[] = data ?? [];

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            Core
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            Tell Izy what you&apos;re craving and get an instant recommendation.
          </p>
          <p className="mt-3 font-serif text-sm text-ink/60">
            Not sure yet?{" "}
            <Link
              href="/chat"
              className="text-bordeaux underline underline-offset-4 hover:opacity-70"
            >
              Talk to the concierge
            </Link>
          </p>
          <DemoDataNotice />
        </div>

        <div className="mt-12">
          <CoreForm />
        </div>

        <CoreDashboard entries={entries} />
      </div>
    </div>
  );
}
