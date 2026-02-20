import researchIndex from "../../research/index.json";
import researchInsights from "@/data/research-insights.json";

export type ResearchDocument = {
  id: string;
  title: string;
  authors?: string[];
  year?: number | null;
  doi?: string | null;
  source_url?: string | null;
  asset_url?: string | null;
  summary?: string | null;
  key_findings?: string[];
  methodology_relevance?: string | null;
  status?: string;
  ingested_at?: string;
};

type InsightRecord = {
  id: string;
  sourceId?: string;
  sourceTitle: string;
  text: string;
  tags: string[];
};

type InsightsJson = {
  records: InsightRecord[];
};

const documents = (researchIndex as ResearchDocument[]).map((item) => ({
  ...item,
  key_findings: item.key_findings ?? []
}));

const insights = (researchInsights as InsightsJson).records;

export const researchDocuments = [...documents].sort((a, b) => a.title.localeCompare(b.title));

export function getResearchDocument(id: string): ResearchDocument | undefined {
  return researchDocuments.find((item) => item.id === id);
}

export function insightsForResearchDocument(id: string, limit = 16): InsightRecord[] {
  return insights.filter((item) => item.sourceId === id).slice(0, limit);
}

export function statusSummaryForResearchDocuments() {
  const summary = new Map<string, number>();
  for (const doc of researchDocuments) {
    const status = doc.status ?? "unknown";
    summary.set(status, (summary.get(status) ?? 0) + 1);
  }
  return Array.from(summary.entries())
    .map(([status, count]) => ({ status, count }))
    .sort((a, b) => b.count - a.count);
}
