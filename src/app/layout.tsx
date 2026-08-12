import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const fraunces = Fraunces({
  variable: "--font-editorial",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Slow Life",
    template: "%s · Slow Life",
  },
  description:
    "Un diario sobre moda lenta, materiales naturales y un vestir con intención. Ensayos, guías y crónicas de Slow Life.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Slow Life",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}