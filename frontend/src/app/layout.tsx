import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

/**
 * Fonts (self-hosted via next/font - zero layout shift).
 * - Display: Playfair Display (editorial serif) → font-display
 * - Body:    Inter (clean, legible)             → font-body / font-sans
 * To swap a face, change the import + loader here; the CSS var names in
 * globals.css (@theme) stay the same, so nothing else needs to change.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
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
    "marketing and communications firm",
    "media relations",
    "public relations",
    "B2B marketing",
    "demand generation",
    "crisis communications",
    "social media strategy",
    "brand strategy",
    "Houston marketing agency",
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
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
