import type { ObjectId } from "mongodb";

export type DocumentVersion = {
  query: string;
  sources: string[];
  content: string;
  title: string;
};

export type Document = {
  versions: DocumentVersion[];
  _id: ObjectId;
};

export type Article = {
  _id: ObjectId;
  law_id: string;
  article_number: string;
  article_index: number;
  text: string;
  chapter: string;
  language: string;
};
