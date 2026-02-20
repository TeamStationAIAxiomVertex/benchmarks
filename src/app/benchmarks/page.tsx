import Link from "next/link";
import { BenchmarkExplorer } from "@/components/benchmark/BenchmarkExplorer";
import { benchmarks } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

export default function BenchmarksIndexPage() {
  return (
    <>
      <h1>{siteCopy.benchmark.indexTitle}</h1>
      <p className="muted">
        <Link href="/benchmarks/matrix/">{siteCopy.benchmark.matrixIndexCta}</Link>
      </p>
      <BenchmarkExplorer records={benchmarks} initialVisibleCount={80} />
    </>
  );
}
