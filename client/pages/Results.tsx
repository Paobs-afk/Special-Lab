import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { AnalysisResponse } from "@shared/api";
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  CheckCircle,
  Download,
  Info,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

function getImpactColor(impact: "high" | "medium" | "low") {
  switch (impact) {
    case "high":
      return "text-red-700 bg-red-50 border-red-200";
    case "medium":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "low":
      return "text-green-700 bg-green-50 border-green-200";
  }
}

function getPriorityBadge(priority: "high" | "medium" | "low") {
  switch (priority) {
    case "high":
      return <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded">High</span>;
    case "medium":
      return <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-amber-600 rounded">Medium</span>;
    case "low":
      return <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded">Low</span>;
  }
}

function getDecisionBadgeClass(decision: string) {
  if (decision === "Direct Match") return "bg-emerald-100 text-emerald-700";
  if (decision === "Strong Match") return "bg-blue-100 text-blue-700";
  if (decision === "Partial Match") return "bg-amber-100 text-amber-700";
  if (decision === "Weak Relation") return "bg-orange-100 text-orange-700";
  return "bg-slate-200 text-slate-700";
}

function getMatrixCellClass(score: number, diagonal: boolean) {
  if (diagonal) return "bg-primary text-primary-foreground";
  if (score >= 80) return "bg-emerald-500/20 text-emerald-900";
  if (score >= 60) return "bg-blue-500/20 text-blue-900";
  if (score >= 40) return "bg-amber-500/20 text-amber-900";
  if (score >= 20) return "bg-orange-500/20 text-orange-900";
  return "bg-slate-200 text-slate-700";
}

function defaultAnalysis(): AnalysisResponse {
  return {
    summary:
      "No analysis data is currently loaded. Upload documents first to generate a full intelligence report.",
    overallScore: 0,
    documentCount: 0,
    algorithm: {
      name: "Hybrid TF-IDF + Cosine Similarity Engine",
      description:
        "Combines term weighting, semantic normalization, pairwise similarity, and threshold-based recommendations.",
      layers: [],
      stages: [],
    },
    topTerms: [],
    keyFindings: [],
    recommendations: [],
    documentScores: [],
    similarities: [],
    matrix: { labels: [], rows: [] },
    outliers: [],
  };
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const analysis: AnalysisResponse = location.state?.analysis || defaultAnalysis();

  const exportPayload = useMemo(
    () => JSON.stringify(analysis, null, 2),
    [analysis]
  );

  const handleExport = () => {
    const blob = new Blob([exportPayload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "textiq-analysis-report.json";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const text = `${analysis.summary}\n\nBest Match: ${analysis.bestMatch ? `${analysis.bestMatch.documents.join(" ↔ ")} (${analysis.bestMatch.similarity}%)` : "N/A"}`;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Ignore clipboard failures silently.
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 container py-12 md:py-16">
        <button
          onClick={() => navigate("/analyze")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Upload
        </button>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                TextIQ Analysis Results
              </h1>
              <p className="text-muted-foreground">
                {analysis.documentCount} document{analysis.documentCount !== 1 ? "s" : ""} analyzed using{" "}
                <span className="font-semibold">{analysis.algorithm.name}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2" onClick={handleExport}>
                <Download className="w-4 h-4" />
                Export JSON
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
                Copy Summary
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-blue-50 dark:bg-blue-950 p-4 mb-8 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                {analysis.algorithm.name}
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                {analysis.algorithm.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {analysis.algorithm.layers.map((layer) => (
                  <span
                    key={layer}
                    className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                  >
                    {layer}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-gradient-to-br from-primary/10 to-accent/5 p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-2">Executive Summary</h2>
                <p className="text-foreground leading-relaxed">{analysis.summary}</p>
                {analysis.bestMatch && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Best Match: <span className="font-semibold text-foreground">{analysis.bestMatch.documents.join(" ↔ ")}</span>{" "}
                    at {analysis.bestMatch.similarity}% similarity.
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">{analysis.overallScore}%</div>
                  <p className="text-sm text-muted-foreground mt-1">Collection Coherence</p>
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

        {analysis.algorithm.stages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Workflow Stages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.algorithm.stages.map((stage) => (
                <div key={stage.name} className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{stage.name}</h3>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {stage.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {analysis.topTerms.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Top Terms (TF-IDF)
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              These are the strongest terms across the collection after TF-IDF weighting removed low-value common words.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.topTerms.map((term, index) => (
                <div key={`${term.term}-${index}`} className="rounded-lg border border-border bg-card p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-foreground text-lg capitalize">{term.term}</h3>
                    <p className="text-sm text-muted-foreground">Rank #{index + 1}</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Relevance</span>
                      <span className="font-semibold text-primary">{term.relevance}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${Math.min(100, term.relevance)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">TF-IDF: {term.score.toFixed(4)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {analysis.documentScores.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Document Profiles
            </h2>
            <div className="space-y-4">
              {analysis.documentScores.map((document) => (
                <div key={document.filename} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{document.filename}</h3>
                      <p className="text-sm text-muted-foreground">{document.classification}</p>
                    </div>
                    <div className="text-left lg:text-right">
                      <div className="text-lg font-bold text-primary">{document.signalScore}%</div>
                      <p className="text-xs text-muted-foreground">Signal score</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="rounded-md bg-muted/50 p-3">
                      <p className="text-muted-foreground mb-1">Token count</p>
                      <p className="font-semibold text-foreground">{document.tokenCount}</p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-3">
                      <p className="text-muted-foreground mb-1">Unique terms</p>
                      <p className="font-semibold text-foreground">{document.uniqueTermCount}</p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-3">
                      <p className="text-muted-foreground mb-1">Vocabulary density</p>
                      <p className="font-semibold text-foreground">{document.vocabularyDensity}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Top keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {document.topKeywords.map((keyword) => (
                        <span
                          key={`${document.filename}-${keyword}`}
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

        {analysis.matrix.labels.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Similarity Matrix
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              The matrix gives a full collection view. Diagonal cells are self-matches. Darker cells represent stronger semantic alignment.
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Document</th>
                    {analysis.matrix.labels.map((label) => (
                      <th key={label} className="border border-border px-4 py-3 text-left font-semibold text-foreground min-w-[160px]">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {analysis.matrix.rows.map((row, rowIndex) => (
                    <tr key={row.filename}>
                      <td className="border border-border px-4 py-3 font-medium text-foreground bg-muted/20">{row.filename}</td>
                      {row.scores.map((score, columnIndex) => (
                        <td
                          key={`${row.filename}-${analysis.matrix.labels[columnIndex]}`}
                          className={`border border-border px-4 py-3 font-semibold ${getMatrixCellClass(score, rowIndex === columnIndex)}`}
                        >
                          {score}%
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {analysis.similarities.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Pairwise Interpretation
            </h2>
            <div className="space-y-4">
              {analysis.similarities.map((similarity) => (
                <div key={similarity.documents.join("-")} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{similarity.documents.join(" ↔ ")}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getDecisionBadgeClass(similarity.decision)}`}>
                          {similarity.decision}
                        </span>
                        <span className="text-sm text-muted-foreground">{similarity.similarity}% similarity</span>
                      </div>
                    </div>
                    <div className="w-full lg:w-48 h-2 bg-muted rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${similarity.similarity}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground mb-4">{similarity.action}</p>

                  {similarity.commonTerms.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Shared evidence terms</p>
                      <div className="flex flex-wrap gap-2">
                        {similarity.commonTerms.map((term) => (
                          <span key={`${similarity.documents.join("-")}-${term}`} className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {similarity.topContributors.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Top contributing features</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {similarity.topContributors.map((contributor) => (
                          <div key={`${similarity.documents.join("-")}-${contributor.term}`} className="rounded-md bg-muted/40 p-3">
                            <p className="font-medium text-foreground">{contributor.term}</p>
                            <p className="text-xs text-muted-foreground">Contribution score: {contributor.contribution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {similarity.semanticBoostTerms.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Semantic boost terms</p>
                      <div className="flex flex-wrap gap-2">
                        {similarity.semanticBoostTerms.map((term) => (
                          <span key={`${similarity.documents.join("-")}-semantic-${term}`} className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
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

        {analysis.outliers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-primary" />
              Outlier Detection
            </h2>
            <div className="space-y-4">
              {analysis.outliers.map((outlier) => (
                <div key={outlier.filename} className="rounded-lg border border-amber-200 bg-amber-50 p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-amber-900">{outlier.filename}</h3>
                    <span className="text-sm font-medium text-amber-800">Average similarity: {outlier.averageSimilarity}%</span>
                  </div>
                  <p className="text-sm text-amber-900 mb-2">{outlier.reason}</p>
                  <p className="text-sm text-amber-800">{outlier.recommendation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {analysis.keyFindings.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-primary" />
              Key Findings
            </h2>
            <div className="space-y-4">
              {analysis.keyFindings.map((finding) => (
                <div key={finding.title} className={`rounded-lg border p-6 ${getImpactColor(finding.impact)}`}>
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
        )}

        {analysis.recommendations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              Recommendations
            </h2>
            <div className="space-y-4">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={`${recommendation.text}-${index}`} className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">{getPriorityBadge(recommendation.priority)}</div>
                    <p className="text-foreground flex-1">{recommendation.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-12">
          <Button onClick={() => navigate("/analyze")} variant="outline" className="flex-1">
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
