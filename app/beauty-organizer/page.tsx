import type { Metadata } from "next";
import { SitePage, pageMetadata } from "@/lib/site-page";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata("beauty-organizer/index.html");
}

export default function Page() {
  return <SitePage file={"beauty-organizer/index.html"} />;
}
