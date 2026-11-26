const fs = require("fs");
const path = require("path");

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name === "index.html") acc.push(full);
  }
  return acc;
}

for (const file of walk("content")) {
  const rel = path.relative("content", file).split(path.sep).join("/");
  const route = rel.replace(/\/index\.html$/, "").replace(/^index\.html$/, "");
  const outDir = route === "" ? "app" : path.join("app", route);
  fs.mkdirSync(outDir, { recursive: true });
  const quoted = JSON.stringify(rel);
  const src = `import type { Metadata } from "next";
import { SitePage, pageMetadata } from "@/lib/site-page";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata(${quoted});
}

export default function Page() {
  return <SitePage file={${quoted}} />;
}
`;
  fs.writeFileSync(path.join(outDir, "page.tsx"), src);
  console.log(route || "/");
}
