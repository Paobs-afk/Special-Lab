# TextIQ Folder Structure Guide

## Project Organization

```
Special-Lab/
│
├── 📁 client/                    # React Frontend Application
│   ├── components/               # Reusable React components
│   │   ├── DocumentComparison.tsx       # Expandable comparison cards
│   │   ├── Header.tsx                 # Navigation header
│   │   ├── SimilarityGraph.tsx         # Interactive network visualization
│   │   └── ui/                        # shadcn/ui components (buttons, alerts, etc)
│   │
│   ├── lib/                      # Frontend utilities & libraries
│   │   ├── analysis-api.ts             # API communication with backend
│   │   ├── session-history.ts          # localStorage session management
│   │   └── pdf-export.ts               # PDF & CSV report generation
│   │
│   ├── pages/                    # Page components (routing)
│   │   ├── Index.tsx                  # Home page with features
│   │   ├── Analyze.tsx                # Upload & file selection page
│   │   ├── Results.tsx                # Main results dashboard
│   │   ├── History.tsx                # Session history view
│   │   └── NotFound.tsx               # 404 error page
│   │
│   ├── hooks/                    # Custom React hooks
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # React entry point
│   ├── global.css                # Global styles
│   └── vite-env.d.ts             # Vite TypeScript definitions
│
├── 📁 server/                    # Node.js Express Backend
│   ├── routes/                   # API endpoints
│   │   └── analyze.ts                 # POST /api/analyze endpoint
│   │
│   ├── utils/                    # Core algorithms & utilities
│   │   ├── tfidf.ts                   # TF-IDF + Cosine Similarity engine (700+ lines)
│   │   └── fileExtraction.ts          # Text extraction (TXT, PDF, DOCX, DOC)
│   │
│   ├── index.ts                  # Express server setup
│   └── node-build.ts             # Build utilities
│
├── 📁 shared/                    # Shared TypeScript types
│   └── api.ts                    # Type definitions for API responses
│
├── 📁 sample-documents/          # Demo/test documents
│   ├── machine-learning-basics.txt
│   ├── deep-learning-neural-networks.txt
│   ├── document-analysis-text-processing.txt
│   ├── ai-machine-learning-text-analysis.txt
│   └── web-development-frameworks.txt
│
├── 📁 public/                    # Static assets
│   └── favicon files
│
├── 📁 netlify/                   # (UNUSED - Can be removed)
│   └── functions/                # Old Netlify functions setup
│
├── 📁 .builder/                  # (UNUSED - Can be removed)
│   └── rules/                    # Old CodeBuild configurations
│
├── 📁 node_modules/              # npm dependencies (not in git)
│
├── 📄 Configuration Files
│   ├── package.json              # npm dependencies & scripts
│   ├── package-lock.json         # Dependency lock file
│   ├── pnpm-lock.yaml            # Alternative lock file
│   ├── tsconfig.json             # TypeScript configuration
│   ├── vite.config.ts            # Vite frontend build config
│   ├── vite.config.server.ts     # Vite server config
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── components.json           # shadcn/ui configuration
│   ├── .env                      # Environment variables
│   ├── .npmrc                    # npm configuration
│   ├── .prettierrc               # Code formatter config
│   ├── .gitignore               # Git ignore rules
│   ├── .dockerignore            # Docker ignore rules
│   └── netlify.toml             # Netlify deployment config
│
├── 📄 Documentation
│   ├── README.md                        # Project overview
│   ├── SETUP_AND_FEATURES.md            # Complete feature list
│   ├── SYSTEM_OVERVIEW.md               # System design & architecture
│   ├── ML_ALGORITHM_EXPLANATION.md      # (NEW) Detailed ML explanation
│   ├── FOLDER_STRUCTURE.md              # (NEW) This file
│   ├── SPECIAL_LAB_IMPLEMENTATION_NOTES.md    # Implementation details
│   ├── DESIGN_SYSTEM.md                       # UI/UX specifications
│   ├── DEMO_SCRIPT.md                        # 15-min demo walkthrough
│   ├── ENHANCEMENTS.md                       # New features summary
│   ├── SUBMISSION_GUIDE.md                   # Submission instructions
│   └── AGENTS.md                             # Custom agent instructions
│
└── 📄 Version Control
    └── .git/                    # Git repository
```

---

## Core Directories Explained

### `/client` - React Frontend (Vite)
**Purpose**: User-facing interactive interface  
**Technology**: React 18 + TypeScript + Tailwind CSS + Vite  
**Key Features**:
- Drag-and-drop file upload
- Real-time analysis visualization
- Session history management
- PDF/CSV export generation
- Interactive network graph

**Build**: `npm run dev` (development) or `npm run build` (production)

### `/server` - Express Backend
**Purpose**: Algorithm execution and file processing  
**Technology**: Node.js + Express + TypeScript  
**Key Functions**:
- Accept file uploads (multipart/form-data)
- Extract text from TXT, PDF, DOCX, DOC files
- Execute TF-IDF algorithm
- Compute cosine similarity between all document pairs
- Generate analysis reports with scores and recommendations

**Core Algorithm** (server/utils/tfidf.ts):
- **TF-IDF Vectorization**: Weights each term by importance
- **Cosine Similarity**: Measures document semantic similarity (0-100%)
- **Decision Engine**: Labels similarity quality (Direct/Strong/Partial/Weak)
- **Outlier Detection**: Identifies document misfits
- **Evidence Terms**: Extracts shared vocabulary explaining matches

### `/shared` - Type Definitions
**Purpose**: Centralized TypeScript types used across frontend and backend  
**Key Interfaces**:
- `AnalysisResponse`: Complete analysis results
- `DocumentScore`: Per-document metrics
- `Similarity`: Pairwise document comparison
- `KeyFinding`: Analysis insights with impact levels

### `/sample-documents` - Demo Files
**Purpose**: Test data for live demos and development  
**Files**: 5 diverse documents demonstrating algorithm performance
- Strong matches (90%+)
- Moderate matches (70%)
- Weak matches (30%)
- Outliers (unrelated content)

### `/public` - Static Assets
**Purpose**: Favicon, manifest, and other static files  
**Served From**: Root URL during development and production

---

## Configuration Files Explained

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript compiler options |
| `vite.config.ts` | Frontend (React/Vite) build config |
| `vite.config.server.ts` | Backend (Express/Vite) build config |
| `tailwind.config.ts` | Tailwind CSS theme customization |
| `postcss.config.js` | CSS post-processing (used by Tailwind) |
| `components.json` | shadcn/ui component configuration |
| `.env` | Environment variables (API keys, ports) |
| `.npmrc` | npm registry and settings |
| `.prettierrc` | Code formatting rules |
| `package.json` | Dependencies, scripts, metadata |

---

## Unused Directories (Can Be Removed)

### `.builder/` - Old Build Configuration
- **Purpose**: Amazon CodeBuild rules (used in early development)
- **Status**: ❌ UNUSED (replaced by Vite + npm scripts)
- **Contents**: YAML build specifications
- **Safe to Delete**: YES

**Why**: Project now uses Vite for both frontend and backend builds. These rules are superseded.

### `netlify/` - Netlify Serverless Functions
- **Purpose**: Netlify Functions deployment (old approach)
- **Status**: ❌ UNUSED (replaced by Express backend)
- **Contents**: Serverless function definitions
- **Safe to Delete**: YES (keep if planning to deploy to Netlify)

**Why**: Project uses Express server instead of serverless functions for better control and performance.

---

## Machine Learning Implementation Location

**File**: `server/utils/tfidf.ts` (approximately 700 lines)

**Key Functions**:
```
analyzeDocuments()          → Main entry point
├── processDocument()       → Tokenize & normalize text
├── calculateTfidfVector()  → Compute TF-IDF scores
├── calculateCosineSimilarity() → Document similarity (0-100%)
├── getDecision()          → Classify match quality
└── classifyDocument()     → Categorize document type
```

**Algorithm Layers** (6-step process):
1. **Text Extraction** - Parse uploaded files
2. **Semantic Normalization** - Clean & group synonyms
3. **TF-IDF Weighting** - Score term importance
4. **Cosine Similarity** - Compare documents
5. **Decision Engine** - Label match quality
6. **Outlier Detection** - Identify misfits

---

## File Organization Best Practices

✅ **Organized by Role**:
- `client/` = Frontend concerns only
- `server/` = Backend logic & algorithms
- `shared/` = Shared types (minimal)

✅ **Logical Grouping**:
- Components grouped in `client/components/`
- Utilities in `client/lib/` and `server/utils/`
- Pages (routes) in `client/pages/`

✅ **Clear Naming**:
- Suffixes indicate file type: `.tsx` (React), `.ts` (TypeScript)
- Folder names describe contents: `components/`, `pages/`, `utils/`

✅ **Minimal Root Files**:
- Only essential config files in root
- Documentation files organized & clear

---

## Recommended Cleanup Steps

To optimize folder structure, consider removing:

```bash
# Remove unused directories (safe - not imported anywhere)
rm -rf .builder/          # Old CodeBuild configs
rm -rf netlify/           # Old serverless setup (unless deploying to Netlify)

# Keep node_modules/ (required for npm)
# Keep .git/ (git repository)
# Keep public/ (assets)
```

---

## Development Workflow

```
1. Frontend changes → `client/` files → Auto-reload on `http://localhost:8084`
2. Backend changes → `server/` files → Restart dev server
3. Type changes → `shared/api.ts` → Both sides recognize immediately
4. Asset changes → `public/` files → Hard refresh in browser

Start dev server:
cd Special-Lab
npm run dev              # Runs both frontend and backend in dev mode
```

---

## Production Structure

When deployed, the folder structure becomes:

```
dist/
├── index.html           # Built frontend (all React code bundled)
├── assets/              # CSS, JS bundles
├── build/               # Built backend (if separate build)
└── public/              # Static files
```

The server (`server/index.ts`) serves both the static frontend files AND the API endpoints.

---

## Summary

- **Clean, logical organization** by frontend/backend/shared
- **Minimal unused files** (remove .builder/ and netlify/ if not needed)
- **ML algorithms isolated** in `server/utils/tfidf.ts`
- **Type safety** centralized in `shared/api.ts`
- **Documentation comprehensive** for easy navigation

**Status**: ✅ Well-organized, production-ready structure

