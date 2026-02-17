#!/usr/bin/env bash
set -euo pipefail

EXPECTED_DOMAIN="benchmarks.teamstation.dev"
BAD_DOMAIN_1="pricing.teamstation.dev"
BAD_DOMAIN_2="teamstaiton.dev"

FILES=(
  "public/robots.txt"
  "public/sitemap.xml"
  "out/robots.txt"
  "out/sitemap.xml"
  "build/robots.txt"
  "build/sitemap.xml"
)

for f in "${FILES[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "Missing expected file: $f"
    exit 1
  fi
done

if grep -RIn "$BAD_DOMAIN_1\|$BAD_DOMAIN_2" "${FILES[@]}" >/dev/null; then
  echo "Domain verification failed: found bad domain reference in sitemap/robots files."
  grep -RIn "$BAD_DOMAIN_1\|$BAD_DOMAIN_2" "${FILES[@]}"
  exit 1
fi

if ! grep -RIn "$EXPECTED_DOMAIN" "${FILES[@]}" >/dev/null; then
  echo "Domain verification failed: expected domain '$EXPECTED_DOMAIN' was not found."
  exit 1
fi

echo "Domain verification passed for static output."
