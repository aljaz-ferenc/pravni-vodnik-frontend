import { cacheTag } from "next/cache";
import Link from "next/link";
import { GiOpenFolder } from "react-icons/gi";
import { IoAddCircle } from "react-icons/io5";
import { MdOutlineSearchOff } from "react-icons/md";
import { getAllDocuments } from "@/lib/actions";
import DocumentsListItem from "./_components/DocumentsListItem";

export default async function DocumentsPage() {
  "use cache";
  cacheTag("documents");
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
                  {documents.length}
                </span>
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Upravljajte svoje pravne poizvedbe, verzije in shranjene
                odgovore.
              </p>
            </div>
          </div>
        </div>
        {documents.length > 0 && (
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-muted-foreground">
              {documents.map((doc) => (
                <DocumentsListItem key={doc._id.toString()} document={doc} />
              ))}
            </ul>
          </div>
        )}
        {documents.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50 dark:bg-slate-900/20">
            <div className="relative mb-8">
              <div className="text-[64px] text-blue-900/40 w-32 h-32 rounded-full bg-blue-900/10 flex items-center justify-center">
                <GiOpenFolder />
              </div>
              <div className="absolute text-primary text-[28px] -bottom-2 -right-2 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-lg">
                <MdOutlineSearchOff />
              </div>
            </div>
            <div className="text-center max-w-sm mx-auto">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Nimate shranjenih dokumentov
              </h3>
              {/* <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                Ko boste shranili svojo prvo poizvedbo, se bo pojavila tukaj.
                Sistem vam omogoča shranjevanje pomembnih pravnih mnenj in
                njihovo sledenje skozi čas.
              </p> */}
              <Link
                href="/"
                className="inline-flex mt-16 items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
              >
                <IoAddCircle />
                Nova poizvedba
              </Link>
            </div>
            {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="p-4 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white/50 dark:bg-slate-800/30">
                <span className="material-symbols-outlined text-slate-400">
                  history_edu
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Sledite zgodovini sprememb
                </span>
              </div>
              <div className="p-4 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white/50 dark:bg-slate-800/30">
                <span className="material-symbols-outlined text-slate-400">
                  label
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Kategorizirajte poizvedbe
                </span>
              </div>
              <div className="p-4 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white/50 dark:bg-slate-800/30">
                <span className="material-symbols-outlined text-slate-400">
                  verified
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Preverjena zakonodaja
                </span>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </main>
  );
}
