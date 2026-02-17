import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { benchmarks } from "@/lib/benchmarksContent";
import { canonical } from "@/lib/canonicalLinks";
import { benchmarkInternalLinks, relatedSubdomainLinks } from "@/lib/internalLinkGraph";
import { siteCopy } from "@/lib/siteCopy";
import { writingHumanizer } from "@/lib/writingHumanizer";

export function generateStaticParams() {
  return benchmarks.map((item) => ({ id: item.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const benchmark = benchmarks.find((item) => item.id === params.id);
  if (!benchmark) {
    return { title: siteCopy.benchmark.notFoundTitle };
  }
  const route = `/benchmarks/${benchmark.id}/`;
  return {
    title: writingHumanizer(`${benchmark.title} | benchmarks.teamstation.dev`, { context: "headline" }),
    description: writingHumanizer(benchmark.summary, { context: "metadata" }),
    alternates: { canonical: route },
    openGraph: {
      url: canonical(route),
      title: writingHumanizer(benchmark.title, { context: "headline" }),
      description: writingHumanizer(benchmark.summary, { context: "metadata" })
    }
  };
}

export default function BenchmarkDetailPage({ params }: { params: { id: string } }) {
  const benchmark = benchmarks.find((item) => item.id === params.id);
  if (!benchmark) notFound();
  const internal = benchmarkInternalLinks(benchmark.category, benchmark.id);
  const related = relatedSubdomainLinks([benchmark.category, ...benchmark.tags], 3, 5);

  return (
    <>
      <h1>{benchmark.title}</h1>
      <p className="muted">{benchmark.metric}: {benchmark.score}</p>
      <p>{benchmark.summary}</p>
      <p className="muted">{siteCopy.benchmark.sourcePrefix}: {benchmark.source}</p>
      <p className="muted">{siteCopy.benchmark.methodologyPrefix}: {benchmark.methodology}</p>
      <p className="muted">{siteCopy.benchmark.lastUpdatedPrefix}: {benchmark.lastUpdated}</p>
      <p>
        {benchmark.tags.map((tag) => (
          <span className="pill" key={tag}>{tag}</span>
        ))}
      </p>

      {internal.length > 0 && (
        <>
          <h2>{siteCopy.internalLinks.internalTitle}</h2>
          <ul className="list">
            {internal.map((item) => (
              <li key={item.href} className="listItem">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </>
      )}

      {related.length > 0 && (
        <>
          <h2>{siteCopy.internalLinks.subdomainTitle}</h2>
          <ul className="list">
            {related.map((item) => (
              <li key={item.url} className="listItem">
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
