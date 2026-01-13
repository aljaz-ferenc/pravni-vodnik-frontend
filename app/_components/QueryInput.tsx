"use client";

import { ArrowRight } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { handleSSE } from "@/lib/sse";
import type {
  AlertShownState,
  ProgressUpdateData,
  SetAlertShownAction,
} from "@/lib/types";

const formSchema = z.object({
  query: z
    .string()
    .min(3, { error: "Min 3 characters" })
    .max(500, { error: "Max 500 characters" }),
});

const exampleQueries = [
  "Kaj določa 36. člen Ustave?",
  "Kako se vloži kazenska ovadba?",
  "Razloži ureditev sodišč.",
];

type QueryInputProps = {
  setIsPending: Dispatch<SetStateAction<boolean>>;
  setAlertShown: SetAlertShownAction;
  alertShown: AlertShownState;
  setProgressEvents: Dispatch<SetStateAction<ProgressUpdateData[]>>;
  setDocumentId: Dispatch<SetStateAction<string>>;
};

export default function QueryInput({
  setIsPending,
  setAlertShown,
  alertShown,
  setProgressEvents,
  setDocumentId,
}: QueryInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      query: "",
    },
  });

  useEffect(() => {
    form.reset();
    return () => {
      setIsPending(false);
      setAlertShown({ shown: false, reason: null });
      form.reset();
    };
  }, [setIsPending, form, setAlertShown]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    handleSSE(
      data.query.trim(),
      setAlertShown,
      setProgressEvents,
      setIsPending,
      setDocumentId,
    );
  }

  return (
    <>
      <div className="relative flex w-full items-center border border-border focus-within:border-primary ring-1 ring-border focus-within:ring-primary/30 rounded-2xl transition-all shadow-2xl shadow-black/50 overflow-hidden">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <Controller
            name="query"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="w-full"
                onChange={() => {
                  if (alertShown) setAlertShown({ shown: false, reason: null });
                }}
              >
                <Textarea
                  aria-invalid={!!fieldState.error}
                  {...field}
                  spellCheck={false}
                  className="w-full border-none placeholder-muted-foreground px-6 py-6 focus:ring-0 font-light"
                  placeholder="Vaše pravno vprašanje..."
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Button className="flex items-center justify-center p-3 text-foreground rounded-full size-10 cursor-pointer">
              <ArrowRight />
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden mt-4 px-3 md:flex flex-col items-start gap-x-3 gap-y-2">
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((q) => (
            <button
              onClick={() => form.setValue("query", q)}
              key={q}
              type="button"
              className="text-[13px] text-muted-foreground/70 hover:text-primary hover:bg-white/5 px-2 py-0.5 rounded-lg transition-all border border-transparent hover:border-white/10"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
