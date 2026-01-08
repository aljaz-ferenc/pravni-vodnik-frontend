import Link from "next/link";
import { lawIdMap } from "@/lib/lawIdMap";
import { lawUrls } from "@/lib/lawUrls";
import { cn } from "@/lib/utils";

const colors = [
  "bg-rose-500",
  "bg-indigo-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-emerald-500",
];

export default function SupportedLaws() {
  return (
    <div className="mb-8 flex flex-col items-center animate-[fadeIn_0.5s_ease-out_0.3s_both]">
      <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
        Trenutno podprta zakonodaja
      </p>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {Object.entries(lawIdMap).map(([lawId, label], index) => (
          <Link
            href={lawUrls[lawId]}
            target="_blank"
            key={lawId}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs md:text-sm font-medium text-slate-300 shadow-sm hover:border-primary/30 hover:bg-primary/10 transition-all"
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full bg-indigo-500",
                colors[index],
              )}
            ></span>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
