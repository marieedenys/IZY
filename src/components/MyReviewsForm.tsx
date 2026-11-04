"use client";

import { useEffect, useState } from "react";
import { addReview, readReviews, type Review } from "@/lib/localReviews";

const RATING_OPTIONS = [1, 2, 3, 4, 5];

const inputClassName =
  "w-full rounded-md border border-bordeaux/30 bg-cream px-4 py-2 font-serif text-ink focus:border-bordeaux focus:outline-none";
const labelClassName =
  "text-xs font-semibold tracking-wide text-bordeaux uppercase";

export default function MyReviewsForm() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // One-time sync from localStorage, a browser-only external system.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReviews(readReviews());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    const next = addReview({ name: name.trim(), rating, comment: comment.trim() });
    setReviews(next);
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <div className="flex flex-col gap-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-lg border border-bordeaux/20 bg-white p-6 sm:p-8"
      >
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="review-name">
            Your name
          </label>
          <input
            id="review-name"
            className={inputClassName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jordan"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="review-rating">
            Rating
          </label>
          <select
            id="review-rating"
            className={inputClassName}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {RATING_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {"★".repeat(value)}
                {"☆".repeat(5 - value)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="review-comment">
            Your review
          </label>
          <textarea
            id="review-comment"
            className={`${inputClassName} min-h-24 resize-y`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you think?"
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim() || !comment.trim()}
          className="mt-2 rounded-full bg-bordeaux px-6 py-3 font-serif text-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save review
        </button>
      </form>

      <div>
        <h2 className="font-serif text-xl font-bold text-ink">
          Your reviews
        </h2>
        {reviews.length === 0 ? (
          <p className="mt-3 text-sm text-ink/60">
            No reviews saved on this device yet.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg border border-bordeaux/20 bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-serif font-bold text-ink">
                    {review.name}
                  </p>
                  <span className="text-bordeaux">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink/70">{review.comment}</p>
                <p className="mt-2 text-xs text-ink/50">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
