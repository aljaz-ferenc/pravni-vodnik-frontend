import { strict } from "assert";
import type { ObjectId } from "mongodb";
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

export type DoneEventData = z.infer<typeof doneEventDataSchema>;
