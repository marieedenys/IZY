export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-serif text-4xl font-bold text-bordeaux sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-md font-serif text-lg text-ink/70">
        {description}
      </p>
    </div>
  );
}
