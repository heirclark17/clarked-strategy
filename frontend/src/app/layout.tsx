import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

/**
 * Fonts (self-hosted via next/font - zero layout shift).
 * - Display: Bricolage Grotesque (characterful, variable) → font-display
 * - Body:    Inter (clean, legible)                       → font-body / font-sans
 * - Mono:    Geist Mono (numerals, eyebrows, step badges) → font-mono
 * To swap a face, change the import + loader here; the CSS var names in
 * globals.css (@theme) stay the same, so nothing else needs to change.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} | ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.hero.subtitle,
  keywords: [
    "marketing strategy studio",
    "brand strategy",
    "positioning",
    "go-to-market",
    "product launch marketing",
    "content and paid marketing",
    "startup marketing agency",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title,
    description: site.hero.subtitle,
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.hero.subtitle,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
