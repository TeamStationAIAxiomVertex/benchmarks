type RiskLevel = "strong" | "watch" | "critical";

const labels: Record<RiskLevel, string> = {
  strong: "Strong Signal",
  watch: "Watch Risk",
  critical: "Critical Risk"
};

export function RiskIndicator({ level }: { level: RiskLevel }) {
  return <span className={`riskIndicator risk-${level}`}>{labels[level]}</span>;
}

export type { RiskLevel };

