# Special Lab Implementation Notes

## What was added

This build now treats the server as the **AI logic engine** and the `/api/analyze` route as the **communication layer** connected to the React UI.

### AI logic engine
- TF-IDF weighting
- Cosine similarity
- Semantic normalization through phrase cleanup and synonym mapping
- Bigram phrase enrichment
- Evidence-term extraction for each document pair
- Threshold-based decision engine
- Outlier detection
- Written findings and recommendations

### Communication layer
- React upload page sends files through `FormData`
- Server extracts text and returns one structured analysis payload
- Results page renders the returned payload directly into:
  - executive summary
  - workflow stages
  - similarity matrix
  - pairwise interpretations
  - top terms
  - key findings
  - recommendations

## Why this is stronger for the demo

This version goes beyond raw cosine similarity. It explains **why** documents match, labels the match quality, highlights conceptual overlaps, and identifies outliers that do not belong to the same cluster.

## Files mainly changed
- `server/routes/analyze.ts`
- `server/utils/fileExtraction.ts`
- `server/utils/tfidf.ts`
- `shared/api.ts`
- `client/lib/analysis-api.ts`
- `client/pages/Analyze.tsx`
- `client/pages/Results.tsx`

## Important note

Per the latest instruction, **database integration was intentionally skipped** because it was marked as not necessary.

## Demo talking points

1. The system accepts multiple document formats and extracts readable text.
2. The backend normalizes phrases and related terms before computing TF-IDF.
3. Cosine similarity is used for pairwise comparison, but the app does not stop at the score.
4. A decision engine converts raw similarity into labels like Direct Match, Strong Match, and Partial Match.
5. The UI shows a matrix, evidence terms, outliers, and recommendations so the output is interpretable and defendable.
