import corpusData from "@/data/research-insights.json";

export type ResearchRecord = {
  id: string;
  sourceId?: string;
  sourceTitle: string;
  text: string;
  tags: string[];
};

type CorpusJson = {
  generatedAt: string;
  source?: string;
  count?: number;
  records: ResearchRecord[];
};

const corpus = corpusData as CorpusJson;

function isReadable(text: string): boolean {
  const value = text.trim();
  if (value.length < 80 || value.length > 280) return false;
  const lower = value.toLowerCase();

  const bannedPhrases = [
    "table of contents",
    "chapter ",
    "read pillar",
    "question:",
    "reality:",
    "doctrine:",
    "copyright",
    "isbn",
    "appendix",
    "authors",
    "preface"
  ];
  if (bannedPhrases.some((item) => lower.includes(item))) return false;

  if (/[{}<>\\]/.test(value)) return false;
  if (/[=_]{2,}/.test(value)) return false;
  if ((value.match(/:/g) ?? []).length > 1) return false;
  if ((value.match(/"/g) ?? []).length > 2) return false;

  const letters = value.replace(/[^a-zA-Z]/g, "");
  const upper = letters.replace(/[^A-Z]/g, "");
  if (letters.length > 0 && upper.length / letters.length > 0.28) return false;

  const words = value.split(/\s+/).filter(Boolean);
  return words.length >= 14 && words.length <= 44;
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function scoreRecord(record: ResearchRecord, tags: string[]): number {
  const lower = record.text.toLowerCase();
  let score = 0;
  for (const tag of tags) {
    const value = tag.toLowerCase();
    if (record.tags.includes(value)) score += 6;
    if (record.sourceTitle.toLowerCase().includes(value)) score += 2;
    if (lower.includes(value)) score += 2;
  }
  return score;
}

export function selectResearchSnippets(input: {
  seed: string;
  tags: string[];
  limit: number;
  used?: Set<string>;
}): ResearchRecord[] {
  const used = input.used ?? new Set<string>();
  const scored = corpus.records
    .filter((item) => !used.has(item.id))
    .filter((item) => isReadable(item.text))
    .map((item) => ({ item, score: scoreRecord(item, input.tags) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const pool = scored.slice(0, Math.max(input.limit * 8, 40)).map((item) => item.item);
  if (!pool.length) return [];

  const selected: ResearchRecord[] = [];
  let cursor = hashString(input.seed) % pool.length;
  while (selected.length < input.limit && selected.length < pool.length) {
    const candidate = pool[cursor % pool.length];
    if (!selected.find((item) => item.id === candidate.id)) {
      selected.push(candidate);
      used.add(candidate.id);
    }
    cursor += 7;
  }

  return selected;
}

export function sourceTitles(records: ResearchRecord[], limit = 8): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const record of records) {
    if (seen.has(record.sourceTitle)) continue;
    seen.add(record.sourceTitle);
    out.push(record.sourceTitle);
    if (out.length >= limit) break;
  }
  return out;
}

export function researchCorpusStats() {
  const uniqueSourceIds = new Set(
    corpus.records
      .map((item) => item.sourceId)
      .filter((item): item is string => typeof item === "string" && item.length > 0)
  );

  return {
    generatedAt: corpus.generatedAt,
    source: corpus.source ?? "internal",
    declaredCount: typeof corpus.count === "number" ? corpus.count : corpus.records.length,
    recordsCount: corpus.records.length,
    sourceCount: uniqueSourceIds.size
  };
}
