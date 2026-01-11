"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { queryRAG } from "@/lib/actions";
import {
  AlertShownState,
  doneEventDataSchema,
  issueEventDataSchema,
  ProgressUpdateData,
  progressUpdateDataSchema,
  SetAlertShownAction,
} from "@/lib/types";

const formSchema = z.object({
  query: z
    .string()
    .min(3, { error: "Min 3 characters" })
    .max(500, { error: "Max 500 characters" }),
});

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

  const isEventSrouceTerminatedRef = useRef(false);

  useEffect(() => {
    return () => {
      setIsPending(false);
      setAlertShown({ shown: false, reason: null });
      form.reset();
    };
  }, [setIsPending, form, setAlertShown]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const query = data.query.trim();
    setAlertShown({ shown: false, reason: null });
    setIsPending(true);
    setProgressEvents([]);

    try {
      const url = `http://127.0.0.1:8000/query?query=${encodeURIComponent(query)}`;
      const eventSource = new EventSource(url);

      eventSource.addEventListener("progress", (event) => {
        const data = JSON.parse(event.data);

        const validation = progressUpdateDataSchema.safeParse(data);

        if (!validation.success) {
          console.error(validation.error);
          toast.error("Napaka v odgovoru strežnika");
          eventSource.close();
          setIsPending(false);
          return;
        }

        const { step, message } = validation.data;

        setProgressEvents((prev) => [...prev, { step, message }]);
      });

      eventSource.addEventListener("done", (event) => {
        eventSource.close();
        isEventSrouceTerminatedRef.current = true;

        data = JSON.parse(event.data);

        const validation = doneEventDataSchema.safeParse(data);

        if (!validation.success) {
          console.error(validation.error);
          toast.error("Napaka v odgovoru strežnika");
          eventSource.close();
          setIsPending(false);
          return;
        }

        if (!validation.data.success) {
          setIsPending(false);
          switch (validation.data.reason) {
            case "mongo_error":
              toast.error("Napaka pri shranjevanju dokumenta");
              break;
          }
          return;
        }

        setDocumentId(validation.data.document_id);
        setProgressEvents((prev) => [
          ...prev,
          { step: "done", message: "done" },
        ]);
      });

      eventSource.addEventListener("issue", (event) => {
        eventSource.close();
        isEventSrouceTerminatedRef.current = true;
        data = JSON.parse(event.data);
        setIsPending(false);

        const validation = issueEventDataSchema.safeParse(data);

        if (!validation.success) {
          console.error(validation.error);
          toast.error("Napaka v odgovoru strežnika");
          eventSource.close();
          return;
        }

        switch (validation.data.issue) {
          case "low_confidence":
            setAlertShown({ shown: true, reason: "low_confidence" });
            break;
          case "unrelated_query":
            setAlertShown({ shown: true, reason: "unrelated_query" });
        }
      });

      eventSource.addEventListener("error", (event) => {
        if (
          eventSource.readyState === EventSource.CLOSED ||
          isEventSrouceTerminatedRef.current
        ) {
          eventSource.close();
          return;
        }
        console.error("Server error event:", event);
        toast.error("Napaka pri obdelavi poizvedbe");
        setIsPending(false);
        eventSource.close();
      });

      eventSource.onerror = (err) => {
        if (
          eventSource.readyState === EventSource.CLOSED ||
          isEventSrouceTerminatedRef.current
        ) {
          eventSource.close();
          return;
        }
        console.warn("SSE network/error:", err);
        toast.error("Napaka pri vzpostavljanju povezave");
        setIsPending(false);
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
  );
}
