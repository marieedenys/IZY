import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Community — IZY",
};

export default function CommunityPage() {
  return (
    <PlaceholderPage
      title="Community"
      description="Join the IZY community and connect with other food lovers."
    />
  );
}
