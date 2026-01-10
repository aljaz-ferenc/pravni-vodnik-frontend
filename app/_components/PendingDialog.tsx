import { ArrowRight, Check, Flag } from "lucide-react";
import Link from "next/link";
import type { ProgressUpdateData } from "@/lib/types";

type PendingDialogProps = {
  events: ProgressUpdateData[];
  documentId: string;
};

export default function PendingDialog({
  events,
  documentId,
}: PendingDialogProps) {
  return (
    <main className="z-30 flex-1 flex backdrop-blur-2xl flex-col items-center justify-center absolute inset-0 w-full h-screen pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/5 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* <div className="relative mb-10">
          <div className="h-20 w-20 rounded-full border-[6px] border-border dark:border-slate-800"></div>
          <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-[6px] border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            {events.at(-1)?.step === "done" ? (
              <BadgeCheck size={50} />
            ) : (
              <Gavel />
            )}
          </div>
        </div> */}
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 text-center tracking-tight">
          Analiziram vaše vprašanje
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-10 text-sm leading-relaxed max-w-xs">
          Sistem uporablja napredno RAG tehnologijo za iskanje po slovenski
          zakonodaji.
        </p>
        <div className="w-full border border-border rounded-2xl p-6 backdrop-blur-sm shadow-xl shadow-border/50 dark:shadow-black/30">
          <div className="flex flex-col gap-6 relative">
            {events.length > 0 &&
              events.map((event, index) => {
                if (event.step === "done") {
                  return (
                    <div key={`step-${index + 1}`}>
                      <div className="flex gap-4 items-center p-4 -mx-2 rounded-2xl bg-primary/5 border border-primary/20 shadow-lg shadow-primary/5 animate-glow-primary relative overflow-hidden transition-all duration-700">
                        <EventStatusIcon status="finish" />
                        <div className="flex-1 pt-1 items-center">
                          <div className="flex justify-between mb-0.5">
                            <p className="text-sm font-bold text-primary dark:text-blue-400">
                              Dokument je pripravljen
                            </p>
                            <span className="text-[10px] font-mono text-primary/70 font-bold uppercase tracking-tight">
                              Končano
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className=" pt-4 flex items-center justify-between">
                        <Link
                          href={`/documents/${documentId}`}
                          className="flex items-center gap-1.5 group cursor-pointer"
                        >
                          <span className="text-[10px] font-semibold text-primary">
                            ODPRI DOKUMENT
                          </span>
                          <ArrowRight size={15} color="var(--color-primary)" />
                        </Link>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={`step-${index + 1}`}
                    className="flex gap-4 items-start opacity-50"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 shrink-0">
                      <EventStatusIcon
                        status={index < events.length - 1 ? "done" : "pending"}
                      />
                    </div>
                    <div className="flex-1 pt-1.5">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-400">
                          {event.message}
                        </p>
                        <span className="text-[10px] font-mono text-slate-400">
                          14:02:03
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}

function EventStatusIcon({
  status,
}: {
  status: "pending" | "done" | "error" | "finish";
}) {
  if (status === "pending") {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-primary shrink-0 shadow-lg shadow-blue-500/20">
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping"></span>
        <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 shrink-0 transition-colors duration-500">
        <Check />
      </div>
    );
  }

  if (status === "finish") {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
        <Flag />
      </div>
    );
  }
}
