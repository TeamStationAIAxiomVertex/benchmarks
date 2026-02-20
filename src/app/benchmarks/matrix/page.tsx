import { MatrixRouteExplorer } from "@/components/benchmark/MatrixRouteExplorer";
import { getBenchmarkMatrix } from "@/lib/benchmarkMatrix";
import { siteCopy } from "@/lib/siteCopy";

export default function BenchmarkMatrixIndexPage() {
  const pages = getBenchmarkMatrix(500);

  return (
    <>
      <h1>{siteCopy.benchmark.matrixIndexTitle}</h1>
      <p className="muted">{siteCopy.benchmark.matrixIndexSubtitle}</p>
      <MatrixRouteExplorer pages={pages} initialVisibleCount={80} />
    </>
  );
}
