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
    internalDocs: h("Internal Docs", { context: "label" }),
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
    researchTitle: h("Science Papers and Research Records", { context: "headline" }),
    viewCategory: h("View category", { context: "cta" }),
    openResearch: h("Open research record", { context: "cta" }),
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
      "Benchmarks are generated from TeamStation internal research documentation and extracted paper corpus using deterministic static build logic.",
      { context: "body" }
    ),
    bullet1: h("Internal docs pipeline: research/index.json plus extracted source text files", { context: "body" }),
    bullet2: h("Source-anchored evidence snippets mapped to role, country, and technology routes", { context: "body" }),
    bullet3: h("Deterministic static export with zero runtime API dependency", { context: "body" }),
    positioningCta: h("View competitor positioning and evidence", { context: "cta" }),
    architectureCta: h("Read domain architecture governance", { context: "cta" }),
    internalLinksCta: h("Review internal hub-and-spoke link inventory", { context: "cta" }),
    internalDocsCta: h("See internal documentation ingestion status", { context: "cta" }),
    corpusSnapshotPrefix: h("Corpus snapshot", { context: "label" })
  },
  aboutData: {
    title: h("About Data", { context: "headline" }),
    intro: h(
      "Benchmark content is compiled from TeamStation internal research documentation stored in this repository, then exported as static pages.",
      { context: "body" }
    ),
    detail: h(
      "Inputs include research index metadata, extracted paper text, methodology mappings, and tagged evidence statements used across benchmark routes.",
      { context: "body" }
    ),
    currentCorpusPrefix: h("Current corpus", { context: "label" }),
    indexedDocsLabel: h("indexed internal documents", { context: "label" })
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
    subdomainTitle: h("Relevant subdomain subpages", { context: "headline" }),
    taxonomyTitle: h("Discovered taxonomy from subdomain URLs", { context: "headline" }),
    countriesLabel: h("Countries", { context: "label" }),
    rolesLabel: h("Roles", { context: "label" }),
    technologiesLabel: h("Technologies", { context: "label" })
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
    sandlerDecision: h("Decision", { context: "label" }),
    explorer: {
      searchLabel: h("Search", { context: "label" }),
      searchPlaceholder: h("Search title summary or tags", { context: "label" }),
      categoryLabel: h("Category", { context: "label" }),
      allCategories: h("All categories", { context: "label" }),
      sortLabel: h("Sort", { context: "label" }),
      sortScoreDesc: h("Score high to low", { context: "label" }),
      sortScoreAsc: h("Score low to high", { context: "label" }),
      sortUpdatedDesc: h("Most recent updates", { context: "label" }),
      sortTitleAsc: h("Title A to Z", { context: "label" }),
      showingPrefix: h("Showing", { context: "label" }),
      loadMore: h("Load more benchmarks", { context: "cta" })
    },
    matrixExplorer: {
      searchLabel: h("Search routes", { context: "label" }),
      searchPlaceholder: h("Search role country or technology", { context: "label" }),
      categoryLabel: h("Category", { context: "label" }),
      allCategories: h("All categories", { context: "label" }),
      sortLabel: h("Sort", { context: "label" }),
      sortRoleCountryTech: h("Role country technology", { context: "label" }),
      sortCategory: h("Category then path", { context: "label" }),
      showingPrefix: h("Showing", { context: "label" }),
      loadMore: h("Load more routes", { context: "cta" })
    }
  },
  internalDocs: {
    title: h("Internal Documentation Ingestion", { context: "headline" }),
    intro: h(
      "Benchmarks are generated from internal TeamStation research documents and extracted source files during build.",
      { context: "body" }
    ),
    corpusRecordsTitle: h("Corpus Records", { context: "headline" }),
    sourceDocumentsTitle: h("Source Documents", { context: "headline" }),
    generatedTitle: h("Generated", { context: "headline" }),
    indexedDocsTitle: h("Indexed Internal Documents", { context: "headline" }),
    openRecord: h("Open record", { context: "cta" }),
    backToIndex: h("Back to internal documents index", { context: "cta" }),
    sourcePrefix: h("Source", { context: "label" }),
    authorsLabel: h("authors", { context: "label" }),
    doiLabel: h("doi", { context: "label" }),
    sourceUrlLabel: h("source url", { context: "label" }),
    assetLabel: h("asset", { context: "label" }),
    idLabel: h("id", { context: "label" }),
    statusLabel: h("status", { context: "label" }),
    ingestedAtLabel: h("ingested", { context: "label" }),
    yearLabel: h("year", { context: "label" }),
    findingsLabel: h("findings", { context: "label" }),
    evidenceTitle: h("Evidence Snippets", { context: "headline" }),
    summaryTitle: h("Summary", { context: "headline" }),
    relevanceTitle: h("Methodology Relevance", { context: "headline" }),
    findingsTitle: h("Key Findings", { context: "headline" }),
    noSummary: h("Summary content is not yet mapped for this document.", { context: "body" }),
    noFindings: h("No curated key findings are mapped for this document yet.", { context: "body" }),
    noRelevance: h("Methodology relevance is not yet mapped for this document.", { context: "body" }),
    noInsights: h("No extracted snippet records are available yet for this document.", { context: "body" }),
    sourceDocumentTitle: h("Source Document Metadata", { context: "headline" }),
    searchLabel: h("Search papers", { context: "label" }),
    searchPlaceholder: h("Search title summary findings or id", { context: "label" }),
    statusFilterLabel: h("Status filter", { context: "label" }),
    allStatuses: h("All statuses", { context: "label" }),
    sortLabel: h("Sort", { context: "label" }),
    sortRecentIngested: h("Most recent ingestion", { context: "label" }),
    sortTitle: h("Title A to Z", { context: "label" }),
    showingPrefix: h("Showing", { context: "label" }),
    loadMore: h("Load more research records", { context: "cta" })
  },
  footer: {
    linksTitle: h("TeamStation Network Links", { context: "headline" }),
    trademarkTitle: h("Trademark Statement", { context: "headline" }),
    trademarkP1: h(
      "TeamStation AI is the proprietary platform of TeamStation Artificial Intelligence LLC. It operates as an AI driven service infrastructure built for creating, managing, and optimizing high performance nearshore IT teams.",
      { context: "body" }
    ),
    trademarkP2: h(
      "Unlike traditional vendor models, TeamStation AI combines real time human capacity analytics, predictive performance modeling, and compliance orchestration to deliver an outcome based nearshore model. The platform acts as a Nearshore IT Operations Copilot and gives fast decision visibility, strategic alignment, and predictable execution for CTO and CIO teams.",
      { context: "body" }
    ),
    trademarkP3: h(
      "Use of the TeamStation AI mark in commerce establishes and reinforces common law trademark rights under United States law.",
      { context: "body" }
    ),
    trademarkP4: h("All rights reserved. Unauthorized use is prohibited.", { context: "body" })
  }
};
