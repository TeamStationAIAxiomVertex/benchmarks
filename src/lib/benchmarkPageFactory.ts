import type { MatrixBenchmarkPage } from "@/lib/benchmarkMatrix";
import { selectResearchSnippets, sourceTitles, type ResearchRecord } from "@/lib/researchCorpus";
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

const categoryLens: Record<MatrixBenchmarkPage["category"], string> = {
  "engineering-velocity": "delivery speed, flow stability, and planning confidence",
  "cost-efficiency": "unit economics, waste control, and margin reliability",
  "quality-reliability": "defect prevention, incident recovery, and reliability discipline"
};

function h(text: string) {
  return writingHumanizer(text, { context: "body" });
}

function evidenceLine(
  record: ResearchRecord,
  roleTitle: string,
  countryTitle: string,
  technologyTitle: string,
  index: number
) {
  const normalized = record.text.replace(/\s+/g, " ").trim();
  const firstSentence = normalized.split(/(?<=[.!?])\s+/)[0] ?? normalized;
  const joins = [
    `For ${roleTitle} teams in ${countryTitle} running ${technologyTitle} programs, this signal is directly tied to operating reliability.`,
    `In this benchmark route, the implication is practical: leadership can map this evidence to ownership and control decisions.`,
    `This finding maps to production behavior, not theory, and should be used in weekly execution reviews.`
  ];
  return h(`${firstSentence} ${joins[index % joins.length]} Source: ${record.sourceTitle}.`);
}

function buildSection(args: {
  page: MatrixBenchmarkPage;
  sectionId: string;
  heading: string;
  subheading: string;
  tags: string[];
  framing: string[];
  used: Set<string>;
}): Section {
  const { page, sectionId, heading, subheading, tags, framing, used } = args;
  const evidence = selectResearchSnippets({
    seed: `${page.path}${sectionId}`,
    tags,
    limit: 6,
    used
  });

  const paragraphs = [
    ...framing,
    ...evidence.map((item, idx) => evidenceLine(item, page.roleTitle, page.countryTitle, page.technologyTitle, idx))
  ];

  return {
    heading: writingHumanizer(heading, { context: "headline" }),
    subheading: writingHumanizer(subheading, { context: "headline" }),
    paragraphs
  };
}

function buildSections(page: MatrixBenchmarkPage): Section[] {
  const lens = categoryLens[page.category];
  const usedEvidence = new Set<string>();

  const executive = buildSection({
    page,
    sectionId: "executive",
    heading: "Executive Benchmark Signal",
    subheading: "What this role country technology route is measuring",
    tags: [page.category, page.role, page.country, page.technology, "talent", "latam", "governance"],
    framing: [
      h(`This benchmark evaluates ${page.roleTitle} delivery in ${page.countryTitle} for ${page.technologyTitle} using one executive lens: ${lens}.`),
      h(`The page is designed for CTO and CIO decision cycles where vendor claims must be replaced by operating evidence that can be audited and repeated.`),
      h(`Decision trigger: if this benchmark signal is weak, leadership should hold scale decisions and reset ownership controls before expanding roadmap commitments.`),
      h(`The core objective is to remove ambiguity between engineering leadership, finance, and procurement by using one language for throughput, risk, and cost behavior.`),
      h(`This route is interpreted as a live production signal, not interview theater, and not presentation metrics detached from real sprint execution.`)
    ],
    used: usedEvidence
  });

  const performance = buildSection({
    page,
    sectionId: "performance",
    heading: "Performance Model",
    subheading: "Throughput quality and cost behavior under load",
    tags: [page.category, page.technology, page.role, "engineering-velocity", "ai-augmented", "talent"],
    framing: [
      h(`Performance scoring starts with output integrity: committed work must ship without rollback loops, avoidable rework, or hidden dependency debt.`),
      h(`For ${page.technologyTitle}, we test whether delivery speed holds when release pressure rises and review load increases.`),
      h(`For ${page.roleTitle}, we measure ownership continuity from planning to production stabilization, not isolated task completion.`),
      h(`For ${page.countryTitle}, we evaluate handoff quality, escalation latency, and cross team alignment under shared delivery windows.`),
      h(`Leadership should treat this section as a capacity truth layer that separates temporary output spikes from durable execution capability.`)
    ],
    used: usedEvidence
  });

  const risk = buildSection({
    page,
    sectionId: "risk",
    heading: "Operating Risk and Control",
    subheading: "Failure patterns governance pressure and reliability exposure",
    tags: ["quality-reliability", "governance", page.technology, page.role, page.country],
    framing: [
      h(`Risk analysis focuses on where delivery fails in expensive ways: silent quality decay, incident recurrence, and weak accountability during escalations.`),
      h(`Control quality is judged by traceable decisions, enforceable standards, and recovery performance after failure, not by policy volume.`),
      h(`In ${page.technologyTitle} programs, weak control signals usually surface as rollback patterns, delayed root cause closure, and rising operational friction.`),
      h(`In ${page.countryTitle} execution models, the risk question is whether communication rhythm protects reliability during production stress.`),
      h(`For ${page.roleTitle}, the risk question is whether ownership remains intact when cross functional dependencies become constrained.`)
    ],
    used: usedEvidence
  });

  const implementation = buildSection({
    page,
    sectionId: "implementation",
    heading: "Implementation Blueprint",
    subheading: "How leadership teams convert this benchmark into execution",
    tags: [page.category, "governance", "talent", page.role, page.technology],
    framing: [
      h(`Implementation starts with a ninety day operating plan that sets benchmark thresholds for cycle reliability, incident response, and quality gates.`),
      h(`Each threshold requires a named owner, a review cadence, and a trigger action so leadership decisions stay executable.`),
      h(`For ${page.roleTitle} structures, clarify who owns architecture choices, release quality, and post release accountability.`),
      h(`For ${page.countryTitle} collaboration, enforce overlap windows and escalation routes that reduce decision latency during production windows.`),
      h(`For ${page.technologyTitle}, lock guardrails for code review quality, testing standards, and deploy readiness before any scaling decision.`)
    ],
    used: usedEvidence
  });

  const decision = buildSection({
    page,
    sectionId: "decision",
    heading: "Decision Framework",
    subheading: "How leadership should act on this benchmark signal",
    tags: [page.category, "governance", "cost-efficiency", "engineering-velocity", "quality-reliability"],
    framing: [
      h(`Green signal means the delivery unit can absorb more scope without degrading reliability or cost discipline.`),
      h(`Watch signal means leadership should execute targeted remediation in the next cycle with explicit owners and deadlines.`),
      h(`Critical signal means pause scale, review operating design, and resolve root constraints before additional commitments are signed.`),
      h(`Decision hygiene is strongest when benchmark movement is reviewed weekly and translated into staffing, architecture, and governance actions.`),
      h(`This framework is built for real executive use where decisions need short action windows and measurable outcomes.`)
    ],
    used: usedEvidence
  });

  const appendixEvidence = selectResearchSnippets({
    seed: `${page.path}appendix`,
    tags: [page.category, page.role, page.country, page.technology, "latam", "ai-augmented", "talent"],
    limit: 10,
    used: usedEvidence
  });
  const sources = sourceTitles(appendixEvidence, 10);

  const appendix: Section = {
    heading: writingHumanizer("Evidence Appendix", { context: "headline" }),
    subheading: writingHumanizer("Research signals and citation anchors used in this benchmark", { context: "headline" }),
    paragraphs: [
      h(`This benchmark route is grounded in TeamStation research papers, doctrine material, and the platforming book with evidence selected for ${page.roleTitle}, ${page.countryTitle}, and ${page.technologyTitle}.`),
      ...appendixEvidence.map((item) => {
        const normalized = item.text.replace(/\s+/g, " ").trim();
        const firstSentence = normalized.split(/(?<=[.!?])\s+/)[0] ?? normalized;
        return h(`${firstSentence} Source: ${item.sourceTitle}.`);
      }),
      h(`Primary sources used for this page include: ${sources.join("; ")}.`),
      h(`Leadership should treat these references as operating evidence inputs for sourcing decisions, governance calibration, and delivery risk controls.`)
    ]
  };

  return [executive, performance, risk, implementation, decision, appendix];
}

function expansionParagraph(page: MatrixBenchmarkPage, idx: number) {
  const controls = [
    "decision latency",
    "handoff clarity",
    "release discipline",
    "incident recovery",
    "scope control",
    "quality gate enforcement"
  ];
  const outcomes = [
    "planning confidence",
    "cost predictability",
    "production stability",
    "defect containment",
    "delivery throughput",
    "governance transparency"
  ];

  const control = controls[idx % controls.length];
  const outcome = outcomes[idx % outcomes.length];

  return h(
    `Operational checkpoint ${idx + 1}: leadership should track ${control} against ${outcome} for ${page.roleTitle} teams in ${page.countryTitle} on ${page.technologyTitle}, then convert variance into a named remediation action in the next review cycle.`
  );
}

export function buildBenchmarkLongForm(page: MatrixBenchmarkPage) {
  const sections = buildSections(page);

  let total = wordCount(
    sections
      .flatMap((section) => [section.heading, section.subheading, ...section.paragraphs])
      .join(" ")
  );

  let idx = 0;
  while (total < TARGET_WORDS) {
    const extra = expansionParagraph(page, idx);
    sections[sections.length - 1].paragraphs.push(extra);
    total += wordCount(extra);
    idx += 1;
  }

  return { sections, words: total };
}

type RecordLike = {
  title: string;
  category: "engineering-velocity" | "cost-efficiency" | "quality-reliability";
  tags: string[];
};

export function buildRecordLongForm(record: RecordLike) {
  const techTag = record.tags.find((tag) =>
    ["react", "nextjs", "node", "python", "java", "golang", "kubernetes", "aws", "azure"].includes(tag.toLowerCase())
  );
  const pseudoPage: MatrixBenchmarkPage = {
    role: "vetted-talent",
    country: "latam",
    technology: techTag ?? "software-delivery",
    roleTitle: writingHumanizer("Vetted Talent", { context: "headline" }),
    countryTitle: writingHumanizer("LATAM", { context: "headline" }),
    technologyTitle: writingHumanizer((techTag ?? "software-delivery").replace(/-/g, " "), { context: "headline" }),
    category: record.category,
    tags: record.tags,
    path: "/benchmarks/record/"
  };

  return buildBenchmarkLongForm(pseudoPage);
}
