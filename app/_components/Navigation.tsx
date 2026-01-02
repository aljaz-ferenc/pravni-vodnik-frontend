import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Nova poizvedba" },
  { href: "/documents", label: "Dokumenti" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-3">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" width={30} alt="logo" height={30} />
        <nav className="hidden md:flex gap-1">
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
          {navItems.map((item) => (
            <div key={item.href} className="flex">
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
