import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { requestAnalysis } from "@/lib/analysis-api";
import {
  AlertCircle,
  ArrowLeft,
  Brain,
  FileText,
  Loader,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";

interface UploadedFile {
  file: File;
  name: string;
  size: string;
}

const SUPPORTED_FORMATS = [".txt", ".pdf", ".docx", ".doc"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${Math.round((bytes / Math.pow(1024, exponent)) * 100) / 100} ${units[exponent]}`;
}

export default function Analyze() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const activeLayers = useMemo(
    () => [
      "TF-IDF weighting",
      "Cosine similarity",
      "Semantic normalization",
      "Bigram phrase detection",
      "Decision engine",
      "Outlier detection",
    ],
    []
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const nextFiles: UploadedFile[] = [];
    let currentError: string | null = null;

    Array.from(files).forEach((file) => {
      const extension = `.${file.name.split(".").pop()?.toLowerCase() || ""}`;

      if (!SUPPORTED_FORMATS.includes(extension)) {
        currentError = `Invalid format for ${file.name}. Supported formats: ${SUPPORTED_FORMATS.join(", ")}`;
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        currentError = `${file.name} exceeds the 10MB per-file limit.`;
        return;
      }

      nextFiles.push({
        file,
        name: file.name,
        size: formatFileSize(file.size),
      });
    });

    if (currentError) {
      setError(currentError);
    } else {
      setError(null);
      setUploadedFiles((previous) => [...previous, ...nextFiles]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles((previous) => previous.filter((_, index) => index !== indexToRemove));
    setError(null);
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) {
      setError("Please upload at least one document before starting the analysis.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysis = await requestAnalysis(uploadedFiles.map((item) => item.file));
      navigate("/results", { state: { analysis } });
    } catch (analysisError) {
      setError(
        analysisError instanceof Error
          ? analysisError.message
          : "Analysis failed. Please check your documents and try again."
      );
      setIsAnalyzing(false);
      return;
    }

    setIsAnalyzing(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-primary", "bg-primary/5");
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove("border-primary", "bg-primary/5");
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("border-primary", "bg-primary/5");

    const files = event.dataTransfer.files;
    if (fileInputRef.current) {
      fileInputRef.current.files = files;
      handleFileSelect({ target: fileInputRef.current } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div>
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Run the intelligent workflow
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  Upload your source documents and let TextIQ extract terms, compare concepts,
                  explain the strongest evidence, and generate decision-ready recommendations.
                </p>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="border-2 border-dashed border-border rounded-xl p-8 md:p-12 text-center cursor-pointer hover:border-primary/50 transition-colors mb-8 bg-muted/20"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  accept={SUPPORTED_FORMATS.join(",")}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      Drag and drop documents here
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      or click to browse from your computer
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported: {SUPPORTED_FORMATS.join(", ")} • Max 10MB per file
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-4">
                    {uploadedFiles.length} document{uploadedFiles.length !== 1 ? "s" : ""} ready
                  </h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-foreground truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={uploadedFiles.length === 0 || isAnalyzing}
                  size="lg"
                  className="flex-1 gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Running analysis...
                    </>
                  ) : (
                    <>
                      Start Intelligent Analysis
                      {uploadedFiles.length > 0 && (
                        <span className="ml-auto text-xs bg-primary-foreground/20 px-2 py-1 rounded">
                          {uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">AI logic engine</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  The backend now runs a hybrid interpretation layer instead of just printing one score.
                  Each analysis traces terms, related concepts, document similarity, and recommended action.
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeLayers.map((layer) => (
                    <span
                      key={layer}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {layer}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <WandSparkles className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">What the results page shows</h2>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Similarity matrix for all uploaded files</li>
                  <li>Evidence terms that explain why a pair matched</li>
                  <li>Threshold-based decisions like Direct Match or Partial Match</li>
                  <li>Outlier detection for files that do not belong to the main cluster</li>
                  <li>Written recommendations you can use in the live demo</li>
                </ul>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <h2 className="font-semibold text-foreground mb-3">Demo tip</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mention that the system goes beyond raw cosine similarity by explaining the
                  contributing terms, applying semantic normalization, and assigning decision labels.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
