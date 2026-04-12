import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  getSessionHistory,
  deleteHistoryRecord,
  clearAllHistory,
  getHistoryRecord,
} from "@/lib/session-history";
import {
  ArrowLeft,
  Clock,
  Trash2,
  Eye,
  AlertCircle,
  Archive,
} from "lucide-react";
import type { SessionRecord } from "@/lib/session-history";

export default function History() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<SessionRecord[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setRecords(getSessionHistory());
  }, []);

  const handleDeleteRecord = (id: string) => {
    deleteHistoryRecord(id);
    setRecords(getSessionHistory());
  };

  const handleClearAll = () => {
    clearAllHistory();
    setRecords([]);
    setShowClearConfirm(false);
  };

  const handleLoadAnalysis = (id: string) => {
    const record = getHistoryRecord(id);
    if (record) {
      navigate("/results", { state: { analysis: record.analysis } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 container py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary" />
                Session History
              </h1>
              <p className="text-muted-foreground">
                View and manage your previous document analyses
              </p>
            </div>
            {records.length > 0 && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowClearConfirm(true)}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {showClearConfirm && (
            <div className="mb-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 flex gap-4">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
                  Clear all session history?
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-4">
                  This action cannot be undone. All {records.length} session
                  {records.length !== 1 ? "s" : ""} will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearAll}
                  >
                    Yes, Clear All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {records.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
              <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="font-semibold text-foreground mb-1">
                No sessions yet
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Your analysis sessions will appear here
              </p>
              <Button
                onClick={() => navigate("/analyze")}
                className="gap-2"
              >
                Start a New Analysis
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-medium text-muted-foreground px-3 py-1 rounded-full bg-muted">
                          {record.formattedDate}
                        </span>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          {record.documentCount} document
                          {record.documentCount !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <h3 className="font-semibold text-foreground mb-2 truncate">
                        {record.documentNames.join(", ")}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {record.summary}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <div className="text-2xl font-bold text-primary">
                          {record.overallScore}%
                        </div>
                        <div className="flex-1 max-w-xs h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                            style={{ width: `${record.overallScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLoadAnalysis(record.id)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRecord(record.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
