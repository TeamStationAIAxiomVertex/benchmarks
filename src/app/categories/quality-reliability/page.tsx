import Link from "next/link";
import { byCategory } from "@/lib/benchmarksContent";

export default function QualityReliabilityPage() {
  const items = byCategory("quality-reliability").slice(0, 120);
  return (
    <>
      <h1>Quality & Reliability</h1>
      <p className="muted">Stability and defect outcomes benchmarks.</p>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="listItem">
            <strong>{item.title}</strong> ({item.score}) - <Link href={`/benchmarks/${item.id}/`}>details</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
