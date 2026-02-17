import benchmarksData from "@/data/benchmarks.json";
import { siteCopy } from "@/lib/siteCopy";
import { writingHumanizer } from "@/lib/writingHumanizer";

export const SITE_URL = "https://benchmarks.teamstation.dev";
export const ROOT_DOMAIN = "https://teamstation.dev";

export type BenchmarkCategory =
  | "engineering-velocity"
  | "cost-efficiency"
  | "quality-reliability";

export type BenchmarkRecord = {
  id: string;
  title: string;
  metric: string;
  score: number;
  summary: string;
  source: string;
  methodology: string;
  lastUpdated: string;
  category: BenchmarkCategory;
  tags: string[];
};

export const benchmarks: BenchmarkRecord[] = (benchmarksData as BenchmarkRecord[]).map((item) => ({
  ...item,
  title: writingHumanizer(item.title, { context: "headline" }),
  metric: writingHumanizer(item.metric, { context: "label" }),
  summary: writingHumanizer(item.summary, { context: "body" }),
  source: writingHumanizer(item.source, { context: "body" }),
  methodology: writingHumanizer(item.methodology, { context: "body" }),
  tags: item.tags.map((tag) => writingHumanizer(tag, { context: "label" }))
}));

export const categoryMeta: Record<BenchmarkCategory, { title: string; description: string }> = {
  "engineering-velocity": {
    title: siteCopy.categories.engineering.title,
    description: writingHumanizer("Delivery speed, cycle time, and throughput benchmarks.", { context: "body" })
  },
  "cost-efficiency": {
    title: siteCopy.categories.cost.title,
    description: writingHumanizer("Unit economics and delivery cost benchmark comparisons.", { context: "body" })
  },
  "quality-reliability": {
    title: siteCopy.categories.quality.title,
    description: writingHumanizer("Defect rate, stability, and recovery performance benchmarks.", { context: "body" })
  }
};

export const ecosystemLinks = [
  { href: "https://teamstation.dev", label: writingHumanizer("TeamStation Hub", { context: "label" }) },
  { href: "https://cto.teamstation.dev", label: writingHumanizer("CTO", { context: "label" }) },
  { href: "https://cio.teamstation.dev", label: writingHumanizer("CIO", { context: "label" }) },
  { href: "https://docs.teamstation.dev", label: writingHumanizer("Docs", { context: "label" }) },
  { href: "https://engineering.teamstation.dev", label: writingHumanizer("Engineering", { context: "label" }) },
  { href: "https://research.teamstation.dev", label: writingHumanizer("Research", { context: "label" }) }
];

export function byCategory(category: BenchmarkCategory): BenchmarkRecord[] {
  return benchmarks.filter((item) => item.category === category);
}
