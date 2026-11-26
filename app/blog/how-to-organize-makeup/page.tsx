import type { Metadata } from "next";
import { SitePage, pageMetadata } from "@/lib/site-page";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata("blog/how-to-organize-makeup/index.html");
}

export default function Page() {
  return <SitePage file={"blog/how-to-organize-makeup/index.html"} />;
}
