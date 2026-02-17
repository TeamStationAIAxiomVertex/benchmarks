import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("out");
const buildDir = path.resolve("build");

await rm(buildDir, { recursive: true, force: true });
await mkdir(buildDir, { recursive: true });
await cp(outDir, buildDir, { recursive: true });

console.log(`Copied static export: ${outDir} -> ${buildDir}`);
