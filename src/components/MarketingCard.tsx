"use client";

import { useState } from "react";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function MarketingCard({
  title,
  content,
  children,
}: {
  title: string;
  content: string;
  children: React.ReactNode;
}) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

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

  return (
    <div className="rounded-lg border border-bordeaux/20 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-serif text-xl font-bold text-bordeaux">
          {title}
        </h3>
        <div className="flex items-center gap-3">
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
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
