import { RequestHandler } from "express";
import { AnalysisResponse } from "@shared/api";
import { extractTextFromFile } from "../utils/fileExtraction";
import { analyzeDocuments } from "../utils/tfidf";

function createInsufficientTextResponse(filenames: string[]): AnalysisResponse {
  return {
    summary:
      "The uploaded files did not contain enough readable text for meaningful analysis. Try documents with fuller textual content or export scanned files into searchable text first.",
    overallScore: 0,
    documentCount: filenames.length,
    algorithm: {
      name: "Hybrid TF-IDF + Cosine Similarity Engine",
      description:
        "The engine needs enough readable text before it can build TF-IDF weights, compute cosine similarity, and generate decision support findings.",
      layers: [
        "Text extraction",
        "TF-IDF weighting",
        "Cosine similarity",
        "Decision engine",
      ],
      stages: [
        {
          name: "Document ingestion",
          description: "Files were received, but readable text volume was too low for reliable scoring.",
          status: "complete",
        },
      ],
    },
    topTerms: [],
    keyFindings: [
      {
        title: "Insufficient readable text",
        description:
          "The system could not extract enough usable terms to build a reliable feature space. This commonly happens with image-based PDFs, empty files, or heavily formatted documents.",
        impact: "high",
      },
    ],
    recommendations: [
      {
        text: "Retry with text-rich files or export scanned PDFs into searchable text before upload.",
        priority: "high",
      },
      {
        text: "Use TXT or DOCX when possible for the cleanest extraction results during the demo.",
        priority: "medium",
      },
    ],
    documentScores: filenames.map((filename) => ({
      filename,
      signalScore: 0,
      tokenCount: 0,
      uniqueTermCount: 0,
      vocabularyDensity: 0,
      classification: "No readable text extracted",
      topKeywords: [],
    })),
    similarities: [],
    matrix: {
      labels: filenames,
      rows: filenames.map((filename, rowIndex) => ({
        filename,
        scores: filenames.map((_, columnIndex) => (rowIndex === columnIndex ? 100 : 0)),
      })),
    },
    outliers: [],
  };
}

export const handleAnalyze: RequestHandler = async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const extractedDocuments: Array<{ filename: string; text: string }> = [];

    for (const file of files) {
      const text = await extractTextFromFile(file);
      extractedDocuments.push({
        filename: file.originalname,
        text,
      });
    }

    const usableDocuments = extractedDocuments.filter((document) => {
      const wordCount = document.text.split(/\s+/).filter(Boolean).length;
      return document.text.trim().length >= 40 && wordCount >= 8;
    });

    if (usableDocuments.length === 0) {
      return res.json(createInsufficientTextResponse(files.map((file) => file.originalname)));
    }

    const analysis = analyzeDocuments(usableDocuments);
    const skippedDocuments = extractedDocuments
      .filter((document) => !usableDocuments.some((usable) => usable.filename === document.filename))
      .map((document) => document.filename);

    if (skippedDocuments.length > 0) {
      analysis.summary += ` ${skippedDocuments.join(", ")} ${skippedDocuments.length === 1 ? "was" : "were"} uploaded but skipped because the extracted text was too limited for reliable scoring.`;
      analysis.keyFindings.unshift({
        title: "Partial extraction notice",
        description: `${skippedDocuments.join(", ")} ${skippedDocuments.length === 1 ? "was" : "were"} excluded from the main analysis because readable text extraction was insufficient.`,
        impact: "medium",
      });
      analysis.recommendations.unshift({
        text: `Re-export ${skippedDocuments.join(", ")} into searchable text or a cleaner DOCX/TXT format to include ${skippedDocuments.length === 1 ? "it" : "them"} in the next run.`,
        priority: "high",
      });
    }

    return res.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return res.status(500).json({
      error: "Failed to analyze documents",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
