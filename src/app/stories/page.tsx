import type { Metadata } from "next";
import StoryCard from "@/components/StoryCard";
import { getAllStories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stories",
  description: "Kitchen stories, food memories, and the heart behind Cook with Bree.",
};

export default async function StoriesPage() {
  const stories = await getAllStories();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="font-display text-4xl text-warm-brown">Stories</h1>
        <p className="text-warm-muted mt-2 text-lg">
          The memories, moments, and meaning behind the meals
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </div>
  );
}
