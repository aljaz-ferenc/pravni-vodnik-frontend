import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Gavel, X } from "lucide-react";
import Link from "next/link";
import { GiScales } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { MdOpenInNew } from "react-icons/md";

export default function Sources() {
  return (
    <div className="mt-8 pt-6 border-t border-border">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <IoBookSharp />
        Uporabljeni Viri
      </h4>
      <Sheet>
        <SheetTrigger className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
          <div className="bg-black/20 border border-border  p-4 hover:border-primary/40 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <GiScales />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Zakonodaja
                </span>
              </div>
            </div>
            <h5 className="text-sm font-bold text-primary mb-1">ZGD-1</h5>
            <p className="text-xs text-border0 mb-3">Člen 474, 475</p>
          </div>
        </SheetTrigger>
        <SheetContent>
          <div className="absolute inset-y-0 right-0 w-full md:w-[600px] lg:w-[720px] bg-white dark:bg-[#0f172a] border-[#e0e0e0] dark:border-[#1e293b] shadow-2xl transform transition-transform duration-300 flex flex-col z-30">
            <div className="flex flex-col gap-4 p-6 border-b border-[#e0e0e0] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IoBookSharp color="var(--color-primary)" />
                  </div>
                  <div>
                    <h2 className=" text-xl font-bold tracking-tight">
                      Kontekst odgovora
                    </h2>
                  </div>
                </div>
                <Button
                  aria-label="Close drawer"
                  className="group flex size-9 cursor-pointer items-center justify-center  bg-[#1e293b]/40  hover:bg-[#e0e0e0] dark:hover:bg-[#334155] transition-colors"
                >
                  <X color="white" />
                </Button>
              </div>
              <p className="text-[#637588] dark:text-[#94a3b8] text-sm leading-normal">
                Spodaj so navedeni izvirni dokumenti in členi, uporabljeni za
                pripravo odgovora.
              </p>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              <article className="flex flex-col gap-4">
                <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md py-3 -mx-2 px-2 border-b border-[#e0e0e0] dark:border-[#1e293b]/50 mb-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className=" text-lg font-bold leading-tight flex items-center gap-2">
                      <Gavel color="var(--color-primary)" />
                      Zakon o obligacijskih razmerjih (OZ)
                    </h3>
                    <Link
                      className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                      href="#"
                    >
                      Uradni list RS
                      <MdOpenInNew />
                    </Link>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <div className="flex h-7 items-center justify-center gap-x-2  bg-[#1e293b]/40 px-3 border border-[#e0e0e0] dark:border-transparent">
                    <p className=" text-xs font-bold leading-normal">
                      Člen 299
                    </p>
                  </div>
                </div>
                <div className="bg-[#1e293b]/40   p-5 border border-[#e0e0e0] dark:border-[#1e293b] shadow-sm relative group transition-shadow hover:shadow-md">
                  <h4 className=" text-xs font-bold uppercase tracking-wider mb-4">
                    Zamuda dolžnika
                  </h4>
                  <div className="space-y-4 text-[#111418] dark:text-[#e0e0e0] leading-relaxed font-normal text-[15px]">
                    <p>
                      (1) Dolžnik pride v zamudo, če ne izpolni obveznosti v
                      roku, ki je določen za izpolnitev.
                    </p>
                    <div className="relative pl-4 -ml-4 py-3 pr-3 rounded-r-lg my-2">
                      <p>
                        (2) Če rok za izpolnitev ni določen, pride dolžnik v
                        zamudo, ko ga upnik ustno ali pisno, z izvensodnim
                        opominom ali z začetkom nekega postopka, katerega namen
                        je doseči izpolnitev obveznosti, pozove, naj izpolni
                        svojo obveznost.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
              <article className="flex flex-col gap-4">
                <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md py-3 -mx-2 px-2 border-b border-[#e0e0e0] dark:border-[#1e293b]/50 mb-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className=" text-lg font-bold leading-tight flex items-center gap-2">
                      <Gavel color="var(--color-primary)" />
                      Zakon o pravdnem postopku (ZPP)
                    </h3>
                    <Link
                      className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                      href="#"
                    >
                      Uradni list RS
                      <MdOpenInNew />
                    </Link>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <div className="flex h-7 items-center justify-center gap-x-2  bg-[#1e293b]/40 px-3 border border-[#e0e0e0] dark:border-transparent">
                    <p className="text-xs font-bold leading-normal">Člen 142</p>
                  </div>
                </div>
                <div className="bg-[#1e293b]/40   p-5 border border-[#e0e0e0] dark:border-[#1e293b] shadow-sm relative group transition-shadow hover:shadow-md">
                  <div className="space-y-4 text-[#111418] dark:text-[#e0e0e0] leading-relaxed font-normal text-[15px]">
                    <p>
                      (1) Tožba, plačilni nalog, izredno pravno sredstvo, sklep
                      o določitvi naroka za glavno obravnavo in sklep, zoper
                      katerega je dovoljena posebna pritožba, se vročijo osebno
                      stranki, oziroma njenemu zakonitemu zastopniku ali
                      pooblaščencu.
                    </p>
                    <p>
                      (2) Druga pisanja se vročijo osebno, kadar je to v zakonu
                      določeno, ali če sodišče spričo posebne previdnosti tako
                      odredi.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
