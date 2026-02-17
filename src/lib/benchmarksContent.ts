import benchmarksData from "@/data/benchmarks.json";

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

export const benchmarks: BenchmarkRecord[] = benchmarksData as BenchmarkRecord[];

export const categoryMeta: Record<BenchmarkCategory, { title: string; description: string }> = {
  "engineering-velocity": {
    title: "Engineering Velocity",
    description: "Delivery speed, cycle time, and throughput benchmarks."
  },
  "cost-efficiency": {
    title: "Cost Efficiency",
    description: "Unit economics and delivery cost benchmark comparisons."
  },
  "quality-reliability": {
    title: "Quality & Reliability",
    description: "Defect rate, stability, and recovery performance benchmarks."
  }
};

export const ecosystemLinks = [
  { href: "https://teamstation.dev", label: "TeamStation Hub" },
  { href: "https://cto.teamstation.dev", label: "CTO" },
  { href: "https://cio.teamstation.dev", label: "CIO" },
  { href: "https://docs.teamstation.dev", label: "Docs" },
  { href: "https://engineering.teamstation.dev", label: "Engineering" },
  { href: "https://research.teamstation.dev", label: "Research" }
];

export function byCategory(category: BenchmarkCategory): BenchmarkRecord[] {
  return benchmarks.filter((item) => item.category === category);
}
