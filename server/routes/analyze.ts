import { RequestHandler } from "express";
import { analyzeDocuments } from "../utils/tfidf";

interface AnalysisResult {
  summary: string;
  overallScore: number;
  documentCount: number;
  algorithm: {
    name: string;
    description: string;
  };
  topTerms: Array<{
    term: string;
    score: number;
    relevance: number;
  }>;
  keyFindings: Array<{
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
  }>;
  recommendations: Array<{
    text: string;
    priority: "high" | "medium" | "low";
  }>;
  documentScores: Array<{
    filename: string;
    tfidfScore: number;
    tokenCount: number;
    topKeywords: string[];
  }>;
  similarities: Array<{
    documents: string[];
    similarity: number;
    commonTerms: string[];
  }>;
}

// Convert file content to text (simplified)
async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
  const mimetype = file.mimetype;

  if (mimetype === "text/plain" || file.originalname.endsWith(".txt")) {
    return file.buffer.toString("utf-8");
  }

  if (
    mimetype === "application/pdf" ||
    file.originalname.endsWith(".pdf")
  ) {
    // For PDF, would need pdfparse library
    return `[PDF Document: ${file.originalname}]\nNote: Full PDF extraction requires additional libraries`;
  }

  if (
    mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.originalname.endsWith(".docx")
  ) {
    // For DOCX, would need docx library
    return `[Word Document: ${file.originalname}]\nNote: Full DOCX extraction requires additional libraries`;
  }

  return file.buffer.toString("utf-8");
}

export const handleAnalyze: RequestHandler = async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Extract text from all files
    const documents = [];
    for (const file of files) {
      const text = await extractTextFromFile(file);
      documents.push({
        filename: file.originalname,
        text,
      });
    }

    // Perform TF-IDF and Cosine Similarity analysis
    const analysis = analyzeDocuments(documents);

    // Generate summary
    const topTermsList = analysis.globalTopTerms
      .slice(0, 3)
      .map((t) => t.term)
      .join(", ");

    const summary = `Analyzed ${files.length} document(s) using TF-IDF (Term Frequency-Inverse Document Frequency) and Cosine Similarity algorithms. The analysis identified ${analysis.globalTopTerms.length} significant terms. Top concepts include: ${topTermsList}. ${
      analysis.similarities.length > 0
        ? `Document similarity analysis reveals ${analysis.similarities[0].similarity}% average similarity between documents.`
        : ""
    }`;

    // Generate key findings based on term importance
    const keyFindings = analysis.globalTopTerms.slice(0, 4).map((term, index) => ({
      title: `Key Term: "${term.term}"`,
      description: `This term appears prominently across documents with a TF-IDF score of ${(term.score * 10).toFixed(1)}. High TF-IDF scores indicate terms that are frequent in specific documents but rare across the document collection.`,
      impact: (["high", "medium", "low"] as const)[
        Math.min(index, 2)
      ],
    }));

    // Document-level scores
    const documentScores = analysis.documents.map((doc) => ({
      filename: doc.filename,
      tfidfScore: doc.overallScore,
      tokenCount: doc.tokens.length,
      topKeywords: doc.topTerms.slice(0, 5).map((t) => t.term),
    }));

    // Format similarities with common terms
    const similarities = analysis.similarities.map((sim) => {
      // Find common top terms
      const doc1 = analysis.documents.find((d) => d.filename === sim.doc1);
      const doc2 = analysis.documents.find((d) => d.filename === sim.doc2);

      const terms1 = new Set(doc1?.topTerms.map((t) => t.term) || []);
      const terms2 = new Set(doc2?.topTerms.map((t) => t.term) || []);
      const commonTerms = Array.from(terms1).filter((t) => terms2.has(t));

      return {
        documents: [sim.doc1, sim.doc2],
        similarity: sim.similarity,
        commonTerms: commonTerms.slice(0, 5),
      };
    });

    // Generate recommendations
    const recommendations = [
      {
        text: `The analysis used TF-IDF weighting to identify the most important terms. Terms with high TF-IDF scores are characteristic of specific documents and can help distinguish document content.`,
        priority: "high" as const,
      },
      {
        text: `Cosine Similarity was used to compare documents. With values ranging from 0 (completely different) to 100 (identical), the similarity scores indicate how semantically related documents are.`,
        priority: "high" as const,
      },
      {
        text: `Focus on the top identified keywords for deeper semantic analysis. These terms represent the most distinctive concepts within your document collection.`,
        priority: "medium" as const,
      },
      {
        text: `Use similarity scores to identify related documents or find documents with common themes for further investigation.`,
        priority: "medium" as const,
      },
    ];

    const result: AnalysisResult = {
      summary,
      overallScore: Math.round(
        analysis.documents.reduce((sum, doc) => sum + doc.overallScore, 0) /
          Math.max(1, analysis.documents.length)
      ),
      documentCount: files.length,
      algorithm: {
        name: "TF-IDF with Cosine Similarity",
        description:
          "Uses Term Frequency-Inverse Document Frequency to identify important terms and Cosine Similarity to measure document relatedness.",
      },
      topTerms: analysis.globalTopTerms.map((t) => ({
        term: t.term,
        score: Math.round(t.score * 100) / 100,
        relevance: Math.round(t.score * 1000),
      })),
      keyFindings,
      recommendations,
      documentScores,
      similarities,
    };

    res.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze documents",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
