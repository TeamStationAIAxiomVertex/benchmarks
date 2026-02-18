import Link from "next/link";
import { getBenchmarkMatrix } from "@/lib/benchmarkMatrix";
import { siteCopy } from "@/lib/siteCopy";

export default function BenchmarkMatrixIndexPage() {
  const pages = getBenchmarkMatrix(500);

  return (
    <>
      <h1>{siteCopy.benchmark.matrixIndexTitle}</h1>
      <p className="muted">{siteCopy.benchmark.matrixIndexSubtitle}</p>
      <ul className="list">
        {pages.map((item) => (
          <li key={item.path} className="listItem">
            <strong>{`${item.roleTitle} | ${item.countryTitle} | ${item.technologyTitle}`}</strong>
            <br />
            <Link href={item.path}>{item.path}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
