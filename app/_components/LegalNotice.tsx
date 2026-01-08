"use client";

import { ArrowRight, Gavel } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ACCEPTED_STR = "pravni-vodnik-accepted";

export default function LegalNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(ACCEPTED_STR);
    if (!accepted) setShow(true);
  }, []);

  function onAccept() {
    localStorage.setItem(ACCEPTED_STR, "true");
    setShow(false);
  }

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-md bg-background bg-card-dark border border-slate-200 border-slate-700/50 rounded-2xl shadow-glow overflow-hidden transform transition-all">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
            <div className="flex flex-col items-center p-8 pt-10 text-center">
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Gavel />
              </div>
              <h2 className="text-2xl font-bold  text-white mb-2 tracking-tight">
                Pravno obvestilo
              </h2>
              <div className="w-12 h-1 bg-primary/30 rounded-full mb-6 mt-2"></div>
              <p className=" text-sm leading-relaxed mb-8">
                Aplikacija <strong>Pravni Vodnik</strong> omogoča iskanje in
                pregled pravnih vsebin iz slovenskih zakonov, vendar{" "}
                <strong>ni nadomestilo za pravni nasvet</strong>
                .
                <br />
                <br /> Vsebina, ki jo ustvari aplikacija, je generirana s
                pomočjo umetne inteligence in je lahko nepopolna ali napačna. Za
                pravno veljavne odločitve se posvetujte s{" "}
                <strong>
                  pooblaščenim pravnikom ali strokovnjakom za pravo
                </strong>
                . <br />
                <br />Z nadaljevanjem uporabe aplikacije se strinjate, da je
                uporaba informacij{" "}
                <strong>izključno na lastno odgovornost.</strong>
              </p>
              <div className="w-full flex flex-col gap-3">
                <Button
                  onClick={onAccept}
                  type="button"
                  className="cursor-pointer w-full text-foreground group relative flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 rounded-lg h-12 px-6 shadow-lg shadow-primary/20"
                >
                  <strong>Razumem in želim nadaljevati</strong>
                  <ArrowRight />
                </Button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 opacity-20 bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
