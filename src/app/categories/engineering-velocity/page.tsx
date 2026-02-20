import { BenchmarkExplorer } from "@/components/benchmark/BenchmarkExplorer";
import { byCategory } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

export default function EngineeringVelocityPage() {
  const items = byCategory("engineering-velocity");
  return (
    <>
      <h1>{siteCopy.categories.engineering.title}</h1>
      <p className="muted">{siteCopy.categories.engineering.description}</p>
      <BenchmarkExplorer
        records={items}
        defaultCategory="engineering-velocity"
        lockCategory
        initialVisibleCount={60}
      />
    </>
  );
}
