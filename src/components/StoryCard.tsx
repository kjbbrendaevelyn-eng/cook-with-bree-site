import Link from "next/link";
import type { Story } from "@/lib/content";
import { formatDate } from "@/lib/content";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block bg-white rounded-2xl border border-cream-200 p-6 hover:shadow-lg hover:border-sage-400/30 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300 shrink-0">
          {story.emoji || "📖"}
        </span>
        <div>
          <span className="text-xs text-warm-muted">{formatDate(story.date)}</span>
          <h3 className="font-display text-xl text-warm-brown group-hover:text-sage-600 transition-colors mt-1">
            {story.title}
          </h3>
          <p className="text-sm text-warm-muted mt-2 line-clamp-3">{story.description}</p>
          {story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-sage-400/10 text-sage-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
