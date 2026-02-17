import Link from "next/link";
import { benchmarks } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

export default function BenchmarksIndexPage() {
  const items = [...benchmarks].sort((a, b) => b.score - a.score);
  return (
    <>
      <h1>{siteCopy.benchmark.indexTitle}</h1>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="listItem">
            <strong>{item.title}</strong> ({item.score}) - <Link href={`/benchmarks/${item.id}/`}>{siteCopy.categories.openLink}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
