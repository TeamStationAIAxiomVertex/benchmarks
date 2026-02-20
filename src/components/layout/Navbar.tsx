"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteCopy } from "@/lib/siteCopy";

const links = [
  { href: "/", label: siteCopy.nav.home },
  { href: "/benchmarks/", label: siteCopy.nav.benchmarks },
  { href: "/categories/", label: siteCopy.nav.categories },
  { href: "/methodology/", label: siteCopy.nav.methodology },
  { href: "/methodology/positioning/", label: siteCopy.nav.positioning },
  { href: "/methodology/architecture/", label: siteCopy.nav.architecture },
  { href: "/methodology/internal-links/", label: siteCopy.nav.internalLinks },
  { href: "/methodology/internal-docs/", label: siteCopy.nav.internalDocs },
  { href: "/about-data/", label: siteCopy.nav.aboutData },
  { href: "/faq/", label: siteCopy.nav.faq },
  { href: "/trust/", label: siteCopy.nav.trust }
];

export function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="siteHeader">
      <div className="wrap navRow">
        <Link href="/" className="brand">
          <Image src="/logo.png" alt="TeamStation AI" width={28} height={28} className="brandLogo" priority />
          <span>{siteCopy.brand}</span>
        </Link>
        <nav className="navLinks">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
