import { RiskIndicator, type RiskLevel } from "@/components/benchmark/RiskIndicator";

function splitContent(paragraphs: string[]) {
  const overview = paragraphs[0] ?? "";
  const keySignals = paragraphs.slice(1, Math.min(paragraphs.length, 5));
  const operationalMeaning = paragraphs.slice(Math.min(paragraphs.length, 5), Math.min(paragraphs.length, 8));
  const failureIndicators = paragraphs.slice(Math.min(paragraphs.length, 8));
  return { overview, keySignals, operationalMeaning, failureIndicators };
}

export function BenchmarkSection(props: {
  title: string;
  subtitle: string;
  paragraphs: string[];
  risk: RiskLevel;
  collapsibleEvidence?: boolean;
}) {
  const content = splitContent(props.paragraphs);
  return (
    <section className="card benchmarkSection">
      <div className="sectionHeader">
        <h2>{props.title}</h2>
        <RiskIndicator level={props.risk} />
      </div>
      <h3>{props.subtitle}</h3>

      <h3>Section Overview</h3>
      <p><strong>Summary:</strong> {content.overview}</p>

      <h3>Key Signals</h3>
      <ul className="list">
        {content.keySignals.map((text, idx) => (
          <li key={`signal-${idx}`} className="listItem">{text}</li>
        ))}
      </ul>

      <h3>Operational Meaning</h3>
      {content.operationalMeaning.map((text, idx) => (
        <p key={`ops-${idx}`}>{text}</p>
      ))}

      <h3>Failure Indicators</h3>
      {props.collapsibleEvidence ? (
        <details className="evidencePanel">
          <summary>Show evidence and failure details</summary>
          <ul className="list">
            {content.failureIndicators.map((text, idx) => (
              <li key={`risk-${idx}`} className="listItem">{text}</li>
            ))}
          </ul>
        </details>
      ) : (
        <ul className="list">
          {content.failureIndicators.map((text, idx) => (
            <li key={`risk-${idx}`} className="listItem">{text}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
