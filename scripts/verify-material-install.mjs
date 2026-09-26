import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

// Install only declared local registry dependencies into an isolated source tree.
// Package resolution intentionally uses this repository's installed package versions.
const root = fs.mkdtempSync(path.resolve(".material-consumer-"));
const installed = new Set();
const external = new Set();
function install(name) {
  if (installed.has(name)) return;
  const source = `public/r/${name}.json`;
  if (!fs.existsSync(source)) { external.add(name); return; }
  installed.add(name);
  const item = JSON.parse(fs.readFileSync(source, "utf8"));
  for (const dependency of item.registryDependencies ?? []) install(dependency);
  for (const file of item.files ?? []) {
    const target = path.resolve(root, file.target ?? file.path);
    assert(target.startsWith(root + path.sep), "Registry target must stay in consumer");
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, file.content ?? fs.readFileSync(file.path, "utf8"));
  }
}
try {
  for (const item of ["halo-surface", "halo-portal-surface", "button", "input", "select", "dock", "bottom-navigation", "command-palette"]) install(item);
  // Standard shadcn consumer infrastructure, not hidden Halo component source.
  fs.mkdirSync(path.join(root, "lib"), { recursive: true });
  fs.writeFileSync(path.join(root, "lib/utils.ts"), 'import { clsx, type ClassValue } from "clsx"; import { twMerge } from "tailwind-merge"; export function cn(...v: ClassValue[]) { return twMerge(clsx(v)); }');
  const files = fs.readdirSync(root, { recursive: true }).filter(f => /\.tsx?$/.test(f)).map(f => path.join(root, f));
  const program = ts.createProgram(files, {
    noEmit: true, strict: true, skipLibCheck: true, jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    esModuleInterop: true, paths: { "@/*": [root.replaceAll("\\", "/") + "/*"] },
  });
  const errors = ts.getPreEmitDiagnostics(program);
  if (errors.length) console.error(ts.formatDiagnosticsWithColorAndContext(errors, { getCanonicalFileName: f => f, getCurrentDirectory: () => process.cwd(), getNewLine: () => "\n" }));
  assert.equal(errors.length, 0, "Installed consumer must typecheck without repository components");
  assert(fs.readFileSync(path.join(root, "styles/halo-tokens.css"), "utf8").includes('./halo-material.css'));
  assert(fs.existsSync(path.join(root, "styles/halo-material.css")));
  console.log(`Consumer typecheck passed: ${installed.size} registry items, ${files.length} source files. External dependencies: ${[...external].join(", ") || "none"}.`);
} finally {
  assert(root.startsWith(path.resolve(".material-consumer-")));
  fs.rmSync(root, { recursive: true, force: true });
}
