import { Check, Gavel } from "lucide-react";
import { useEffect } from "react";

export default function PendingDialog() {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/events");

    eventSource.onmessage = (event) => {
      console.log(event);
    };
  });

  return (
    <main className="z-30 flex-1 flex backdrop-blur-2xl flex-col items-center justify-center absolute inset-0 w-full h-screen pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/5 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        <div className="relative mb-10">
          <div className="h-20 w-20 rounded-full border-[6px] border-border dark:border-slate-800"></div>
          <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-[6px] border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Gavel />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 text-center tracking-tight">
          Analiziram vaše vprašanje
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-10 text-sm leading-relaxed max-w-xs">
          Sistem uporablja napredno RAG tehnologijo za iskanje po slovenski
          zakonodaji.
        </p>
        <div className="w-full border border-border rounded-2xl p-6 backdrop-blur-sm shadow-xl shadow-border/50 dark:shadow-black/30">
          <div className="flex flex-col gap-6 relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-100 dark:bg-slate-800 -z-10"></div>
            <div className="flex gap-4 items-start group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 shrink-0 transition-colors duration-500">
                <Check />
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold text-slate-700 dark:text-border">
                  Razčlenitev vprašanja
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  3 ključni pojmi identificirani
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-primary shrink-0 shadow-lg shadow-blue-500/20">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping"></span>
                <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold text-primary animate-pulse">
                  Iskanje virov in informacij
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pregledovanje baze ZGD-1...
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start opacity-40 grayscale">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 border border-border dark:border-slate-700 shrink-0">
                <Gavel />
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                  Priprava odgovora
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Sinteza in navajanje virov
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
