import { useEffect, useRef } from "react";
import { Network } from "vis-network";

interface SimilarityGraphProps {
  readonly documentNames: readonly string[];
  readonly similarities: ReadonlyArray<{
    readonly documents: readonly [string, string];
    readonly similarity: number;
    readonly decision: string;
  }>;
}

export default function SimilarityGraph({ documentNames, similarities }: Readonly<SimilarityGraphProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  useEffect(() => {
    if (!containerRef.current || documentNames.length === 0) return;

    // Create nodes for each document
    const nodes = documentNames.map((name, index) => ({
      id: index,
      label: name.replace(/\.[^/.]+$/, ""), // Remove file extension
      title: name, // Tooltip
      shape: "circle",
      color: {
        background: "#2563EB",
        border: "#1E40AF",
        highlight: {
          background: "#7C3AED",
          border: "#6D28D9",
        },
      },
      font: {
        size: 14,
        color: "#FFFFFF",
        face: "Inter",
        bold: { size: 16 },
      },
      physics: true,
      margin: 10,
    }));

    // Create edges for each similarity
    const edges = similarities
      .filter((sim) => sim.similarity > 20) // Only show weak or stronger connections
      .map((sim) => {
        const docA = documentNames.indexOf(sim.documents[0]);
        const docB = documentNames.indexOf(sim.documents[1]);

        if (docA === -1 || docB === -1) return null;

        let color = "#DC2626"; // Weak
        let width = 1;

        if (sim.similarity >= 80) {
          color = "#16A34A"; // Strong - Green
          width = 4;
        } else if (sim.similarity >= 60) {
          color = "#3B82F6"; // Moderate - Blue
          width = 3;
        } else if (sim.similarity >= 40) {
          color = "#F59E0B"; // Weak-moderate - Orange
          width = 2;
        }

        return {
          from: docA,
          to: docB,
          label: `${sim.similarity}%`,
          title: `${sim.documents[0]} ↔ ${sim.documents[1]}\n${sim.similarity}% match\n${sim.decision}`,
          color: { color },
          width,
          font: {
            size: 12,
            color: "#64748B",
            face: "Inter",
          },
          smooth: {
            type: "continuous",
          },
        };
      })
      .filter((edge) => edge !== null);

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      physics: {
        enabled: true,
        stabilization: {
          iterations: 200,
        },
        barnesHut: {
          gravitationalConstant: -26000,
          centralGravity: 0.3,
          springLength: 200,
          springConstant: 0.08,
        },
      },
      interaction: {
        navigationButtons: true,
        keyboard: true,
        zoomView: true,
        dragView: true,
      },
      nodes: {
        borderWidth: 2,
        borderWidthSelected: 3,
        widthConstraint: {
          maximum: 200,
        },
      },
    };

    if (networkRef.current) {
      networkRef.current.destroy();
    }

    networkRef.current = new Network(
      containerRef.current,
      data,
      options
    );

    // Fit all nodes in view
    setTimeout(() => {
      networkRef.current?.fit({
        animation: {
          duration: 800,
          easingFunction: "easeInOutQuad",
        },
      });
    }, 500);

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
      }
    };
  }, [documentNames, similarities]);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span className="text-primary">🌐</span>
        Document Relationship Graph
      </h2>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "500px",
            backgroundColor: "#F8FAFC",
          }}
        />

        {/* Legend */}
        <div className="border-t border-border p-6 bg-muted/30">
          <h3 className="font-semibold text-foreground mb-4">How to Read This Graph</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Connection Strength</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-1 rounded"
                    style={{ backgroundColor: "#16A34A" }}
                  />
                  <span className="text-muted-foreground">80-100% similarity (Strong match)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-1 rounded"
                    style={{ backgroundColor: "#3B82F6" }}
                  />
                  <span className="text-muted-foreground">60-80% similarity (Strong)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-1 rounded"
                    style={{ backgroundColor: "#F59E0B" }}
                  />
                  <span className="text-muted-foreground">40-60% similarity (Moderate)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-1 rounded"
                    style={{ backgroundColor: "#DC2626" }}
                  />
                  <span className="text-muted-foreground">&lt;40% similarity (Weak)</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Interactions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🖱️ <strong>Drag</strong> nodes to move them around</li>
                <li>🔍 <strong>Scroll</strong> to zoom in/out</li>
                <li>👆 <strong>Click</strong> connection for details</li>
                <li>🔄 <strong>Physics</strong> auto-arranges layout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
