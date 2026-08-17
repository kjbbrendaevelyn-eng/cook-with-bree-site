import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllStories, getStoryBySlug, formatDate } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const stories = await getAllStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story Not Found" };
  return {
    title: story.title,
    description: story.description,
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/stories"
        className="text-sm text-sage-600 hover:text-sage-500 transition-colors"
      >
        ← Back to stories
      </Link>

      <header className="mt-8">
        <span className="text-5xl">{story.emoji || "📖"}</span>
        <p className="text-sm text-warm-muted mt-4">{formatDate(story.date)}</p>
        <h1 className="font-display text-4xl md:text-5xl text-warm-brown leading-tight mt-2">
          {story.title}
        </h1>
        <p className="text-lg text-warm-muted mt-4 italic">{story.description}</p>
        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
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
      </header>

      <div
        className="prose-story mt-10"
        dangerouslySetInnerHTML={{ __html: story.content }}
      />
    </article>
  );
}
