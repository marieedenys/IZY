import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MyReviewsForm from "@/components/MyReviewsForm";

export const metadata: Metadata = {
  title: "My Reviews — IZY",
};

export default function MyReviewsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
            My Reviews
          </h1>
          <p className="mt-3 font-serif text-lg text-ink/70">
            Write and keep your own dining reviews. These are saved only on
            this device — clearing your browser data removes them for good.
          </p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-xl">
          <MyReviewsForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
