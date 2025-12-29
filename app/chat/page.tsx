"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import Sources from "./_components/Sources";
import { getResponse } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const sp = useSearchParams();
  const query = sp.get("query") || "";
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messages.length || !query) return;

    async function fetchData() {
      const response = await getResponse(query);
      console.log(response);
      setMessages([response]);
    }

    fetchData();
  }, [messages, query]);

  return (
    <main className="flex-1 relative flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto chat-scroll p-4 md:p-8 space-y-8 scroll-smooth pb-32">
        <div className="max-w-4xl mx-auto w-full space-y-10">
          <div className="flex flex-row-reverse items-start gap-4 animate-fade-in-up">
            <div className="flex flex-col items-end gap-2 max-w-[80%]">
              <div className="bg-[#1e293b]/40 border border-border px-6 py-4 shadow-lg">
                <p className=" text-white font-medium leading-relaxed">
                  {query}
                </p>
              </div>
              <span className="text-xs font-medium text-muted-foreground pr-2">
                14:23 • Vi
              </span>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-[#1e293b]/40">
            <div className="flex-1 min-w-0 space-y-6">
              <div className="bg-transparent md:bg-surface-dark/40 border border-border md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-primary mb-1">
                      Pravni Asistent
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Generirano z AI na podlagi slovenske zakonodaje
                    </p>
                  </div>
                </div>
                <div className="prose prose-invert prose-p:text-white/80 prose-headings:text-white max-w-none leading-relaxed text-base font-light">
                  <p>
                    Za ustanovitev{" "}
                    <strong className="text-primary font-semibold">
                      družbe z omejeno odgovornostjo (d.o.o.)
                    </strong>{" "}
                    v Sloveniji je potreben vpis v sodni register. Postopek je
                    mogoče izvesti na dva načina, odvisno od kompleksnosti
                    strukture podjetja.
                  </p>
                  <div className="my-6 space-y-4">
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">
                        1. Oblika akta o ustanovitvi
                      </h4>
                      <p className="text-sm">
                        Postopek se začne s sprejetjem akta o ustanovitvi. Če
                        družbo ustanavlja en sam družbenik in uporablja
                        predpisan obrazec, se postopek lahko opravi brezplačno
                        na{" "}
                        <span className="text-primary border-b border-primary/20 cursor-pointer hover:border-primary transition-colors">
                          točki VEM (SPOT)
                        </span>
                        . V kolikor gre za več družbenikov ali kompleksnejšo
                        družbeno pogodbo, je nujna oblika{" "}
                        <strong>notarskega zapisa</strong>.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">
                        2. Osnovni kapital
                      </h4>
                      <p className="text-sm">
                        Pred vpisom v register mora biti zagotovljen osnovni
                        kapital v minimalni višini{" "}
                        <strong className="text-white">7.500 EUR</strong>. Vsak
                        osnovni vložek mora znašati najmanj 50 EUR. Vložki so
                        lahko denarni ali stvarni (nepremičnine, oprema), vendar
                        morajo biti stvarni vložki v celoti izročeni pred
                        vpisom.
                      </p>
                    </div>
                  </div>
                </div>

                <Sources />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 w-full bg-gradient-to-t from-background-dark via-background-dark to-transparent pt-10 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute"></div>
            <div className="relative flex items-center gap-2 bg-surface-dark border border-border p-2 pr-2 shadow-2xl">
              <Textarea
                className="w-full bg-transparent border-none text-white placeholder-white/30 py-3.5 px-2 max-h-32 focus:ring-0 resize-none overflow-hidden"
                placeholder="Vprašajte dodatno podrobnost..."
              ></Textarea>
              <Button className="p-3 bg-primary hover:bg-primary/90 cursor-pointer text-white rounded-full size-10 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 mb-0.5">
                <SendHorizonal />
              </Button>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="text-[10px] text-white/30">
              Pravni Vodnik lahko dela napake. Vedno preverite uradne vire.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
