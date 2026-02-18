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

shopt -s nullglob
MATRIX_PAGES=(build/benchmarks/*/*/*/index.html)
shopt -u nullglob
if [[ ${#MATRIX_PAGES[@]} -lt 500 ]]; then
  echo "Matrix verification failed: expected at least 500 matrix benchmark pages in build output, found ${#MATRIX_PAGES[@]}."
  exit 1
fi

for f in "${MATRIX_PAGES[@]}"; do
  wc_attr=$(grep -o 'data-benchmark-word-count="[0-9]\+"' "$f" | head -n1 | sed -E 's/[^0-9]//g')
  if [[ -z "${wc_attr:-}" ]]; then
    echo "Matrix verification failed: missing data-benchmark-word-count in $f"
    exit 1
  fi
  if (( wc_attr < 2000 )); then
    echo "Matrix verification failed: page below 2000 words ($wc_attr) in $f"
    exit 1
  fi
done

echo "Domain verification passed for static output."
