import { readFile } from "node:fs/promises";

const raw = await readFile("src/data/research-insights.json", "utf8");
const data = JSON.parse(raw);

if (!Array.isArray(data.records)) {
  console.error("Corpus verification failed: records array is missing.");
  process.exit(1);
}

const records = data.records;
if (records.length < 120) {
  console.error(`Corpus verification failed: expected at least 120 records, found ${records.length}.`);
  process.exit(1);
}

const sourceIds = new Set(records.map((r) => r.sourceId).filter(Boolean));
if (sourceIds.size < 8) {
  console.error(`Corpus verification failed: expected at least 8 source documents, found ${sourceIds.size}.`);
  process.exit(1);
}

const banned = [/p_\{/, /sum of x_i/i, /for all k/i, /\btable of contents\b/i, /\bquestion \*/i, /\breality \*/i, /\bdoctrine \*/i];
for (const rec of records) {
  const text = String(rec.text ?? "");
  if (text.length < 70) {
    console.error(`Corpus verification failed: short record text for ${rec.id}.`);
    process.exit(1);
  }
  if (banned.some((rule) => rule.test(text))) {
    console.error(`Corpus verification failed: banned fragment in ${rec.id}.`);
    process.exit(1);
  }
}

console.log(`Corpus verification passed: ${records.length} records across ${sourceIds.size} sources.`);
