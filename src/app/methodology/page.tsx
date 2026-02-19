import { siteCopy } from "@/lib/siteCopy";
import { researchCorpusStats } from "@/lib/researchCorpus";
import Link from "next/link";

export default function MethodologyPage() {
  const stats = researchCorpusStats();
  return (
    <>
      <h1>{siteCopy.methodology.title}</h1>
      <p>{siteCopy.methodology.intro}</p>
      <p className="muted">
        Corpus snapshot: {stats.recordsCount} evidence records from {stats.sourceCount} internal documents, generated {stats.generatedAt}.
      </p>
      <ul>
        <li>{siteCopy.methodology.bullet1}</li>
        <li>{siteCopy.methodology.bullet2}</li>
        <li>{siteCopy.methodology.bullet3}</li>
      </ul>
      <p>
        <Link href="/methodology/positioning/">{siteCopy.methodology.positioningCta}</Link>
      </p>
      <p>
        <Link href="/methodology/architecture/">{siteCopy.methodology.architectureCta}</Link>
      </p>
      <p>
        <Link href="/methodology/internal-links/">{siteCopy.methodology.internalLinksCta}</Link>
      </p>
      <p>
        <Link href="/methodology/internal-docs/">{siteCopy.methodology.internalDocsCta}</Link>
      </p>
    </>
  );
}
