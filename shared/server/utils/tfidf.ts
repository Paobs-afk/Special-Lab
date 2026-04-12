import {
  AnalysisResponse,
  BestMatchInsight,
  DocumentScore,
  KeyFinding,
  OutlierInsight,
  Recommendation,
  SimilarityInsight,
  TermScore,
} from "@shared/api";

const STOP_WORDS = new Set([
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "also",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can",
  "could",
  "did",
  "do",
  "does",
  "doing",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "he",
  "her",
  "here",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "just",
  "me",
  "more",
  "most",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "now",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "she",
  "should",
  "so",
  "some",
  "such",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "with",
  "would",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
]);

const PHRASE_NORMALIZATIONS: Array<[RegExp, string]> = [
  [/artificial intelligence/gi, "artificial_intelligence"],
  [/machine learning/gi, "machine_learning"],
  [/decision support/gi, "decision_support"],
  [/information systems?/gi, "information_systems"],
  [/project management/gi, "project_management"],
  [/supply chain/gi, "supply_chain"],
  [/renewable energy/gi, "renewable_energy"],
  [/web development/gi, "web_development"],
  [/data science/gi, "data_science"],
  [/user interface/gi, "user_interface"],
  [/real time/gi, "real_time"],
];

const SYNONYM_GROUPS = [
  ["car", "automobile", "vehicle"],
  ["doctor", "physician", "medic"],
  ["student", "learner", "pupil"],
  ["employee", "staff", "worker", "personnel"],
  ["manager", "supervisor", "lead"],
  ["analysis", "analytics", "assessment", "evaluation"],
  ["document", "file", "record"],
  ["resume", "curriculum_vitae", "cv"],
  ["job", "role", "position"],
  ["system", "platform", "application", "app"],
  ["problem", "issue", "concern"],
  ["recommendation", "suggestion", "advice"],
  ["skill", "competency", "capability"],
  ["team", "group", "squad"],
  ["customer", "client", "buyer"],
  ["revenue", "income", "sales"],
  ["inventory", "stock", "supply"],
  ["research", "study", "investigation"],
  ["compare", "comparison", "match"],
  ["artificial_intelligence", "ai"],
  ["machine_learning", "ml"],
];

const SYNONYM_ROOT = new Map<string, string>();
for (const group of SYNONYM_GROUPS) {
  const root = group[0];
  for (const term of group) {
    SYNONYM_ROOT.set(term, root);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function displayTerm(term: string): string {
  return term.replace(/_/g, " ");
}

function stemToken(token: string): string {
  if (token.includes("_")) {
    return token;
  }

  let result = token;

  if (result.length > 5 && result.endsWith("ies")) {
    result = `${result.slice(0, -3)}y`;
  } else if (result.length > 6 && result.endsWith("ing")) {
    result = result.slice(0, -3);
  } else if (result.length > 5 && result.endsWith("ed")) {
    result = result.slice(0, -2);
  } else if (result.length > 5 && /(ches|shes|xes|zes|ses)$/.test(result)) {
    result = result.slice(0, -2);
  } else if (result.length > 4 && result.endsWith("s") && !result.endsWith("ss") && !result.endsWith("is") && !result.endsWith("us")) {
    result = result.slice(0, -1);
  }

  return result;
}

function normalizeText(text: string): string {
  let normalized = text.toLowerCase();

  for (const [pattern, replacement] of PHRASE_NORMALIZATIONS) {
    normalized = normalized.replace(pattern, replacement);
  }

  return normalized
    .replace(/[^a-z0-9_\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

interface ProcessedDocument {
  filename: string;
  originalTokens: string[];
  terms: string[];
  bigrams: string[];
  semanticRoots: Map<string, Set<string>>;
}

function processDocument(filename: string, text: string): ProcessedDocument {
  const normalizedText = normalizeText(text);
  const originalTokens = normalizedText
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));

  const semanticRoots = new Map<string, Set<string>>();
  const normalizedTokens = originalTokens
    .map((token) => stemToken(token))
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));

  const rootTerms = normalizedTokens.map((token) => {
    const root = SYNONYM_ROOT.get(token) || token;
    if (!semanticRoots.has(root)) {
      semanticRoots.set(root, new Set<string>());
    }
    semanticRoots.get(root)!.add(token);
    return root;
  });

  const bigrams: string[] = [];
  for (let index = 0; index < rootTerms.length - 1; index += 1) {
    const current = rootTerms[index];
    const next = rootTerms[index + 1];
    if (current !== next) {
      bigrams.push(`${current}_${next}`);
    }
  }

  return {
    filename,
    originalTokens,
    terms: rootTerms,
    bigrams,
    semanticRoots,
  };
}

function calculateTermFrequency(terms: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  const totalTerms = terms.length || 1;

  for (const term of terms) {
    tf.set(term, (tf.get(term) || 0) + 1);
  }

  for (const [term, count] of tf.entries()) {
    tf.set(term, count / totalTerms);
  }

  return tf;
}

function calculateInverseDocumentFrequency(allTerms: string[][]): Map<string, number> {
  const idf = new Map<string, number>();
  const totalDocs = allTerms.length || 1;
  const documentFrequency = new Map<string, number>();

  for (const terms of allTerms) {
    const uniqueTerms = new Set(terms);
    for (const term of uniqueTerms) {
      documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1);
    }
  }

  for (const [term, count] of documentFrequency.entries()) {
    idf.set(term, Math.log((1 + totalDocs) / (1 + count)) + 1);
  }

  return idf;
}

function calculateTfidfVector(terms: string[], idf: Map<string, number>): Map<string, number> {
  const tf = calculateTermFrequency(terms);
  const tfidf = new Map<string, number>();

  for (const [term, tfValue] of tf.entries()) {
    tfidf.set(term, tfValue * (idf.get(term) || 0));
  }

  return tfidf;
}

function calculateMagnitude(vector: Map<string, number>): number {
  let total = 0;
  for (const value of vector.values()) {
    total += value * value;
  }
  return Math.sqrt(total);
}

function calculateCosineSimilarity(vector1: Map<string, number>, vector2: Map<string, number>): number {
  let dotProduct = 0;
  for (const [term, value1] of vector1.entries()) {
    dotProduct += value1 * (vector2.get(term) || 0);
  }

  const magnitude1 = calculateMagnitude(vector1);
  const magnitude2 = calculateMagnitude(vector2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}

function getDecision(similarity: number): { decision: string; action: string } {
  if (similarity >= 80) {
    return {
      decision: "Direct Match",
      action: "Proceed to final review. Documents share the same core concepts and wording patterns.",
    };
  }

  if (similarity >= 60) {
    return {
      decision: "Strong Match",
      action: "High relevance detected. Review highlighted evidence terms for a fast approval decision.",
    };
  }

  if (similarity >= 40) {
    return {
      decision: "Partial Match",
      action: "Human review recommended. Shared themes exist, but the document focus is not fully aligned.",
    };
  }

  if (similarity >= 20) {
    return {
      decision: "Weak Relation",
      action: "Inspect manually only if context matters. Similarity is driven by a small number of overlapping ideas.",
    };
  }

  return {
    decision: "Distinct Content",
    action: "Archive or separate from the same cluster. The documents are conceptually far apart.",
  };
}

function classifyDocument(doc: ProcessedDocument): string {
  const joined = ` ${doc.terms.join(" ")} `;

  const academicHits = ["research", "study", "abstract", "method", "result", "conclusion"].filter((term) =>
    joined.includes(` ${term} `)
  ).length;

  const technicalHits = [
    "system",
    "algorithm",
    "database",
    "api",
    "machine_learning",
    "artificial_intelligence",
    "code",
  ].filter((term) => joined.includes(` ${term} `)).length;

  const businessHits = ["revenue", "market", "customer", "sales", "strategy", "management"].filter((term) =>
    joined.includes(` ${term} `)
  ).length;

  if (technicalHits >= academicHits && technicalHits >= businessHits && technicalHits > 0) {
    return "Technical / System-oriented";
  }

  if (academicHits >= technicalHits && academicHits >= businessHits && academicHits > 0) {
    return "Academic / Research-oriented";
  }

  if (businessHits > 0) {
    return "Business / Decision-oriented";
  }

  return "General narrative content";
}

function normalizeScore(value: number, maxValue: number): number {
  if (maxValue <= 0) {
    return 0;
  }

  return Math.round((value / maxValue) * 100);
}

function getTopTerms(vector: Map<string, number>, limit: number): Array<{ term: string; score: number }> {
  return Array.from(vector.entries())
    .filter(([term]) => !term.includes("_"))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term, score]) => ({ term: displayTerm(term), score }));
}

function getSemanticBoostTerms(doc1: ProcessedDocument, doc2: ProcessedDocument): string[] {
  const boosts: string[] = [];

  for (const [root, originals1] of doc1.semanticRoots.entries()) {
    const originals2 = doc2.semanticRoots.get(root);
    if (!originals2) {
      continue;
    }

    const combined = new Set<string>([...originals1, ...originals2]);
    if (combined.size > 1 && originals1.size > 0 && originals2.size > 0) {
      boosts.push(displayTerm(root));
    }
  }

  return boosts.slice(0, 5);
}

function buildSummary(
  processedDocuments: ProcessedDocument[],
  topTerms: TermScore[],
  similarities: SimilarityInsight[],
  bestMatch: BestMatchInsight | undefined,
  outliers: OutlierInsight[],
  semanticBoostCount: number
): string {
  const averageSimilarity =
    similarities.length > 0
      ? Math.round(
          similarities.reduce((total, item) => total + item.similarity, 0) / similarities.length
        )
      : 0;

  const leadingTerms = topTerms
    .slice(0, 4)
    .map((term) => `"${term.term}"`)
    .join(", ");

  const bestMatchSentence = bestMatch
    ? ` The strongest pair is ${bestMatch.documents.join(" and ")} at ${bestMatch.similarity}% similarity.`
    : "";

  const outlierSentence =
    outliers.length > 0
      ? ` ${outliers[0].filename} behaves like an outlier because its average similarity is only ${outliers[0].averageSimilarity}%.`
      : "";

  const semanticSentence =
    semanticBoostCount > 0
      ? ` Semantic normalization detected ${semanticBoostCount} cross-word conceptual matches, helping the engine connect similar ideas even when wording differs.`
      : "";

  return `Analyzed ${processedDocuments.length} document(s) using a hybrid workflow of TF-IDF weighting, cosine similarity, semantic normalization, n-gram enrichment, and a threshold-based decision engine. The collection shows an overall coherence score of ${averageSimilarity}%, with leading concepts ${leadingTerms}.${bestMatchSentence}${outlierSentence}${semanticSentence}`;
}

export function analyzeDocuments(documents: Array<{ filename: string; text: string }>): AnalysisResponse {
  const processedDocuments = documents.map((document) => processDocument(document.filename, document.text));
  const allTerms = processedDocuments.map((document) => document.terms);
  const idf = calculateInverseDocumentFrequency(allTerms);

  const vectors = processedDocuments.map((document) => calculateTfidfVector(document.terms, idf));

  const documentMagnitudes = vectors.map((vector) => calculateMagnitude(vector));
  const maxMagnitude = Math.max(...documentMagnitudes, 1);

  const pairInsights: SimilarityInsight[] = [];
  const similarityMatrix: number[][] = processedDocuments.map(() =>
    processedDocuments.map(() => 0)
  );
  const similarityAverages = new Array(processedDocuments.length).fill(0);
  const similarityCounts = new Array(processedDocuments.length).fill(0);
  let semanticBoostCount = 0;

  for (let rowIndex = 0; rowIndex < processedDocuments.length; rowIndex += 1) {
    similarityMatrix[rowIndex][rowIndex] = 100;
  }

  for (let firstIndex = 0; firstIndex < processedDocuments.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < processedDocuments.length; secondIndex += 1) {
      const rawSimilarity = calculateCosineSimilarity(vectors[firstIndex], vectors[secondIndex]);
      const uniqueTerms1 = new Set(processedDocuments[firstIndex].terms);
      const uniqueTerms2 = new Set(processedDocuments[secondIndex].terms);
      const sharedTerms = Array.from(uniqueTerms1).filter((term) => uniqueTerms2.has(term));
      const overlapRatio =
        uniqueTerms1.size + uniqueTerms2.size > 0
          ? (2 * sharedTerms.length) / (uniqueTerms1.size + uniqueTerms2.size)
          : 0;
      const hybridSimilarity = rawSimilarity * 0.7 + overlapRatio * 0.3;
      const similarity = Math.round(Math.sqrt(Math.max(0, hybridSimilarity)) * 100);
      similarityMatrix[firstIndex][secondIndex] = similarity;
      similarityMatrix[secondIndex][firstIndex] = similarity;

      similarityAverages[firstIndex] += similarity;
      similarityAverages[secondIndex] += similarity;
      similarityCounts[firstIndex] += 1;
      similarityCounts[secondIndex] += 1;

      const sharedBigrams = processedDocuments[firstIndex].bigrams.filter((term) =>
        processedDocuments[secondIndex].bigrams.includes(term)
      );

      const contributions = Array.from(vectors[firstIndex].entries())
        .map(([term, score1]) => {
          const score2 = vectors[secondIndex].get(term) || 0;
          return {
            term,
            contribution: score1 * score2,
          };
        })
        .filter((entry) => entry.contribution > 0)
        .sort((a, b) => b.contribution - a.contribution)
        .slice(0, 5)
        .map((entry) => ({
          term: displayTerm(entry.term),
          contribution: Number(entry.contribution.toFixed(4)),
        }));

      const commonTerms = Array.from(
        new Set([
          ...contributions.map((entry) => entry.term),
          ...sharedBigrams.slice(0, 2).map((term) => displayTerm(term)),
        ])
      );
      const semanticBoostTerms = getSemanticBoostTerms(processedDocuments[firstIndex], processedDocuments[secondIndex]);
      semanticBoostCount += semanticBoostTerms.length;

      const { decision, action } = getDecision(similarity);

      pairInsights.push({
        documents: [processedDocuments[firstIndex].filename, processedDocuments[secondIndex].filename],
        similarity,
        decision,
        action,
        commonTerms,
        topContributors: contributions,
        semanticBoostTerms,
      });
    }
  }

  pairInsights.sort((first, second) => second.similarity - first.similarity);

  const globalTermScores = new Map<string, number>();
  for (const vector of vectors) {
    for (const [term, score] of vector.entries()) {
      if (!term.includes("_")) {
        globalTermScores.set(term, (globalTermScores.get(term) || 0) + score);
      }
    }
  }

  const sortedGlobalTerms = Array.from(globalTermScores.entries()).sort((a, b) => b[1] - a[1]);
  const maxGlobalTermScore = sortedGlobalTerms.length > 0 ? sortedGlobalTerms[0][1] : 1;

  const topTerms: TermScore[] = sortedGlobalTerms.slice(0, 15).map(([term, score]) => ({
    term: displayTerm(term),
    score: Number(score.toFixed(4)),
    relevance: normalizeScore(score, maxGlobalTermScore),
  }));

  const documentScores: DocumentScore[] = processedDocuments.map((document, index) => {
    const averageSimilarity =
      similarityCounts[index] > 0 ? similarityAverages[index] / similarityCounts[index] : 0;
    const uniqueTermCount = new Set(document.terms).size;
    const vocabularyDensity =
      document.originalTokens.length > 0
        ? Number((uniqueTermCount / document.originalTokens.length).toFixed(2))
        : 0;

    const signalScoreBase =
      processedDocuments.length > 1
        ? averageSimilarity * 0.65 + normalizeScore(documentMagnitudes[index], maxMagnitude) * 0.35
        : normalizeScore(documentMagnitudes[index], maxMagnitude || 1);

    return {
      filename: document.filename,
      signalScore: Math.round(clamp(signalScoreBase, 0, 100)),
      tokenCount: document.originalTokens.length,
      uniqueTermCount,
      vocabularyDensity,
      classification: classifyDocument(document),
      topKeywords: getTopTerms(vectors[index], 5).map((item) => item.term),
    };
  });

  const collectionAverage =
    documentScores.length > 0
      ? documentScores.reduce((total, document) => total + document.signalScore, 0) / documentScores.length
      : 0;

  const outliers: OutlierInsight[] = documentScores
    .map((document, index) => {
      const averageSimilarity = similarityCounts[index] > 0 ? Math.round(similarityAverages[index] / similarityCounts[index]) : 0;
      return {
        filename: document.filename,
        averageSimilarity,
        reason:
          averageSimilarity < collectionAverage - 15
            ? "This document has noticeably lower average similarity than the rest of the collection."
            : "",
        recommendation:
          averageSimilarity < collectionAverage - 15
            ? "Review this file separately or place it in a different cluster before making final decisions."
            : "",
      };
    })
    .filter((item) => item.reason);

  const bestMatch = pairInsights[0]
    ? {
        documents: pairInsights[0].documents,
        similarity: pairInsights[0].similarity,
        reason:
          pairInsights[0].commonTerms.length > 0
            ? `Shared evidence terms include ${pairInsights[0].commonTerms.join(", ")}.`
            : pairInsights[0].action,
      }
    : undefined;

  const keyFindings: KeyFinding[] = [];

  if (bestMatch) {
    keyFindings.push({
      title: "Top Similarity Pair",
      description: `${bestMatch.documents.join(" ↔ ")} reached ${bestMatch.similarity}% similarity. ${bestMatch.reason}`,
      impact: "high",
    });
  }

  if (topTerms.length > 0) {
    keyFindings.push({
      title: "Most Influential Terms",
      description: `The collection is mainly shaped by ${topTerms
        .slice(0, 4)
        .map((term) => `"${term.term}"`)
        .join(", ")}, which carried the strongest TF-IDF weights across the uploaded files.`,
      impact: "high",
    });
  }

  if (outliers.length > 0) {
    keyFindings.push({
      title: "Outlier Detected",
      description: `${outliers[0].filename} appears to be the weakest fit within the current cluster. ${outliers[0].recommendation}`,
      impact: "medium",
    });
  }

  if (semanticBoostCount > 0) {
    keyFindings.push({
      title: "Semantic Expansion Helped the Match",
      description: `The engine found ${semanticBoostCount} conceptual overlaps where related words mapped to the same meaning, reducing false negatives from wording differences.`,
      impact: "medium",
    });
  }

  const recommendations: Recommendation[] = [];

  if (bestMatch) {
    recommendations.push({
      text: `Prioritize ${bestMatch.documents.join(" and ")} for side-by-side review because they form the strongest pair in the dataset at ${bestMatch.similarity}% similarity.`,
      priority: "high",
    });
  }

  if (outliers.length > 0) {
    recommendations.push({
      text: `${outliers[0].filename} should be reviewed separately. Its lower average similarity suggests different intent, topic, or level of specificity.`,
      priority: "high",
    });
  }

  recommendations.push({
    text: "Use the shared evidence terms and semantic boost terms as your explanation layer during the demo so the system clearly goes beyond raw scores.",
    priority: "medium",
  });

  recommendations.push({
    text: "For close matches in the 40% to 79% range, treat the result as decision support rather than automatic approval. Human judgment is still important for nuanced cases.",
    priority: "medium",
  });

  if (topTerms.length > 0) {
    recommendations.push({
      text: `Build your interpretation around the highest-value concepts: ${topTerms
        .slice(0, 3)
        .map((term) => `"${term.term}"`)
        .join(", ")}. These are the clearest indicators of what the collection is really about.`,
      priority: "low",
    });
  }

  const similaritiesForScore = pairInsights.length > 0 ? pairInsights : [];
  const overallScore =
    similaritiesForScore.length > 0
      ? Math.round(
          similaritiesForScore.reduce((total, item) => total + item.similarity, 0) /
            similaritiesForScore.length
        )
      : documentScores[0]?.signalScore || 0;

  const summary = buildSummary(
    processedDocuments,
    topTerms,
    pairInsights,
    bestMatch,
    outliers,
    semanticBoostCount
  );

  return {
    summary,
    overallScore,
    documentCount: documents.length,
    algorithm: {
      name: "Hybrid TF-IDF + Cosine Similarity Engine",
      description:
        "Combines TF-IDF weighting, cosine similarity, semantic normalization, bigram enrichment, evidence-term extraction, and threshold-based decision support.",
      layers: [
        "TF-IDF weighting",
        "Cosine similarity",
        "Semantic normalization",
        "Bigram phrase enrichment",
        "Evidence-term explainer",
        "Threshold decision engine",
        "Outlier detector",
      ],
      stages: [
        {
          name: "Document ingestion",
          description: "Accepts uploaded TXT, PDF, DOCX, or DOC files and extracts readable text.",
          status: "complete",
        },
        {
          name: "Semantic preprocessing",
          description: "Normalizes phrases, removes stop words, groups synonyms, and creates phrase-level bigrams.",
          status: "complete",
        },
        {
          name: "TF-IDF scoring",
          description: "Weights terms based on importance within each document versus across the collection.",
          status: "complete",
        },
        {
          name: "Similarity & decisions",
          description: "Calculates pairwise cosine similarity, explains why files are related, and assigns action labels.",
          status: "complete",
        },
      ],
    },
    topTerms,
    keyFindings,
    recommendations,
    documentScores,
    similarities: pairInsights,
    matrix: {
      labels: processedDocuments.map((document) => document.filename),
      rows: processedDocuments.map((document, rowIndex) => ({
        filename: document.filename,
        scores: similarityMatrix[rowIndex],
      })),
    },
    outliers,
    bestMatch,
  };
}
