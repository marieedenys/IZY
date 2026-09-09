import type { Metadata } from "next";
import CoreForm from "@/components/CoreForm";

export const metadata: Metadata = {
  title: "Core — IZY",
};

export default function CorePage() {
  return (
    <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
          Core
        </h1>
        <p className="mt-3 font-serif text-lg text-ink/70">
          Tell Izy what you&apos;re craving and get an instant recommendation.
        </p>
      </div>

      <div className="mt-12">
        <CoreForm />
      </div>
    </div>
  );
}
