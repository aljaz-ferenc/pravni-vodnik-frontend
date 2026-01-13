"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DocumentError() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center py-12 px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase">
            Napaka 404
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Dokument ne obstaja
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Morda je bil dokument izbrisan ali pa povezava ni pravilna.
            Preverite naslov ali pojdite na seznam dokumentov.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/documents"
            className={cn(buttonVariants({ className: "text-foreground" }))}
          >
            Dokumenti
          </Link>
        </div>
      </div>
    </main>
  );
}
