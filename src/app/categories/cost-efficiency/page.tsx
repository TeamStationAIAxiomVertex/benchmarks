import Link from "next/link";
import { byCategory } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

export default function CostEfficiencyPage() {
  const items = byCategory("cost-efficiency").slice(0, 120);
  return (
    <>
      <h1>{siteCopy.categories.cost.title}</h1>
      <p className="muted">{siteCopy.categories.cost.description}</p>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="listItem">
            <strong>{item.title}</strong> ({item.score}) - <Link href={`/benchmarks/${item.id}/`}>{siteCopy.categories.detailLink}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
