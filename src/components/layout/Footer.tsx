import { siteCopy } from "@/lib/siteCopy";

const hubLinks = [
  { href: "https://teamstation.dev", label: "teamstation.dev" },
  { href: "https://pricing.teamstation.dev", label: "pricing.teamstation.dev" },
  { href: "https://research.teamstation.dev/research/platforming-the-nearshore-industry", label: "research platforming paper" },
  { href: "https://research.teamstation.dev/research/nearshore-platform-economics", label: "research platform economics" },
  { href: "https://articles.teamstation.dev/why-does-software-delivery-slow-down-as-engineering-teams-grow/", label: "article delivery slowdown" },
  { href: "https://articles.teamstation.dev/why-do-nearshore-engineering-teams-fail-after-initial-success/", label: "article nearshore failure signals" }
];

const deepLinks = [
  { href: "https://cto.teamstation.dev/hire/by-country/mexico/react", label: "cto mexico react" },
  { href: "https://cto.teamstation.dev/hire/by-country/brazil/python", label: "cto brazil python" },
  { href: "https://hire.teamstation.dev/roles", label: "hire roles" },
  { href: "https://hire.teamstation.dev/hire/kubernetes", label: "hire kubernetes" },
  { href: "https://hire.teamstation.dev/hire/data-engineering", label: "hire data engineering" },
  { href: "https://docs.teamstation.dev", label: "docs.teamstation.dev" }
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footerLegalWrap">
        <h2 className="footerTitle">{siteCopy.footer.linksTitle}</h2>
        <p className="footerLinksRow">
          {hubLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </p>
        <p className="footerLinksRow">
          {deepLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </p>
        <h2 className="footerTitle">{siteCopy.footer.trademarkTitle}</h2>
        <p className="footerMeta">{siteCopy.footer.trademarkP1}</p>
        <p className="footerMeta">{siteCopy.footer.trademarkP2}</p>
        <p className="footerMeta">{siteCopy.footer.trademarkP3}</p>
        <p className="footerMeta">{siteCopy.footer.trademarkP4}</p>
      </div>
    </footer>
  );
}
