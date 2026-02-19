export function ExecutiveSignalCard(props: {
  title: string;
  subtitle: string;
  pain: string;
  impact: string;
  future: string;
  decision: string;
}) {
  return (
    <section className="card benchmarkSection signalCard">
      <h2>{props.title}</h2>
      <h3>{props.subtitle}</h3>
      <ul className="signalList">
        <li><strong>Pain:</strong> {props.pain}</li>
        <li><strong>Impact:</strong> {props.impact}</li>
        <li><strong>Future State:</strong> {props.future}</li>
        <li><strong>Decision Trigger:</strong> {props.decision}</li>
      </ul>
    </section>
  );
}

