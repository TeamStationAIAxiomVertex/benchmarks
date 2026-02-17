import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { benchmarks } from "@/lib/benchmarksContent";
import { canonical } from "@/lib/canonicalLinks";

export function generateStaticParams() {
  return benchmarks.map((item) => ({ id: item.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const benchmark = benchmarks.find((item) => item.id === params.id);
  if (!benchmark) {
    return { title: "Not Found" };
  }
  const route = `/benchmarks/${benchmark.id}/`;
  return {
    title: `${benchmark.title} | benchmarks.teamstation.dev`,
    description: benchmark.summary,
    alternates: { canonical: route },
    openGraph: { url: canonical(route), title: benchmark.title, description: benchmark.summary }
  };
}

export default function BenchmarkDetailPage({ params }: { params: { id: string } }) {
  const benchmark = benchmarks.find((item) => item.id === params.id);
  if (!benchmark) notFound();

  return (
    <>
      <h1>{benchmark.title}</h1>
      <p className="muted">{benchmark.metric}: {benchmark.score}</p>
      <p>{benchmark.summary}</p>
      <p className="muted">Source: {benchmark.source}</p>
      <p className="muted">Methodology: {benchmark.methodology}</p>
      <p className="muted">Last updated: {benchmark.lastUpdated}</p>
      <p>
        {benchmark.tags.map((tag) => (
          <span className="pill" key={tag}>{tag}</span>
        ))}
      </p>
    </>
  );
}
