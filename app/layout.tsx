import type { Metadata } from "next";
import {
  Crimson_Pro,
  Geist,
  Geist_Mono,
  Inter,
  Libre_Baskerville,
  Merriweather,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LegalNotice from "./_components/LegalNotice";
import Navigation from "./_components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pravni Vodnik",
  description: "Vaš osebni pravni svetovalec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased bg-background`}
      >
        <LegalNotice />
        <Navigation />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
