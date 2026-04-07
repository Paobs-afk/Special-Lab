# System Overview

## Purpose of the system

- A document intelligence analyzer for uploaded files.
- Extracts readable text and evaluates how closely the documents relate to one another.
- Generates an executive summary, similarity scores, evidence terms, outlier detection, and recommendations.

## Chosen use case

- Comparing multiple documents to identify related content and key themes.
- Useful for document review, similarity detection, content clustering, and decision support.
- User flow: upload files → analyze documents → view similarity matrix and findings.

## Model / method used

- TF-IDF weighting
- Cosine similarity
- Semantic normalization / phrase cleanup
- Synonym grouping
- Bigram phrase enrichment
- Threshold-based decision engine

## Why it was chosen

- The methods are mathematically grounded and interpretable.
- They work without training data or external AI models.
- They provide explainable outputs: why documents match, which terms matter, and whether a pair is a direct/strong/partial match.
- Ideal for a demo-focused document intelligence solution.

## How it works

1. Upload documents in supported formats (`.txt`, `.pdf`, `.docx`, `.doc`).
2. Backend extracts readable text from each file.
3. Text is normalized:
   - lowercased
   - phrases normalized
   - stop words removed
   - tokens stemmed
   - synonyms grouped
4. TF-IDF vectors are built for each document.
5. Pairwise cosine similarity is computed for document pairs.
6. A hybrid score is created using cosine similarity plus overlap ratio.
7. The system assigns decision labels and actions based on similarity thresholds.
8. It generates:
   - document scores
   - top terms
   - similarity matrix
   - pairwise insights
   - outliers
   - best-match summary
   - recommendations

## What makes the system intelligent

- It does more than raw scoring:
  - semantic normalization maps related words together
  - bigram enrichment captures phrase meaning
  - evidence-term extraction explains why two documents match
  - outlier detection identifies documents that do not fit the collection
  - decision labels turn scores into actionable guidance
- The server functions as the AI logic engine for text analysis.

## How the outputs should be interpreted

- `summary`: overall narrative of the analysis and coherence.
- `overallScore`: how coherent the document collection is as a whole.
- `documentScores`: per-file signal strength, token counts, keyword profiles, and classification.
- `similarities`: pairwise document match percentages, decisions, and evidence terms.
- `matrix`: a document similarity matrix for quick comparison.
- `topTerms`: most important concepts across the set.
- `outliers`: documents that stand apart and may need separate handling.
- `recommendations`: suggested next steps based on similarity and outlier behavior.

> In short: the system is a text intelligence pipeline that turns uploaded documents into interpretable similarity insights and decision-ready findings.
