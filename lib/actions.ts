import { ObjectId } from "mongodb";
import clientPromise from "./mongo";
import type { Article, Document } from "./types";

const BASE_URL = process.env.BASE_URL || "http://localhost:8000";

export type QueryResponse = {
  document: string;
  sources: Array<string>;
};

export async function getResponse(
  query: string,
  lawId?: string,
): Promise<QueryResponse> {
  const response = await fetch(`${BASE_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, lawId }),
  });
  const data = await response.json();
  console.log("Response data:", data);
  return data;
}

export async function getDocument(documentId: string) {
  const client = await clientPromise;
  const db = client.db("pravni-vodnik");
  const col = await db.collection<Document>("documents");
  const document = await col.findOne({ _id: new ObjectId(documentId) });

  if (!document) throw new Error("Dokument ne obstaja");

  return document;
}

export async function getArticles(ids: string[]) {
  const client = await clientPromise;
  const db = client.db("pravni-vodnik");
  const col = await db.collection<Article>("articles");
  const articles = await col.find({ _id: { $in: ids } }).toArray();

  if (!articles) throw new Error("Viri ne obstajajo");

  return articles;
}
