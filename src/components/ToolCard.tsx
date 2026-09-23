import type { KitchenTool } from "@/lib/tools";

interface ToolCardProps {
  tool: KitchenTool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const shopReady = Boolean(tool.shopUrl.trim());

  return (
    <article className="bg-white rounded-2xl border border-cream-200 p-6 hover:border-terracotta-400/30 transition-colors duration-300">
      <span className="text-3xl">{tool.emoji}</span>
      <h3 className="font-display text-xl text-warm-brown mt-4">{tool.name}</h3>
      <p className="text-sm text-warm-muted mt-2 leading-relaxed">{tool.summary}</p>
      <p className="text-sm text-warm-brown/80 mt-3 leading-relaxed">
        <span className="font-medium text-terracotta-600">Why I use it: </span>
        {tool.why}
      </p>
      {shopReady ? (
        <a
          href={tool.shopUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex mt-5 text-sm font-medium text-terracotta-600 hover:text-terracotta-700 transition-colors"
        >
          Shop this tool →
        </a>
      ) : null}
    </article>
  );
}
