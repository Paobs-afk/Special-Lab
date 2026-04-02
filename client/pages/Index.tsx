import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Brain,
  Zap,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: FileText,
      title: "Multi-Format Support",
      description: "Upload and analyze documents in .txt, .pdf, .docx and more",
    },
    {
      icon: Brain,
      title: "Intelligent Analysis",
      description:
        "Advanced ML algorithms extract key insights and patterns from your documents",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Get instant results and comprehensive analysis without delays",
    },
    {
      icon: BarChart3,
      title: "Rich Insights",
      description:
        "Discover meaningful patterns, similarities, and actionable recommendations",
    },
    {
      icon: CheckCircle,
      title: "Decision Support",
      description:
        "Evidence-based findings to support your business decisions",
    },
    {
      icon: Brain,
      title: "Contextual Understanding",
      description:
        "ML models understand context and nuance in document content",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-primary/5">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 container py-20 md:py-32 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Intelligent Text{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Upload your documents and let TextIQ's advanced AI analyze them. Get
            intelligent insights, find patterns, identify similarities, and
            receive actionable recommendations—all in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/analyze">
              <Button size="lg" className="gap-2 text-base h-12">
                Start Analyzing
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-base h-12"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Enterprise Grade</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Production Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container py-20 md:py-32 border-t border-border"
      >
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powered by Advanced Algorithms
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            TextIQ uses TF-IDF and Cosine Similarity to provide accurate,
            mathematically-grounded document analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Algorithm Explanation Section */}
        <div className="mt-16 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            How TextIQ Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                TF-IDF (Term Frequency-Inverse Document Frequency)
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                TF-IDF measures the importance of terms in your documents. It considers:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Term Frequency (TF):</strong> How often a term appears in a document</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Inverse Document Frequency (IDF):</strong> How unique the term is across all documents</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                This combination identifies the most characteristic and meaningful terms in your document collection.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Cosine Similarity
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Cosine Similarity measures semantic similarity between documents on a scale of 0-100:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>0%:</strong> Documents are completely different</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>50%:</strong> Documents have moderate similarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>100%:</strong> Documents are identical or very similar</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                Uses TF-IDF vectors to compare documents mathematically, ignoring document length.
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground bg-background/50 rounded p-4 border border-border">
            <p>
              <strong>Why these algorithms?</strong> TF-IDF and Cosine Similarity are proven,
              established methods in information retrieval and text analysis. They provide
              mathematically sound and interpretable results without requiring training data.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20 md:py-32 border-t border-border">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to get intelligent insights from your documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Upload Documents",
              description:
                "Select and upload your documents in any supported format",
            },
            {
              step: "2",
              title: "AI Analysis",
              description:
                "Our algorithms analyze content, extract patterns, and identify insights",
            },
            {
              step: "3",
              title: "Get Results",
              description:
                "Receive detailed findings, recommendations, and decision support",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-4 text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm flex-1">
                  {item.description}
                </p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-6 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-primary/30"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 md:py-32 border-t border-border">
        <div className="rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Analyze Your Documents?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals using TextIQ for intelligent
            text insights
          </p>
          <Link to="/analyze">
            <Button size="lg" className="gap-2 text-base h-12">
              Start Free Analysis
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 py-8 md:py-12 mt-auto">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            &copy; 2024 TextIQ. Intelligent text analysis powered by AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
