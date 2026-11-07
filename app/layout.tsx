import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import { indexingEnabled, jsonLd } from "@/lib/seo";
import "./globals.css";

const display = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Slidecraft Studio — Premium Carousel Design for Founders & Brands",
  description: site.description,
  robots: { index: indexingEnabled(), follow: indexingEnabled() },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${site.url}/#studio`,
              name: site.name,
              url: site.url,
              description: site.description,
            }),
          }}
        />
        <a
          className="fixed -top-24 left-4 z-50 bg-ink p-4 text-white focus:top-3"
          href="#main-content"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
