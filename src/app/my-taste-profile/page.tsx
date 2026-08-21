import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "My Taste Profile — IZY",
};

export default function MyTasteProfilePage() {
  return (
    <PlaceholderPage
      title="My Taste Profile"
      description="Discover your taste profile, built from your preferences and your reviews."
    />
  );
}
