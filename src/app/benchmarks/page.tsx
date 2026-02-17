import Link from "next/link";
import { benchmarks } from "@/lib/benchmarksContent";

export default function BenchmarksIndexPage() {
  const items = [...benchmarks].sort((a, b) => b.score - a.score);
  return (
    <>
      <h1>All Benchmarks</h1>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="listItem">
            <strong>{item.title}</strong> ({item.score}) - <Link href={`/benchmarks/${item.id}/`}>open</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
