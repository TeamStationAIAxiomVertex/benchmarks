import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildBenchmarkLongForm } from "@/lib/benchmarkPageFactory";
import { findMatrixPage, getBenchmarkMatrix } from "@/lib/benchmarkMatrix";
import { canonical } from "@/lib/canonicalLinks";
import { benchmarkInternalLinks, relatedSubdomainLinks } from "@/lib/internalLinkGraph";
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
      <h1>{writingHumanizer(`${page.roleTitle} ${page.countryTitle} ${page.technologyTitle} Benchmarks`, { context: "headline" })}</h1>
      <p className="muted">
        {writingHumanizer(
          `This page is generated as a long form benchmark signal with ${words} words and section level evidence architecture for static export.`,
          { context: "body" }
        )}
      </p>
      <div data-benchmark-word-count={words} hidden />

      {sections.map((section) => (
        <section key={section.heading} style={{ marginBottom: "1.2rem" }}>
          <h2>{section.heading}</h2>
          <h3>{section.subheading}</h3>
          {section.paragraphs.map((text, idx) => (
            <p key={`${section.heading}-${idx}`}>{text}</p>
          ))}
        </section>
      ))}

      <section style={{ marginBottom: "1.2rem" }}>
        <h2>{siteCopy.internalLinks.internalTitle}</h2>
        <ul className="list">
          {internal.slice(0, 3).map((item) => (
            <li key={item.href} className="listItem">
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{siteCopy.internalLinks.subdomainTitle}</h2>
        <ul className="list">
          {related.map((item) => (
            <li key={item.url} className="listItem">
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
