export default function FaqPage() {
  return (
    <>
      <h1>FAQ</h1>
      <h2>How often are benchmarks updated?</h2>
      <p>Updates are batched and released through the static deployment pipeline.</p>
      <h2>Are benchmark pages generated server-side at runtime?</h2>
      <p>No. All pages are statically generated during build/export.</p>
    </>
  );
}
