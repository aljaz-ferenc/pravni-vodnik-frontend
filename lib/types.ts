import { strict } from "assert";
import type { ObjectId } from "mongodb";
import { Dispatch, SetStateAction } from "react";
import z, { boolean } from "zod";

export type DocumentVersion = {
  query: string;
  sources: string[];
  content: string;
  title: string;
  created_at: Date;
};

export type Document = {
  versions: DocumentVersion[];
  _id: ObjectId;
};

export type Article = {
  _id: string;
  law_id: string;
  article_number: string;
  article_index: number;
  text: string;
  chapter: string;
  language: string;
};

export const progressUpdateDataSchema = z.object({
  step: z.string(),
  message: z.string(),
});

export type ProgressUpdateData = z.infer<typeof progressUpdateDataSchema>;

export const doneEventDataSchema = z.object({
  success: z.boolean(),
  reason: z.string(),
  document_id: z.string(),
});

const issueSchema = z.union([
  z.literal("unrelated_query"),
  z.literal("low_confidence"),
]);

export const issueEventDataSchema = z.object({
  step: z.string(),
  issue: issueSchema,
});

export const serverErrorEventDataSchema = z.object({
  success: z.boolean(),
  reason: z.string(),
  message: z.string(),
});

export const graphErrorEventDataSchema = z.object({
  step: z.string(),
  message: z.string(),
});

export type GraphErrorEventData = z.infer<typeof graphErrorEventDataSchema>;

export type ServerErrorEventData = z.infer<typeof serverErrorEventDataSchema>;

export type Issue = z.infer<typeof issueSchema>;

export type IssueData = z.infer<typeof issueEventDataSchema>;

export type DoneEventData = z.infer<typeof doneEventDataSchema>;

export type AlertReason = Issue | null;

export type AlertShownState = { shown: boolean; reason: AlertReason };

export type SetAlertShownAction = Dispatch<SetStateAction<AlertShownState>>;
