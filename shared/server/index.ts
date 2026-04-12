import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { handleDemo } from "./routes/demo";
import { handleAnalyze } from "./routes/analyze";

export function createServer() {
  const app = express();

  // Configure multer for file uploads with increased timeout
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  });

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Request timeout
  app.use((req, res, next) => {
    req.setTimeout(60000); // 60 second timeout
    res.setTimeout(60000);
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Document analysis endpoint
  app.post("/api/analyze", upload.array("files"), handleAnalyze);

  // Error handling middleware
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Server error:", err);
    
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File too large (max 10MB)" });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    
    if (err.code === "ECONNABORTED" || err.message?.includes("aborted")) {
      console.log("Connection was aborted");
      return;
    }
    
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return app;
}
