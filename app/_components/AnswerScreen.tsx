import { BiExport } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { QueryResponse } from "@/lib/actions";
import { Share2 } from "lucide-react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "./Header";
import Sources from "./Sources";

type AnswerScreenProps = {
  response: QueryResponse;
};

export default function AnswerScreen({ response }: AnswerScreenProps) {
  console.log(response);
  return (
    <main className="flex-1 flex flex-col items-center py-8 px-4 md:px-8">
      <div className="w-full max-w-6xl rounded-xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-border  overflow-hidden flex flex-col min-h-[85vh]">
        <Header />
        <div className="flex flex-col lg:flex-row flex-1 relative w-full">
          <article className="prose prose-invert flex-1 bg-slate-800/50 p-8 md:p-12 lg:pr-16 border-b lg:border-b-0 lg:border-r border-border w-full">
            <Markdown remarkPlugins={[remarkGfm]}>{response.document}</Markdown>
            <div className="mt-16 flex items-center gap-4 pt-8 border-t border-border">
              <Button>
                <BiExport />
                Izvozi dokument
              </Button>
              <Button className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-border  text-slate-600 dark:text-slate-300 rounded-full text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Share2 />
                Deli
              </Button>
            </div>
            <div className="mt-10 pt-10 border-t border-border /50">
              <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-border  p-1.5 shadow-sm">
                <div className="p-5 md:p-6">
                  <label
                    className="block text-base font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2.5"
                    htmlFor="refine-input"
                  >
                    Želite dopolniti ali izboljšati odgovor?
                  </label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Vnesite dodatna vprašanja ali navodila. Sistem bo ustvaril
                    novo verzijo dokumenta z upoštevanimi popravki.
                  </p>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700 rounded-xl opacity-20 group-focus-within:opacity-100 transition duration-500 blur"></div>
                    <div className="relative  dark:bg-slate-900 rounded-lg">
                      <textarea
                        className="block w-full rounded-lg border-0 bg-transparent py-4 px-4 text-slate-900 dark:text-white shadow-none ring-1 ring-inset ring-slate-200 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 resize-y min-h-[100px]"
                        id="refine-input"
                        placeholder="Npr.: Kakšne so takse za vpis v sodni register? Ali je potreben notar?"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <Sources />
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 max-w-2xl">
        Vsebina je generirana s pomočjo umetne inteligence. Vedno preverite
        uradne vire pred sprejemanjem pravnih odločitev.{" "}
        <Link
          className="underline hover:text-slate-600 dark:hover:text-slate-300"
          href="#"
        >
          Pogoji uporabe
        </Link>
      </p>
    </main>
  );
}
