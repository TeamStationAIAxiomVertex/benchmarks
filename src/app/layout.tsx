import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { ROOT_DOMAIN, SITE_URL, ecosystemLinks } from "@/lib/benchmarksContent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "benchmarks.teamstation.dev",
  description: "Static benchmark snapshots across engineering velocity, cost efficiency, and quality reliability.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "benchmarks.teamstation.dev",
    description: "Benchmark intelligence across TeamStation workflows."
  },
  twitter: {
    card: "summary_large_image",
    title: "benchmarks.teamstation.dev",
    description: "Benchmark intelligence across TeamStation workflows."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TeamStation",
    url: ROOT_DOMAIN,
    hasPart: ecosystemLinks.map((item) => ({ "@type": "WebSite", url: item.href, name: item.label })),
    sameAs: ecosystemLinks.map((item) => item.href)
  };

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="wrap">{children}</main>
        <footer className="footer">
          <div className="wrap">
            <p className="muted">Part of the TeamStation ecosystem.</p>
            <div className="footerLinks">
              {ecosystemLinks.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </body>
    </html>
  );
}
