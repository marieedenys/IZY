"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type SaveStatus = "idle" | "saving" | "saved" | "error";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function MarketingCard({
  title,
  assetType,
  content,
  children,
}: {
  title: string;
  assetType: string;
  content: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
    setTimeout(() => setCopyStatus("idle"), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(title)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    const { error } = await supabase.from("marketing_assets").insert({
      asset_type: assetType,
      title,
      content,
    });
    setSaveStatus(error ? "error" : "saved");
    if (!error) {
      router.refresh();
    }
  };

  return (
    <div className="rounded-lg border border-bordeaux/20 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-serif text-xl font-bold text-bordeaux">
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-bordeaux px-4 py-1.5 font-serif text-xs text-bordeaux transition-opacity hover:opacity-80"
          >
            {copyStatus === "copied"
              ? "Copied!"
              : copyStatus === "error"
                ? "Couldn't copy"
                : "Copy"}
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-full border border-bordeaux px-4 py-1.5 font-serif text-xs text-bordeaux transition-opacity hover:opacity-80"
          >
            Export
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === "saving" || saveStatus === "saved"}
            className="rounded-full bg-bordeaux px-4 py-1.5 font-serif text-xs text-cream transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saveStatus === "saving"
              ? "Saving…"
              : saveStatus === "saved"
                ? "Saved!"
                : saveStatus === "error"
                  ? "Couldn't save"
                  : "Save"}
          </button>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
