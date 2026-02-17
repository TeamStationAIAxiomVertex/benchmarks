import { siteCopy } from "@/lib/siteCopy";

export default function TrustPage() {
  return (
    <>
      <h1>{siteCopy.trust.title}</h1>
      <p>{siteCopy.trust.intro}</p>
      <p className="muted">{siteCopy.trust.detail}</p>
    </>
  );
}
