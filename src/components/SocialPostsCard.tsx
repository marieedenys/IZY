import MarketingCard from "@/components/MarketingCard";
import { SOCIAL_POSTS, formatSocialPosts } from "@/lib/marketingContent";

export default function SocialPostsCard() {
  return (
    <MarketingCard title="Social posts (10)" content={formatSocialPosts()}>
      <ol className="flex flex-col gap-3">
        {SOCIAL_POSTS.map((post, index) => (
          <li
            key={post}
            className="rounded-md border border-bordeaux/10 bg-cream px-4 py-3 text-sm text-ink"
          >
            <span className="mr-2 font-serif font-semibold text-bordeaux">
              {index + 1}.
            </span>
            {post}
          </li>
        ))}
      </ol>
    </MarketingCard>
  );
}
