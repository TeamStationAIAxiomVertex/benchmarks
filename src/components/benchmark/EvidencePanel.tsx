export function EvidencePanel(props: {
  title: string;
  subtitle: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <section className="card benchmarkSection">
      <h2>{props.title}</h2>
      <h3>{props.subtitle}</h3>
      <ul className="list">
        {props.links.map((link) => (
          <li key={link.href} className="listItem">
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

