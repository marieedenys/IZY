import Link from "next/link";

const NAV_ITEMS = [
  { label: "my reviews", href: "/my-reviews" },
  { label: "my taste profile", href: "/my-taste-profile" },
  { label: "ask izy", href: "/ask-izy" },
  { label: "community", href: "/community" },
  { label: "premium access", href: "/premium-access" },
  { label: "about us", href: "/about-us" },
];

export default function Navbar() {
  return (
    <header className="relative h-24 bg-bordeaux sm:h-28">
      <nav className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-6xl translate-y-1/2 flex-nowrap items-center justify-start gap-3 overflow-x-auto px-6 lg:justify-center">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full bg-cream px-5 py-2 font-serif text-sm text-ink transition-opacity hover:opacity-90 sm:text-base"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
