import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ConciergeChat from "@/components/ConciergeChat";
import DemoDataNotice from "@/components/DemoDataNotice";

export const metadata: Metadata = {
  title: "Concierge — IZY",
};

export default function ChatPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            Concierge
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            Not sure what you want yet? Answer three quick questions and the
            concierge will suggest a table.
          </p>
          <DemoDataNotice />
        </div>

        <div className="mx-auto mt-12 w-full max-w-xl">
          <ConciergeChat />
        </div>
      </div>
    </div>
  );
}
