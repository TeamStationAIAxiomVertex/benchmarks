import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/benchmarks/", label: "Benchmarks" },
  { href: "/categories/", label: "Categories" },
  { href: "/methodology/", label: "Methodology" },
  { href: "/about-data/", label: "About Data" },
  { href: "/faq/", label: "FAQ" },
  { href: "/trust/", label: "Trust" }
];

export function Navbar() {
  return (
    <header className="siteHeader">
      <div className="wrap navRow">
        <Link href="/" className="brand">
          benchmarks.teamstation.dev
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
