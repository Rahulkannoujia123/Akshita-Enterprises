import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Akshita Enterprises | CCTV, Computer, Solar & Service",
    template: "%s | Akshita Enterprises",
  },
  description:
    "Akshita Enterprises (Babatpur, Varanasi) — CCTV camera, computers, biometric & GPS tracker, solar, printing press, sales & service. Call/WhatsApp: +91 8787260552.",
  applicationName: "Akshita Enterprises",
  metadataBase: new URL("http://localhost:3000"),
  alternates: { canonical: "/" },
  keywords: [
    "Akshita Enterprises",
    "CCTV camera",
    "Computer",
    "Biometric",
    "GPS tracker",
    "Solar",
    "Printing press",
    "Sales and service",
    "Varanasi",
    "Babatpur",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
