// Pure localStorage read/write for user-submitted reviews. Never touches
// Supabase or any network call.

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const REVIEWS_KEY = "izy:my-reviews";

export function readReviews(): Review[] {
  try {
    const raw = window.localStorage.getItem(REVIEWS_KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

export function addReview(input: Omit<Review, "id" | "createdAt">): Review[] {
  const review: Review = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  const next = [review, ...readReviews()];
  try {
    window.localStorage.setItem(REVIEWS_KEY, JSON.stringify(next));
  } catch {
    // localStorage can be unavailable — the in-memory list still updates.
  }
  return next;
}
