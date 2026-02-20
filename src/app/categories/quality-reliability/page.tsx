import { BenchmarkExplorer } from "@/components/benchmark/BenchmarkExplorer";
import { byCategory } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

export default function QualityReliabilityPage() {
  const items = byCategory("quality-reliability");
  return (
    <>
      <h1>{siteCopy.categories.quality.title}</h1>
      <p className="muted">{siteCopy.categories.quality.description}</p>
      <BenchmarkExplorer
        records={items}
        defaultCategory="quality-reliability"
        lockCategory
        initialVisibleCount={60}
      />
    </>
  );
}
