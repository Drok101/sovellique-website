import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

function readHtml(file: string) {
  return fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
}

function cleanHref(value: string) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("#")) return value;

  const hashIndex = value.indexOf("#");
  const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
  let pathPart = hashIndex >= 0 ? value.slice(0, hashIndex) : value;

  if (pathPart.startsWith("/assets/")) return `${pathPart}${hash}`;

  const asset = pathPart.match(/^(?:(?:\.\.\/)+|\.\/)?assets\/(.+)$/);
  if (asset) return `/assets/${asset[1]}${hash}`;

  pathPart = pathPart.replace(/^(?:(?:\.\.\/)+|\.\/)/, "");
  if (pathPart === "" || pathPart === "index.html") return `/${hash}`;

  pathPart = pathPart.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  return `/${pathPart}${hash}`;
}

function canonicalPath(href: string) {
  if (href === "/" || href === "") return "/";
  return href.replace(/\/$/, "") || "/";
}

export function pageMetadata(file: string): Metadata {
  const html = readHtml(file);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "SOVELLIQUE";
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "/";
  const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/)?.[1];
  const ogDescription = html.match(/<meta property="og:description" content="([^"]*)"/)?.[1];
  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  const image = ogImage ? cleanHref(ogImage) : undefined;
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1];

  return {
    title: { absolute: title },
    description,
    ...(robots ? { robots } : {}),
    alternates: { canonical: canonicalPath(canonical) },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      type: "website",
      images: image ? [image] : undefined,
    },
  };
}

export function SitePage({ file }: { file: string }) {
  const html = readHtml(file);
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, (tag) => (/open-reset\.js/i.test(tag) ? tag : ""))
    .replace(/\s(href|src)=("|')([^"']+)\2/g, (_match, attr, quote, value) => {
      return ` ${attr}=${quote}${cleanHref(value)}${quote}`;
    });

  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
