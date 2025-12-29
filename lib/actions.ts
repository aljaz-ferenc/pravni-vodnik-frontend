const BASE_URL = process.env.BASE_URL || "http://localhost:8000";

type QueryResponse = {
  answer: string;
  sources: Array<{
    _id: string;
    law_id: string;
    article_number: string;
    article_index: number;
    text: string;
    chapter: string;
    language: string;
    article_title: string;
  }>;
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
