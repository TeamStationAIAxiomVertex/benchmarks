import type { BenchmarkRecord } from "@/lib/benchmarksContent";
import { writingHumanizer } from "@/lib/writingHumanizer";

export type SandlerIntent = {
  pain: string;
  impact: string;
  future: string;
  decision: string;
};

const h = writingHumanizer;

export function sandlerIntentForBenchmark(benchmark: BenchmarkRecord): SandlerIntent {
  return {
    pain: h(
      `Current benchmark signal shows a risk pattern in ${benchmark.category} for teams using ${benchmark.metric.toLowerCase()} as the main operating lens.`,
      { context: "body" }
    ),
    impact: h(
      `If this pattern remains unresolved, teams absorb avoidable cost, delivery drag, and governance friction that compounds across six month planning cycles.`,
      { context: "body" }
    ),
    future: h(
      `A stronger operating state is available when leaders align hiring quality, engineering execution, and accountability controls to evidence based benchmark thresholds.`,
      { context: "body" }
    ),
    decision: h(
      `Decision trigger is simple, use this benchmark as an operating gate and route execution through role, country, and technology pathways that pass the threshold.`,
      { context: "body" }
    )
  };
}

