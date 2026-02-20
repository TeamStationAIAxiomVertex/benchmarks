"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { type BenchmarkCategory } from "@/lib/benchmarksContent";
import { type MatrixBenchmarkPage } from "@/lib/benchmarkMatrix";
import { siteCopy } from "@/lib/siteCopy";

type SortMode = "role-country-tech" | "category";

type MatrixRouteExplorerProps = {
  pages: MatrixBenchmarkPage[];
  initialVisibleCount?: number;
};

export function MatrixRouteExplorer({ pages, initialVisibleCount = 80 }: MatrixRouteExplorerProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BenchmarkCategory | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("role-country-tech");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  useEffect(() => {
    const value = searchParams.get("q");
    if (value) setQuery(value);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return pages.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!normalized) return true;
      const haystack = `${item.roleTitle} ${item.countryTitle} ${item.technologyTitle} ${item.path}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [pages, query, category]);

  const sorted = useMemo(() => {
    const items = [...filtered];
    items.sort((a, b) => {
      if (sortMode === "category") {
        const categorySort = a.category.localeCompare(b.category);
        if (categorySort !== 0) return categorySort;
      }
      return a.path.localeCompare(b.path);
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
            <span className="controlLabel">{siteCopy.benchmark.matrixExplorer.searchLabel}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={siteCopy.benchmark.matrixExplorer.searchPlaceholder}
              className="controlInput"
            />
          </label>

          <label className="controlGroup">
            <span className="controlLabel">{siteCopy.benchmark.matrixExplorer.categoryLabel}</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as BenchmarkCategory | "all")}
              className="controlInput"
            >
              <option value="all">{siteCopy.benchmark.matrixExplorer.allCategories}</option>
              <option value="engineering-velocity">{siteCopy.categories.engineering.title}</option>
              <option value="cost-efficiency">{siteCopy.categories.cost.title}</option>
              <option value="quality-reliability">{siteCopy.categories.quality.title}</option>
            </select>
          </label>

          <label className="controlGroup">
            <span className="controlLabel">{siteCopy.benchmark.matrixExplorer.sortLabel}</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="controlInput"
            >
              <option value="role-country-tech">{siteCopy.benchmark.matrixExplorer.sortRoleCountryTech}</option>
              <option value="category">{siteCopy.benchmark.matrixExplorer.sortCategory}</option>
            </select>
          </label>
        </div>
        <p className="muted">{siteCopy.benchmark.matrixExplorer.showingPrefix} {visible.length} / {sorted.length}</p>
      </section>

      <ul className="list">
        {visible.map((item) => (
          <li key={item.path} className="listItem">
            <strong>{`${item.roleTitle} | ${item.countryTitle} | ${item.technologyTitle}`}</strong>
            <p className="muted" style={{ marginTop: "0.3rem" }}>
              <span className="pill">{item.category}</span>
            </p>
            <Link href={item.path}>{item.path}</Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <p>
          <button type="button" className="controlButton" onClick={() => setVisibleCount((prev) => prev + initialVisibleCount)}>
            {siteCopy.benchmark.matrixExplorer.loadMore}
          </button>
        </p>
      )}
    </>
  );
}
