import Link from "next/link";
import { byCategory } from "@/lib/benchmarksContent";

export default function CostEfficiencyPage() {
  const items = byCategory("cost-efficiency").slice(0, 120);
  return (
    <>
      <h1>Cost Efficiency</h1>
      <p className="muted">Cost control and unit economics benchmarks.</p>
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
