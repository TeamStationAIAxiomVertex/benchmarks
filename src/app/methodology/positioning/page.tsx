import type { Metadata } from "next";
import { siteCopy } from "@/lib/siteCopy";
import { positioningEvidence } from "@/lib/positioningEvidence";

export const metadata: Metadata = {
  title: siteCopy.positioning.title,
  description: siteCopy.positioning.subtitle
};

export default function PositioningPage() {
  return (
    <>
      <h1>{siteCopy.positioning.title}</h1>
      <p>{siteCopy.positioning.subtitle}</p>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <h2>{siteCopy.positioning.claimTitle}</h2>
        <p>{siteCopy.positioning.claimBody}</p>
      </section>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <h2>{siteCopy.positioning.rigorTitle}</h2>
        <p>{siteCopy.positioning.rigorBody}</p>
      </section>

      <h2>{siteCopy.positioning.citationsTitle}</h2>
      <ul className="list">
        {positioningEvidence.map((item) => (
          <li key={item.id} className="listItem">
            <strong>{item.title}</strong>
            <p className="muted" style={{ marginTop: "0.35rem" }}>
              {siteCopy.positioning.researchIdLabel}: <code>{item.id}</code>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
