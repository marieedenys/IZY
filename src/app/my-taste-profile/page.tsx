import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TasteProfileView from "@/components/TasteProfileView";

export const metadata: Metadata = {
  title: "My Taste Profile — IZY",
};

export default function MyTasteProfilePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            My Taste Profile
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            Built only from your last choices on Ask Izy and the Concierge,
            saved on this device — nothing is sent to IZY&apos;s servers.
          </p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-xl">
          <TasteProfileView />
        </div>
      </div>
      <Footer />
    </div>
  );
}
