import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FollowUp from "@/app/_components/FollowUp";
import Header from "@/app/_components/Header";
import Sources from "@/app/_components/Sources";
import { getArticles, getDocument } from "@/lib/actions";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ documentId: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}): Promise<Metadata> {
  const { documentId } = await params;
  const sp = await searchParams;
  const { version } = sp;

  const document = await getDocument(documentId);
  const title = document.versions[+version - 1].title;

  return {
    title: `Pravni Vodnik | ${title}`,
  };
}

export default async function DocumentPage(
  props: PageProps<"/documents/[documentId]">,
) {
  const { params, searchParams } = props;
  const { documentId } = await params;
  const sp = await searchParams;
  const { version } = sp;

  if (!Number(version as string) || !version) {
    throw new Error("Version invalid");
  }

  const document = await getDocument(documentId);
  const currentVersionDoc = document.versions[+version - 1];
  const sources = await getArticles(currentVersionDoc.sources);

  return (
    <main className="max-w-[1440px] mx-auto flex-1 flex flex-col items-center py-8 px-4 md:px-8">
      <div className="w-full rounded-xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-border  overflow-hidden min-h-[85vh]">
        <Header
          query={document.versions[+version - 1].query}
          versions={document.versions.length}
          currentVersion={+version}
          title={`# ${currentVersionDoc.title}`}
        />
        <div className="relative flex w-full">
          <article className="flex-1 bg-slate-800/50 p-8 md:p-12  lg:border-b-0 lg:border-r border-border ">
            <div className="prose prose-invert min-w-full">
              <Markdown remarkPlugins={[remarkGfm]}>
                {currentVersionDoc.content}
              </Markdown>
            </div>
          </article>
          <div className="max-w-100">
            <FollowUp />
            <Sources sources={sources} />
          </div>
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
