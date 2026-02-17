import Link from "next/link";
import { siteCopy } from "@/lib/siteCopy";

const links = [
  { href: "/", label: siteCopy.nav.home },
  { href: "/benchmarks/", label: siteCopy.nav.benchmarks },
  { href: "/categories/", label: siteCopy.nav.categories },
  { href: "/methodology/", label: siteCopy.nav.methodology },
  { href: "/methodology/positioning/", label: siteCopy.nav.positioning },
  { href: "/methodology/architecture/", label: siteCopy.nav.architecture },
  { href: "/methodology/internal-links/", label: siteCopy.nav.internalLinks },
  { href: "/about-data/", label: siteCopy.nav.aboutData },
  { href: "/faq/", label: siteCopy.nav.faq },
  { href: "/trust/", label: siteCopy.nav.trust }
];

export function Navbar() {
  return (
    <header className="siteHeader">
      <div className="wrap navRow">
        <Link href="/" className="brand">
          <span className="brandMark" aria-hidden="true">
            TS
          </span>
          <span>{siteCopy.brand}</span>
        </Link>
        <nav className="navLinks">
          {links.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
