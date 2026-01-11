"use client";

import { SelectGroup } from "@radix-ui/react-select";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { MdOutlineTune } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lawIdMap } from "@/lib/lawIdMap";
import type { AlertShownState, ProgressUpdateData } from "@/lib/types";
import Alert from "./_components/Alert";
import PendingDialog from "./_components/PendingDialog";
import QueryInput from "./_components/QueryInput";
import SupportedLaws from "./_components/SupportedLaws";

export default function Home() {
  const [alertShown, setAlertShown] = useState<AlertShownState>({
    shown: false,
    reason: null,
  });
  const [isPending, setIsPending] = useState(false);
  const [progressEvents, setProgressEvents] = useState<ProgressUpdateData[]>(
    [],
  );
  const [documentId, setDocumentId] = useState("");

  return (
    <div className="h-full flex flex-col mt-16 overflow-x-hidden font-display selection:bg-primary selection:text-white">
      {isPending && (
        <PendingDialog documentId={documentId} events={progressEvents} />
      )}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-10 pb-20 w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-8 border-b pb-4 w-full">
          <div className="flex items-center gap-4">
            <Image
              height={50}
              width={100}
              src="/logo1.svg"
              alt="logo"
              className="w-15 md:w-25"
            />
            <h1 className="md:text-5xl text-3xl uppercase font-extrabold tracking-wider">
              <span className="text-white">pravni</span>

              <br />
              <span className="text-primary">vodnik</span>
            </h1>
          </div>
          <h2 className="text-lg md:text-2xl font-semibold tracking-tight text-white leading-tight">
            Vaš osebni{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
              pravni svetovalec
            </span>
          </h2>
        </div>
        <div className="text-center mb-10 max-w-2xl">
          <p className="md:text-lg text-md text-muted-foreground font-light">
            Zanesljivi odgovori na vprašanja o slovenskih zakonih, predpisih in
            pravnih postopkih.
          </p>
        </div>
        <SupportedLaws />
        <div className="w-full max-w-3xl relative group z-10">
          <QueryInput
            setProgressEvents={setProgressEvents}
            alertShown={alertShown}
            setAlertShown={setAlertShown}
            setIsPending={setIsPending}
            setDocumentId={setDocumentId}
          />
          <AnimatePresence mode="wait">
            {alertShown && (
              <Alert alertShown={alertShown} setAlertShown={setAlertShown} />
            )}
          </AnimatePresence>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <MdOutlineTune size={15} />
                Izberite vir zakonodaje
              </span>
            </div>
            <div className="relative w-full">
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue />
                  <SelectContent className="bg-background">
                    <SelectGroup>
                      <SelectItem value="all">Vsa zakonodaja</SelectItem>
                      <SelectSeparator />
                      {Object.entries(lawIdMap).map(([lawId, label]) => (
                        <SelectItem key={lawId} value={lawId}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
            <div className="flex items-center gap-2 mt-5 px-2 pt-4 border-t border-border">
              <BsInfoCircleFill color="var(--color-slate-500)" size={15} />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Izbrano področje določa kontekst za iskanje. Če izberete{" "}
                <strong>Vsa zakonodaja</strong>, bo sistem preiskal celoten
                pravni spekter za najširši možni odgovor.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
