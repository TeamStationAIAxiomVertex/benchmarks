import { SITE_URL } from "@/lib/benchmarksContent";

export function canonical(pathname = "/"): string {
  const base = SITE_URL.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
