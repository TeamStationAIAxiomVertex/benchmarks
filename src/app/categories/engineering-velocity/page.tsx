import Link from "next/link";
import { byCategory } from "@/lib/benchmarksContent";

export default function EngineeringVelocityPage() {
  const items = byCategory("engineering-velocity").slice(0, 120);
  return (
    <>
      <h1>Engineering Velocity</h1>
      <p className="muted">Delivery speed and throughput benchmarks.</p>
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
