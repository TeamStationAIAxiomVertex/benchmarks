import { writingHumanizer } from "@/lib/writingHumanizer";

const h = writingHumanizer;

export const domainArchitecture = {
  version: h("1.0", { context: "label" }),
  organization: h("TeamStation AI", { context: "brand" }),
  primaryDomain: h("https://teamstation.dev", { context: "label" }),
  registry: [
    "https://www.teamstation.dev",
    "https://app.teamstation.dev",
    "https://hire.teamstation.dev",
    "https://cto.teamstation.dev",
    "https://cio.teamstation.dev",
    "https://docs.teamstation.dev",
    "https://engineering.teamstation.dev",
    "https://research.teamstation.dev",
    "https://articles.teamstation.dev",
    "https://insights.teamstation.dev",
    "https://partner.teamstation.dev",
    "https://jobs.teamstation.dev",
    "https://benchmarks.teamstation.dev"
  ].map((url) => h(url, { context: "label" })),
  purpose: h(
    "Formal canonical map for TeamStation domain boundaries, audience intent clusters, and governance constraints.",
    { context: "body" }
  ),
  rationale: [
    "Audience separation without brand fragmentation",
    "Independent SEO authority per intent cluster",
    "Security isolation between app, content, and hiring",
    "Scalable publishing velocity without cross contamination",
    "Clear mental models for users and search engines"
  ].map((item) => h(item, { context: "body" })),
  governance: [
    "All new initiatives must map to an existing subdomain or justify creation of a new one.",
    "Every new subdomain proposal requires audience definition, distinct intent, and non-overlapping semantics.",
    "Cross-subdomain links must reinforce topical ownership and avoid mixed-intent navigation."
  ].map((item) => h(item, { context: "body" }))
};

