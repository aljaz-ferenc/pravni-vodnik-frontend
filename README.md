# Pravni Vodnik

Pravni Vodnik is an experimental **Retrieval-Augmented Generation (RAG)** web application focused on **Slovenian law**. The goal of the project is to help users explore and understand Slovenian legislation by generating structured, readable legal explanations based strictly on supported legal sources.

> ⚠️ **Important**: Pravni Vodnik is **not** a substitute for professional legal advice. The generated content is informational only.

---

## Architecture Overview

The system is built around a **LangGraph state machine** that routes user queries through different agents depending on their classification.

### High-level flow

1. **User submits a query**
2. **Query classifier agent** determines query type
3. **Routing** to the appropriate retrieval strategy
4. **Document synthesis** into a structured Markdown document
5. **Result delivery** with cited legal sources

---

## Query Types

The classifier assigns one of the following types:

* **exact**
  Queries referencing one or more specific articles (e.g. *"Kaj določa 34. člen Ustave?"*)

* **broad**
  Legal topics spanning multiple articles (e.g. *"Kako vložiti kazensko ovadbo?"*)

* **general**
  General legal concepts without specifying a law or article (e.g. *"Kaj pomeni kazenska odgovornost?"*)

* **unrelated**
  Non-legal questions or content outside the scope of the application

---

## Retrieval Strategies

### Exact queries

* Direct MongoDB lookup by `law_id` and `article_number`
* Multiple articles supported

### Broad queries

* Multi-query generation
* Semantic search over article chunks
* Reranking and score thresholding

### General queries

* Concept expansion (HyDE-style hypothetical document)
* Semantic search using expanded concept

If retrieval confidence is too low, the system fails gracefully and informs the user.

---

## Supported Laws

The system currently supports a **limited subset** of Slovenian legislation, such as:

* Ustava Republike Slovenije
* Kazenski zakonik (KZ-1)
* Zakon o kazenskem postopku (ZKP)

---

## Confidence & Error Handling

* If no sufficiently relevant articles are found, the system returns a **low-confidence state**
* Users are encouraged to rephrase or narrow their question
* Unsupported topics are never answered speculatively

---

## Legal Disclaimer

The application provides automatically generated legal information based on available legal texts. The content:

* does **not** constitute legal advice
* may be incomplete or outdated
* should not be relied upon in legal proceedings

Users should always consult a qualified legal professional for authoritative advice.

---

## Tech Stack

### Backend

* Python
* LangGraph
* MongoDB (article storage)
* Pinecone (vector store)
* Server-Sent Events (SSE)

### Frontend

* Next.js

---

## Project Status

Pravni Vodnik is an **active work in progress**.

Planned improvements:

* Expanded legal corpus
* Better law coverage detection
* Hybrid (lexical + semantic) search

---

## License

This project is intended for educational and experimental purposes.