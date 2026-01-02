import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoAlertFill } from "react-icons/go";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "./_components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <Navigation />
        <Toaster />
        {children}
        {/* <footer className="fixed bottom-0 w-full py-4 text-center border-t border-white/5 bg-background-dark/80 backdrop-blur-sm z-40">
          <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
            <GoAlertFill size={15} />
            Pravni Vodnik ne nadomešča pravnega nasveta. Vedno se posvetujte s
            strokovnjakom.
          </p>
        </footer> */}
      </body>
    </html>
  );
}
