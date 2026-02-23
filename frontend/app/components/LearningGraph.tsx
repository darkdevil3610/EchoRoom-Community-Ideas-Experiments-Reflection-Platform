"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface Node {
  id: string;
  type: "idea" | "experiment" | "insight";
  label: string;
}

interface Edge {
  source: string;
  target: string;
  label?: string;
}

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

mermaid.initialize({
  startOnLoad: true,
  theme: "base",
  themeVariables: {
    primaryColor: "#3b82f6",
    primaryTextColor: "#fff",
    primaryBorderColor: "#2563eb",
    lineColor: "#94a3b8",
    secondaryColor: "#10b981",
    tertiaryColor: "#f59e0b",
  },
});

export const LearningGraph: React.FC<{ data: GraphData }> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    if (!data || data.nodes.length === 0) return;

    const generateGraph = async () => {
      let definition = "graph TD\n";

      // Add nodes with custom styling based on type
      data.nodes.forEach((node) => {
        let style = "";
        if (node.type === "idea") style = ":::ideaStyle";
        if (node.type === "experiment") style = ":::expStyle";
        if (node.type === "insight") style = ":::insightStyle";

        definition += `  ${node.id}["${node.label}"]${style}\n`;
      });

      // Add edges
      data.edges.forEach((edge) => {
        const labelText = edge.label ? `|${edge.label}|` : "";
        definition += `  ${edge.source} -->${labelText} ${edge.target}\n`;
      });

      // Define styles
      definition += "\n  classDef ideaStyle fill:#dbeafe,stroke:#3b82f6,stroke-width:2px,color:#1e40af;\n";
      definition += "  classDef expStyle fill:#d1fae5,stroke:#10b981,stroke-width:2px,color:#065f46;\n";
      definition += "  classDef insightStyle fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e,stroke-dasharray: 5 5;\n";

      try {
        const { svg } = await mermaid.render(`learning-graph-${Date.now()}`, definition);
        setSvg(svg);
      } catch (err) {
        console.error("Mermaid render error:", err);
      }
    };

    generateGraph();
  }, [data]);

  return (
    <div className="w-full overflow-x-auto p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
      <div 
        ref={containerRef} 
        className="flex justify-center"
        dangerouslySetInnerHTML={{ __html: svg }} 
      />
      {data.nodes.length === 0 && (
        <div className="text-center py-10 text-slate-500">
          No insights synthesized yet. Start contributing ideas and reflections!
        </div>
      )}
    </div>
  );
};
