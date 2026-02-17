import { readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://benchmarks.teamstation.dev";

const benchmarksRaw = await readFile("src/data/benchmarks.json", "utf8");
const benchmarks = JSON.parse(benchmarksRaw);

const staticRoutes = [
  "/",
  "/categories/",
  "/categories/engineering-velocity/",
  "/categories/cost-efficiency/",
  "/categories/quality-reliability/",
  "/methodology/",
  "/about-data/",
  "/faq/",
  "/trust/"
];

const benchmarkRoutes = benchmarks.map((item) => `/benchmarks/${item.id}/`);
const urls = [...staticRoutes, ...benchmarkRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
  .join("\n")}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

await writeFile("public/sitemap.xml", sitemap, "utf8");
await writeFile("public/robots.txt", robots, "utf8");

console.log(`Generated SEO assets for ${urls.length} routes`);
