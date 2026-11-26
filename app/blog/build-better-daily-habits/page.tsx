import type { Metadata } from "next";
import { SitePage, pageMetadata } from "@/lib/site-page";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata("blog/build-better-daily-habits/index.html");
}

export default function Page() {
  return <SitePage file={"blog/build-better-daily-habits/index.html"} />;
}
