type HumanizerContext =
  | "brand"
  | "headline"
  | "body"
  | "metadata"
  | "cta"
  | "label";

type HumanizerOptions = {
  context?: HumanizerContext;
  profile?: "sclg_v2";
};

const replacements: Array<[RegExp, string]> = [
  [/\bDecision-grade\b/g, "Executive-grade"],
  [/\bExplore\b/g, "Review"],
  [/\bNo runtime API dependency\b/g, "Zero runtime API dependency"],
  [/\bbenchmarks are\b/gi, "we benchmark"]
];

export function writingHumanizer(input: string, options: HumanizerOptions = {}): string {
  const profile = options.profile ?? "sclg_v2";
  const context = options.context ?? "body";
  let value = input.trim().replace(/\s+/g, " ");

  for (const [pattern, replacement] of replacements) {
    value = value.replace(pattern, replacement);
  }

  if (profile === "sclg_v2") {
    value = value
      .replace(/[–—]/g, ", ")
      .replace(/\s-\s/g, ", ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  if (context === "headline" || context === "brand") {
    return value;
  }

  if (context === "metadata" && value.length > 160) {
    return `${value.slice(0, 157).trimEnd()}...`;
  }

  return value;
}
