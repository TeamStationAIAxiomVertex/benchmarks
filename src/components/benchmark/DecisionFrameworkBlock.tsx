export function DecisionFrameworkBlock({ lines }: { lines: string[] }) {
  return (
    <section className="card benchmarkSection">
      <h2>Decision Framework</h2>
      <h3>What leadership should do now</h3>
      <ul className="list">
        {lines.map((line, idx) => (
          <li key={`decision-${idx}`} className="listItem">
            <strong>Action:</strong> {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
