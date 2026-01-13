"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Nova poizvedba" },
  { href: "/documents", label: "Dokumenti" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-center md:justify-between border-b border-border bg-slate-900/80 backdrop-blur-md px-6 py-3">
      <div className="flex items-center gap-5">
        <Image
          src="/logo.svg"
          width={30}
          alt="logo"
          height={30}
          className="hidden md:block"
        />
        <nav className="flex gap-1">
          {navItems.map((item) => (
            <div key={item.href} className="flex">
              <Link
                className={cn(
                  "px-3 py-1.5 text-sm font-bold text-muted-foreground hover:text-foreground",
                  pathname === item.href &&
                    "text-foreground shadow-sm bg-primary/10",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
              <div className="h-full w-px bg-slate-700 mx-2"></div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
