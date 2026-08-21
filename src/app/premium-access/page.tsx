import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Premium Access — IZY",
};

export default function PremiumAccessPage() {
  return (
    <PlaceholderPage
      title="Premium Access"
      description="Unlock exclusive benefits reserved for premium members."
    />
  );
}
