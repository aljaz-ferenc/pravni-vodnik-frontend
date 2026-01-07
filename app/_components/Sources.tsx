"use client";

import { Gavel } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import { MdOpenInNew } from "react-icons/md";
import { lawIdMap } from "@/lib/lawIdMap";
import { lawUrls } from "@/lib/lawUrls";
import type { Article } from "@/lib/types";
import { cn, groupdSourcesByLaw } from "@/lib/utils";

type SourcesProps = {
  sources: Article[];
};

export default function Sources({ sources }: SourcesProps) {
  const groupedSources = groupdSourcesByLaw(sources);

  return (
    <aside className="bg-slate-900/40 flex flex-col">
      <div className="p-5 border-b border-border  flex justify-between items-center  bg-slate-900/20">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <IoBookSharp />
          Viri
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-5 scroller">
        {Object.entries(groupedSources).map(([groupName, sources]) => (
          <div className="flex-1 overflow-y-auto scroller" key={groupName}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                    <Gavel />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {lawIdMap[groupName as keyof typeof lawIdMap]}
                    </h4>
                  </div>
                </div>
                <Link
                  target="_blank"
                  className="text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
                  href={lawUrls[groupName as keyof typeof lawUrls]}
                  title="Odpri celoten zakon v novem oknu"
                >
                  <MdOpenInNew />
                </Link>
              </div>

              <div className="relative pl-4 ml-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-3">
                {sources?.map((source) => (
                  <Source key={source._id.toString()} source={source} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

type SourceProps = {
  source: Article;
};

function Source({ source }: SourceProps) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = source.text.split("\n");

  return (
    <button
      className="w-full text-left"
      type="button"
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div key={source._id.toString()} className="relative group w-full">
        <div className="absolute -left-[22px] top-4 w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-50 dark:border-slate-900 group-hover:bg-blue-500 group-hover:scale-110 transition-all z-10"></div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
          <div className="flex justify-between items-center mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
              Člen {source.article_number}
            </span>
          </div>
          {!expanded && (
            <p
              className={cn(
                "text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed",
                !expanded && "line-clamp-1",
              )}
            >
              {source.text}
            </p>
          )}
          {expanded && (
            <div className="space-y-2">
              {paragraphs.map((para, index) => (
                <p
                  key={`paragraph-${index + 1}`}
                  className={cn(
                    "text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed",
                    !expanded && "line-clamp-1",
                  )}
                >
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
