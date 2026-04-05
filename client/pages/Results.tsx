import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Download,
  Share2,
  Info,
} from "lucide-react";

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

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Default mock data if no state is provided
  const analysis: AnalysisResult = location.state?.analysis || {
    summary:
      "Analyzed documents using TF-IDF and Cosine Similarity algorithms to identify important terms and measure semantic similarity.",
    overallScore: 75,
    documentCount: 1,
    algorithm: {
      name: "TF-IDF with Cosine Similarity",
      description:
        "Uses Term Frequency-Inverse Document Frequency to identify important terms and Cosine Similarity to measure document relatedness.",
    },
    topTerms: [
      { term: "analysis", score: 0.45, relevance: 450 },
      { term: "document", score: 0.38, relevance: 380 },
      { term: "similarity", score: 0.32, relevance: 320 },
    ],
    keyFindings: [
      {
        title: 'Key Term: "analysis"',
        description:
          'This term appears prominently with a TF-IDF score of 4.5. High TF-IDF scores indicate terms that are frequent in specific documents.',
        impact: "high",
      },
    ],
    recommendations: [
      {
        text: "The analysis used TF-IDF weighting to identify the most important terms.",
        priority: "high",
      },
    ],
    documentScores: [
      {
        filename: "document.txt",
        tfidfScore: 75,
        tokenCount: 250,
        topKeywords: ["analysis", "document", "similarity"],
      },
    ],
    similarities: [],
  };

  const getImpactColor = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-amber-600 bg-amber-50";
      case "low":
        return "text-green-600 bg-green-50";
    }
  };

  const getPriorityBadge = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return (
          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded">
            High Priority
          </span>
        );
      case "medium":
        return (
          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-amber-600 rounded">
            Medium Priority
          </span>
        );
      case "low":
        return (
          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded">
            Low Priority
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 container py-12 md:py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate("/analyze")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Upload
        </button>

        {/* Results Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                TextIQ Analysis Results
              </h1>
              <p className="text-muted-foreground">
                {analysis.documentCount} document
                {analysis.documentCount !== 1 ? "s" : ""} analyzed using{" "}
                <span className="font-semibold">{analysis.algorithm.name}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Results
              </Button>
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="rounded-lg border border-border bg-blue-50 dark:bg-blue-950 p-4 mb-8 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                {analysis.algorithm.name}
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {analysis.algorithm.description}
              </p>
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-lg border border-border bg-gradient-to-br from-primary/10 to-accent/5 p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Executive Summary
                </h2>
                <p className="text-foreground leading-relaxed">
                  {analysis.summary}
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">
                    {analysis.overallScore}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Overall Score
                  </p>
                </div>
                <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${analysis.overallScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Terms (TF-IDF) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Top Terms (TF-IDF Scores)
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Terms with highest TF-IDF scores are most characteristic of your documents. 
            TF-IDF measures both how frequently a term appears in a document and how unique it is across the collection.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.topTerms.map((term, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-6"
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground text-lg capitalize">
                    {term.term}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Rank #{index + 1}
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Relevance</span>
                    <span className="font-semibold text-primary">
                      {term.relevance}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${Math.min(100, term.relevance)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    TF-IDF: {term.score.toFixed(4)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Document Scores */}
        {analysis.documentScores.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Document Analysis
            </h2>
            <div className="space-y-4">
              {analysis.documentScores.map((doc, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">
                        {doc.filename}
                      </h3>
                      <span className="text-lg font-bold text-primary">
                        {doc.tfidfScore}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {doc.tokenCount} unique terms identified
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Top Keywords:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {doc.topKeywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cosine Similarity */}
        {analysis.similarities.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Cosine Similarity Analysis
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Cosine Similarity measures the semantic similarity between documents (0-100). 
              Higher values indicate more similar content based on term vectors.
            </p>
            <div className="space-y-4">
              {analysis.similarities.map((sim, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-foreground">
                        {sim.documents.join(" ↔ ")}
                      </h3>
                      <span className="text-lg font-bold text-primary">
                        {sim.similarity}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${sim.similarity}%` }}
                      ></div>
                    </div>
                  </div>
                  {sim.commonTerms.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Shared Key Terms:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sim.commonTerms.map((term, i) => (
                          <span
                            key={i}
                            className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Findings */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            Key Findings
          </h2>
          <div className="space-y-4">
            {analysis.keyFindings.map((finding, index) => (
              <div
                key={index}
                className={`rounded-lg border p-6 ${getImpactColor(finding.impact)}`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-1 h-6 rounded bg-current flex-shrink-0 mt-0.5"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{finding.title}</h3>
                    <p className="text-sm">{finding.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-primary" />
            Recommendations
          </h2>
          <div className="space-y-4">
            {analysis.recommendations.map((rec, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1">
                    {getPriorityBadge(rec.priority)}
                  </div>
                  <p className="text-foreground flex-1">{rec.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-12">
          <Button
            onClick={() => navigate("/analyze")}
            variant="outline"
            className="flex-1"
          >
            Analyze More Documents
          </Button>
          <Button onClick={() => navigate("/")} className="flex-1">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
