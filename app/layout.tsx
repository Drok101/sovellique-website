import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteEffects } from "@/components/SiteEffects";

export const metadata: Metadata = {
  metadataBase: new URL("https://sovellique.com"),
  icons: { icon: "/assets/img/logo.webp" },
};

export const viewport: Viewport = {
  themeColor: "#F9E5ED",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Cormorant+Garamond:ital,wght@1,500&display=swap"
        />
        <link rel="stylesheet" href="/assets/css/site.css" />
      </head>
      <body>
        {children}
        <SiteEffects />
        <Analytics />
      </body>
    </html>
  );
}
