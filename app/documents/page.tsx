import { getAllDocuments } from "@/lib/actions";

import Document from "./_components/Document";

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
