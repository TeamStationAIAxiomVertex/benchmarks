import { siteCopy } from "@/lib/siteCopy";

export default function AboutDataPage() {
  return (
    <>
      <h1>{siteCopy.aboutData.title}</h1>
      <p>{siteCopy.aboutData.intro}</p>
      <p className="muted">{siteCopy.aboutData.detail}</p>
    </>
  );
}
