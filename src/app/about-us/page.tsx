import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "About Us — IZY",
};

export default function AboutUsPage() {
  return (
    <PlaceholderPage
      title="About Us"
      description="Learn more about the mission and the team behind IZY."
    />
  );
}
