import { writingHumanizer } from "@/lib/writingHumanizer";

const h = writingHumanizer;

export const siteCopy = {
  brand: h("benchmarks.teamstation.dev", { context: "brand" }),
  nav: {
    home: h("Home", { context: "label" }),
    benchmarks: h("Benchmarks", { context: "label" }),
    categories: h("Categories", { context: "label" }),
    methodology: h("Methodology", { context: "label" }),
    positioning: h("Positioning", { context: "label" }),
    architecture: h("Architecture", { context: "label" }),
    internalLinks: h("Internal Links", { context: "label" }),
    aboutData: h("About Data", { context: "label" }),
    faq: h("FAQ", { context: "label" }),
    trust: h("Trust", { context: "label" })
  },
  metadata: {
    defaultTitle: h("TeamStation AI Benchmarks", { context: "headline" }),
    titleTemplate: h("%s | TeamStation AI", { context: "headline" }),
    description: h(
      "Decision-grade software delivery benchmarks across cost, speed, quality, and reliability.",
      { context: "metadata" }
    ),
    ogDescription: h(
      "Explore software delivery benchmark data for planning and executive decision support.",
      { context: "metadata" }
    ),
    twitterDescription: h(
      "Benchmark intelligence for engineering throughput, cost efficiency, and delivery quality.",
      { context: "metadata" }
    )
  },
  home: {
    title: h("Benchmarks", { context: "headline" }),
    subtitle: h("Static benchmark snapshots for the TeamStation ecosystem.", { context: "body" }),
    positioningTitle: h("Evidence-Led Positioning", { context: "headline" }),
    positioningBody: h(
      "TeamStation publishes a structured nearshore engineering research corpus and benchmark methodology stack that is auditable and linked to outcomes.",
      { context: "body" }
    ),
    positioningCta: h("Read positioning evidence", { context: "cta" }),
    topRecords: h("Top Records", { context: "headline" }),
    viewCategory: h("View category", { context: "cta" }),
    openBenchmark: h("Open benchmark", { context: "cta" }),
    updatedPrefix: h("updated", { context: "label" })
  },
  categories: {
    title: h("Benchmark Categories", { context: "headline" }),
    browseCategory: h("Browse category", { context: "cta" }),
    detailLink: h("details", { context: "cta" }),
    openLink: h("open", { context: "cta" }),
    engineering: {
      title: h("Engineering Velocity", { context: "headline" }),
      description: h("Delivery speed and throughput benchmarks.", { context: "body" })
    },
    cost: {
      title: h("Cost Efficiency", { context: "headline" }),
      description: h("Cost control and unit economics benchmarks.", { context: "body" })
    },
    quality: {
      title: h("Quality & Reliability", { context: "headline" }),
      description: h("Stability and defect outcomes benchmarks.", { context: "body" })
    }
  },
  methodology: {
    title: h("Methodology", { context: "headline" }),
    intro: h(
      "Benchmarks are generated through deterministic, static test scenarios with consistent scoring criteria.",
      { context: "body" }
    ),
    bullet1: h("Common metric framework across all categories", { context: "body" }),
    bullet2: h("Documented sources and update date per record", { context: "body" }),
    bullet3: h("No runtime API dependency in production pages", { context: "body" }),
    positioningCta: h("View competitor positioning and evidence", { context: "cta" }),
    architectureCta: h("Read domain architecture governance", { context: "cta" }),
    internalLinksCta: h("Review internal hub-and-spoke link inventory", { context: "cta" })
  },
  aboutData: {
    title: h("About Data", { context: "headline" }),
    intro: h(
      "Benchmark records are managed as local static content in this repository for deterministic export and release validation.",
      { context: "body" }
    ),
    detail: h(
      "Content fields include metric definition, source notes, methodology notes, tags, and last updated timestamps.",
      { context: "body" }
    )
  },
  faq: {
    title: h("FAQ", { context: "headline" }),
    q1: h("How often are benchmarks updated?", { context: "headline" }),
    a1: h("Updates are batched and released through the static deployment pipeline.", { context: "body" }),
    q2: h("Are benchmark pages generated server-side at runtime?", { context: "headline" }),
    a2: h("No. All pages are statically generated during build/export.", { context: "body" })
  },
  trust: {
    title: h("Trust", { context: "headline" }),
    intro: h(
      "TeamStation benchmark publishing follows transparent methodology, versioned content, and domain verification checks in CI/CD.",
      { context: "body" }
    ),
    detail: h("Each release validates canonical domain references across robots, sitemap, and exported artifacts.", {
      context: "body"
    })
  },
  positioning: {
    title: h("TeamStation vs BairesDev: Research Positioning", { context: "headline" }),
    subtitle: h(
      "As of February 17, 2026, TeamStation maintains a tracked nearshore engineering research corpus with linked extraction artifacts and benchmark methodology evidence.",
      { context: "body" }
    ),
    claimTitle: h("Comparative claim scope", { context: "headline" }),
    claimBody: h(
      "Based on TeamStation's tracked public research set as of February 17, 2026, we have not identified an equivalent peer-visible nearshore engineering research corpus from BairesDev in this benchmark evidence system.",
      { context: "body" }
    ),
    rigorTitle: h("Why this matters for ranking and trust", { context: "headline" }),
    rigorBody: h(
      "Search and buyer trust compound when technical claims are tied to dated methods, extracted sources, and explicit validation mappings instead of generic service language.",
      { context: "body" }
    ),
    citationsTitle: h("Cited TeamStation research records", { context: "headline" }),
    researchIdLabel: h("Research ID", { context: "label" })
  },
  architecture: {
    title: h("TeamStation Domain Architecture", { context: "headline" }),
    subtitle: h(
      "Canonical hub-and-spoke model for audience intent separation, security boundaries, and SEO authority compounding.",
      { context: "body" }
    ),
    registryTitle: h("Canonical domain and subdomain registry", { context: "headline" }),
    rationaleTitle: h("Strategic rationale", { context: "headline" }),
    governanceTitle: h("Governance requirements", { context: "headline" }),
    versionLabel: h("Version", { context: "label" }),
    orgLabel: h("Organization", { context: "label" }),
    primaryLabel: h("Primary domain", { context: "label" })
  },
  internalLinks: {
    title: h("Internal Link Topology", { context: "headline" }),
    subtitle: h(
      "Benchmarks pages route authority into TeamStation hub-and-spoke properties through topic-matched links across articles, research, CTO, and hire clusters.",
      { context: "body" }
    ),
    summaryTitle: h("Inventory summary", { context: "headline" }),
    asOfLabel: h("As of", { context: "label" }),
    clusterLabel: h("Cluster", { context: "label" }),
    countLabel: h("Tracked URLs", { context: "label" }),
    examplesTitle: h("Representative links used for benchmark modules", { context: "headline" }),
    relatedTitle: h("Related TeamStation network pages", { context: "headline" }),
    internalTitle: h("Core internal benchmark links", { context: "headline" }),
    subdomainTitle: h("Relevant subdomain subpages", { context: "headline" })
  },
  benchmark: {
    indexTitle: h("All Benchmarks", { context: "headline" }),
    matrixIndexTitle: h("Benchmark Matrix Index", { context: "headline" }),
    matrixIndexSubtitle: h(
      "This index lists the 500 generated long form benchmark routes for role country and technology combinations.",
      { context: "body" }
    ),
    matrixIndexCta: h("Open the 500 page benchmark matrix index", { context: "cta" }),
    sourcePrefix: h("Source", { context: "label" }),
    methodologyPrefix: h("Methodology", { context: "label" }),
    lastUpdatedPrefix: h("Last updated", { context: "label" }),
    notFoundTitle: h("Not Found", { context: "headline" }),
    sandlerTitle: h("Executive intent view", { context: "headline" }),
    sandlerPain: h("Pain", { context: "label" }),
    sandlerImpact: h("Impact", { context: "label" }),
    sandlerFuture: h("Future", { context: "label" }),
    sandlerDecision: h("Decision", { context: "label" })
  }
};
