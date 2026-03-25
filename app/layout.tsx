import { config } from "@/app.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const isDev = process.env.NODE_ENV === 'development'

const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const { title, description, url, keywords, authors } = config;
const imageUrl = 'https://placehold.co/1200x630/jpg?text=' + title;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  authors,
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title + ' image',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl],
  },
  alternates: {
    canonical: url,
  },
  other: {
    "Content-Security-Policy": csp
  }
};

export const viewport: Viewport = {
  themeColor: '#333333',
  colorScheme: 'dark light',
  initialScale: 1,
  width: 'device-width'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background"
        >
          Skip to main content
        </a>
        <Header title={config.title} />
        <Separator />
        <main id="main-content" className="container max-w-5xl px-2 mx-auto overflow-hidden mb-8">
          <div className="content_container relative">
            {children}
          </div>
        </main>
        <Separator />
        <Footer />
        <ScrollToTop />
        <SpeedInsights />
      </body>
    </html>
  );
}
