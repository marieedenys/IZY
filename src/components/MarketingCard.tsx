export default function MarketingCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-bordeaux/20 bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-bold text-bordeaux">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}
