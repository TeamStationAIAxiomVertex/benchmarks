import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const INDEX_PATH = path.join(ROOT, "research", "index.json");
const OUTPUT_PATH = path.join(ROOT, "src", "data", "research-insights.json");

const keywordTags = {
  "engineering-velocity": ["velocity", "throughput", "cycle", "flow", "sprint", "handoff", "delivery", "latency"],
  "cost-efficiency": ["cost", "economic", "budget", "margin", "efficiency", "wage", "pricing", "unit economics"],
  "quality-reliability": ["quality", "defect", "reliability", "incident", "stability", "recovery", "failure"],
  governance: ["governance", "control", "audit", "policy", "accountability", "decision"],
  talent: ["talent", "hiring", "candidate", "engineer", "assessment", "psychometric", "alignment"],
  "ai-augmented": ["ai", "augmented", "automation", "model", "agent", "cortex"],
  latam: ["latam", "nearshore", "mexico", "argentina", "brazil", "colombia", "chile", "peru", "uruguay", "ecuador", "guatemala", "costa rica"]
};

const banned = [
  "table of contents",
  "copyright",
  "all rights reserved",
  "isbn",
  "page ",
  "=== page",
  "preface",
  "authors",
  "corresponding author",
  "abstract",
  "skip to content",
  "question",
  "reality",
  "doctrine"
];

const sourceTitleOverrides = {
  "platforming-the-nearshore-it-industry-book-1": "Platforming the Nearshore IT Staff Augmentation Industry",
  "ssrn-5165433": "Redesigning Human Capacity in Nearshore IT Staff Augmentation",
  "ssrn-5188490": "Nearshore Platformed: AI and Industry Transformation",
  "ssrn-5253470": "Redefining Software Engineer Performance in the AI Augmented Era",
  "ssrn-5433397": "AxiomCortex Scientific R and D Report",
  "ssrn-5433476": "AxiomCortex Scientific R and D Report",
  "ssrn-5745463": "AI and Nearshore Teams: Who Gets Replaced and Why",
  "engineering-doctrine-research-team-topologies": "Engineering Doctrine and Team Topologies"
};

function normalize(text) {
  return text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function splitSentences(text) {
  return normalize(text).split(/(?<=[.!?])\s+(?=[A-Z0-9])/g).map((x) => x.trim());
}

function cleanSentence(input) {
  return normalize(input)
    .replace(/^[-*•\d.\s]+/, "")
    .replace(/\(\s*\d{4}\s*to\s*\d{4}\s*\)/gi, "")
    .replace(/\s*\[[0-9]+\]\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'")
    .trim();
}

function readable(sentence) {
  if (!sentence) return false;
  if (sentence.length < 75 || sentence.length > 260) return false;

  const lower = sentence.toLowerCase();
  if (banned.some((p) => lower.includes(p))) return false;
  if (/^[0-9\s\-.:]+$/.test(sentence)) return false;
  if ((sentence.match(/:/g) ?? []).length > 1) return false;
  if ((sentence.match(/[A-Z]/g) ?? []).length > sentence.length * 0.25) return false;
  if (/\b\d+\.\d+\b/.test(sentence)) return false;
  if (/\b(introduction|what we study|table of contents|chapter)\b/i.test(sentence)) return false;
  if (/\b(appendix|figure|table|equation|venue|distribution)\b/i.test(sentence)) return false;
  if (/[{}_^=]/.test(sentence)) return false;
  if (/[|]/.test(sentence)) return false;
  if (/\b(for all k|minus p_|sum of x_i|less than or equal)\b/i.test(sentence)) return false;
  if (/\b[A-Z]{4,}\b/.test(sentence)) return false;
  if (/\?.{0,}$/g.test(sentence)) return false;

  const words = sentence.split(/\s+/).filter(Boolean);
  if (words.length < 12 || words.length > 42) return false;
  const numberTokens = words.filter((w) => /^\d+([.,]\d+)?$/.test(w));
  if (numberTokens.length > 1) return false;
  if (!/\b(is|are|was|were|improves|reduces|increases|enables|predicts|supports|drives|requires|links)\b/i.test(sentence)) {
    return false;
  }

  return true;
}

function tagsFor(text) {
  const lower = text.toLowerCase();
  const tags = [];
  for (const [tag, keywords] of Object.entries(keywordTags)) {
    if (keywords.some((k) => lower.includes(k))) tags.push(tag);
  }
  if (!tags.length) tags.push("general");
  return tags;
}

function uniqueByText(records) {
  const seen = new Set();
  const out = [];
  for (const rec of records) {
    const key = rec.text.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(rec);
  }
  return out;
}

async function loadExtractedText(doc) {
  const rel = doc?.extraction?.extracted_text_path;
  if (!rel) return "";
  const abs = path.join(ROOT, rel);
  try {
    return await readFile(abs, "utf8");
  } catch {
    return "";
  }
}

function collectDocSnippets(doc, extractedText) {
  const snippets = [];

  for (const finding of doc.key_findings ?? []) {
    const sentence = cleanSentence(finding);
    if (readable(sentence)) snippets.push(sentence);
  }

  if (doc.methodology_relevance) {
    for (const s of splitSentences(doc.methodology_relevance)) {
      const sentence = cleanSentence(s);
      if (readable(sentence)) snippets.push(sentence);
    }
  }

  if (doc.summary) {
    for (const s of splitSentences(doc.summary).slice(0, 8)) {
      const sentence = cleanSentence(s);
      if (readable(sentence)) snippets.push(sentence);
    }
  }

  if (extractedText) {
    for (const s of splitSentences(extractedText)) {
      const sentence = cleanSentence(s);
      if (readable(sentence)) snippets.push(sentence);
      if (snippets.length >= 24) break;
    }
  }

  return snippets.slice(0, 18);
}

const docs = JSON.parse(await readFile(INDEX_PATH, "utf8"));

const all = [];
for (const doc of docs) {
  const extracted = await loadExtractedText(doc);
  const snippets = collectDocSnippets(doc, extracted);
  const sourceTitle = sourceTitleOverrides[doc.id] ?? doc.title;
  for (const [i, text] of snippets.entries()) {
    all.push({
      id: `${doc.id}-insight-${String(i + 1).padStart(2, "0")}`,
      sourceId: doc.id,
      sourceTitle,
      text,
      tags: tagsFor(`${sourceTitle} ${text}`)
    });
  }
}

const records = uniqueByText(all);

const output = {
  generatedAt: new Date().toISOString().slice(0, 10),
  source: "research/index.json + research/extracted/*",
  count: records.length,
  records
};

await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf8");
console.log(`Generated ${records.length} research insights -> ${path.relative(ROOT, OUTPUT_PATH)}`);
