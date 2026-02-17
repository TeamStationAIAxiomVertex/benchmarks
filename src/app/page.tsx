import Link from "next/link";
import { benchmarks, categoryMeta } from "@/lib/benchmarksContent";

export default function HomePage() {
  const top = [...benchmarks].sort((a, b) => b.score - a.score).slice(0, 18);

  return (
    <>
      <h1>Benchmarks</h1>
      <p className="muted">Static benchmark snapshots for the TeamStation ecosystem.</p>

      <div className="grid" style={{ marginBottom: "1.2rem" }}>
        {Object.entries(categoryMeta).map(([slug, meta]) => (
          <article key={slug} className="card">
            <h2>{meta.title}</h2>
            <p className="muted">{meta.description}</p>
            <Link href={`/categories/${slug}/`}>View category</Link>
          </article>
        ))}
      </div>

      <h2>Top Records</h2>
      <div className="grid">
        {top.map((item) => (
          <article key={item.id} className="card">
            <h3>{item.title}</h3>
            <p className="muted">{item.metric}: {item.score}</p>
            <p>{item.summary}</p>
            <p>
              <span className="pill">{item.category}</span>
              <span className="pill">updated {item.lastUpdated}</span>
            </p>
            <Link href={`/benchmarks/${item.id}/`}>Open benchmark</Link>
          </article>
        ))}
      </div>
    </>
  );
}
