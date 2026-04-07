import { AnalysisResponse } from "@shared/api";

export async function requestAnalysis(files: File[]): Promise<AnalysisResponse> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error ||
        errorData.message ||
        `Analysis failed with status ${response.status}`
    );
  }

  return (await response.json()) as AnalysisResponse;
}
