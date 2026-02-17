import type { Metadata } from "next";
import { siteCopy } from "@/lib/siteCopy";
import { domainArchitecture } from "@/lib/domainArchitecture";

export const metadata: Metadata = {
  title: siteCopy.architecture.title,
  description: siteCopy.architecture.subtitle
};

export default function ArchitecturePage() {
  return (
    <>
      <h1>{siteCopy.architecture.title}</h1>
      <p>{siteCopy.architecture.subtitle}</p>
      <p className="muted">{domainArchitecture.purpose}</p>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <p>
          <strong>{siteCopy.architecture.versionLabel}:</strong> {domainArchitecture.version}
        </p>
        <p>
          <strong>{siteCopy.architecture.orgLabel}:</strong> {domainArchitecture.organization}
        </p>
        <p>
          <strong>{siteCopy.architecture.primaryLabel}:</strong> {domainArchitecture.primaryDomain}
        </p>
      </section>

      <h2>{siteCopy.architecture.registryTitle}</h2>
      <ul className="list">
        {domainArchitecture.registry.map((url) => (
          <li key={url} className="listItem">
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>

      <h2>{siteCopy.architecture.rationaleTitle}</h2>
      <ul>
        {domainArchitecture.rationale.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{siteCopy.architecture.governanceTitle}</h2>
      <ul>
        {domainArchitecture.governance.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

