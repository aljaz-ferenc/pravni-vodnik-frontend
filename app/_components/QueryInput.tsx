"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { queryRAG } from "@/lib/actions";

const formSchema = z.object({
  query: z
    .string()
    .min(3, { error: "Min 3 characters" })
    .max(500, { error: "Max 500 characters" }),
});

export default function QueryInput() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const query = data.query.trim();
    try {
      const response = await queryRAG(query);
      router.push(`/documents/${response.documentId}?version=1`);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Nekaj je šlo narobe. Poskusite ponovno.");
      }
    }
  }

  return (
    <div className="relative flex w-full items-center border border-border focus-within:border-primary ring-1 ring-border focus-within:ring-primary/30 rounded-2xl transition-all shadow-2xl shadow-black/50 overflow-hidden">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Controller
          name="query"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="w-full">
              <Textarea
                aria-invalid={!!fieldState.error}
                {...field}
                spellCheck={false}
                className="w-full border-none placeholder-muted-foreground px-6 py-6 focus:ring-0 font-light"
                placeholder="Opišite svoj pravni problem..."
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
