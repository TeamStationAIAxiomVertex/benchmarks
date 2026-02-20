import { researchCorpusStats } from "@/lib/researchCorpus";
import { siteCopy } from "@/lib/siteCopy";
import researchIndex from "../../../../research/index.json";

export default function InternalDocsMethodologyPage() {
  const stats = researchCorpusStats();
  const docs = (researchIndex as Array<{ id: string; title: string; status?: string }>).slice(0, 40);

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
        <ul className="list">
          {docs.map((doc) => (
            <li className="listItem" key={doc.id}>
              <strong>{doc.title}</strong>
              <p className="muted" style={{ marginTop: "0.4rem" }}>
                {siteCopy.internalDocs.idLabel}: {doc.id} {doc.status ? `| ${siteCopy.internalDocs.statusLabel}: ${doc.status}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
