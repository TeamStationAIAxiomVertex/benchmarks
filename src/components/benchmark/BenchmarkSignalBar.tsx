export function BenchmarkSignalBar(props: {
  words: number;
  sources: string[];
  sourceCount: number;
  recordsCount: number;
  generatedAt: string;
}) {
  return (
    <section className="card benchmarkSection signalBar">
      <div className="signalGrid">
        <p className="signalMetric">
          <span className="signalLabel">Words</span>
          <strong>{props.words}</strong>
        </p>
        <p className="signalMetric">
          <span className="signalLabel">Evidence Sources</span>
          <strong>{props.sourceCount}</strong>
        </p>
        <p className="signalMetric">
          <span className="signalLabel">Corpus Records</span>
          <strong>{props.recordsCount}</strong>
        </p>
        <p className="signalMetric">
          <span className="signalLabel">Corpus Date</span>
          <strong>{props.generatedAt}</strong>
        </p>
      </div>
      <p className="muted" style={{ marginTop: "0.8rem" }}>
        Evidence focus: {props.sources.slice(0, 4).join("; ")}
      </p>
    </section>
  );
}
