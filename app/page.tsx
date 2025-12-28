import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectSeparator,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { MdOutlineTune } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import QueryInput from "./_components/QueryInput";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden font-display selection:bg-primary selection:text-white">
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-10 pb-20 w-full max-w-5xl mx-auto">
        <div className="text-center mb-10 max-w-2xl">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl border-2 border-border shadow-glow">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Vaš osebni{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
              pravni svetovalec
            </span>
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            Zanesljivi odgovori na vprašanja o slovenskih zakonih, predpisih in
            pravnih postopkih.
          </p>
        </div>
        <div className="w-full max-w-3xl relative group z-10">
          <QueryInput />
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
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
                      <SelectItem value="ustava">
                        Ustava Republike Slovenije
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
            <div className="flex items-center gap-2 mt-5 px-2 pt-4 border-t border-white/5">
              <BsInfoCircleFill color="var(--color-slate-500)" size={15} />
              <p className="text-xs text-slate-500 leading-relaxed">
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
