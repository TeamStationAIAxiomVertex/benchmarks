import { siteCopy } from "@/lib/siteCopy";
import { researchCorpusStats } from "@/lib/researchCorpus";

export default function AboutDataPage() {
  const stats = researchCorpusStats();
  return (
    <>
      <h1>{siteCopy.aboutData.title}</h1>
      <p>{siteCopy.aboutData.intro}</p>
      <p className="muted">{siteCopy.aboutData.detail}</p>
      <p className="muted">
        {siteCopy.aboutData.currentCorpusPrefix}: {stats.recordsCount} records from {stats.sourceCount} {siteCopy.aboutData.indexedDocsLabel}.
      </p>
    </>
  );
}
