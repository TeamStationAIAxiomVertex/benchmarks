import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const appDir = path.join(ROOT, "src", "app");
const mustImportSiteCopy = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }
    if (entry.isFile() && fullPath.endsWith(".tsx")) {
      mustImportSiteCopy.push(fullPath);
    }
  }
}

await walk(appDir);
mustImportSiteCopy.push(path.join(ROOT, "src", "components", "layout", "Navbar.tsx"));

const siteCopyImport = /from\s+["']@\/lib\/siteCopy["']/;
const violations = [];

for (const file of mustImportSiteCopy) {
  const text = await readFile(file, "utf8");
  if (!siteCopyImport.test(text)) {
    violations.push(`${path.relative(ROOT, file)} is missing @/lib/siteCopy import`);
  }
}

const benchmarksContentPath = path.join(ROOT, "src", "lib", "benchmarksContent.ts");
const benchmarksContent = await readFile(benchmarksContentPath, "utf8");
if (!/from\s+["']@\/lib\/writingHumanizer["']/.test(benchmarksContent)) {
  violations.push("src/lib/benchmarksContent.ts is missing @/lib/writingHumanizer import");
}

if (violations.length > 0) {
  console.error("Humanizer verification failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Humanizer verification passed.");

