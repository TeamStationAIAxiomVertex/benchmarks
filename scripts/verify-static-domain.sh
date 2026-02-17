#!/usr/bin/env bash
set -euo pipefail

EXPECTED_DOMAIN="benchmarks.teamstation.dev"
BAD_DOMAIN_1="pricing.teamstation.dev"
BAD_DOMAIN_2="benchmark.teamstation.dev"

required=(
  "public/robots.txt"
  "public/sitemap.xml"
  "out/robots.txt"
  "out/sitemap.xml"
  "build/robots.txt"
  "build/sitemap.xml"
)

for file in "${required[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file"
    exit 1
  fi
done

if ! rg -n "$EXPECTED_DOMAIN" public/robots.txt public/sitemap.xml out/robots.txt out/sitemap.xml build/robots.txt build/sitemap.xml >/dev/null; then
  echo "Expected domain '$EXPECTED_DOMAIN' not found in static assets"
  exit 1
fi

if rg -n "$BAD_DOMAIN_1|$BAD_DOMAIN_2" public/robots.txt public/sitemap.xml out/robots.txt out/sitemap.xml build/robots.txt build/sitemap.xml >/dev/null; then
  echo "Found an invalid domain reference in static assets"
  exit 1
fi

echo "Static domain verification passed for $EXPECTED_DOMAIN"
