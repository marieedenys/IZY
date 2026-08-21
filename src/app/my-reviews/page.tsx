import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "My Reviews — IZY",
};

export default function MyReviewsPage() {
  return (
    <PlaceholderPage
      title="My Reviews"
      description="Find and share your reviews of your favorite dining experiences."
    />
  );
}
