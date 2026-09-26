import fs from "fs";
import path from "path";

const navContent = fs.readFileSync("lib/docs/navigation.ts", "utf8");
const hrefRegex = /href:\s*"([^"]+)"/g;
let m;
const navHrefs = new Set();
while ((m = hrefRegex.exec(navContent)) !== null) {
  navHrefs.add(m[1]);
}

const compDirs = fs.readdirSync("app/components").filter(d => {
  return fs.statSync(path.join("app/components", d)).isDirectory();
});

const notInNav = compDirs.filter(d => !navHrefs.has(`/components/${d}`));
console.log("Component folders in app/components not in docs navigation:", notInNav);
