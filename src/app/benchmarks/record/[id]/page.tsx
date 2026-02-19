import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BenchmarkSection } from "@/components/benchmark/BenchmarkSection";
import { BenchmarkSignalBar } from "@/components/benchmark/BenchmarkSignalBar";
import { DecisionFrameworkBlock } from "@/components/benchmark/DecisionFrameworkBlock";
import { EvidencePanel } from "@/components/benchmark/EvidencePanel";
import { ExecutiveSignalCard } from "@/components/benchmark/ExecutiveSignalCard";
import { benchmarks } from "@/lib/benchmarksContent";
import { buildRecordLongForm } from "@/lib/benchmarkPageFactory";
import { canonical } from "@/lib/canonicalLinks";
import { benchmarkInternalLinks, relatedSubdomainLinks } from "@/lib/internalLinkGraph";
import { researchCorpusStats } from "@/lib/researchCorpus";
import { sandlerIntentForBenchmark } from "@/lib/sandlerIntent";
import { siteCopy } from "@/lib/siteCopy";
import { writingHumanizer } from "@/lib/writingHumanizer";

export function generateStaticParams() {
  return benchmarks.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const benchmark = benchmarks.find((item) => item.id === id);
  if (!benchmark) {
    return { title: siteCopy.benchmark.notFoundTitle };
  }
  const route = `/benchmarks/record/${benchmark.id}/`;
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

export default async function BenchmarkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const benchmark = benchmarks.find((item) => item.id === id);
  if (!benchmark) notFound();
  const internal = benchmarkInternalLinks(benchmark.category, `record/${benchmark.id}`);
  const related = relatedSubdomainLinks([benchmark.category, ...benchmark.tags], 3, 5);
  const sandler = sandlerIntentForBenchmark(benchmark);
  const { sections, words } = buildRecordLongForm({
    title: benchmark.title,
    category: benchmark.category,
    tags: benchmark.tags
  });
  const decisionSection = sections.find((s) => s.heading.toLowerCase().includes("decision framework"));
  const mainSections = sections.filter((s) => !s.heading.toLowerCase().includes("decision framework"));
  const corpus = researchCorpusStats();
  const citedSources = Array.from(
    new Set(
      sections
        .flatMap((section) => section.paragraphs)
        .flatMap((text) => {
          const matches = text.match(/Source:\s([^.;]+[.;]?)/g);
          if (!matches) return [];
          return matches.map((item) => item.replace(/^Source:\s*/, "").replace(/[.;]$/, "").trim());
        })
    )
  );
  const riskForSection = (title: string) => {
    const value = title.toLowerCase();
    if (value.includes("risk")) return "critical" as const;
    if (value.includes("performance")) return "watch" as const;
    return "strong" as const;
  };

  return (
    <>
      <article className="card benchmarkHero">
        <h1>{benchmark.title}</h1>
        <h2>{writingHumanizer("Benchmark Snapshot", { context: "headline" })}</h2>
        <h3>{writingHumanizer("Metric source and methodology context", { context: "headline" })}</h3>
        <p className="muted">{benchmark.metric}: {benchmark.score}</p>
        <p>{benchmark.summary}</p>
        <p className="muted">
          {writingHumanizer(`Long form benchmark body: ${words} words.`, { context: "body" })}
        </p>
        <div data-benchmark-word-count={words} hidden />
        <p className="muted">{siteCopy.benchmark.sourcePrefix}: {benchmark.source}</p>
        <p className="muted">{siteCopy.benchmark.methodologyPrefix}: {benchmark.methodology}</p>
        <p className="muted">{siteCopy.benchmark.lastUpdatedPrefix}: {benchmark.lastUpdated}</p>
        <p>
          {benchmark.tags.map((tag) => (
            <span className="pill" key={tag}>{tag}</span>
          ))}
        </p>
      </article>
      <ExecutiveSignalCard
        title={siteCopy.benchmark.sandlerTitle}
        subtitle={writingHumanizer("Pain impact future and decision trigger", { context: "headline" })}
        pain={sandler.pain}
        impact={sandler.impact}
        future={sandler.future}
        decision={sandler.decision}
      />
      <BenchmarkSignalBar
        words={words}
        sources={citedSources}
        sourceCount={corpus.sourceCount}
        recordsCount={corpus.recordsCount}
        generatedAt={corpus.generatedAt}
      />

      {mainSections.map((section) => (
        <BenchmarkSection
          key={section.heading}
          title={section.heading}
          subtitle={section.subheading}
          paragraphs={section.paragraphs}
          risk={riskForSection(section.heading)}
          collapsibleEvidence={section.heading.toLowerCase().includes("evidence appendix")}
        />
      ))}

      {decisionSection && <DecisionFrameworkBlock lines={decisionSection.paragraphs.slice(0, 6)} />}

      {internal.length > 0 && (
        <EvidencePanel
          title={siteCopy.internalLinks.internalTitle}
          subtitle={writingHumanizer("Internal benchmark mesh links", { context: "headline" })}
          links={internal.map((item) => ({ href: item.href, label: item.label }))}
        />
      )}

      {related.length > 0 && (
        <EvidencePanel
          title={siteCopy.internalLinks.subdomainTitle}
          subtitle={writingHumanizer("Relevant TeamStation subdomain references", { context: "headline" })}
          links={related.map((item) => ({ href: item.url, label: item.title }))}
        />
      )}
    </>
  );
}
