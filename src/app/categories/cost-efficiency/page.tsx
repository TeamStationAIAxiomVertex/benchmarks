import { BenchmarkExplorer } from "@/components/benchmark/BenchmarkExplorer";
import { byCategory } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

export default function CostEfficiencyPage() {
  const items = byCategory("cost-efficiency");
  return (
    <>
      <h1>{siteCopy.categories.cost.title}</h1>
      <p className="muted">{siteCopy.categories.cost.description}</p>
      <BenchmarkExplorer
        records={items}
        defaultCategory="cost-efficiency"
        lockCategory
        initialVisibleCount={60}
      />
    </>
  );
}
