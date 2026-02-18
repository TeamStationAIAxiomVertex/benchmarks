import Link from "next/link";
import { byCategory } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

export default function EngineeringVelocityPage() {
  const items = byCategory("engineering-velocity").slice(0, 120);
  return (
    <>
      <h1>{siteCopy.categories.engineering.title}</h1>
      <p className="muted">{siteCopy.categories.engineering.description}</p>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="listItem">
            <strong>{item.title}</strong> ({item.score}) - <Link href={`/benchmarks/record/${item.id}/`}>{siteCopy.categories.detailLink}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
