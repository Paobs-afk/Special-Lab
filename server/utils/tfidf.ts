/**
 * TF-IDF (Term Frequency-Inverse Document Frequency) Implementation
 * Cosine Similarity for document comparison
 */

// Tokenize and normalize text
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2); // Filter out very short words
}

// Calculate Term Frequency (TF)
function calculateTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  const totalTokens = tokens.length;

  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }

  // Normalize TF
  for (const [term, count] of tf.entries()) {
    tf.set(term, count / totalTokens);
  }

  return tf;
}

// Calculate Inverse Document Frequency (IDF)
function calculateIDF(documents: string[][]): Map<string, number> {
  const idf = new Map<string, number>();
  const totalDocs = documents.length;
  const docFrequency = new Map<string, number>();

  // Count documents containing each term
  for (const doc of documents) {
    const uniqueTerms = new Set(doc);
    for (const term of uniqueTerms) {
      docFrequency.set(term, (docFrequency.get(term) || 0) + 1);
    }
  }

  // Calculate IDF
  for (const [term, count] of docFrequency.entries()) {
    idf.set(term, Math.log(totalDocs / count));
  }

  return idf;
}

// Calculate TF-IDF vector for a document
function calculateTFIDF(
  tokens: string[],
  idf: Map<string, number>
): Map<string, number> {
  const tf = calculateTF(tokens);
  const tfidf = new Map<string, number>();

  for (const [term, tfValue] of tf.entries()) {
    const idfValue = idf.get(term) || 0;
    tfidf.set(term, tfValue * idfValue);
  }

  return tfidf;
}

// Calculate magnitude of a vector
function calculateMagnitude(vector: Map<string, number>): number {
  let sum = 0;
  for (const value of vector.values()) {
    sum += value * value;
  }
  return Math.sqrt(sum);
}

// Calculate dot product of two vectors
function calculateDotProduct(
  vector1: Map<string, number>,
  vector2: Map<string, number>
): number {
  let sum = 0;
  for (const [term, value1] of vector1.entries()) {
    const value2 = vector2.get(term) || 0;
    sum += value1 * value2;
  }
  return sum;
}

// Calculate Cosine Similarity between two documents
function calculateCosineSimilarity(
  vector1: Map<string, number>,
  vector2: Map<string, number>
): number {
  const dotProduct = calculateDotProduct(vector1, vector2);
  const magnitude1 = calculateMagnitude(vector1);
  const magnitude2 = calculateMagnitude(vector2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}

// Extract top terms by TF-IDF score
function getTopTerms(
  tfidf: Map<string, number>,
  limit: number = 10
): Array<{ term: string; score: number }> {
  return Array.from(tfidf.entries())
    .map(([term, score]) => ({ term, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export interface DocumentAnalysis {
  filename: string;
  tokens: string[];
  tfidf: Map<string, number>;
  topTerms: Array<{ term: string; score: number }>;
  overallScore: number;
}

export interface AnalysisResult {
  documents: DocumentAnalysis[];
  similarities: Array<{
    doc1: string;
    doc2: string;
    similarity: number;
  }>;
  globalTopTerms: Array<{ term: string; score: number }>;
}

export function analyzeDocuments(
  documents: Array<{ filename: string; text: string }>
): AnalysisResult {
  // Tokenize all documents
  const tokenizedDocs = documents.map((doc) => ({
    filename: doc.filename,
    tokens: tokenize(doc.text),
  }));

  // Calculate IDF across all documents
  const allTokens = tokenizedDocs.map((doc) => doc.tokens);
  const idf = calculateIDF(allTokens);

  // Calculate TF-IDF for each document
  const documentAnalyses: DocumentAnalysis[] = tokenizedDocs.map((doc) => {
    const tfidf = calculateTFIDF(doc.tokens, idf);
    const topTerms = getTopTerms(tfidf, 10);

    // Calculate overall score (average TF-IDF)
    const scores = Array.from(tfidf.values());
    const overallScore = scores.length > 0 ? scores.reduce((a, b) => a + b) / scores.length : 0;

    return {
      filename: doc.filename,
      tokens: doc.tokens,
      tfidf,
      topTerms,
      overallScore: Math.round(overallScore * 1000) / 10, // 0-100 scale
    };
  });

  // Calculate cosine similarities between all document pairs
  const similarities = [];
  for (let i = 0; i < documentAnalyses.length; i++) {
    for (let j = i + 1; j < documentAnalyses.length; j++) {
      const similarity = calculateCosineSimilarity(
        documentAnalyses[i].tfidf,
        documentAnalyses[j].tfidf
      );
      similarities.push({
        doc1: documentAnalyses[i].filename,
        doc2: documentAnalyses[j].filename,
        similarity: Math.round(similarity * 100),
      });
    }
  }

  // Get global top terms across all documents
  const globalTFIDF = new Map<string, number>();
  for (const doc of documentAnalyses) {
    for (const [term, score] of doc.tfidf.entries()) {
      globalTFIDF.set(term, (globalTFIDF.get(term) || 0) + score);
    }
  }
  const globalTopTerms = getTopTerms(globalTFIDF, 15);

  return {
    documents: documentAnalyses,
    similarities,
    globalTopTerms,
  };
}
