import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Bree — the cook, storyteller, and heart behind Cook with Bree.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-4 border-cream-200 shadow-lg">
          <Image
            src="/images/about/bree.jpg"
            alt="Bree in chef's whites"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 192px, 224px"
            priority
          />
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-warm-brown mt-6">
          Hi, I&apos;m Bree
        </h1>
        <p className="text-lg text-warm-muted mt-4 italic">
          Product manager by day, home cook always.
        </p>
      </div>

      <div className="space-y-6 text-warm-muted text-lg leading-relaxed">
        <p>
          Welcome to my kitchen! I started <strong className="text-warm-brown">Cook with Bree</strong>{" "}
          because I believe the best meals come with a story — whether it&apos;s the recipe my
          grandmother passed down, the dish I perfected after three failed attempts, or the
          spontaneous dinner party that turned into an all-night conversation.
        </p>
        <p>
          I&apos;m not a professional chef, and I don&apos;t pretend to be. What I am is someone
          who loves feeding people — friends, family, neighbors, and now you. My recipes are
          approachable, my stories are honest, and my kitchen is always a little messy.
        </p>
        <p>
          You&apos;ll find a mix of comfort classics, seasonal favorites, and the occasional
          ambitious weekend project here. Some recipes are quick weeknight wins; others are the
          kind you save for a slow Sunday afternoon when the house smells like garlic and
          everything feels right.
        </p>
        <p>
          Thanks for being here. I hope something on this site inspires you to get into your
          own kitchen — and maybe share a meal with someone you love.
        </p>
      </div>

      <div className="mt-12 p-8 bg-cream-100 rounded-2xl border border-cream-200 text-center">
        <p className="font-display text-xl text-warm-brown">Follow along</p>
        <p className="text-warm-muted mt-2">Find me on social for more recipes and kitchen moments.</p>
        <SocialLinks className="justify-center mt-5" showLabels />
        <p className="font-display text-xl text-warm-brown mt-10">Ready to cook?</p>
        <p className="text-warm-muted mt-2">Start with one of my favorite recipes.</p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="/recipes"
            className="inline-flex items-center px-6 py-3 bg-terracotta-500 text-white rounded-full text-sm font-medium hover:bg-terracotta-600 transition-colors"
          >
            Browse Recipes
          </Link>
          <Link
            href="/stories"
            className="inline-flex items-center px-6 py-3 border border-warm-brown/20 text-warm-brown rounded-full text-sm font-medium hover:bg-cream-200 transition-colors"
          >
            Read Stories
          </Link>
        </div>
      </div>
    </div>
  );
}
