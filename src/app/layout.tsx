import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { siteCopy } from "@/lib/siteCopy";
import { writingHumanizer } from "@/lib/writingHumanizer";
import "./globals.css";

const SITE_URL = "https://benchmarks.teamstation.dev";
const ROOT_DOMAIN = "https://teamstation.dev";
const subdomains = [
  "https://www.teamstation.dev",
  "https://app.teamstation.dev",
  "https://pricing.teamstation.dev",
  "https://benchmarks.teamstation.dev",
  "https://cto.teamstation.dev",
  "https://cio.teamstation.dev",
  "https://docs.teamstation.dev",
  "https://engineering.teamstation.dev",
  "https://research.teamstation.dev",
  "https://articles.teamstation.dev",
  "https://insights.teamstation.dev",
  "https://partner.teamstation.dev",
  "https://jobs.teamstation.dev"
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteCopy.metadata.defaultTitle,
    template: siteCopy.metadata.titleTemplate
  },
  description: siteCopy.metadata.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: siteCopy.metadata.defaultTitle,
    description: siteCopy.metadata.ogDescription,
    siteName: writingHumanizer("TeamStation AI", { context: "brand" }),
    locale: "en_US",
    images: [{ url: "/og/home.png", width: 1080, height: 630, alt: siteCopy.metadata.defaultTitle }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteCopy.metadata.defaultTitle,
    description: siteCopy.metadata.twitterDescription,
    images: ["/og/home.png"]
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${ROOT_DOMAIN}/#organization`,
      name: writingHumanizer("TeamStation AI", { context: "brand" }),
      legalName: writingHumanizer("TeamStation Artificial Intelligence LLC", { context: "brand" }),
      url: ROOT_DOMAIN,
      sameAs: [ROOT_DOMAIN, ...subdomains],
      hasPart: subdomains.map((url) => ({
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url
      }))
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: siteCopy.metadata.defaultTitle,
      publisher: { "@id": `${ROOT_DOMAIN}/#organization` },
      inLanguage: "en-US"
    }
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main className="wrap">{children}</main>
      </body>
    </html>
  );
}
