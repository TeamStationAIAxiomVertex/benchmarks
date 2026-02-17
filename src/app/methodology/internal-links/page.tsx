import type { Metadata } from "next";
import { internalLinkGraph, internalLinkInventorySummary } from "@/lib/internalLinkGraph";
import { siteCopy } from "@/lib/siteCopy";

export const metadata: Metadata = {
  title: siteCopy.internalLinks.title,
  description: siteCopy.internalLinks.subtitle
};

export default function InternalLinksPage() {
  return (
    <>
      <h1>{siteCopy.internalLinks.title}</h1>
      <p>{siteCopy.internalLinks.subtitle}</p>

      <h2>{siteCopy.internalLinks.summaryTitle}</h2>
      <p className="muted">
        {siteCopy.internalLinks.asOfLabel}: {internalLinkInventorySummary.asOfDate}
      </p>
      <ul className="list">
        {internalLinkInventorySummary.clusters.map((row) => (
          <li key={row.cluster} className="listItem">
            <strong>{siteCopy.internalLinks.clusterLabel}:</strong> {row.cluster} ·{" "}
            <strong>{siteCopy.internalLinks.countLabel}:</strong> {row.count}
          </li>
        ))}
      </ul>

      <h2>{siteCopy.internalLinks.examplesTitle}</h2>
      <ul className="list">
        {internalLinkGraph.map((item) => (
          <li key={item.url} className="listItem">
            <a href={item.url}>{item.title}</a>
            <p className="muted" style={{ marginTop: "0.3rem" }}>
              {siteCopy.internalLinks.clusterLabel}: {item.cluster}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

