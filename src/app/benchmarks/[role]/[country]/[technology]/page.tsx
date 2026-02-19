import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BenchmarkSection } from "@/components/benchmark/BenchmarkSection";
import { BenchmarkSignalBar } from "@/components/benchmark/BenchmarkSignalBar";
import { DecisionFrameworkBlock } from "@/components/benchmark/DecisionFrameworkBlock";
import { EvidencePanel } from "@/components/benchmark/EvidencePanel";
import { ExecutiveSignalCard } from "@/components/benchmark/ExecutiveSignalCard";
import { buildBenchmarkLongForm } from "@/lib/benchmarkPageFactory";
import { findMatrixPage, getBenchmarkMatrix } from "@/lib/benchmarkMatrix";
import { canonical } from "@/lib/canonicalLinks";
import { benchmarkInternalLinks, relatedSubdomainLinks } from "@/lib/internalLinkGraph";
import { researchCorpusStats } from "@/lib/researchCorpus";
import { siteCopy } from "@/lib/siteCopy";
import { writingHumanizer } from "@/lib/writingHumanizer";

type Params = {
  role: string;
  country: string;
  technology: string;
};

function routeFor(params: Params) {
  return `/benchmarks/${params.role}/${params.country}/${params.technology}/`;
}

export function generateStaticParams() {
  return getBenchmarkMatrix(500).map((item) => ({
    role: item.role,
    country: item.country,
    technology: item.technology
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = await params;
  const page = findMatrixPage(resolved.role, resolved.country, resolved.technology);
  if (!page) return { title: writingHumanizer("Benchmark Not Found", { context: "headline" }) };

  const route = routeFor(resolved);
  const title = writingHumanizer(
    `${page.roleTitle} in ${page.countryTitle} for ${page.technologyTitle} Benchmarks`,
    { context: "headline" }
  );
  const description = writingHumanizer(
    `Read decision grade benchmarks for ${page.roleTitle} teams in ${page.countryTitle} delivering ${page.technologyTitle} programs with validated speed cost and quality signals.`,
    { context: "metadata" }
  );

  return {
    title,
    description,
    alternates: { canonical: route },
    openGraph: {
      url: canonical(route),
      title,
      description
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export default async function MatrixBenchmarkPage({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  const page = findMatrixPage(resolved.role, resolved.country, resolved.technology);
  if (!page) notFound();

  const route = routeFor(resolved);
  const { sections, words } = buildBenchmarkLongForm(page);
  const internal = benchmarkInternalLinks(page.category, `${page.role}/${page.country}/${page.technology}`);
  const related = relatedSubdomainLinks(page.tags, 3, 5);
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
  const decisionSection = sections.find((s) => s.heading.toLowerCase().includes("decision framework"));
  const mainSections = sections.filter((s) => !s.heading.toLowerCase().includes("decision framework"));
  const riskForSection = (title: string) => {
    const value = title.toLowerCase();
    if (value.includes("risk")) return "critical" as const;
    if (value.includes("performance")) return "watch" as const;
    return "strong" as const;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical(route)}#webpage`,
        url: canonical(route),
        name: `${page.roleTitle} ${page.countryTitle} ${page.technologyTitle} Benchmarks`,
        description: `Benchmark page for ${page.roleTitle} teams in ${page.countryTitle} across ${page.technologyTitle} delivery programs.`,
        inLanguage: "en-US"
      },
      {
        "@type": "Dataset",
        "@id": `${canonical(route)}#dataset`,
        name: `${page.roleTitle} ${page.countryTitle} ${page.technologyTitle} Benchmark Dataset`,
        creator: {
          "@type": "Organization",
          name: "TeamStation AI",
          url: "https://teamstation.dev"
        },
        isAccessibleForFree: true,
        url: canonical(route),
        keywords: page.tags.join(", ")
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical(route)}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Benchmarks",
            item: "https://benchmarks.teamstation.dev/benchmarks/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.roleTitle,
            item: `https://benchmarks.teamstation.dev/benchmarks/${page.role}/`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.countryTitle,
            item: `https://benchmarks.teamstation.dev/benchmarks/${page.role}/${page.country}/`
          },
          {
            "@type": "ListItem",
            position: 4,
            name: page.technologyTitle,
            item: canonical(route)
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <article className="card benchmarkHero">
        <h1>{writingHumanizer(`${page.roleTitle} ${page.countryTitle} ${page.technologyTitle} Benchmarks`, { context: "headline" })}</h1>
        <h2>{writingHumanizer("Benchmark Overview", { context: "headline" })}</h2>
        <h3>{writingHumanizer("Validated long form benchmark summary", { context: "headline" })}</h3>
        <p className="muted">
          {writingHumanizer(
            `This page is generated as a long form benchmark signal with ${words} words and section level evidence architecture for static export.`,
            { context: "body" }
          )}
        </p>
        <div data-benchmark-word-count={words} hidden />
      </article>

      <BenchmarkSignalBar
        words={words}
        sources={citedSources}
        sourceCount={corpus.sourceCount}
        recordsCount={corpus.recordsCount}
        generatedAt={corpus.generatedAt}
      />

      <ExecutiveSignalCard
        title={siteCopy.benchmark.sandlerTitle}
        subtitle={writingHumanizer("Pain impact future and decision trigger", { context: "headline" })}
        pain={writingHumanizer(`Leaders need verified ${page.category} signals before scaling ${page.roleTitle} delivery in ${page.countryTitle}.`, {
          context: "body"
        })}
        impact={writingHumanizer(`Without clear signal quality, ${page.technologyTitle} roadmap decisions can increase delivery risk and operating cost.`, {
          context: "body"
        })}
        future={writingHumanizer(`A structured benchmark model supports faster planning alignment across engineering, finance, and operations.`, {
          context: "body"
        })}
        decision={writingHumanizer(`Use this page to gate scale decisions and assign concrete operating actions this cycle.`, { context: "body" })}
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

      <EvidencePanel
        title={siteCopy.internalLinks.internalTitle}
        subtitle={writingHumanizer("Internal benchmark mesh links", { context: "headline" })}
        links={internal.slice(0, 3).map((item) => ({ href: item.href, label: item.label }))}
      />

      <EvidencePanel
        title={siteCopy.internalLinks.subdomainTitle}
        subtitle={writingHumanizer("Relevant TeamStation subdomain references", { context: "headline" })}
        links={related.map((item) => ({ href: item.url, label: item.title }))}
      />
    </>
  );
}
