"use server";

import { ObjectId } from "mongodb";
import { updateTag } from "next/cache";
import clientPromise from "./mongo";
import type { Article, Document } from "./types";

const BASE_URL = process.env.BASE_URL || "http://localhost:8000";

export type QueryResponse = {
  documentId: string;
};

export async function queryRAG(
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
  if (!response.ok) {
    throw new Error("Nekaj je šlo narobe. Poskusite ponovno.");
  }
  const data = await response.json();
  updateTag("documents");
  return data;
}

export async function getDocument(documentId: string) {
  const client = await clientPromise;
  const db = client.db("pravni-vodnik");
  const col = await db.collection<Document>("documents");
  const document = await col.findOne({ _id: new ObjectId(documentId) });

  if (!document) throw new Error("Dokument ne obstaja");

  return JSON.parse(JSON.stringify(document));
}

export async function getArticles(ids: string[]) {
  const client = await clientPromise;
  const db = client.db("pravni-vodnik");
  const col = await db.collection<Article>("articles");
  const articles = await col.find({ _id: { $in: ids } }).toArray();

  if (!articles) throw new Error("Viri ne obstajajo");

  return JSON.parse(JSON.stringify(articles));
}

export async function getAllDocuments() {
  const client = await clientPromise;
  const db = client.db("pravni-vodnik");
  const col = await db.collection<Document>("documents");
  const articles = await col.find().toArray();

  if (!articles) throw new Error("Viri ne obstajajo");

  return JSON.parse(JSON.stringify(articles)) as Document[];
}

export async function deleteDocument(documentId: string) {
  const client = await clientPromise;
  const db = client.db("pravni-vodnik");
  const col = await db.collection<Document>("documents");
  const result = await col.findOneAndDelete({ _id: new ObjectId(documentId) });

  updateTag("documents");
  return result?._id.toString();
}
