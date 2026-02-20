import Link from "next/link";
import { researchCorpusStats } from "@/lib/researchCorpus";
import { researchDocuments, statusSummaryForResearchDocuments } from "@/lib/researchDocuments";
import { siteCopy } from "@/lib/siteCopy";

export default function InternalDocsMethodologyPage() {
  const stats = researchCorpusStats();
  const docs = researchDocuments.slice(0, 60);
  const statusRows = statusSummaryForResearchDocuments();

  return (
    <>
      <h1>{siteCopy.internalDocs.title}</h1>
      <p>{siteCopy.internalDocs.intro}</p>
      <div className="grid" style={{ marginBottom: "1rem" }}>
        <article className="card">
          <h2>{siteCopy.internalDocs.corpusRecordsTitle}</h2>
          <p className="muted">{stats.recordsCount}</p>
        </article>
        <article className="card">
          <h2>{siteCopy.internalDocs.sourceDocumentsTitle}</h2>
          <p className="muted">{stats.sourceCount}</p>
        </article>
        <article className="card">
          <h2>{siteCopy.internalDocs.generatedTitle}</h2>
          <p className="muted">{stats.generatedAt}</p>
        </article>
      </div>

      <section className="card">
        <h2>{siteCopy.internalDocs.indexedDocsTitle}</h2>
        <p className="muted">
          {siteCopy.internalDocs.sourcePrefix}: <code>research/index.json</code>
        </p>
        <p className="muted">
          {statusRows.map((row) => `${row.status} (${row.count})`).join(" · ")}
        </p>
        <ul className="list">
          {docs.map((doc) => (
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
      </section>
    </>
  );
}
