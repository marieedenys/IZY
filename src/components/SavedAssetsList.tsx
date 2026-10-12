export type MarketingAsset = {
  id: string;
  asset_type: string;
  title: string;
  content: string;
  created_at: string;
};

export default function SavedAssetsList({
  assets,
}: {
  assets: MarketingAsset[];
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-bordeaux">
        Saved assets
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Every asset saved from the cards above, read from Supabase on each
        page load.
      </p>

      {assets.length === 0 ? (
        <p className="mt-4 font-serif text-ink/60">No saved assets yet.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {assets.map((asset) => (
            <li
              key={asset.id}
              className="rounded-lg border border-bordeaux/20 bg-white px-4 py-3 text-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-serif font-semibold text-ink">
                  {asset.title}
                </span>
                <span className="text-xs text-ink/50">
                  {new Date(asset.created_at).toLocaleString("en-US")}
                </span>
              </div>
              <span className="mt-1 inline-block rounded-full bg-bordeaux/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-bordeaux uppercase">
                {asset.asset_type.replace(/_/g, " ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
