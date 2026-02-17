import Link from "next/link";
import { categoryMeta } from "@/lib/benchmarksContent";
import { siteCopy } from "@/lib/siteCopy";

export default function CategoriesPage() {
  return (
    <>
      <h1>{siteCopy.categories.title}</h1>
      <div className="grid">
        {Object.entries(categoryMeta).map(([slug, meta]) => (
          <article key={slug} className="card">
            <h2>{meta.title}</h2>
            <p>{meta.description}</p>
            <Link href={`/categories/${slug}/`}>{siteCopy.categories.browseCategory}</Link>
          </article>
        ))}
      </div>
    </>
  );
}
