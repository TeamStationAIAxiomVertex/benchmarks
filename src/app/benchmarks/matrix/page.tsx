import Link from "next/link";
import { MatrixRouteExplorer } from "@/components/benchmark/MatrixRouteExplorer";
import { getBenchmarkMatrix } from "@/lib/benchmarkMatrix";
import { siteCopy } from "@/lib/siteCopy";

export default function BenchmarkMatrixIndexPage() {
  const pages = getBenchmarkMatrix(500);
  const topRoles = Array.from(new Set(pages.map((item) => item.role))).slice(0, 10);
  const topCountries = Array.from(new Set(pages.map((item) => item.country))).slice(0, 10);

  return (
    <>
      <h1>{siteCopy.benchmark.matrixIndexTitle}</h1>
      <p className="muted">{siteCopy.benchmark.matrixIndexSubtitle}</p>
      <section className="card" style={{ marginBottom: "1rem" }}>
        <h2>{siteCopy.benchmark.matrixExplorer.roleShortcutsTitle}</h2>
        <p>
          {topRoles.map((role) => (
            <Link key={role} href={`/benchmarks/matrix/?q=${encodeURIComponent(role)}`} className="pill">
              {role}
            </Link>
          ))}
        </p>
        <h2>{siteCopy.benchmark.matrixExplorer.countryShortcutsTitle}</h2>
        <p>
          {topCountries.map((country) => (
            <Link key={country} href={`/benchmarks/matrix/?q=${encodeURIComponent(country)}`} className="pill">
              {country}
            </Link>
          ))}
        </p>
      </section>
      <MatrixRouteExplorer pages={pages} initialVisibleCount={80} />
    </>
  );
}
