import type { Metadata } from "next";
import { SitePage, pageMetadata } from "@/lib/site-page";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata("vision-boards/index.html");
}

export default function Page() {
  return <SitePage file={"vision-boards/index.html"} />;
}
