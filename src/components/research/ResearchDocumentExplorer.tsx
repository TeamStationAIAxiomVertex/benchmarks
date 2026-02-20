"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type ResearchDocument } from "@/lib/researchDocuments";
import { siteCopy } from "@/lib/siteCopy";

type SortMode = "ingested-desc" | "title-asc";

type ResearchDocumentExplorerProps = {
  docs: ResearchDocument[];
  initialVisibleCount?: number;
};

export function ResearchDocumentExplorer({ docs, initialVisibleCount = 36 }: ResearchDocumentExplorerProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("ingested-desc");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const statuses = useMemo(
    () => Array.from(new Set(docs.map((doc) => doc.status ?? "unknown"))).sort((a, b) => a.localeCompare(b)),
    [docs]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return docs.filter((doc) => {
      if (status !== "all" && (doc.status ?? "unknown") !== status) return false;
      if (!normalized) return true;

      const findingText = doc.key_findings?.join(" ") ?? "";
      const summary = doc.summary ?? "";
      const haystack = `${doc.id} ${doc.title} ${summary} ${findingText}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [docs, query, status]);

  const sorted = useMemo(() => {
    const items = [...filtered];
    items.sort((a, b) => {
      if (sortMode === "title-asc") return a.title.localeCompare(b.title);
      return (b.ingested_at ?? "").localeCompare(a.ingested_at ?? "");
    });
    return items;
  }, [filtered, sortMode]);

  useEffect(() => {
    setVisibleCount(initialVisibleCount);
  }, [query, status, sortMode, initialVisibleCount]);

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <>
      <section className="card benchmarkControls">
        <div className="controlGrid">
          <label className="controlGroup">
            <span className="controlLabel">{siteCopy.internalDocs.searchLabel}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={siteCopy.internalDocs.searchPlaceholder}
              className="controlInput"
            />
          </label>

          <label className="controlGroup">
            <span className="controlLabel">{siteCopy.internalDocs.statusFilterLabel}</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="controlInput"
            >
              <option value="all">{siteCopy.internalDocs.allStatuses}</option>
              {statuses.map((value) => (
                <option value={value} key={value}>{value}</option>
              ))}
            </select>
          </label>

          <label className="controlGroup">
            <span className="controlLabel">{siteCopy.internalDocs.sortLabel}</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="controlInput"
            >
              <option value="ingested-desc">{siteCopy.internalDocs.sortRecentIngested}</option>
              <option value="title-asc">{siteCopy.internalDocs.sortTitle}</option>
            </select>
          </label>
        </div>
        <p className="muted">{siteCopy.internalDocs.showingPrefix} {visible.length} / {sorted.length}</p>
      </section>

      <ul className="list">
        {visible.map((doc) => (
          <li className="listItem" key={doc.id}>
            <strong>{doc.title}</strong>
            <p className="muted" style={{ marginTop: "0.4rem" }}>
              {siteCopy.internalDocs.idLabel}: {doc.id}
              {doc.status ? ` | ${siteCopy.internalDocs.statusLabel}: ${doc.status}` : ""}
              {doc.ingested_at ? ` | ${siteCopy.internalDocs.ingestedAtLabel}: ${doc.ingested_at}` : ""}
              {typeof doc.year === "number" ? ` | ${siteCopy.internalDocs.yearLabel}: ${doc.year}` : ""}
              {doc.key_findings ? ` | ${siteCopy.internalDocs.findingsLabel}: ${doc.key_findings.length}` : ""}
            </p>
            <Link href={`/methodology/internal-docs/${doc.id}/`}>{siteCopy.internalDocs.openRecord}</Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <p>
          <button type="button" className="controlButton" onClick={() => setVisibleCount((prev) => prev + initialVisibleCount)}>
            {siteCopy.internalDocs.loadMore}
          </button>
        </p>
      )}
    </>
  );
}
