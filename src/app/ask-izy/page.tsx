import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Ask Izy — IZY",
};

export default function AskIzyPage() {
  return (
    <PlaceholderPage
      title="Ask Izy"
      description="Ask the IZY assistant your questions for tailored recommendations."
    />
  );
}
