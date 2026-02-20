"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type BenchmarkCategory, type BenchmarkRecord, categoryMeta } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

type SortMode = "score-desc" | "score-asc" | "updated-desc" | "title-asc";

type BenchmarkExplorerProps = {
  records: BenchmarkRecord[];
  defaultCategory?: BenchmarkCategory | "all";
  lockCategory?: boolean;
  initialVisibleCount?: number;
};

export function BenchmarkExplorer({
  records,
  defaultCategory = "all",
  lockCategory = false,
  initialVisibleCount = 60
}: BenchmarkExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BenchmarkCategory | "all">(defaultCategory);
  const [sortMode, setSortMode] = useState<SortMode>("score-desc");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return records.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!normalized) return true;
      const haystack = `${item.title} ${item.summary} ${item.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [records, query, category]);

  const sorted = useMemo(() => {
    const items = [...filtered];
    items.sort((a, b) => {
      if (sortMode === "score-desc") return b.score - a.score;
      if (sortMode === "score-asc") return a.score - b.score;
      if (sortMode === "updated-desc") return b.lastUpdated.localeCompare(a.lastUpdated);
      return a.title.localeCompare(b.title);
    });
    return items;
  }, [filtered, sortMode]);

  useEffect(() => {
    setVisibleCount(initialVisibleCount);
  }, [query, category, sortMode, initialVisibleCount]);

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <>
      <section className="card benchmarkControls">
        <div className="controlGrid">
          <label className="controlGroup">
            <span className="controlLabel">{siteCopy.benchmark.explorer.searchLabel}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={siteCopy.benchmark.explorer.searchPlaceholder}
              className="controlInput"
            />
          </label>

          {!lockCategory && (
            <label className="controlGroup">
              <span className="controlLabel">{siteCopy.benchmark.explorer.categoryLabel}</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as BenchmarkCategory | "all")}
                className="controlInput"
              >
                <option value="all">{siteCopy.benchmark.explorer.allCategories}</option>
                {Object.entries(categoryMeta).map(([slug, meta]) => (
                  <option key={slug} value={slug}>
                    {meta.title}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="controlGroup">
            <span className="controlLabel">{siteCopy.benchmark.explorer.sortLabel}</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="controlInput"
            >
              <option value="score-desc">{siteCopy.benchmark.explorer.sortScoreDesc}</option>
              <option value="score-asc">{siteCopy.benchmark.explorer.sortScoreAsc}</option>
              <option value="updated-desc">{siteCopy.benchmark.explorer.sortUpdatedDesc}</option>
              <option value="title-asc">{siteCopy.benchmark.explorer.sortTitleAsc}</option>
            </select>
          </label>
        </div>
        <p className="muted">{siteCopy.benchmark.explorer.showingPrefix} {visible.length} / {sorted.length}</p>
      </section>

      <ul className="list">
        {visible.map((item) => (
          <li key={item.id} className="listItem">
            <strong>{item.title}</strong> ({item.score}) -{" "}
            <Link href={`/benchmarks/matrix/?q=${encodeURIComponent(item.title)}`}>{siteCopy.categories.openLink}</Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <p>
          <button type="button" className="controlButton" onClick={() => setVisibleCount((prev) => prev + initialVisibleCount)}>
            {siteCopy.benchmark.explorer.loadMore}
          </button>
        </p>
      )}
    </>
  );
}
