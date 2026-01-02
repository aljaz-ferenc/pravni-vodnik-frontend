import { Button } from "@/components/ui/button";
import { getAllDocuments } from "@/lib/actions";
import { X } from "lucide-react";
import type { Document as TDocument } from "@/lib/types";
import Link from "next/link";

export default async function DocumentsPage() {
  const documents = await getAllDocuments();

  return (
    <main className="flex-1 flex flex-col items-center py-8 px-4 md:px-8">
      <div className="w-full max-w-6xl rounded-xl shadow-2xl shadow-black/50 border border-border overflow-hidden flex flex-col">
        <div className="border-b border-border p-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
                Moji shranjeni dokumenti
                <span className="px-2.5 py-0.5 rounded-full text-primary text-xs font-bold border border-bprimary">
                  12
                </span>
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Upravljajte svoje pravne poizvedbe, verzije in shranjene
                odgovore.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-muted-foreground">
            {documents.map((doc) => (
              <Document key={doc._id.toString()} document={doc} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

type DocumentProps = {
  document: TDocument;
};

function Document({ document }: DocumentProps) {
  const lastVersion = document.versions.at(-1);

  if (!lastVersion) return;

  return (
    <li className="group bg-slate-900/40 hover:bg-slate-800/60 transition-colors duration-200 relative">
      <Link
        href={`/documents/${document._id.toString()}?version=${document.versions.length}`}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="p-5 md:px-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                v{document.versions.length}.0
              </span>
              <span className="text-[10px] text-muted-foreground dark:text-slate-500 flex items-center gap-1 ml-1">
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                TODO: Pred 20 minutami
              </span>
            </div>
            <h3 className="text-lg font-bold  mb-1 group-hover:text-primary transition-colors cursor-pointer leading-tight">
              {lastVersion.title}
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shrink-0">
            <Button
              variant={"destructive"}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X />
            </Button>
          </div>
        </div>
      </Link>
    </li>
  );
}
