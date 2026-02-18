import { discoveredTaxonomy } from "@/lib/internalLinkGraph";
import { writingHumanizer } from "@/lib/writingHumanizer";

export type MatrixBenchmarkPage = {
  role: string;
  country: string;
  technology: string;
  roleTitle: string;
  countryTitle: string;
  technologyTitle: string;
  category: "engineering-velocity" | "cost-efficiency" | "quality-reliability";
  tags: string[];
  path: string;
};

const countryPriority = [
  "mexico",
  "brazil",
  "colombia",
  "argentina",
  "chile",
  "peru",
  "costa-rica",
  "uruguay",
  "ecuador",
  "guatemala"
];

const rolePriority = [
  "backend-services",
  "frontend-web",
  "devops-cloud",
  "architecture-integrations",
  "data-ai",
  "qa-security",
  "databases",
  "mobile",
  "vetted-talent"
];

const technologyPriorityKeywords = [
  "python",
  "react",
  "nextjs",
  "node",
  "java",
  "aws",
  "kubernetes",
  "security",
  "data",
  "devops",
  "machine-learning",
  "llms"
];

function titleFromSlug(slug: string) {
  return writingHumanizer(
    slug
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    { context: "headline" }
  );
}

function categoryFromTechnology(technology: string): MatrixBenchmarkPage["category"] {
  const value = technology.toLowerCase();
  if (
    value.includes("security") ||
    value.includes("qa") ||
    value.includes("api-security") ||
    value.includes("penetration")
  ) {
    return "quality-reliability";
  }
  if (
    value.includes("data") ||
    value.includes("db") ||
    value.includes("warehouse") ||
    value.includes("snowflake") ||
    value.includes("cost")
  ) {
    return "cost-efficiency";
  }
  return "engineering-velocity";
}

function sortedByPriority(values: string[], priorityOrder: string[], keywordMode = false) {
  return [...values].sort((a, b) => {
    if (!keywordMode) {
      const ai = priorityOrder.indexOf(a);
      const bi = priorityOrder.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }

    const score = (value: string) =>
      priorityOrder.reduce((acc, key, idx) => (value.includes(key) ? acc + (priorityOrder.length - idx) : acc), 0);
    const sa = score(a);
    const sb = score(b);
    if (sa === sb) return a.localeCompare(b);
    return sb - sa;
  });
}

export function getBenchmarkMatrix(limit = 500): MatrixBenchmarkPage[] {
  const roles = sortedByPriority(discoveredTaxonomy.roles, rolePriority);
  const countries = sortedByPriority(discoveredTaxonomy.countries, countryPriority);
  const technologies = sortedByPriority(discoveredTaxonomy.technologies, technologyPriorityKeywords, true);

  const pages: MatrixBenchmarkPage[] = [];
  for (const role of roles) {
    for (const country of countries) {
      for (const technology of technologies) {
        const category = categoryFromTechnology(technology);
        pages.push({
          role,
          country,
          technology,
          roleTitle: titleFromSlug(role),
          countryTitle: titleFromSlug(country),
          technologyTitle: titleFromSlug(technology),
          category,
          tags: [role, country, technology, category, "nearshore", "ai-coding"],
          path: `/benchmarks/${role}/${country}/${technology}/`
        });
        if (pages.length >= limit) return pages;
      }
    }
  }
  return pages;
}

export function findMatrixPage(role: string, country: string, technology: string) {
  return getBenchmarkMatrix().find((item) => item.role === role && item.country === country && item.technology === technology);
}

