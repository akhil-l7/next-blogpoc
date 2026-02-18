import { config } from "@/app.config";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: config?.title || 'Blog',
  description: config?.description || "Description of blog",
  other: {
    "Content-Security-Policy": csp
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="my-2 md:my-8">
          <h1 className="scroll-m-20 text-center text-4xl tracking-tight text-balance">{config?.title || 'blog'}</h1>
        </header>
        <Separator className="" />
        <main className="container max-w-5xl px-2 mx-auto overflow-hidden">
          <div className="content_container">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
