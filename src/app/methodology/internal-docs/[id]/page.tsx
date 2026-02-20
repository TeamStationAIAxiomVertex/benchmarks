import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResearchDocument, insightsForResearchDocument, researchDocuments } from "@/lib/researchDocuments";
import { siteCopy } from "@/lib/siteCopy";
import { writingHumanizer } from "@/lib/writingHumanizer";

function cleanSummary(text: string): string {
  return text
    .replace(/===\s*PAGE\s*\d+\s*===/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max = 1700): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}...`;
}

function benchmarkRoutesFromTags(tags: string[]) {
  const links = new Map<string, string>();
  const knownCategory = new Set(["engineering-velocity", "cost-efficiency", "quality-reliability"]);

  for (const tag of tags) {
    if (knownCategory.has(tag)) {
      links.set(`/categories/${tag}/`, `/categories/${tag}/`);
      continue;
    }
    if (tag === "talent" || tag === "latam" || tag === "ai-augmented" || tag === "governance") {
      links.set(`/benchmarks/matrix/?q=${encodeURIComponent(tag)}`, `/benchmarks/matrix/?q=${encodeURIComponent(tag)}`);
    }
  }

  links.set("/benchmarks/", "/benchmarks/");
  return Array.from(links.values()).slice(0, 6);
}

export function generateStaticParams() {
  return researchDocuments.map((doc) => ({ id: doc.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const doc = getResearchDocument(id);
  if (!doc) return { title: siteCopy.benchmark.notFoundTitle };
  return {
    title: writingHumanizer(`${doc.title} | ${siteCopy.internalDocs.title}`, { context: "headline" }),
    description: writingHumanizer(
      `Research record ${doc.id} with mapped findings, methodology relevance, and extracted evidence snippets.`,
      { context: "metadata" }
    )
  };
}

export default async function InternalDocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = getResearchDocument(id);
  if (!doc) notFound();

  const insights = insightsForResearchDocument(doc.id, 18);
  const tags = Array.from(new Set(insights.flatMap((item) => item.tags).filter((tag) => tag !== "general"))).slice(0, 8);
  const benchmarkRoutes = benchmarkRoutesFromTags(tags);
  const relatedDocs = researchDocuments
    .filter((item) => item.id !== doc.id)
    .sort((a, b) => {
      const statusScore = Number((a.status ?? "") === (doc.status ?? "")) - Number((b.status ?? "") === (doc.status ?? ""));
      if (statusScore !== 0) return -statusScore;
      return a.title.localeCompare(b.title);
    })
    .slice(0, 4);
  const summary = doc.summary ? truncate(cleanSummary(doc.summary)) : "";
  const assetLink = typeof doc.asset_url === "string" && doc.asset_url.length > 0 ? doc.asset_url : null;
  const sourceLink = typeof doc.source_url === "string" && doc.source_url.length > 0 ? doc.source_url : null;

  return (
    <>
      <p>
        <Link href="/methodology/internal-docs/">{siteCopy.internalDocs.backToIndex}</Link>
      </p>

      <h1>{doc.title}</h1>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <h2>{siteCopy.internalDocs.sectionMetaTitle}</h2>
        <p className="muted">
          {siteCopy.internalDocs.idLabel}: {doc.id}
          {doc.status ? ` | ${siteCopy.internalDocs.statusLabel}: ${doc.status}` : ""}
          {doc.ingested_at ? ` | ${siteCopy.internalDocs.ingestedAtLabel}: ${doc.ingested_at}` : ""}
          {typeof doc.year === "number" ? ` | ${siteCopy.internalDocs.yearLabel}: ${doc.year}` : ""}
        </p>
        {doc.authors && doc.authors.length > 0 && (
          <p>{siteCopy.internalDocs.authorsLabel}: {doc.authors.join(", ")}</p>
        )}
        {doc.doi && <p>{siteCopy.internalDocs.doiLabel}: {doc.doi}</p>}
        {sourceLink && (
          <p>
            {siteCopy.internalDocs.sourceUrlLabel}: <a href={sourceLink}>{sourceLink}</a>
          </p>
        )}
        {assetLink && (
          <p>
            {siteCopy.internalDocs.assetLabel}: <a href={assetLink}>{assetLink}</a>
          </p>
        )}
      </section>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <h2>{siteCopy.internalDocs.sectionSummaryTitle}</h2>
        <p>{summary || siteCopy.internalDocs.noSummary}</p>
      </section>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <h2>{siteCopy.internalDocs.sectionFindingsTitle}</h2>
        {doc.key_findings && doc.key_findings.length > 0 ? (
          <ul>
            {doc.key_findings.map((finding) => (
              <li key={finding}>{finding}</li>
            ))}
          </ul>
        ) : (
          <p>{siteCopy.internalDocs.noFindings}</p>
        )}
      </section>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <h2>{siteCopy.internalDocs.sectionRelevanceTitle}</h2>
        <p>{doc.methodology_relevance || siteCopy.internalDocs.noRelevance}</p>
      </section>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <h2>{siteCopy.internalDocs.interlinkTitle}</h2>
        <h3>{siteCopy.internalDocs.relatedDocsTitle}</h3>
        <ul>
          {relatedDocs.map((item) => (
            <li key={item.id}>
              <Link href={`/methodology/internal-docs/${item.id}/`}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <h3>{siteCopy.internalDocs.benchmarkRoutesTitle}</h3>
        <ul>
          {benchmarkRoutes.map((route) => (
            <li key={route}>
              <Link href={route}>{route}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>{siteCopy.internalDocs.sectionEvidenceTitle}</h2>
        {insights.length > 0 ? (
          <ul className="list">
            {insights.map((insight) => (
              <li key={insight.id} className="listItem">
                <p>{insight.text}</p>
                <p className="muted">
                  {insight.tags.map((tag) => (
                    <span className="pill" key={tag}>{tag}</span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{siteCopy.internalDocs.noInsights}</p>
        )}
      </section>
    </>
  );
}
