import Link from "next/link";
import { categoryMeta } from "@/lib/benchmarksContent";

export default function CategoriesPage() {
  return (
    <>
      <h1>Benchmark Categories</h1>
      <div className="grid">
        {Object.entries(categoryMeta).map(([slug, meta]) => (
          <article key={slug} className="card">
            <h2>{meta.title}</h2>
            <p>{meta.description}</p>
            <Link href={`/categories/${slug}/`}>Browse category</Link>
          </article>
        ))}
      </div>
    </>
  );
}
