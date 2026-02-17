import { writeFile } from "node:fs/promises";

const countArg = Number(process.argv[2] ?? 500);
const count = Number.isFinite(countArg) && countArg > 0 ? Math.floor(countArg) : 500;

const records = [];
for (let i = 1; i <= count; i += 1) {
  const id = `benchmark-${String(i).padStart(4, "0")}`;
  const score = 60 + (i % 41);
  const day = String((i % 28) + 1).padStart(2, "0");
  let category = i % 2 === 0 ? "engineering-velocity" : "cost-efficiency";
  if (i % 5 === 0) category = "quality-reliability";
  const model = i % 3 === 0 ? "gpt" : i % 3 === 1 ? "claude" : "gemini";

  records.push({
    id,
    title: `Benchmark ${String(i).padStart(4, "0")}`,
    metric: "Composite score",
    score,
    summary: `Synthetic static benchmark record ${i} for export-scale validation.`,
    source: "TeamStation benchmark harness",
    methodology: "Deterministic seeded content for static export.",
    lastUpdated: `2026-01-${day}`,
    category,
    tags: ["ai-coding", model]
  });
}

await writeFile("src/data/benchmarks.json", JSON.stringify(records, null, 2));
console.log(`Seeded ${count} benchmark records -> src/data/benchmarks.json`);
