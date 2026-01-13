import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import type z from "zod";
import { updateTagFromClient } from "./actions";
import {
  doneEventDataSchema,
  graphErrorEventDataSchema,
  issueEventDataSchema,
  type ProgressUpdateData,
  progressUpdateDataSchema,
  type SetAlertShownAction,
  serverErrorEventDataSchema,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL");

export function handleSSE(
  query: string,
  setAlertShown: SetAlertShownAction,
  setProgressEvents: Dispatch<SetStateAction<ProgressUpdateData[]>>,
  setIsPending: Dispatch<SetStateAction<boolean>>,
  setDocumentId: Dispatch<SetStateAction<string>>,
) {
  setAlertShown({ shown: false, reason: null });
  setProgressEvents([]);
  setIsPending(true);

  const url = `${BASE_URL}/query?query=${encodeURIComponent(query)}`;
  const eventSource = new EventSource(url);

  function handleSSEError(event: Event) {
    closeSSE();
    console.log("ERROR EVENT:", event);
    console.warn("SSE network/error:", event);
    toast.error("Napaka pri vzpostavljanju povezave");
  }

  function handleServerEventDataValidationError(validationError: z.ZodError) {
    console.error(validationError);
    toast.error("Napaka v odgovoru strežnika");
    closeSSE();
    return;
  }

  function closeSSE() {
    setIsPending(false);
    eventSource.close();
  }

  eventSource.addEventListener("progress", (event) => {
    const data = JSON.parse(event.data);

    const validation = progressUpdateDataSchema.safeParse(data);

    if (!validation.success) {
      handleServerEventDataValidationError(validation.error);
      return;
    }

    const { step, message } = validation.data;
    console.log("STEP: ", step, "MESSAGE: ", message);

    setProgressEvents((prev) => [...prev, { step, message }]);
  });

  eventSource.addEventListener("done", (event) => {
    eventSource.close();

    const data = JSON.parse(event.data);

    const validation = doneEventDataSchema.safeParse(data);

    if (!validation.success) {
      handleServerEventDataValidationError(validation.error);
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
    updateTagFromClient("documents");
    setProgressEvents((prev) => [...prev, { step: "done", message: "done" }]);
  });

  eventSource.addEventListener("issue", (event) => {
    eventSource.close();
    setIsPending(false);
    const data = JSON.parse(event.data);
    const validation = issueEventDataSchema.safeParse(data);

    if (!validation.success) {
      handleServerEventDataValidationError(validation.error);
      return;
    }

    switch (validation.data.issue) {
      case "low_confidence":
        setAlertShown({ shown: true, reason: "low_confidence" });
        break;
      case "unrelated_query":
        setAlertShown({ shown: true, reason: "unrelated_query" });
        break;
    }
  });

  eventSource.addEventListener("graph_error", (event) => {
    closeSSE();
    const data = JSON.parse(event.data);
    const validation = graphErrorEventDataSchema.safeParse(data);

    if (!validation.success) {
      handleServerEventDataValidationError(validation.error);
      return;
    }

    console.error("Graph error event:", event);
    toast.error(validation.data.message);
  });

  eventSource.onerror = (event: Event) => handleSSEError(event);

  eventSource.addEventListener("server_error", (event) => {
    closeSSE();

    const data = JSON.parse(event.data);
    const validation = serverErrorEventDataSchema.safeParse(data);

    if (!validation.success) {
      handleServerEventDataValidationError(validation.error);
      return;
    }

    console.error("Server error event:", validation.data.reason);
    toast.error(validation.data.message);
  });
}
