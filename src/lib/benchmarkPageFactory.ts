import type { MatrixBenchmarkPage } from "@/lib/benchmarkMatrix";
import { writingHumanizer } from "@/lib/writingHumanizer";

type Section = {
  heading: string;
  subheading: string;
  paragraphs: string[];
};

const TARGET_WORDS = 2000;

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function paragraph(page: MatrixBenchmarkPage, variant: number) {
  const base = [
    `This benchmark page is built for executive planning where ${page.roleTitle} execution in ${page.countryTitle} is measured against delivery expectations for ${page.technologyTitle} programs.`,
    `The model tracks throughput, defect pressure, and economic efficiency so leadership can choose a sourcing motion with less ambiguity and tighter control over delivery outcomes.`,
    `For this route we evaluate the operating condition of nearshore teams when technical stack choices and team role boundaries are applied in live sprint cadences rather than static staffing assumptions.`,
    `The benchmark emphasizes repeatable field conditions including onboarding latency, code review load, incident recovery behavior, and coordination overhead under growing roadmap pressure.`,
    `Each section ties role fit, country level execution dynamics, and technology specific complexity to measurable decision criteria so procurement and engineering leadership can align on one evaluation language.`,
    `The output is intentionally practical so a CTO or CIO can map this page directly to budget cycles, vendor governance, and quality guardrails without translating generic market claims.`,
    `Benchmark interpretation is linked to comparable TeamStation research surfaces and operational pages so this route contributes to a structured knowledge mesh across the wider domain architecture.`,
    `Decision makers can use this benchmark as a baseline signal before allocating production ownership, compliance accountability, and reliability targets to a nearshore delivery unit.`
  ];

  return writingHumanizer(base[variant % base.length], { context: "body" });
}

function buildSections(page: MatrixBenchmarkPage): Section[] {
  const sections: Section[] = [
    {
      heading: writingHumanizer("Executive Benchmark Signal", { context: "headline" }),
      subheading: writingHumanizer("What this role country technology route is measuring", { context: "headline" }),
      paragraphs: Array.from({ length: 8 }, (_, i) => paragraph(page, i))
    },
    {
      heading: writingHumanizer("Performance Model", { context: "headline" }),
      subheading: writingHumanizer("Throughput quality and cost behavior under load", { context: "headline" }),
      paragraphs: Array.from({ length: 8 }, (_, i) => paragraph(page, i + 2))
    },
    {
      heading: writingHumanizer("Operating Risk and Control", { context: "headline" }),
      subheading: writingHumanizer("Failure patterns governance pressure and reliability exposure", { context: "headline" }),
      paragraphs: Array.from({ length: 8 }, (_, i) => paragraph(page, i + 4))
    },
    {
      heading: writingHumanizer("Implementation Blueprint", { context: "headline" }),
      subheading: writingHumanizer("How leadership teams convert this benchmark into execution", { context: "headline" }),
      paragraphs: Array.from({ length: 8 }, (_, i) => paragraph(page, i + 6))
    }
  ];

  let total = wordCount(
    `${page.roleTitle} ${page.countryTitle} ${page.technologyTitle} ${sections
      .flatMap((section) => [section.heading, section.subheading, ...section.paragraphs])
      .join(" ")}`
  );

  let variant = 0;
  while (total < TARGET_WORDS) {
    const idx = variant % sections.length;
    const next = paragraph(page, variant + 10);
    sections[idx].paragraphs.push(next);
    total += wordCount(next);
    variant += 1;
  }

  return sections;
}

export function buildBenchmarkLongForm(page: MatrixBenchmarkPage) {
  const sections = buildSections(page);
  const allText = sections
    .flatMap((section) => [section.heading, section.subheading, ...section.paragraphs])
    .join(" ");
  const words = wordCount(allText);
  return { sections, words };
}
