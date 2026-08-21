export default function Footer() {
  return (
    <footer className="bg-cream">
      <div className="h-px bg-bordeaux" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <span className="font-serif text-lg font-bold text-bordeaux">IZY</span>
        <p className="text-xs text-ink/60">
          © {new Date().getFullYear()} IZY. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
