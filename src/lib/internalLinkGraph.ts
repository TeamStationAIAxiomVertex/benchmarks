import { writingHumanizer } from "@/lib/writingHumanizer";

export type SubdomainLink = {
  url: string;
  title: string;
  cluster: "articles" | "research" | "cto" | "hire";
  subdomain: "articles.teamstation.dev" | "research.teamstation.dev" | "cto.teamstation.dev" | "hire.teamstation.dev";
  tags: string[];
};

const articleUrls = [
  "https://articles.teamstation.dev/how-to-deploy-without-breaking-prod/",
  "https://articles.teamstation.dev/why-does-the-night-shift-break-the-build/",
  "https://articles.teamstation.dev/why-is-integration-hell/",
  "https://articles.teamstation.dev/why-are-stand-ups-useless/",
  "https://articles.teamstation.dev/why-is-the-migration-stalled/",
  "https://articles.teamstation.dev/why-are-we-fixing-the-same-bug-again/",
  "https://articles.teamstation.dev/what-happens-if-they-quit-tomorrow/",
  "https://articles.teamstation.dev/why-is-the-monolith-crushing-the-team/",
  "https://articles.teamstation.dev/how-do-we-secure-code-on-a-laptop-in-a-coffee-shop-in-brazil/",
  "https://articles.teamstation.dev/why-doesnt-governance-prevent-operational-risk-in-engineering-teams/",
  "https://articles.teamstation.dev/why-is-the-feedback-loop-so-slow/",
  "https://articles.teamstation.dev/why-does-vendor-accountability-disappear-after-contracts-are-signed/",
  "https://articles.teamstation.dev/why-does-engineering-velocity-collapse-after-series-b-enterprise-scale/",
  "https://articles.teamstation.dev/why-dont-managed-engineering-services-actually-reduce-risk/",
  "https://articles.teamstation.dev/when-does-a-new-hire-become-profitable/",
  "https://articles.teamstation.dev/why-are-seniors-failing-junior-tasks/",
  "https://articles.teamstation.dev/is-code-an-expense-or-an-asset/",
  "https://articles.teamstation.dev/why-do-distributed-engineering-teams-stay-busy-but-deliver-less/",
  "https://articles.teamstation.dev/why-does-compliance-slow-teams-down-instead-of-reducing-risk-2/",
  "https://articles.teamstation.dev/why-does-compliance-slow-teams-down-instead-of-reducing-risk/",
  "https://articles.teamstation.dev/why-is-cheap-talent-actually-the-most-expensive-talent/",
  "https://articles.teamstation.dev/why-does-software-delivery-slow-down-as-engineering-teams-grow/",
  "https://articles.teamstation.dev/why-do-nearshore-engineering-teams-fail-after-initial-success/",
  "https://articles.teamstation.dev/why-does-adding-more-engineers-reduce-overall-productivity/",
  "https://articles.teamstation.dev/when-does-fixing-ai-code-cost-more-than-writing-it/",
  "https://articles.teamstation.dev/why-does-engineering-talent-quality-decline-after-onboarding/",
  "https://articles.teamstation.dev/why-do-i-have-to-call-them-for-updates/",
  "https://articles.teamstation.dev/can-they-code-with-others-watching/",
  "https://articles.teamstation.dev/can-they-whiteboard-the-architecture/",
  "https://articles.teamstation.dev/how-fast-can-they-find-the-root-cause/",
  "https://articles.teamstation.dev/why-is-the-full-stack-engineer-bad-at-everything/",
  "https://articles.teamstation.dev/will-they-survive-the-next-framework-shift/",
  "https://articles.teamstation.dev/why-dont-strong-engineering-resumes-translate-into-delivery-results/",
  "https://articles.teamstation.dev/why-is-the-team-polite-but-ineffective/",
  "https://articles.teamstation.dev/why-does-hiring-take-60-days/",
  "https://articles.teamstation.dev/seniority-simulation-protocols/",
  "https://articles.teamstation.dev/cognitive-fidelity-index/"
];

const researchUrls = [
  "https://research.teamstation.dev/research/nearshore-nebula-search-ai",
  "https://research.teamstation.dev/research/cognitive-alignment-in-latam-engineers",
  "https://research.teamstation.dev/research/axiom-cortex-architecture",
  "https://research.teamstation.dev/research/ai-nearshore-teams-who-gets-replaced-and-why",
  "https://research.teamstation.dev/research/sequential-effort-incentives",
  "https://research.teamstation.dev/research/ai-placement-in-pipelines",
  "https://research.teamstation.dev/research/platforming-the-nearshore-industry",
  "https://research.teamstation.dev/research/nearshore-platform-economics",
  "https://research.teamstation.dev/research/ai-augmented-engineer-performance",
  "https://research.teamstation.dev/axiom-cortex/system-design",
  "https://research.teamstation.dev/axiom-cortex/microservices",
  "https://research.teamstation.dev/axiom-cortex/grpc",
  "https://research.teamstation.dev/axiom-cortex/rest-api-design",
  "https://research.teamstation.dev/axiom-cortex/event-sourcing",
  "https://research.teamstation.dev/axiom-cortex/aws",
  "https://research.teamstation.dev/axiom-cortex/azure",
  "https://research.teamstation.dev/axiom-cortex/google-cloud",
  "https://research.teamstation.dev/axiom-cortex/docker",
  "https://research.teamstation.dev/axiom-cortex/terraform",
  "https://research.teamstation.dev/axiom-cortex/ansible",
  "https://research.teamstation.dev/axiom-cortex/kubernetes",
  "https://research.teamstation.dev/axiom-cortex/data-engineering",
  "https://research.teamstation.dev/axiom-cortex/machine-learning",
  "https://research.teamstation.dev/axiom-cortex/llms",
  "https://research.teamstation.dev/axiom-cortex/security-engineering",
  "https://research.teamstation.dev/axiom-cortex/postgresql",
  "https://research.teamstation.dev/axiom-cortex/elasticsearch",
  "https://research.teamstation.dev/axiom-cortex/pinecone",
  "https://research.teamstation.dev/axiom-cortex/weaviate"
];

const ctoUrls = [
  "https://cto.teamstation.dev/hire/by-country/argentina/react",
  "https://cto.teamstation.dev/hire/by-country/argentina/python",
  "https://cto.teamstation.dev/hire/by-country/argentina/node",
  "https://cto.teamstation.dev/hire/by-country/brazil/react",
  "https://cto.teamstation.dev/hire/by-country/brazil/python",
  "https://cto.teamstation.dev/hire/by-country/brazil/node",
  "https://cto.teamstation.dev/hire/by-country/chile/react",
  "https://cto.teamstation.dev/hire/by-country/chile/python",
  "https://cto.teamstation.dev/hire/by-country/colombia/react",
  "https://cto.teamstation.dev/hire/by-country/colombia/python",
  "https://cto.teamstation.dev/hire/by-country/mexico/react",
  "https://cto.teamstation.dev/hire/by-country/mexico/python",
  "https://cto.teamstation.dev/hire/by-country/peru/react",
  "https://cto.teamstation.dev/hire/by-country/peru/python",
  "https://cto.teamstation.dev/hire/by-country/uruguay/react",
  "https://cto.teamstation.dev/hire/by-country/uruguay/python",
  "https://cto.teamstation.dev/hire/by-country/costa-rica/react",
  "https://cto.teamstation.dev/hire/by-country/costa-rica/python",
  "https://cto.teamstation.dev/hire/by-country/ecuador/react",
  "https://cto.teamstation.dev/hire/by-country/ecuador/python"
];

const hireUrls = [
  "https://hire.teamstation.dev/hire/react",
  "https://hire.teamstation.dev/hire/typescript",
  "https://hire.teamstation.dev/hire/nextjs",
  "https://hire.teamstation.dev/hire/angular",
  "https://hire.teamstation.dev/hire/vue",
  "https://hire.teamstation.dev/hire/node",
  "https://hire.teamstation.dev/hire/java",
  "https://hire.teamstation.dev/hire/python",
  "https://hire.teamstation.dev/hire/golang",
  "https://hire.teamstation.dev/hire/c-sharp",
  "https://hire.teamstation.dev/hire/rust",
  "https://hire.teamstation.dev/hire/devops-engineering",
  "https://hire.teamstation.dev/hire/aws",
  "https://hire.teamstation.dev/hire/azure",
  "https://hire.teamstation.dev/hire/google-cloud",
  "https://hire.teamstation.dev/hire/kubernetes",
  "https://hire.teamstation.dev/hire/docker",
  "https://hire.teamstation.dev/hire/terraform",
  "https://hire.teamstation.dev/hire/ansible",
  "https://hire.teamstation.dev/hire/ci-cd",
  "https://hire.teamstation.dev/hire/prometheus",
  "https://hire.teamstation.dev/hire/grafana",
  "https://hire.teamstation.dev/hire/istio",
  "https://hire.teamstation.dev/hire/helm",
  "https://hire.teamstation.dev/hire/security-engineering",
  "https://hire.teamstation.dev/hire/qa-automation",
  "https://hire.teamstation.dev/hire/playwright",
  "https://hire.teamstation.dev/hire/cypress",
  "https://hire.teamstation.dev/hire/data-engineering",
  "https://hire.teamstation.dev/hire/etl-elt",
  "https://hire.teamstation.dev/hire/apache-spark",
  "https://hire.teamstation.dev/hire/dbt",
  "https://hire.teamstation.dev/hire/snowflake",
  "https://hire.teamstation.dev/hire/airbyte",
  "https://hire.teamstation.dev/hire/machine-learning",
  "https://hire.teamstation.dev/hire/llms",
  "https://hire.teamstation.dev/hire/data-science",
  "https://hire.teamstation.dev/hire/system-design",
  "https://hire.teamstation.dev/hire/api-security",
  "https://hire.teamstation.dev/hire/grpc"
];

const keywordTagMap: Array<{ key: string; tags: string[] }> = [
  { key: "nearshore", tags: ["nearshore", "cost-efficiency"] },
  { key: "hiring", tags: ["hiring", "cost-efficiency"] },
  { key: "hire", tags: ["hiring"] },
  { key: "delivery", tags: ["engineering-velocity"] },
  { key: "velocity", tags: ["engineering-velocity"] },
  { key: "quality", tags: ["quality-reliability"] },
  { key: "risk", tags: ["quality-reliability"] },
  { key: "security", tags: ["quality-reliability", "security"] },
  { key: "compliance", tags: ["quality-reliability"] },
  { key: "ai", tags: ["ai-coding"] },
  { key: "llms", tags: ["ai-coding"] },
  { key: "python", tags: ["python", "backend", "ai-coding"] },
  { key: "react", tags: ["react", "frontend", "engineering-velocity"] },
  { key: "nextjs", tags: ["nextjs", "frontend", "engineering-velocity"] },
  { key: "node", tags: ["node", "backend", "engineering-velocity"] },
  { key: "devops", tags: ["devops", "quality-reliability"] },
  { key: "kubernetes", tags: ["devops", "quality-reliability"] },
  { key: "data", tags: ["data", "cost-efficiency"] }
];

function titleFromUrl(url: string) {
  const pathname = new URL(url).pathname.replace(/\/+$/, "");
  const slug = pathname.split("/").filter(Boolean).pop() ?? "link";
  return writingHumanizer(slug.replace(/-/g, " "), { context: "headline" });
}

function tagsFromUrl(url: string) {
  const value = url.toLowerCase();
  const tags = new Set<string>();
  for (const row of keywordTagMap) {
    if (value.includes(row.key)) {
      for (const tag of row.tags) tags.add(tag);
    }
  }
  if (tags.size === 0) tags.add("engineering-velocity");
  return [...tags];
}

function buildLinks(
  urls: string[],
  cluster: SubdomainLink["cluster"],
  subdomain: SubdomainLink["subdomain"]
): SubdomainLink[] {
  return urls.map((url) => ({
    url,
    title: titleFromUrl(url),
    cluster,
    subdomain,
    tags: tagsFromUrl(url)
  }));
}

export const internalLinkGraph: SubdomainLink[] = [
  ...buildLinks(articleUrls, "articles", "articles.teamstation.dev"),
  ...buildLinks(researchUrls, "research", "research.teamstation.dev"),
  ...buildLinks(ctoUrls, "cto", "cto.teamstation.dev"),
  ...buildLinks(hireUrls, "hire", "hire.teamstation.dev")
];

export function relatedSubdomainLinks(
  inputTags: string[],
  min = 3,
  max = 5
): SubdomainLink[] {
  const tags = new Set(inputTags.map((t) => t.toLowerCase()));
  const ranked = [...internalLinkGraph]
    .map((item) => ({
      item,
      score: item.tags.reduce((acc, tag) => (tags.has(tag.toLowerCase()) ? acc + 1 : acc), 0)
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((row) => row.item);

  const out: SubdomainLink[] = [];
  const usedSubdomains = new Set<string>();

  for (const item of ranked) {
    if (out.length >= max) break;
    if (usedSubdomains.size < 3 && usedSubdomains.has(item.subdomain)) continue;
    out.push(item);
    usedSubdomains.add(item.subdomain);
  }

  if (out.length < min) {
    for (const item of ranked) {
      if (out.length >= min) break;
      if (!out.find((x) => x.url === item.url)) out.push(item);
    }
  }

  return out.slice(0, max);
}

export function benchmarkInternalLinks(category: string, slug: string) {
  return [
    { href: "/benchmarks/", label: writingHumanizer("All benchmarks index", { context: "label" }) },
    { href: `/categories/${category}/`, label: writingHumanizer("Category benchmark cluster", { context: "label" }) },
    { href: "/methodology/", label: writingHumanizer("Benchmark methodology", { context: "label" }) },
    { href: "/methodology/internal-links/", label: writingHumanizer("Internal link topology", { context: "label" }) },
    { href: `/benchmarks/${slug}/`, label: writingHumanizer("Current benchmark canonical", { context: "label" }) }
  ].slice(0, 3);
}

export const internalLinkInventorySummary = {
  asOfDate: "2026-02-17",
  clusters: [
    { cluster: "articles", count: articleUrls.length },
    { cluster: "research", count: researchUrls.length },
    { cluster: "cto", count: ctoUrls.length },
    { cluster: "hire", count: hireUrls.length }
  ]
};

