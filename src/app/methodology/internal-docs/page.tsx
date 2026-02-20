import { ResearchDocumentExplorer } from "@/components/research/ResearchDocumentExplorer";
import { researchCorpusStats } from "@/lib/researchCorpus";
import { researchDocuments, statusSummaryForResearchDocuments } from "@/lib/researchDocuments";
import { siteCopy } from "@/lib/siteCopy";

export default function InternalDocsMethodologyPage() {
  const stats = researchCorpusStats();
  const docs = researchDocuments;
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
        <ResearchDocumentExplorer docs={docs} initialVisibleCount={36} />
      </section>
    </>
  );
}
