import { siteCopy } from "@/lib/siteCopy";

export default function FaqPage() {
  return (
    <>
      <h1>{siteCopy.faq.title}</h1>
      <h2>{siteCopy.faq.q1}</h2>
      <p>{siteCopy.faq.a1}</p>
      <h2>{siteCopy.faq.q2}</h2>
      <p>{siteCopy.faq.a2}</p>
    </>
  );
}
