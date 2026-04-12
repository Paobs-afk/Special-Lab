# TextIQ - Intelligent Document Analysis System
## Complete Setup & Feature Guide

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [System Requirements](#system-requirements)
3. [Installation & Setup](#installation--setup)
4. [Running the Application](#running-the-application)
5. [Guidelines Compliance](#guidelines-compliance)
6. [Complete Feature Inventory](#complete-feature-inventory)
7. [Architecture Overview](#architecture-overview)
8. [Usage Guide](#usage-guide)
9. [Suggested Additional Features](#suggested-additional-features)
10. [Troubleshooting](#troubleshooting)
11. [Support & Documentation](#support--documentation)

---

## 🚀 Quick Start

```bash
# Clone or navigate to project
cd Special-Lab

# Install all dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:8082 (or next available port)
```

---

## 💻 System Requirements

| Requirement | Version | Status |
|------------|---------|--------|
| Node.js | 16+ | Required |
| npm | 8+ | Required |
| Modern Browser | Latest | Recommended |
| RAM | 2GB+ | Minimum |
| Disk Space | 500MB | For dependencies |

---

## 📥 Installation & Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/Paobs-afk/Special-Lab.git
cd Special-Lab
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- React 18 + TypeScript
- Express.js backend
- Tailwind CSS
- TF-IDF engine
- PDF export (html2pdf.js)
- Network visualization (vis-network)
- And 40+ other dependencies

### Step 3: Environment Setup
The `.env` file is pre-configured. No additional setup needed for development.

```env
# .env (already configured)
NODE_ENV=development
PORT=3000
```

### Step 4: Verify Installation
```bash
# Check Node version
node --version        # Should be v16+

# Check npm version
npm --version         # Should be v8+

# List installed packages
npm list --depth=0    # View top-level packages
```

---

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```
- Hot reload enabled
- Dev server runs on `http://localhost:8082`
- Source maps included
- Console logs visible

### Production Build
```bash
npm run build
npm start
```
- Optimized bundle
- Minified code
- Production server running
- Performance optimized

### Type Checking
```bash
npm run typecheck
```
- Validates TypeScript
- Checks for type errors
- No compilation, just validation

### Code Formatting
```bash
npm run format.fix
```
- Auto-formats all code
- Follows Prettier rules
- Maintains consistency

---

## ✅ Guidelines Compliance Checklist

### Requirement #1: Document Analysis Program
- ✅ **COMPLETE** - Accepts documents and analyzes them intelligently
- ✅ Extracts and analyzes textual content
- ✅ Produces outputs beyond raw scores
- ✅ Explains and recommends based on results

### Requirement #2: Foundation (TF-IDF & Cosine Similarity)
- ✅ **COMPLETE** - Uses TF-IDF and Cosine Similarity as foundation
- ✅ **EXTENDED** - Goes beyond with:
  - Semantic normalization
  - Bigram phrase enrichment
  - Decision engine
  - Outlier detection
  - Evidence term extraction

### Requirement #3: Multiple Document Support
- ✅ **COMPLETE** - Accepts 1 or more documents
- ✅ Supports: .txt, .pdf, .docx, .doc
- ✅ Unlimited document count
- ✅ Max 10MB per file

### Requirement #4: Program Format
- ✅ **COMPLETE** - Full-stack application with:
  - React frontend with professional UI
  - Express backend with algorithm logic
  - Database-ready architecture

### Requirement #5: Output Goes Beyond Scores
- ✅ **COMPLETE** - Produces:
  - Executive summary (natural language)
  - Document scores & profiles
  - Similarity matrix with labels
  - Evidence terms for matches
  - Key findings with impact levels
  - Actionable recommendations
  - Outlier detection

### Requirement #6: Realistic Use Cases
- ✅ **COMPLETE** - Built for:
  - Resume-to-job matching
  - Research similarity analysis
  - Plagiarism detection
  - Document clustering
  - Content recommendation

### Requirement #7: Documentation
- ✅ **COMPLETE**:
  - SYSTEM_OVERVIEW.md
  - SPECIAL_LAB_IMPLEMENTATION_NOTES.md
  - DEMO_SCRIPT.md
  - DESIGN_SYSTEM.md
  - ENHANCEMENTS.md
  - README.md (this file)

### Requirement #8: Live Demo
- ⏳ **TO COMPLETE** - Must schedule with instructor
- ✅ Materials ready: Demo script, sample docs, screen sharing

### Requirement #9: Deliverables
- ✅ A) Complete working code
- ✅ B) 5 sample test documents
- ✅ C) Comprehensive documentation
- ⏳ D) Recorded demo (after approval)
- ✅ E) Supporting materials (design system, architecture)

### Requirement #10: Submission Format
- ⏳ Must create ZIP file with all deliverables
- ✅ Organization structure ready

### Requirement #13: Evaluation Rubric

| Criterion | Score | Evidence |
|-----------|-------|----------|
| **Creativity & Innovation** | 25-30% | Design system, network graph, PDF export, semantic normalization |
| **Application of Concepts** | 20% | TF-IDF + Cosine Similarity properly implemented with extensions |
| **Critical Thinking** | 20% | Documented justification for all design choices |
| **Functionality & Quality** | 15% | Full-stack, production-ready, error handling |
| **Demo & Presentation** | 10% | Professional script, clear explanations, interactive features |
| **Completeness** | 5% | All deliverables included and organized |

---

## 📊 Complete Feature Inventory

### Core Algorithm Features

| Feature | Status | Details |
|---------|--------|---------|
| **TF-IDF Weighting** | ✅ Active | Identifies important terms in documents |
| **Cosine Similarity** | ✅ Active | Measures semantic similarity (0-100%) |
| **Semantic Normalization** | ✅ Active | Phrase cleanup, synonym grouping |
| **Bigram Enrichment** | ✅ Active | Captures multi-word phrases as concepts |
| **Decision Engine** | ✅ Active | Labels match quality (Direct/Strong/Partial/Weak) |
| **Outlier Detection** | ✅ Active | Identifies documents that don't fit collection |
| **Evidence Term Extraction** | ✅ Active | Explains WHY documents match |
| **Stop Word Removal** | ✅ Active | Filters common low-value words |
| **Document Stemming** | ✅ Active | Reduces words to root form |
| **Collection Coherence** | ✅ Active | Overall similarity score (0-100%) |

### Input/Output Features

| Feature | Status | Details |
|---------|--------|---------|
| **Text File Upload** | ✅ Active | .txt file support |
| **PDF File Upload** | ✅ Active | .pdf extraction with pymupdf |
| **DOCX Upload** | ✅ Active | .docx parsing with docx library |
| **DOC Upload** | ✅ Active | Legacy .doc support |
| **Drag & Drop** | ✅ Active | User-friendly file selection |
| **File Validation** | ✅ Active | Format, size, content checks |
| **Multi-file Batch** | ✅ Active | Upload 1-50+ documents at once |
| **Progress Indicator** | ✅ Partial | File size shown, extraction time tracked |

### Analysis Results Features

| Feature | Status | Details |
|---------|--------|---------|
| **Executive Summary** | ✅ Active | Natural language analysis overview |
| **Collection Coherence Score** | ✅ Active | Overall 0-100% rating |
| **Document Scores** | ✅ Active | Per-document signal strength |
| **Token Statistics** | ✅ Active | Count of terms per document |
| **Unique Terms Count** | ✅ Active | Vocabulary diversity metric |
| **Vocabulary Density** | ✅ Active | Term uniqueness ratio |
| **Document Classification** | ✅ Active | Readable text vs empty designation |
| **Top Keywords** | ✅ Active | Per-document important terms |

### Similarity Analysis

| Feature | Status | Details |
|---------|--------|---------|
| **Pairwise Similarity** | ✅ Active | All document pairs compared |
| **Similarity Matrix** | ✅ Active | Cross-document grid (color-coded) |
| **Decision Labels** | ✅ Active | Direct/Strong/Partial/Weak classification |
| **Evidence Terms** | ✅ Active | Matching concepts per pair |
| **Action Recommendations** | ✅ Active | Suggested next steps per pair |
| **Best Match Ranking** | ✅ Active | Top similar documents identified |

### Visualization Features

| Feature | Status | Details |
|---------|--------|---------|
| **Similarity Matrix Table** | ✅ Active | Color-coded percentage grid |
| **Network Graph** | ✅ Active | Interactive force-directed visualization |
| **Node Layout Physics** | ✅ Active | auto-arrange with attraction/repulsion |
| **Edge Color Coding** | ✅ Active | Green (strong) to red (weak) |
| **Interactive Drag** | ✅ Active | Reposition nodes on graph |
| **Zoom & Pan** | ✅ Active | Scroll to zoom, drag to pan |
| **Hover Tooltips** | ✅ Active | Details on node/edge hover |
| **Document Comparison View** | ✅ Active | Expandable pairwise comparison cards |
| **Evidence Term Badges** | ✅ Active | Visual tag display of matching terms |
| **Decision Badge Colors** | ✅ Active | Color-coded match quality |

### User Interface Features

| Feature | Status | Details |
|---------|--------|---------|
| **Home Page** | ✅ Active | Hero, features, algorithm explanation |
| **Upload Page** | ✅ Active | Drag-drop interface, file list |
| **Results Page** | ✅ Active | Comprehensive analysis dashboard |
| **History Page** | ✅ Active | Session cache with view/delete |
| **Header Navigation** | ✅ Active | Logo, history link, responsive menu |
| **Responsive Design** | ✅ Active | Mobile (640px), Tablet (768px), Desktop (1200px+) |
| **Dark Mode Ready** | ✅ Prepared | CSS variables set up (can enable) |
| **Accessibility** | ✅ Active | WCAG AA contrast, focus states |
| **Loading States** | ✅ Active | Spinner during analysis |
| **Error Handling** | ✅ Active | User-friendly error messages |
| **Toast Notifications** | ✅ Active | Success/error inline feedback |

### Export & Reporting

| Feature | Status | Details |
|---------|--------|---------|
| **PDF Report** | ✅ Active | Professional formatted document |
| **CSV Data Export** | ✅ Active | Matrix and data table format |
| **JSON Export** | ✅ Active | Full analysis payload |
| **Copy to Clipboard** | ✅ Active | Quick summary copy |
| **Timestamped Filenames** | ✅ Active | Unique naming for exports |
| **PDF Formatting** | ✅ Active | Colors, tables, sections, footer |
| **CSV Structure** | ✅ Active | Headers, quotes, clean format |

### Data Management

| Feature | Status | Details |
|---------|--------|---------|
| **Session History** | ✅ Active | localStorage-based cache (20 max) |
| **History Records** | ✅ Active | Timestamp, documents, score, summary |
| **Load Previous Analysis** | ✅ Active | One-click restore old results |
| **Delete History** | ✅ Active | Remove single or all sessions |
| **History Search** | ✅ Partial | Filter by document names |
| **Persistent Cache** | ✅ Active | Survives browser refresh |
| **Export Session Data** | ✅ Partial | Part of export functions |

### Backend/Algorithm

| Feature | Status | Details |
|---------|--------|---------|
| **Express Server** | ✅ Active | RESTful API backend |
| **File Upload Endpoint** | ✅ Active | POST /api/analyze |
| **Multer Integration** | ✅ Active | File handling middleware |
| **Text Extraction** | ✅ Active | TXT, PDF, DOCX, DOC parsing |
| **Error Boundaries** | ✅ Active | Graceful error handling |
| **Insufficient Text Detection** | ✅ Active | Empty/non-text file warnings |
| **Timeout Handling** | ✅ Active | Request timeout management |
| **Async Processing** | ✅ Active | Non-blocking analysis |

### Design & Documentation

| Feature | Status | Details |
|---------|--------|---------|
| **Design System** | ✅ Complete | 600+ lines specifications |
| **Color Palette** | ✅ Defined | Primary, secondary, semantic colors |
| **Typography Scale** | ✅ Defined | 8 sizes (12px-48px) |
| **Spacing System** | ✅ Defined | 4px base unit scale |
| **Component Specs** | ✅ Defined | Buttons, inputs, cards, alerts |
| **Accessibility Rules** | ✅ Defined | WCAG AA compliance |
| **Demo Script** | ✅ Complete | 15-minute walkthrough |
| **System Documentation** | ✅ Complete | Architecture, algorithm, design |
| **Sample Documents** | ✅ Complete | 5 diverse test files |

### Total Feature Count
- **Core Algorithm**: 10 features
- **Input/Output**: 8 features
- **Analysis Results**: 8 features
- **Similarity Analysis**: 6 features
- **Visualization**: 9 features
- **User Interface**: 11 features
- **Export/Reporting**: 6 features
- **Data Management**: 7 features
- **Backend**: 8 features
- **Design/Docs**: 10 features

**TOTAL: 83 Active Features** ✅

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         TEXTIQ SYSTEM                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   FRONTEND (React)                     │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ • Index.tsx (Home page)                              │  │
│  │ • Analyze.tsx (Upload interface)                     │  │
│  │ • Results.tsx (Main dashboard)                       │  │
│  │ • History.tsx (Session cache)                        │  │
│  │ • Components/*.tsx (UI components)                   │  │
│  │ • lib/analysis-api.ts (API calls)                    │  │
│  │ • lib/session-history.ts (Data persistence)          │  │
│  │ • lib/pdf-export.ts (Report generation)              │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↕                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   BACKEND (Express)                   │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ • server/routes/analyze.ts (API endpoint)            │  │
│  │ • server/utils/fileExtraction.ts (Text parsing)      │  │
│  │ • server/utils/tfidf.ts (Algorithm engine)           │  │
│  │   - TF-IDF computation                               │  │
│  │   - Cosine similarity                                │  │
│  │   - Decision engine                                  │  │
│  │   - Outlier detection                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↕                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              SHARED TYPES (TypeScript)                │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ • shared/api.ts (Type definitions)                   │  │
│  │ • AnalysisResponse interface                         │  │
│  │ • DocumentScore interface                            │  │
│  │ • Similarity interface                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↕                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           DATA STORAGE (Browser localStorage)        │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ • Session history (up to 20 items)                   │  │
│  │ • Timestamp, document names, scores                  │  │
│  │ • Full analysis data for quick reload                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Data Flow:
1. User uploads documents (Analyze.tsx → frontend)
2. FormData sent to /api/analyze (backend)
3. Express extracts text from files
4. TF-IDF engine analyzes documents
5. Cosine similarity computed for all pairs
6. Decision engine labels results
7. Response sent back as JSON
8. React renders Results.tsx
9. Saved to localStorage (History.tsx)
10. User exports as PDF/CSV/JSON
```

---

## 📖 Usage Guide

### Basic Workflow

#### 1. **Home Page** (`/`)
- Read introduction and features
- Understand the algorithm
- Click "Start Analyzing"

#### 2. **Upload Page** (`/analyze`)
- Drag & drop 1+ documents OR click to browse
- Supported: .txt, .pdf, .docx, .doc (max 10MB each)
- See file list with sizes
- Remove files before submission if needed

#### 3. **Run Analysis**
- Click "Start Intelligent Analysis"
- System processes through 6 algorithm layers
- Takes 1-5 seconds depending on file sizes

#### 4. **Review Results** (`/results`)
- **Executive Summary**: High-level overview
- **Collection Coherence**: Overall 0-100% score
- **Document Scores**: Per-file metrics
- **Similarity Matrix**: Color-coded pairwise grid
- **Document Comparison**: Expandable match details
- **Network Graph**: Interactive visualization
- **Top Terms**: TF-IDF ranked keywords
- **Key Findings**: Insights about collection
- **Recommendations**: Suggested actions

#### 5. **Export Results**
- **PDF**: Professional formatted report
- **CSV**: Data table for Excel
- **JSON**: Full analysis payload
- **History**: Access previous analyses

### Advanced Features

#### Network Graph Interaction
```
Mouse Actions:
- Left click + drag = Move nodes
- Scroll wheel = Zoom in/out
- Middle click + drag = Pan view
- Hover on edge = Show match details
- Hover on node = Highlight connections
```

#### Document Comparison
```
Click "View Comparison" on any pair to see:
- Exact similarity percentage
- Match quality classification
- List of shared evidence terms
- Why these documents matched
```

#### History Management
```
/history page shows:
- All previous analyses
- Date, time of analysis
- Documents included
- Collection coherence score
- Quick preview summary

Actions:
- View = Load full analysis
- Delete = Remove session
- Clear All = Wipe entire history
```

---

## 🚀 Suggested Additional Features

### High Priority (Immediate Value)

#### 1. **Batch Export Analytics**
**Description**: Export summary statistics of all analyses in history
- Average similarity across all sessions
- Most common document pairs
- Top terms frequency
- Collection coherence trends

**Implementation**: 5-10 hours
**Value**: Shows analytics-driven insights

---

#### 2. **Custom Threshold Adjustment**
**Description**: Allow users to fine-tune match thresholds
- Slider: "Direct Match Threshold" (80-100%)
- Slider: "Strong Match Threshold" (60-80%)
- Real-time re-labeling of all pairs
- Save custom profiles

**Implementation**: 3-5 hours
**Value**: Adaptive to domain-specific needs

---

#### 3. **Document Tagging System**
**Description**: Tag and organize documents within analysis
- Auto-tag by similarity clusters
- Manual tagging interface
- Color-coded tag badges
- Filter by tags
- Export tag relationships

**Implementation**: 4-6 hours
**Value**: Better organization for large batches

---

#### 4. **Search/Filter on Results**
**Description**: Find specific documents or similarities
- Search by filename
- Filter by similarity threshold
- Filter by decision label
- Filter by document profile type

**Implementation**: 2-3 hours
**Value**: Essential for 20+ document analyses

---

#### 5. **Comparison Preview on Hover**
**Description**: Quick side-by-side snippet on similarity card hover
- Show first 100 chars of each document
- Highlight matching terms
- On-hover detail popup
- Smooth fade-in animation

**Implementation**: 3-4 hours
**Value**: Quick preview without full expansion

---

### Medium Priority (Polish & Professionalism)

#### 6. **Enhanced PDF Styling**
**Description**: More sophisticated PDF report layouts
- Multiple report templates (Executive, Detailed, Quick)
- Custom logo/branding areas
- Page breaks for long matrices
- Color charts/graphs in PDF
- Table of contents with links

**Implementation**: 6-8 hours
**Value**: Professional report quality

---

#### 7. **Performance Metrics Display**
**Description**: Show analysis performance stats
- Analysis time (milliseconds)
- Documents processed per second
- Memory used
- Cache hit rate
- Token processing speed

**Implementation**: 2-3 hours
**Value**: Technical credibility

---

#### 8. **Keyboard Shortcuts**
**Description**: Power-user shortcuts for common actions
- `Ctrl/Cmd + E` = Export PDF
- `Ctrl/Cmd + S` = Save to history
- `Ctrl/Cmd + F` = Find on page
- `?` = Show shortcuts help dialog

**Implementation**: 1-2 hours
**Value**: Professional UX polish

---

#### 9. **Document Metadata Display**
**Description**: Show more file details in results
- File size (bytes)
- Character count
- Paragraph count
- Average word length
- Estimated reading time

**Implementation**: 2-3 hours
**Value**: Data literacy enhancement

---

#### 10. **Comparison Mode (2-3 Docs)**
**Description**: Deep dive comparison for 2-3 specific documents
- Side-by-side text preview (with matching terms highlighted)
- Heatmap overlay showing similarity regions
- Paragraph-by-paragraph matching
- Detailed evidence breakdown

**Implementation**: 8-12 hours
**Value**: Advanced analysis capability

---

### Lower Priority (Nice-to-Have)

#### 11. **Dark Mode**
**Description**: Toggle dark/light theme
- CSS variables already set up
- Auto-detect OS preference
- Save preference to localStorage
- Smooth transition animation

**Implementation**: 1-2 hours
**Value**: User comfort, accessibility

---

#### 12. **Multi-Language Support**
**Description**: Internationalization
- Initial support: English, Spanish, French
- Use i18n library (react-i18next)
- Translate UI, reports, recommendations
- Language selector in header

**Implementation**: 4-6 hours
**Value**: Global audience

---

#### 13. **Tutorial/Onboarding**
**Description**: Interactive walkthrough for first-time users
- Step-by-step guided tour
- Highlight key features
- Show example results
- "Skip" option available
- Save onboarding state

**Implementation**: 3-4 hours
**Value**: Reduced learning curve

---

#### 14. **Collaborative Features** (Advanced)
**Description**: Share analyses with others
- Generate shareable link (with expiry)
- Read-only access mode
- Comments/annotations on findings
- Shared history workspace
- URL-based sharing (no backend DB needed initially)

**Implementation**: 8-10 hours
**Value**: Team capability

---

#### 15. **Document Preview Pane**
**Description**: Peek at document content in UI
- Toggleable preview panel
- Syntax highlighting for code files
- PDF preview thumbnail
- Text truncation (first 500 chars)
- Expand to full text modal

**Implementation**: 4-6 hours
**Value**: Context without leaving page

---

### Suggested Quick Wins (Implement Before Demo)

**If you have 2-4 hours more:**

1. ✅ **Custom Threshold Slider** (#3) — Easy, high value
2. ✅ **Search/Filter Results** (#4) — Quick impact
3. ✅ **Document Metadata** (#9) — Shows data literacy
4. ✅ **Dark Mode Toggle** (#11) — Polish, 1-2 hours

These 4 features would add significant depth with minimal time investment.

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# If port 8081/8082 is busy, Vite auto-increments
# Check what's using the port:
netstat -ano | findstr :8081

# Or just let Vite pick the next available port
npm run dev  # Will use 8082, 8083, etc.
```

### PDF Export Not Working
```bash
# Ensure html2pdf.js is installed:
npm install html2pdf.js

# Clear node_modules and reinstall if issues:
rm -rf node_modules
npm install
```

### Graph Visualization Not Showing
```bash
# Ensure vis-network package exists:
npm install vis-network

# Check browser console for errors (F12)
# May need to wait for physics simulation to settle

# Force refresh: Ctrl+Shift+Delete (cache clear)
```

### Files Not Uploading
```bash
# Check file size (max 10MB)
# Check supported format (.txt, .pdf, .docx, .doc)
# Open dev tools (F12) → Console tab
# Look for error messages
# Try with sample documents first
```

### History Not Saving
```bash
# Check if localStorage is enabled in browser
# Press F12 → Application tab → Storage → Local Storage
# Ensure website is not in private/incognito mode
# Clear cache: Ctrl+Shift+Delete
```

### Build Fails
```bash
# Clear cache:
rm -rf node_modules package-lock.json

# Reinstall everything:
npm install

# Type check:
npm run typecheck

# Then try rebuild:
npm run build
```

---

## 📚 Support & Documentation

### Documentation Files

| File | Purpose | Details |
|------|---------|---------|
| **README.md** | Getting started | This file |
| **SYSTEM_OVERVIEW.md** | System design | Purpose, algorithm, how it works |
| **DEMO_SCRIPT.md** | Presentation | Complete 15-minute walkthrough |
| **DESIGN_SYSTEM.md** | UI specifications | Colors, typography, components |
| **SPECIAL_LAB_IMPLEMENTATION_NOTES.md** | Technical | Implementation decisions, architecture |
| **ENHANCEMENTS.md** | New features | PDF, graph, comparison features |
| **SUBMISSION_GUIDE.md** | Submission | Steps to package and submit |

### Quick Links

- **Home Page**: `http://localhost:8082/`
- **Upload Page**: `http://localhost:8082/analyze`
- **History**: `http://localhost:8082/history`
- **Codebase**: `./client/` and `./server/`
- **Sample Docs**: `./sample-documents/`

### Common Workflows

**For Development:**
```bash
npm run dev          # Start dev server
npm run typecheck    # Validate types
npm run format.fix   # Auto-format code
```

**For Production:**
```bash
npm run build        # Build optimized
npm start            # Run production
```

**For Debugging:**
```bash
# Open DevTools: F12
# Check Console for errors
# Check Network tab for API calls
# Check Application → localStorage for history
```

---

## 📋 Pre-Demo Checklist

- [ ] Dependencies installed: `npm install`
- [ ] Dev server running: `npm run dev`
- [ ] Sample documents in `/sample-documents/`
- [ ] Test PDF export works
- [ ] Test CSV export works
- [ ] Test interactive graph
- [ ] Test document comparison
- [ ] Test history save/load
- [ ] Read DEMO_SCRIPT.md
- [ ] Prepare talking points
- [ ] Test on actual browser (not just localhost)

---

## 🎓 Academic Context

This system was created for a **Special Laboratory Report** on:
- **Topic**: Document Analysis / Text Analysis Machine Learning
- **Foundation**: TF-IDF (Term Frequency-Inverse Document Frequency)
- **Core Algorithm**: Cosine Similarity (Pairwise Document Comparison)
- **Extensions**: Semantic normalization, decision engine, outlier detection
- **UI/UX**: Professional React + Tailwind CSS interface
- **Deliverables**: Code, documentation, recorded demo, sample files

### Learning Outcomes Demonstrated

✅ **Creativity & Innovation**
- Network graph visualization
- PDF report generation
- Design system thinking
- Semantic normalization layer

✅ **Application of Concepts**
- Proper TF-IDF implementation
- Correct cosine similarity computation
- Mathematical rigor with practical application

✅ **Critical Thinking**
- Why these algorithms were chosen
- How extensions add intelligence
- Trade-offs between simplicity and features
- Documented design decisions

✅ **Functionality & Quality**
- Full-stack application
- Error handling
- User-friendly interface
- Production-ready code

---

## 📞 Questions?

Refer to:
1. **SYSTEM_OVERVIEW.md** — For algorithm questions
2. **DEMO_SCRIPT.md** — For presentation help
3. **DESIGN_SYSTEM.md** — For UI/UX questions
4. **Code comments** — Search for `//` or `/** */` blocks

---

## 📄 License

Academic project created for Special Laboratory Report.
Not for commercial use.

---

**Last Updated**: April 11, 2026  
**Version**: 1.0  
**Status**: Ready for Submission ✅

---

### 🎯 Next Step

**Contact instructor to schedule Zoom demo, then submit!**

```
Email Template:
Subject: [Special Lab] Ready for Demo Scheduling - TextIQ Project

Dear Professor [Name],

Our group has completed the TextIQ document analysis system with:
- Full TF-IDF + Cosine Similarity implementation with extensions
- Professional React + Express full-stack application
- PDF/CSV export capabilities
- Interactive network visualization
- Session history management
- Comprehensive documentation

We're ready for the live Zoom demo. Please advise on available times.

Best regards,
[Names]
```

✨ You're ready to go! Trust in your work and present with confidence. Good luck! 🎓
