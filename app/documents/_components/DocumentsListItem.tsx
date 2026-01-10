"use client";

import { format } from "date-fns";
import { X } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteDocument } from "@/lib/actions";
import type { Document as TDocument } from "@/lib/types";

type DocumentProps = {
  document: TDocument;
};

export default function DocumentsListItem({ document }: DocumentProps) {
  const lastVersion = document.versions.at(-1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    startTransition(async () => {
      try {
        console.log("deleting: ", document._id);
        await deleteDocument(document._id.toString());
        setDeleteDialogOpen(false);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Dokumenta ni bilo mogoče izbrisati. Poskusite ponovno.");
        }
      }
    });
  }

  if (!lastVersion) return;

  return (
    <li className="group bg-slate-900/40 hover:bg-slate-800/60 transition-colors duration-200 relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="p-5 md:px-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              v{document.versions.length}.0
            </span>
            <span className="text-[10px] text-muted-foreground dark:text-slate-500 flex items-center gap-1 ml-1">
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              {lastVersion.created_at &&
                format(new Date(lastVersion.created_at), "dd. MM. yyyy")}
            </span>
          </div>
          <Link
            href={`/documents/${document._id.toString()}?version=${document.versions.length}`}
          >
            <h3 className="text-lg font-bold  mb-1 group-hover:text-primary transition-colors cursor-pointer leading-tight">
              {lastVersion.title}
            </h3>
          </Link>
        </div>
        <Dialog onOpenChange={setDeleteDialogOpen} open={deleteDialogOpen}>
          <DialogTrigger asChild className="cursor-pointer">
            <Button
              variant={"destructive"}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Izbriši dokument</DialogTitle>
              <DialogDescription>
                Ali želite trajno izbrisati ta dokument?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Prekliči
              </Button>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={onDelete}
              >
                Izbriši
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
