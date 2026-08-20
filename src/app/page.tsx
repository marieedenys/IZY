import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tagline from "@/components/Tagline";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <div className="h-12 w-full bg-white" aria-hidden="true" />
      <Hero />
      <Tagline />
      <Footer />
    </div>
  );
}
