"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { queryRAG } from "@/lib/actions";
import {
  doneEventDataSchema,
  ProgressUpdateData,
  progressUpdateDataSchema,
} from "@/lib/types";

const formSchema = z.object({
  query: z
    .string()
    .min(3, { error: "Min 3 characters" })
    .max(500, { error: "Max 500 characters" }),
});

type QueryInputProps = {
  setIsPending: Dispatch<SetStateAction<boolean>>;
  setUnrelatedShown: Dispatch<SetStateAction<boolean>>;
  unrelatedShown: boolean;
  setProgressEvents: Dispatch<SetStateAction<ProgressUpdateData[]>>;
  setDocumentId: Dispatch<SetStateAction<string>>;
};

export default function QueryInput({
  setIsPending,
  setUnrelatedShown,
  unrelatedShown,
  setProgressEvents,
  setDocumentId,
}: QueryInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      query: "",
    },
  });

  useEffect(() => {
    return () => {
      setIsPending(false);
      form.reset();
    };
  }, [setIsPending, form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const query = data.query.trim();
    setUnrelatedShown(false);
    setIsPending(true);
    setProgressEvents([]);

    try {
      const url = `http://127.0.0.1:8000/query?query=${encodeURIComponent(query)}`;
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        console.log(event);
      };

      eventSource.addEventListener("progress", (event) => {
        const data = JSON.parse(event.data);

        const validation = progressUpdateDataSchema.safeParse(data);

        if (!validation.success) {
          console.log(validation.error);
          throw new Error(validation.error.message);
        }

        const { step, message } = validation.data;

        setProgressEvents((prev) => [...prev, { step, message }]);
      });

      eventSource.addEventListener("done", (event) => {
        data = JSON.parse(event.data);

        const validation = doneEventDataSchema.safeParse(data);

        if (!validation.success) {
          console.log(validation.error);
          throw new Error(validation.error.message);
        }

        if (!validation.data.success) {
          setIsPending(false);
          switch (validation.data.reason) {
            case "unrelated_query":
              setUnrelatedShown(true);
              break;
            case "mongo_error":
              toast.error("Napaka pri shranjevanju dokumenta");
          }
          return;
        }

        setDocumentId(validation.data.document_id);
        setProgressEvents((prev) => [
          ...prev,
          { step: "done", message: "done" },
        ]);
      });

      eventSource.onerror = (err) => {
        console.warn("SSE network/error:", err);
        eventSource.close();
        toast.error("Napaka pri vzpostavljanju povezave");
      };
    } catch (err) {
      setIsPending(false);
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Nekaj je šlo narobe. Poskusite ponovno.");
    }
  }

  return (
    <div className="relative flex w-full items-center border border-border focus-within:border-primary ring-1 ring-border focus-within:ring-primary/30 rounded-2xl transition-all shadow-2xl shadow-black/50 overflow-hidden">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Controller
          name="query"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className="w-full"
              onChange={() => {
                if (unrelatedShown) setUnrelatedShown(false);
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
  );
}
