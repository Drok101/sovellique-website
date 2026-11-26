import type { Metadata } from "next";
import { SitePage, pageMetadata } from "@/lib/site-page";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata("terms/index.html");
}

export default function Page() {
  return <SitePage file={"terms/index.html"} />;
}
