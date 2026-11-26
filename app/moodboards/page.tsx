import type { Metadata } from "next";
import { SitePage, pageMetadata } from "@/lib/site-page";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata("moodboards/index.html");
}

export default function Page() {
  return <SitePage file={"moodboards/index.html"} />;
}
