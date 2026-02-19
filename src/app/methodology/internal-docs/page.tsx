import { researchCorpusStats } from "@/lib/researchCorpus";
import researchIndex from "../../../../research/index.json";

export default function InternalDocsMethodologyPage() {
  const stats = researchCorpusStats();
  const docs = (researchIndex as Array<{ id: string; title: string; status?: string }>).slice(0, 40);

  return (
    <>
      <h1>Internal Documentation Ingestion</h1>
      <p>
        Benchmarks are generated from internal TeamStation research documents and extracted source files during build.
      </p>
      <div className="grid" style={{ marginBottom: "1rem" }}>
        <article className="card">
          <h2>Corpus Records</h2>
          <p className="muted">{stats.recordsCount}</p>
        </article>
        <article className="card">
          <h2>Source Documents</h2>
          <p className="muted">{stats.sourceCount}</p>
        </article>
        <article className="card">
          <h2>Generated</h2>
          <p className="muted">{stats.generatedAt}</p>
        </article>
      </div>

      <section className="card">
        <h2>Indexed Internal Documents</h2>
        <p className="muted">
          Source: <code>research/index.json</code>
        </p>
        <ul className="list">
          {docs.map((doc) => (
            <li className="listItem" key={doc.id}>
              <strong>{doc.title}</strong>
              <p className="muted" style={{ marginTop: "0.4rem" }}>
                id: {doc.id} {doc.status ? `| status: ${doc.status}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
