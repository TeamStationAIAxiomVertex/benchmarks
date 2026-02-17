import Link from "next/link";
import { benchmarks, categoryMeta } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

export default function HomePage() {
  const top = [...benchmarks].sort((a, b) => b.score - a.score).slice(0, 18);

  return (
    <>
      <h1>{siteCopy.home.title}</h1>
      <p className="muted">{siteCopy.home.subtitle}</p>

      <div className="grid" style={{ marginBottom: "1.2rem" }}>
        {Object.entries(categoryMeta).map(([slug, meta]) => (
          <article key={slug} className="card">
            <h2>{meta.title}</h2>
            <p className="muted">{meta.description}</p>
            <Link href={`/categories/${slug}/`}>{siteCopy.home.viewCategory}</Link>
          </article>
        ))}
      </div>

      <article className="card" style={{ marginBottom: "1.2rem" }}>
        <h2>{siteCopy.home.positioningTitle}</h2>
        <p>{siteCopy.home.positioningBody}</p>
        <Link href="/methodology/positioning/">{siteCopy.home.positioningCta}</Link>
      </article>

      <h2>{siteCopy.home.topRecords}</h2>
      <div className="grid">
        {top.map((item) => (
          <article key={item.id} className="card">
            <h3>{item.title}</h3>
            <p className="muted">{item.metric}: {item.score}</p>
            <p>{item.summary}</p>
            <p>
              <span className="pill">{item.category}</span>
              <span className="pill">{siteCopy.home.updatedPrefix} {item.lastUpdated}</span>
            </p>
            <Link href={`/benchmarks/${item.id}/`}>{siteCopy.home.openBenchmark}</Link>
          </article>
        ))}
      </div>
    </>
  );
}
