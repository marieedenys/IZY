import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cream">
      <div className="h-px bg-bordeaux" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <span className="font-serif text-lg font-bold text-bordeaux">IZY</span>
        <nav className="flex items-center gap-4 text-xs font-semibold tracking-wide text-bordeaux uppercase">
          <Link href="/docs" className="hover:opacity-70">
            Docs
          </Link>
          <Link href="/research" className="hover:opacity-70">
            Research
          </Link>
        </nav>
        <p className="text-xs text-ink/60">
          © {new Date().getFullYear()} IZY. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
