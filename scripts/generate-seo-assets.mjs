import { readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://benchmarks.teamstation.dev";

const benchmarksRaw = await readFile("src/data/benchmarks.json", "utf8");
const benchmarks = JSON.parse(benchmarksRaw);

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

const countries = [
  "argentina",
  "brazil",
  "chile",
  "colombia",
  "costa-rica",
  "ecuador",
  "guatemala",
  "mexico",
  "peru",
  "uruguay"
];

const roles = [
  "frontend-web",
  "architecture-integrations",
  "backend-services",
  "devops-cloud",
  "vetted-talent",
  "databases",
  "data-ai",
  "qa-security",
  "mobile"
];

const technologies = [
  "react",
  "typescript",
  "nextjs",
  "angular",
  "vue",
  "pinia",
  "remix",
  "svelte",
  "web-accessibility",
  "rx-js",
  "graphql",
  "node",
  "java",
  "python",
  "golang",
  "c-sharp",
  "rust",
  "php",
  "kotlin",
  "scala",
  "erlang",
  "haskell",
  "elixir",
  "devops-engineering",
  "aws",
  "azure",
  "google-cloud",
  "kubernetes",
  "docker",
  "terraform",
  "ansible",
  "jenkins",
  "ci-cd",
  "prometheus",
  "grafana",
  "istio",
  "helm",
  "vault",
  "cloudformation",
  "gitops",
  "serverless",
  "axiom-cortex",
  "ef-core",
  "github-actions",
  "gitlab-ci",
  "argo-cd",
  "external-secrets",
  "nestjs",
  "fastify",
  "fastapi",
  "django",
  "spring-boot",
  "gin",
  "fiber",
  "ruby-on-rails",
  "laravel",
  "symfony",
  "mysql",
  "sql-server",
  "redis",
  "memcached",
  "kafka",
  "rabbitmq",
  "nats",
  "prisma",
  "typeorm",
  "sqlalchemy",
  "hibernate",
  "dotnet",
  "data-engineering",
  "etl-elt",
  "apache-spark",
  "dbt",
  "snowflake",
  "airbyte",
  "data-governance",
  "machine-learning",
  "data-warehousing",
  "power-bi",
  "tableau",
  "fivetran",
  "looker",
  "presto",
  "data-science",
  "llms",
  "pandas",
  "numpy",
  "cassandra",
  "dynamodb",
  "elasticsearch",
  "playwright",
  "cypress",
  "qa-automation",
  "security-engineering",
  "penetration-testing",
  "jest",
  "vitest",
  "microservices",
  "grpc",
  "rest-api-design",
  "event-sourcing",
  "domain-driven-design",
  "message-queues",
  "api-gateway",
  "system-design",
  "api-security",
  "react-native",
  "flutter"
];

function sortedByPriority(values, priorityOrder, keywordMode = false) {
  return [...values].sort((a, b) => {
    if (!keywordMode) {
      const ai = priorityOrder.indexOf(a);
      const bi = priorityOrder.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }

    const score = (value) =>
      priorityOrder.reduce((acc, key, idx) => (value.includes(key) ? acc + (priorityOrder.length - idx) : acc), 0);
    const sa = score(a);
    const sb = score(b);
    if (sa === sb) return a.localeCompare(b);
    return sb - sa;
  });
}

function matrixRoutes(limit = 500) {
  const out = [];
  const sortedRoles = sortedByPriority(roles, rolePriority);
  const sortedCountries = sortedByPriority(countries, countryPriority);
  const sortedTechnologies = sortedByPriority(technologies, technologyPriorityKeywords, true);

  for (const technology of sortedTechnologies) {
    for (const country of sortedCountries) {
      for (const role of sortedRoles) {
        out.push(`/benchmarks/${role}/${country}/${technology}/`);
        if (out.length >= limit) return out;
      }
    }
  }
  return out;
}

const staticRoutes = [
  "/",
  "/benchmarks/",
  "/benchmarks/matrix/",
  "/categories/",
  "/categories/engineering-velocity/",
  "/categories/cost-efficiency/",
  "/categories/quality-reliability/",
  "/methodology/",
  "/methodology/positioning/",
  "/methodology/architecture/",
  "/methodology/internal-links/",
  "/methodology/internal-docs/",
  "/about-data/",
  "/faq/",
  "/trust/"
];

const benchmarkRoutes = benchmarks.map((item) => `/benchmarks/record/${item.id}/`);
const urls = [...staticRoutes, ...benchmarkRoutes, ...matrixRoutes(500)];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
  .join("\n")}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

await writeFile("public/sitemap.xml", sitemap, "utf8");
await writeFile("public/robots.txt", robots, "utf8");

console.log(`Generated SEO assets for ${urls.length} routes`);
