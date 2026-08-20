import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Documentation — IZY",
};

export default function DocsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center px-6 py-24">
        <p className="font-serif text-2xl text-ink/70">
          Documentation à venir.
        </p>
      </div>
      <Footer />
    </div>
  );
}
