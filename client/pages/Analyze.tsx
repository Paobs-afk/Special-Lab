import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  Loader,
  X,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

interface UploadedFile {
  file: File;
  name: string;
  size: string;
}

export default function Analyze() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const supportedFormats = [".txt", ".pdf", ".docx", ".doc"];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    let hasError = false;

    Array.from(files).forEach((file) => {
      const fileExt = "." + file.name.split(".").pop()?.toLowerCase();

      if (!supportedFormats.includes(fileExt)) {
        setError(
          `Invalid file format: ${file.name}. Supported formats: ${supportedFormats.join(", ")}`
        );
        hasError = true;
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError(`File too large: ${file.name} (max 10MB)`);
        hasError = true;
        return;
      }

      newFiles.push({
        file,
        name: file.name,
        size: formatFileSize(file.size),
      });
    });

    if (!hasError) {
      setError(null);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setError(null);
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) {
      setError("Please upload at least one document");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      uploadedFiles.forEach((uf) => {
        formData.append("files", uf.file);
      });

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();

      // Pass results to results page via state
      navigate("/results", { state: { analysis: result } });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to analyze documents. Please try again."
      );
      setIsAnalyzing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-primary", "bg-primary/5");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("border-primary", "bg-primary/5");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary", "bg-primary/5");
    const files = e.dataTransfer.files;
    if (fileInputRef.current) {
      fileInputRef.current.files = files;
      handleFileSelect({
        target: fileInputRef.current,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Back to Home */}
          <Link
            to="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Analyze Your Text
            </h1>
            <p className="text-muted-foreground">
              Upload your documents and let TextIQ analyze them. Supported
              formats: {supportedFormats.join(", ")}
            </p>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="border-2 border-dashed border-border rounded-lg p-8 md:p-12 text-center cursor-pointer hover:border-primary/50 transition-colors mb-8 bg-muted/20"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              accept={supportedFormats.join(",")}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  Drag and drop your documents here
                </h3>
                <p className="text-sm text-muted-foreground">
                  or click to browse from your computer
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum file size: 10MB per document
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4">
                {uploadedFiles.length} Document{uploadedFiles.length !== 1 ? "s" : ""} Ready for Analysis
              </h3>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {file.size}
                        </p>
                      </div>
                    </div>
                    <button
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

          {/* Analysis Options */}
          {uploadedFiles.length > 0 && (
            <div className="mb-8 p-6 rounded-lg border border-border bg-muted/30">
              <h3 className="font-semibold text-foreground mb-4">
                Analysis Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Analysis Type
                  </label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground">
                    <option>Comprehensive Analysis (Recommended)</option>
                    <option>Quick Scan</option>
                    <option>Pattern Detection</option>
                    <option>Similarity Matching</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
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
                  Analyzing...
                </>
              ) : (
                <>
                  Start Analysis
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
      </div>
    </div>
  );
}
