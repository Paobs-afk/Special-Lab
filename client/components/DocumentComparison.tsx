import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DocumentComparisonProps {
  readonly similarities: ReadonlyArray<{
    readonly documents: readonly [string, string];
    readonly similarity: number;
    readonly decision: string;
    readonly evidenceTerms?: readonly string[];
  }>;
}

export default function DocumentComparison({ similarities }: Readonly<DocumentComparisonProps>) {
  const [expandedPairs, setExpandedPairs] = useState<Set<string>>(new Set());

  const toggleExpanded = (key: string) => {
    const newSet = new Set(expandedPairs);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setExpandedPairs(newSet);
  };

  const getDecisionColor = (decision: string) => {
    if (decision === "Direct Match") return "bg-emerald-100 text-emerald-700 border-emerald-300";
    if (decision === "Strong Match") return "bg-blue-100 text-blue-700 border-blue-300";
    if (decision === "Partial Match") return "bg-amber-100 text-amber-700 border-amber-300";
    return "bg-orange-100 text-orange-700 border-orange-300";
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return "text-emerald-700";
    if (score >= 60) return "text-blue-700";
    if (score >= 40) return "text-amber-700";
    return "text-orange-700";
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span className="text-primary">📄</span>
        Document Comparison
      </h2>

      {similarities.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/20 p-8 text-center">
          <p className="text-muted-foreground">No similarities to display</p>
        </div>
      ) : (
        <div className="space-y-3">
          {similarities.slice(0, 10).map((sim, index) => {
            const pairKey = `${sim.documents[0]}-${sim.documents[1]}-${index}`;
            const isExpanded = expandedPairs.has(pairKey);

            return (
              <div
                key={pairKey}
                className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
              >
                <button
                  onClick={() => toggleExpanded(pairKey)}
                  className="w-full px-6 py-4 text-left hover:bg-muted/30 transition-colors flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-medium text-foreground truncate max-w-xs">
                        {sim.documents[0]}
                      </span>
                      <span className="text-muted-foreground">↔</span>
                      <span className="font-medium text-foreground truncate max-w-xs">
                        {sim.documents[1]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`text-sm font-bold ${getSimilarityColor(
                          sim.similarity
                        )}`}
                      >
                        {sim.similarity}% similarity
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full border ${getDecisionColor(
                          sim.decision
                        )}`}
                      >
                        {sim.decision}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
                  )}
                </button>

                {isExpanded && sim.evidenceTerms && sim.evidenceTerms.length > 0 && (
                  <div className="px-6 py-4 bg-muted/30 border-t border-border">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      Evidence Terms (Matching Concepts)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sim.evidenceTerms.slice(0, 15).map((term, termIndex) => (
                        <span
                          key={`term-${index}-${termIndex}-${term}`}
                          className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {term}
                        </span>
                      ))}
                      {sim.evidenceTerms.length > 15 && (
                        <span className="text-xs text-muted-foreground">
                          +{sim.evidenceTerms.length - 15} more
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      These terms appear in both documents and indicate semantic similarity.
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {similarities.length > 10 && (
            <p className="text-sm text-muted-foreground text-center pt-4">
              Showing top 10 of {similarities.length} similarities
            </p>
          )}
        </div>
      )}
    </section>
  );
}
