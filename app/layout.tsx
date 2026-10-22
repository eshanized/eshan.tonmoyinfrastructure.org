import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider.tsx";
import { Navbar } from "@/components/layout/Navbar.tsx";
import { Footer } from "@/components/layout/Footer.tsx";
import { SkipLink } from "@/components/layout/SkipLink.tsx";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { getPersonJsonLd, getWebSiteJsonLd } from "@/lib/seo/json-ld.ts";
import { getSearchIndex } from "@/lib/content/index.ts";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0e" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.canonicalOrigin),
  title: {
    default: `${SITE_CONFIG.name} (${SITE_CONFIG.handle}) — Systems Engineering & Research`,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.canonicalOrigin }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  alternates: {
    canonical: SITE_CONFIG.canonicalOrigin,
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "Combined RSS Feed" },
        { url: "/journal-feed.xml", title: "Engineering Journal RSS Feed" },
        { url: "/research-feed.xml", title: "Research Publications RSS Feed" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.canonicalOrigin,
    siteName: SITE_CONFIG.title,
    title: `${SITE_CONFIG.name} (${SITE_CONFIG.handle}) — Systems Engineering & Research`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} (${SITE_CONFIG.handle})`,
    description: SITE_CONFIG.description,
    creator: `@${SITE_CONFIG.handle}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchEntries = getSearchIndex();
  const personJsonLd = getPersonJsonLd();
  const websiteJsonLd = getWebSiteJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider>
          <SkipLink />
          <Navbar searchEntries={searchEntries} />
          <div className="flex-1 pt-16">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
