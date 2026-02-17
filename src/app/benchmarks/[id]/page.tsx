import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { benchmarks } from "@/lib/benchmarksContent";
import { canonical } from "@/lib/canonicalLinks";
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
    </>
  );
}
